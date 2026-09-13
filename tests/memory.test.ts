import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { MemoryStore } from '../src/lib/server/memory-store';
import { demoAnswer } from '../src/lib/server/generation';
import { PRESETS } from '../src/lib/catalog';
const p = PRESETS[3];
test('소유권 검사와 삭제', async () => {
  const s = new MemoryStore(); const room = await s.create('owner-a',p,'demo');
  await assert.rejects(s.read('owner-b',room.id),/NOT_FOUND/);
  await assert.rejects(s.remove('owner-b',room.id),/NOT_FOUND/);
  await s.remove('owner-a',room.id); await assert.rejects(s.read('owner-a',room.id),/NOT_FOUND/);
});
test('중복·동시 생성 방지, 캐시 재사용, 본문 충돌', async () => {
  const s = new MemoryStore(); const room = await s.create('a',p,'demo'); const id = randomUUID();
  await s.begin('a',room.id,id,'질문');
  await assert.rejects(s.begin('a',room.id,randomUUID(),'다른 질문'),/BUSY/);
  await s.complete('a',room.id,id,demoAnswer(p));
  const cached = await s.begin('a',room.id,id,'질문'); assert.equal(cached.cached,true);
  await assert.rejects(s.begin('a',room.id,id,'조작'),/REQUEST_CONFLICT/);
});
test('여러 소유자의 생성 시도도 글로벌 상한에 포함', async () => {
  const s = new MemoryStore({globalDaily:1,ownerDaily:10,ownerMinute:10});
  const a = await s.create('a',p,'demo'); const b = await s.create('b',p,'demo');
  const id = randomUUID(); await s.begin('a',a.id,id,'질문'); await s.fail('a',a.id,id,'MODEL_BUSY');
  await assert.rejects(s.begin('b',b.id,randomUUID(),'질문'),/RATE_LIMIT/);
});
test('임대 시간이 지난 요청은 다시 생성하지 않고 실패 상태로 반환', async () => {
  let now = Date.now(); const s = new MemoryStore(undefined,()=>now); const r = await s.create('a',p,'demo'); const id=randomUUID();
  await s.begin('a',r.id,id,'질문'); now += 130000;
  const cached = await s.begin('a',r.id,id,'질문'); assert.equal(cached.turn.state,'failed'); assert.equal(cached.cached,true);
});
