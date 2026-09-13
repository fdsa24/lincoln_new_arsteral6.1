import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomBytes, randomUUID } from 'node:crypto';
import { Pool } from 'pg';
import { PostgresStore } from '../src/lib/server/postgres-store';
import { PRESETS } from '../src/lib/catalog';
import { demoAnswer } from '../src/lib/server/generation';
const url = process.env.TEST_DATABASE_URL;
test('PostgreSQL: 저장·소유권·중복·두 연결 동시 요청·삭제', { skip: !url }, async () => {
  if (!new URL(url!).pathname.endsWith('_test')) throw new Error('테스트 DB 이름은 _test로 끝나야 합니다. 운영 DB로 실행하지 마세요.');
  const pool = new Pool({connectionString:url,max:3}); const s = new PostgresStore(pool);
  const owner = randomBytes(32).toString('hex'); let roomId = '';
  try {
    await pool.query(await readFile(new URL('../db/001_initial.sql',import.meta.url),'utf8'));
    const room = await s.create(owner,PRESETS[3],'live'); roomId=room.id;
    await assert.rejects(s.read('0'.repeat(64),room.id),/NOT_FOUND/);
    const id = randomUUID(); await s.begin(owner,room.id,id,'질문');
    await s.complete(owner,room.id,id,demoAnswer(PRESETS[3]));
    assert.equal((await s.begin(owner,room.id,id,'질문')).cached,true);
    await assert.rejects(s.begin(owner,room.id,id,'변경'),/REQUEST_CONFLICT/);
    const a=randomUUID(),b=randomUUID();
    const results=await Promise.allSettled([s.begin(owner,room.id,a,'둘'),s.begin(owner,room.id,b,'셋')]);
    assert.equal(results.filter(r=>r.status==='fulfilled').length,1);
    await s.remove(owner,room.id); await assert.rejects(s.read(owner,room.id),/NOT_FOUND/);
  } finally {
    if (roomId) await pool.query('DELETE FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2',[roomId,owner]);
    await pool.end();
  }
});
