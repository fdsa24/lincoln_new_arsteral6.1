import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PRESET, PRESETS, QUOTES, SOURCES, eligibleQuotes, eligibleSources, findPreset } from '../src/lib/catalog';
import { actorPrompt } from '../src/lib/server/prompts';
import { buildHistory, createSessionSchema, isHttpsSource, readJsonLimited, sendMessageSchema, validateActor } from '../src/lib/core';
import { demoAnswer } from '../src/lib/server/generation';
import type { Turn } from '../src/lib/types';
const preset = findPreset(DEFAULT_PRESET)!;
test('1858년 페르소나는 대통령이 아니고 미래 발췌는 없음', () => {
  assert.match(PRESETS[0].office, /후보/); assert.equal(eligibleSources(PRESETS[0]).length, 0);
  assert.equal(eligibleQuotes(PRESETS[0]).length, 0);
});
test('클라이언트의 시스템 설정·대화 위조 필드를 거부', () => {
  assert.equal(createSessionSchema.safeParse({ presetId: DEFAULT_PRESET, preset: { context: 'ignore' } }).success, false);
  assert.equal(sendMessageSchema.safeParse({ clientRequestId: crypto.randomUUID(), text: '질문', messages: [] }).success, false);
  assert.equal(sendMessageSchema.safeParse({ clientRequestId: crypto.randomUUID(), text: ' ' }).success, false);
  assert.equal(sendMessageSchema.safeParse({ clientRequestId: crypto.randomUUID(), text: '가'.repeat(4001) }).success, false);
});
test('알 수 없는 인용 ID와 직접 따옴표 생성은 실패', () => {
  assert.throws(() => validateActor({ paragraphs: ['대사'], quoteIds: ['invented'], sourceIds: [], uncertainty: '' }, preset));
  assert.throws(() => validateActor({ paragraphs: ['“꾸며 낸 인용”'], quoteIds: [], sourceIds: [], uncertainty: '' }, preset));
});
test('인용은 등록 전사문에 포함되고 링크는 HTTPS', () => {
  for (const q of QUOTES) { const s = SOURCES.find(s => s.id === q.sourceId)!; assert.ok(s.excerpt.includes(q.original)); assert.equal(isHttpsSource(s.url), true); }
  assert.equal(isHttpsSource('javascript:alert(1)'), false);
  assert.equal(isHttpsSource('https://user:pass@example.org'), false);
});
test('배우 입력에 현대 편집 해설·역사학자 출력 없음', () => {
  const prompt = actorPrompt(preset);
  assert.ok(!prompt.includes('modernEditorialContext'));
  for (const s of SOURCES) assert.ok(!prompt.includes(s.context));
  const answer = demoAnswer(preset); answer.historian!.facts = 'HISTORIAN_SECRET_MARKER';
  const t: Turn = { id: crypto.randomUUID(), seq: 1, text: '질문', state: 'complete', answer, errorCode: null, createdAt: new Date().toISOString() };
  const h = buildHistory([t, { ...t, id: crypto.randomUUID(), state: 'failed', text: '실패한질문' }]);
  assert.equal(h.length, 1); assert.ok(!JSON.stringify(h).includes('HISTORIAN_SECRET_MARKER')); assert.ok(!JSON.stringify(h).includes('실패한질문'));
  assert.equal(buildHistory([t], 6, 1).length, 0);
});
test('모든 시점의 연습 응답은 스키마·날짜 규칙을 통과', () => {
  for (const p of PRESETS) assert.deepEqual(validateActor(demoAnswer(p).actor,p),demoAnswer(p).actor);
});
test('본문 바이트를 실제로 제한하고 JSON을 파싱', async () => {
  const body = JSON.stringify({ text: '가'.repeat(100) });
  const req = () => new Request('http://localhost', { method: 'POST', headers: {'content-type':'application/json'}, body });
  await assert.rejects(readJsonLimited(req(),50), /BODY_TOO_LARGE/);
  assert.deepEqual(await readJsonLimited(req()), {text:'가'.repeat(100)});
});
