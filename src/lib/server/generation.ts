import { eligibleQuotes, eligibleSources, PROMPT_VERSION, QUOTES, SOURCE_VERSION, SOURCES } from '../catalog';
import { buildHistory, historianSchema, isHttpsSource, validateActor } from '../core';
import { AppError } from '../errors';
import type { ActorOutput, Answer, HistorianOutput, Mode, Preset, Turn } from '../types';
import { actorPrompt, historianData, historianPrompt } from './prompts';
import { generateJson } from './provider';
const arrayOfStrings = { type: 'array', items: { type: 'string' } };
export const ACTOR_JSON_SCHEMA = { type: 'object', properties: {
  paragraphs: { ...arrayOfStrings, minItems: 1, maxItems: 3 }, quoteIds: { ...arrayOfStrings, maxItems: 2 },
  sourceIds: { ...arrayOfStrings, maxItems: 6 }, uncertainty: { type: 'string' },
}, required: ['paragraphs','quoteIds','sourceIds','uncertainty'], additionalProperties: false };
export const HISTORIAN_JSON_SCHEMA = { type: 'object', properties: {
  timeCheck: { type: 'string' }, facts: { type: 'string' }, interpretations: { type: 'string' }, limitations: { type: 'string' }, sourceIds: arrayOfStrings,
}, required: ['timeCheck','facts','interpretations','limitations','sourceIds'], additionalProperties: false };
function assemble(mode: Mode, preset: Preset, actor: ActorOutput, historian: HistorianOutput | null, model: string, usage: Answer['usage']): Answer {
  const allowed = new Set(eligibleQuotes(preset).map(q => q.id));
  const quotes = actor.quoteIds.map(id => {
    const q = QUOTES.find(q => q.id === id && allowed.has(id));
    const source = q && SOURCES.find(s => s.id === q.sourceId);
    if (!q || !source || !isHttpsSource(source.url)) throw new AppError('INVALID_MODEL_OUTPUT', 502);
    return { ...q, source };
  });
  const ids = new Set([...actor.sourceIds, ...quotes.map(q => q.sourceId), ...(historian?.sourceIds || [])]);
  return { mode, actor, historian, historianStatus: historian ? 'available' : 'unavailable', quotes,
    sources: SOURCES.filter(s => ids.has(s.id)), model, promptVersion: PROMPT_VERSION, sourceVersion: SOURCE_VERSION, usage };
}
export function demoAnswer(preset: Preset): Answer {
  const available = eligibleSources(preset);
  const latest = available.at(-1);
  const quote = eligibleQuotes(preset).filter(q => q.sourceId === latest?.id).at(-1);
  const lines: Record<string,string> = {
    '1858-10': '나는 아직 대통령이 아니라 일리노이의 상원의원 선거에 나선 사람이오. 다만 이 연습판에는 이 시점의 원문 사료가 충분히 등록되어 있지 않으니, 구체적인 입장을 실제 발언처럼 지어내지는 않겠소.',
    '1861-03': '연방의 보존은 중대한 문제요. 취임사에서 노예제가 이미 존재하는 주에 직접 또는 간접으로 간섭할 의도가 없다고 밝혔소. 이 약속과 노예제 확산에 관한 논쟁은 구별해서 살펴야 하오.',
    '1862-08': '공적 직무에서 연방을 보존하려는 목적과 모든 사람이 자유롭기를 바라는 개인적 소망을 구별해 주시오. 그릴리에게 보낸 서한은 그 두 가지를 함께 읽어야 하오.',
    '1863-01': '이번 선언은 전쟁 중 반란을 진압하기 위한 조치요. 선언이 지정한 지역과 예외를 확인해야 하오. 미국의 모든 주에서 노예제가 단번에 사라졌다는 뜻으로 읽어서는 안 되오.',
    '1865-04': '지금 내게 주어진 시점에서 알려진 일만을 말하겠소. 아직 일어나지 않은 일을 내가 알고 있다고 전제할 수는 없소. 재건에 관한 구체적인 논의를 위해서는 이 연습판에 더 많은 당대 사료가 필요하오.',
  };
  const actor: ActorOutput = { paragraphs: [lines[preset.id]], quoteIds: quote ? [quote.id] : [], sourceIds: latest ? [latest.id] : [], uncertainty: preset.editorialWarning };
  return assemble('demo', preset, actor, {
    timeCheck: `${preset.label}을 선택했습니다. 연습 모드는 사용자 질문을 분석하지 않고 시점별 고정 예시를 보여 줍니다.`,
    facts: latest ? `등록 발췌 예시: ${latest.title} (${latest.documentDate}). ${latest.context}` : '이 시점에 이용할 수 있는 등록 발췌가 없습니다.',
    interpretations: '위 대사는 화면 동작 확인용으로 작성한 창작 예시입니다. 실제 링컨의 발언 기록이 아닙니다.',
    limitations: `${preset.editorialWarning} 번역은 검토 전 초안이며, 자동 해설은 역사학자의 검증 완료가 아닙니다.`,
    sourceIds: latest ? [latest.id] : [],
  }, 'demo-fixed', { inputTokens: 0, outputTokens: 0 });
}
export async function liveAnswer(preset: Preset, text: string, turns: Turn[], config: { key: string; model: string }, signal: AbortSignal): Promise<Answer> {
  const actorResponse = await generateJson({ ...config, system: actorPrompt(preset), prompt: text, history: buildHistory(turns), schema: ACTOR_JSON_SCHEMA, signal });
  const actor = validateActor(actorResponse.output, preset);
  let historian: HistorianOutput | null = null;
  const usage = { ...actorResponse.usage };
  try {
    const response = await generateJson({ ...config, system: historianPrompt(), prompt: historianData(preset, text, actor, SOURCES), schema: HISTORIAN_JSON_SCHEMA, signal });
    usage.inputTokens += response.usage.inputTokens; usage.outputTokens += response.usage.outputTokens;
    const parsed = historianSchema.safeParse(response.output);
    if (!parsed.success || parsed.data.sourceIds.some(id => !SOURCES.some(s => s.id === id))) throw new AppError('INVALID_MODEL_OUTPUT', 502);
    historian = parsed.data;
  } catch {
    // 배우 단계가 통과해도 역사 해설 실패를 숨기지 않는다. 검증 완료 배지를 붙이지 않는다.
    historian = null;
  }
  return assemble('live', preset, actor, historian, config.model, usage);
}
