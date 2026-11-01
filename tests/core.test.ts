import test from 'node:test';
import assert from 'node:assert/strict';
import { DEFAULT_PRESET, PRESETS, QUOTES, SOURCES, eligibleQuotes, eligibleSources, findPreset } from '../src/lib/catalog';
import { actorPrompt } from '../src/lib/server/prompts';
import { buildHistory, createSessionSchema, isHttpsSource, readJsonLimited, sendMessageSchema, validateActor } from '../src/lib/core';
import { CURATED_ARCHIVE_POOL, filterArchiveSourcesByCutoff, isTrustedAcademicUrl, searchAcademicArchives } from '../src/lib/server/archive';
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
test('모든 시점의 연습 응답과 추천 질문별 응답은 스키마·날짜 규칙을 통과', () => {
  for (const p of PRESETS) {
    assert.ok((p.suggestions?.length || 0) >= 3);
    assert.deepEqual(validateActor(demoAnswer(p).actor, p), demoAnswer(p).actor);
    for (const q of p.suggestions || []) {
      const ans = demoAnswer(p, q);
      assert.deepEqual(validateActor(ans.actor, p), ans.actor);
    }
  }
});
test('학술 아카이브 검색은 신뢰 도메인과 시점(cutoffDate) 이전 사료만 허용', async () => {
  assert.equal(isTrustedAcademicUrl('https://www.loc.gov/resource/mal.4361300/'), true);
  assert.equal(isTrustedAcademicUrl('https://www.archives.gov/milestone-documents/emancipation-proclamation'), true);
  assert.equal(isTrustedAcademicUrl('https://example.com/fake-lincoln-quote'), false);
  assert.equal(isTrustedAcademicUrl('http://www.loc.gov/insecure'), false);

  const filtered1858 = filterArchiveSourcesByCutoff(CURATED_ARCHIVE_POOL, PRESETS[0]);
  assert.ok(filtered1858.length >= 2);
  assert.ok(filtered1858.every(s => s.documentDate < PRESETS[0].cutoffDate));

  const fakeLocFetch: typeof fetch = async () => Response.json({
    results: [
      { title: '1860 Valid Document', date: '1860-05-18', url: 'https://www.loc.gov/item/mal001/', description: ['Lincoln nomination record'] },
      { title: '1865 Future Document', date: '1865-04-11', url: 'https://www.loc.gov/item/mal999/', description: ['Reconstruction speech'] },
      { title: 'Untrusted Host Document', date: '1859-01-01', url: 'https://untrusted.example.org/item', description: ['Fake quote'] },
    ],
  });
  const searched = await searchAcademicArchives(PRESETS[1], '취임사 연방 보존', AbortSignal.timeout(2000), fakeLocFetch);
  assert.ok(searched.some(s => s.url === 'https://www.loc.gov/item/mal001/'));
  assert.ok(searched.every(s => s.documentDate < PRESETS[1].cutoffDate && isTrustedAcademicUrl(s.url)));
});
test('본문 바이트를 실제로 제한하고 JSON을 파싱', async () => {
  const body = JSON.stringify({ text: '가'.repeat(100) });
  const req = () => new Request('http://localhost', { method: 'POST', headers: {'content-type':'application/json'}, body });
  await assert.rejects(readJsonLimited(req(),50), /BODY_TOO_LARGE/);
  assert.deepEqual(await readJsonLimited(req()), {text:'가'.repeat(100)});
});
