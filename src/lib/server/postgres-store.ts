import { randomUUID } from 'node:crypto';
import { Pool, type PoolClient, type QueryResultRow } from 'pg';
import { AppError } from '../errors';
import type { Answer, ChatSession, Limits, Mode, Preset, SessionView, Turn } from '../types';
import { DEFAULT_LIMITS, LEASE_MS, quotaKeys, SESSION_DAYS, type BeginResult, type Store } from './store';
interface SessionRow extends QueryResultRow { id: string; preset_snapshot: Preset; mode: Mode; created_at: Date; expires_at: Date }
interface TurnRow extends QueryResultRow { request_id: string; seq: number; text: string; state: Turn['state']; answer: Answer | null; error_code: string | null; created_at: Date; lease_until: Date }
function session(row: SessionRow): ChatSession { return { id: row.id, preset: row.preset_snapshot, mode: row.mode, createdAt: row.created_at.toISOString(), expiresAt: row.expires_at.toISOString() }; }
function turn(row: TurnRow): Turn {
  const stale = row.state === 'pending' && row.lease_until.getTime() <= Date.now();
  return { id: row.request_id, seq: row.seq, text: row.text, state: stale ? 'failed' : row.state, answer: row.answer, errorCode: stale ? 'MODEL_TIMEOUT' : row.error_code, createdAt: row.created_at.toISOString() };
}
export class PostgresStore implements Store {
  constructor(public readonly pool: Pool, private readonly limits: Limits = DEFAULT_LIMITS) {}
  private async tx<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
    const c = await this.pool.connect();
    try { await c.query('BEGIN'); const value = await fn(c); await c.query('COMMIT'); return value; }
    catch (e) { await c.query('ROLLBACK').catch(() => undefined); throw e; }
    finally { c.release(); }
  }
  private async owned(c: PoolClient, owner: string, id: string) {
    const r = await c.query<SessionRow>('SELECT * FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 AND expires_at>now() FOR UPDATE', [id, owner]);
    if (!r.rows[0]) throw new AppError('NOT_FOUND', 404);
    return session(r.rows[0]);
  }
  async list(owner: string) {
    const r = await this.pool.query<SessionRow>('SELECT * FROM lincoln_sessions WHERE owner_hash=$1 AND expires_at>now() ORDER BY created_at DESC LIMIT 10', [owner]);
    return r.rows.map(session);
  }
  async create(owner: string, preset: Preset, mode: Mode) {
    return this.tx(async c => {
      // 같은 소유자의 방 생성을 직렬화한다. 짧은 트랜잭션 동안만 잠근다.
      await c.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))', [owner]);
      const count = await c.query<{ n: string }>('SELECT count(*) AS n FROM lincoln_sessions WHERE owner_hash=$1 AND expires_at>now()', [owner]);
      if (Number(count.rows[0].n) >= 10) throw new AppError('SESSION_LIMIT', 429);
      const r = await c.query<SessionRow>(`INSERT INTO lincoln_sessions(id,owner_hash,preset_snapshot,mode,expires_at)
        VALUES($1,$2,$3::jsonb,$4,now()+($5::text || ' days')::interval) RETURNING *`, [randomUUID(), owner, JSON.stringify(preset), mode, SESSION_DAYS]);
      return session(r.rows[0]);
    });
  }
  async read(owner: string, id: string): Promise<SessionView> {
    const r = await this.pool.query<SessionRow>('SELECT * FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 AND expires_at>now()', [id, owner]);
    if (!r.rows[0]) throw new AppError('NOT_FOUND', 404);
    const t = await this.pool.query<TurnRow>(`SELECT t.* FROM lincoln_turns t JOIN lincoln_sessions s ON s.id=t.session_id
      WHERE s.id=$1 AND s.owner_hash=$2 AND s.expires_at>now() ORDER BY t.seq`, [id, owner]);
    return { session: session(r.rows[0]), turns: t.rows.map(turn) };
  }
  async remove(owner: string, id: string) {
    const r = await this.pool.query('DELETE FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 RETURNING id', [id, owner]);
    if (!r.rowCount) throw new AppError('NOT_FOUND', 404);
  }
  async begin(owner: string, id: string, requestId: string, text: string): Promise<BeginResult> {
    return this.tx(async c => {
      const s = await this.owned(c, owner, id);
      await c.query(`UPDATE lincoln_turns SET state='failed', error_code='MODEL_TIMEOUT' WHERE session_id=$1 AND state='pending' AND lease_until<=now()`, [id]);
      const rows = await c.query<TurnRow>('SELECT * FROM lincoln_turns WHERE session_id=$1 ORDER BY seq', [id]);
      const turns = rows.rows.map(turn);
      const existing = turns.find(t => t.id === requestId);
      if (existing) {
        if (existing.text !== text) throw new AppError('REQUEST_CONFLICT', 409);
        if (existing.state === 'pending') throw new AppError('BUSY', 409);
        return { cached: true, turn: existing, view: { session: s, turns } };
      }
      if (turns.some(t => t.state === 'pending')) throw new AppError('BUSY', 409);
      if (turns.length >= 100) throw new AppError('SESSION_LIMIT', 429);
      // 글로벌 → 소유자 일 → 소유자 분 순서로 원자적으로 생성 시도 예산을 예약한다.
      const time = await c.query<{ at: Date }>('SELECT now() AS at');
      for (const bucket of quotaKeys(owner, time.rows[0].at, this.limits)) {
        const used = await c.query(`INSERT INTO lincoln_quotas(bucket,used,expires_at) VALUES($1,1,now()+interval '2 days')
          ON CONFLICT(bucket) DO UPDATE SET used=lincoln_quotas.used+1
          WHERE lincoln_quotas.used<$2 RETURNING used`, [bucket.key, bucket.limit]);
        if (!used.rowCount) throw new AppError('RATE_LIMIT', 429, 60);
      }
      const inserted = await c.query<TurnRow>(`INSERT INTO lincoln_turns(session_id,request_id,seq,text,state,lease_until)
        VALUES($1,$2,$3,$4,'pending',now()+($5::text || ' milliseconds')::interval) RETURNING *`, [id, requestId, turns.length + 1, text, LEASE_MS]);
      const t = turn(inserted.rows[0]);
      return { cached: false, turn: t, view: { session: s, turns: [...turns, t] } };
    });
  }
  async complete(owner: string, id: string, requestId: string, answer: Answer) {
    const r = await this.pool.query<TurnRow>(`UPDATE lincoln_turns t SET state='complete',answer=$4::jsonb,error_code=NULL
      FROM lincoln_sessions s WHERE t.session_id=s.id AND s.id=$1 AND s.owner_hash=$2 AND s.expires_at>now()
      AND t.request_id=$3 AND t.state='pending' AND t.lease_until>now() RETURNING t.*`, [id, owner, requestId, JSON.stringify(answer)]);
    if (!r.rows[0]) throw new AppError('REQUEST_CONFLICT', 409);
    return turn(r.rows[0]);
  }
  async fail(owner: string, id: string, requestId: string, code: string) {
    await this.pool.query(`UPDATE lincoln_turns t SET state=$4,error_code=$5 FROM lincoln_sessions s
      WHERE t.session_id=s.id AND s.id=$1 AND s.owner_hash=$2 AND t.request_id=$3 AND t.state='pending'`, [id, owner, requestId, code === 'MODEL_BLOCKED' ? 'blocked' : 'failed', code]);
  }
}
