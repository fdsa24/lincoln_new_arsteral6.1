import { randomUUID } from 'node:crypto';
import { AppError } from '../errors';
import type { Answer, ChatSession, Limits, Mode, Preset, SessionView, Turn } from '../types';
import { DEFAULT_LIMITS, LEASE_MS, quotaKeys, SESSION_DAYS, type BeginResult, type Store } from './store';
interface Entry { owner: string; view: SessionView; leases: Map<string, number> }
export class MemoryStore implements Store {
  private entries = new Map<string, Entry>();
  private counters = new Map<string, { count: number; expires: number }>();
  constructor(private readonly limits: Limits = DEFAULT_LIMITS, private readonly clock = () => Date.now()) {}
  private cleanup() {
    const now = this.clock();
    for (const [id, e] of this.entries) if (Date.parse(e.view.session.expiresAt) <= now) this.entries.delete(id);
    for (const [key, value] of this.counters) if (value.expires <= now) this.counters.delete(key);
  }
  private entry(owner: string, id: string) {
    this.cleanup();
    const e = this.entries.get(id);
    if (!e || e.owner !== owner) throw new AppError('NOT_FOUND', 404);
    for (const t of e.view.turns) if (t.state === 'pending' && (e.leases.get(t.id) ?? 0) <= this.clock()) {
      t.state = 'failed'; t.errorCode = 'MODEL_TIMEOUT';
    }
    return e;
  }
  async list(owner: string): Promise<ChatSession[]> {
    this.cleanup();
    return structuredClone([...this.entries.values()].filter(e => e.owner === owner).map(e => e.view.session).sort((a,b) => b.createdAt.localeCompare(a.createdAt)));
  }
  async create(owner: string, preset: Preset, mode: Mode): Promise<ChatSession> {
    this.cleanup();
    if (this.entries.size >= 200 || [...this.entries.values()].filter(e => e.owner === owner).length >= 10) throw new AppError('SESSION_LIMIT', 429);
    const now = this.clock();
    const session: ChatSession = { id: randomUUID(), preset: structuredClone(preset), mode, createdAt: new Date(now).toISOString(), expiresAt: new Date(now + SESSION_DAYS * 86400000).toISOString() };
    this.entries.set(session.id, { owner, view: { session, turns: [] }, leases: new Map() });
    return structuredClone(session);
  }
  async read(owner: string, id: string) { return structuredClone(this.entry(owner, id).view); }
  async remove(owner: string, id: string) { this.entry(owner, id); this.entries.delete(id); }
  async begin(owner: string, id: string, requestId: string, text: string): Promise<BeginResult> {
    // 이 메서드의 검사~기록 사이에는 await가 없다. 단일 프로세스 데모용일 뿐 분산 제한이 아니다.
    const e = this.entry(owner, id);
    const existing = e.view.turns.find(t => t.id === requestId);
    if (existing) {
      if (existing.text !== text) throw new AppError('REQUEST_CONFLICT', 409);
      if (existing.state === 'pending') throw new AppError('BUSY', 409);
      return { cached: true, turn: structuredClone(existing), view: structuredClone(e.view) };
    }
    if (e.view.turns.some(t => t.state === 'pending')) throw new AppError('BUSY', 409);
    if (e.view.turns.length >= 100) throw new AppError('SESSION_LIMIT', 429);
    const now = this.clock();
    const keys = quotaKeys(owner, new Date(now), this.limits);
    if (keys.some(k => (this.counters.get(k.key)?.count || 0) >= k.limit)) throw new AppError('RATE_LIMIT', 429, 60);
    for (const k of keys) this.counters.set(k.key, { count: (this.counters.get(k.key)?.count || 0) + 1, expires: now + 86400000 });
    const turn: Turn = { id: requestId, seq: e.view.turns.length + 1, text, state: 'pending', answer: null, errorCode: null, createdAt: new Date(now).toISOString() };
    e.view.turns.push(turn); e.leases.set(requestId, now + LEASE_MS);
    return { cached: false, turn: structuredClone(turn), view: structuredClone(e.view) };
  }
  async complete(owner: string, id: string, requestId: string, answer: Answer) {
    const e = this.entry(owner, id);
    const t = e.view.turns.find(t => t.id === requestId);
    if (!t || t.state !== 'pending') throw new AppError('REQUEST_CONFLICT', 409);
    t.state = 'complete'; t.answer = structuredClone(answer); e.leases.delete(requestId);
    return structuredClone(t);
  }
  async fail(owner: string, id: string, requestId: string, code: string) {
    const e = this.entries.get(id);
    if (!e || e.owner !== owner) return;
    const t = e.view.turns.find(t => t.id === requestId);
    if (t?.state === 'pending') { t.state = code === 'MODEL_BLOCKED' ? 'blocked' : 'failed'; t.errorCode = code; e.leases.delete(requestId); }
  }
}
