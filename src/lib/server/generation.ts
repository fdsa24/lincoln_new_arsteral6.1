import { eligibleQuotes, eligibleSources, PROMPT_VERSION, QUOTES, SOURCE_VERSION, SOURCES } from '../catalog';
import { buildHistory, historianSchema, isHttpsSource, validateActor } from '../core';
import { AppError } from '../errors';
import type { ActorOutput, Answer, HistorianOutput, Mode, Preset, Source, Turn } from '../types';
import { CURATED_ARCHIVE_POOL, filterArchiveSourcesByCutoff, searchAcademicArchives } from './archive';
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

function assemble(
  mode: Mode,
  preset: Preset,
  actor: ActorOutput,
  historian: HistorianOutput | null,
  model: string,
  usage: Answer['usage'],
  extraSources: Source[] = [],
): Answer {
  const allowed = new Set(eligibleQuotes(preset).map(q => q.id));
  const quotes = actor.quoteIds.map(id => {
    const q = QUOTES.find(q => q.id === id && allowed.has(id));
    const source = q && SOURCES.find(s => s.id === q.sourceId);
    if (!q || !source || !isHttpsSource(source.url)) throw new AppError('INVALID_MODEL_OUTPUT', 502);
    return { ...q, source };
  });
  const allSources = [...SOURCES, ...extraSources];
  const ids = new Set([...actor.sourceIds, ...quotes.map(q => q.sourceId), ...(historian?.sourceIds || [])]);
  const seen = new Set<string>();
  const matchedSources = allSources.filter(s => {
    if (!ids.has(s.id) || !isHttpsSource(s.url) || seen.has(s.id)) return false;
    seen.add(s.id);
    return true;
  });
  return {
    mode,
    actor,
    historian,
    historianStatus: historian ? 'available' : 'unavailable',
    quotes,
    sources: matchedSources,
    model,
    promptVersion: PROMPT_VERSION,
    sourceVersion: SOURCE_VERSION,
    usage,
  };
}

function selectDemoVariant(preset: Preset, question?: string): {
  paragraphs: string[];
  quoteIds: string[];
  timeCheckNote: string;
  customInterpretation?: string;
  preferredArchiveIds?: string[];
} {
  const availableQuotes = eligibleQuotes(preset);
  const latestSource = eligibleSources(preset).at(-1);
  const defaultQuote = availableQuotes.filter(q => q.sourceId === latestSource?.id).at(-1);
  const q = (question || '').trim();

  const defaultLines: Record<string, string> = {
    '1858-10': '나는 아직 대통령이 아니라 일리노이의 상원의원 선거에 나선 사람이오. 다만 이 연습판에는 이 시점의 원문 사료가 충분히 등록되어 있지 않으니, 구체적인 입장을 실제 발언처럼 지어내지는 않겠소.',
    '1861-03': '연방의 보존은 중대한 문제요. 취임사에서 노예제가 이미 존재하는 주에 직접 또는 간접으로 간섭할 의도가 없다고 밝혔소. 이 약속과 노예제 확산에 관한 논쟁은 구별해서 살펴야 하오.',
    '1862-08': '공적 직무에서 연방을 보존하려는 목적과 모든 사람이 자유롭기를 바라는 개인적 소망을 구별해 주시오. 그릴리에게 보낸 서한은 그 두 가지를 함께 읽어야 하오.',
    '1863-01': '이번 선언은 전쟁 중 반란을 진압하기 위한 조치요. 선언이 지정한 지역과 예외를 확인해야 하오. 미국의 모든 주에서 노예제가 단번에 사라졌다는 뜻으로 읽어서는 안 되오.',
    '1865-04': '지금 내게 주어진 시점에서 알려진 일만을 말하겠소. 아직 일어나지 않은 일을 내가 알고 있다고 전제할 수는 없소. 재건에 관한 구체적인 논의를 위해서는 이 연습판에 더 많은 당대 사료가 필요하오.',
  };

  if (!q) {
    return {
      paragraphs: [defaultLines[preset.id]],
      quoteIds: defaultQuote ? [defaultQuote.id] : [],
      timeCheckNote: `${preset.label}을 선택했습니다. 연습 모드는 시점별 기준 예시를 보여 줍니다.`,
    };
  }

  // 시점 한계·미래 사건·시대착오 점검 질문
  if (/알 수 없|미래|이후|어디까지|한계|서한 하나만으로/u.test(q)) {
    const limitLines: Record<string, string[]> = {
      '1858-10': [
        '지금은 1858년 10월 16일이오. 나는 일리노이 연방 상원의원 후보로 유세 중이며, 이번 선거의 최종 결과나 1860년 대통령 선거, 혹은 남북전쟁 같은 미래의 일은 전혀 알지 못하오.',
        '역사 시뮬레이션에서 과거 인물은 설정된 기준일 이전의 사료와 사실만 말할 수 있소.',
      ],
      '1861-03': [
        '나는 어제인 1861년 3월 4일에 대통령으로 취임했소. 앞으로 섬터 요새에서 어떤 충돌이 벌어질지, 내전이 몇 년이나 이어질지는 지금 시점에서 알 수 없소.',
        '현재 확인된 사료는 제1차 취임사에서 밝힌 헌법 수호와 연방 보존의 원칙뿐이오.',
      ],
      '1862-08': [
        '호러스 그릴리에게 보낸 공개 서한은 1862년 8월 22일 시점에 연방 보존이라는 공적 직무를 설명하기 위해 쓴 글이오. 이 서한 한 편만으로 나의 모든 내면이나 이후의 선언 일정을 다 설명할 수는 없소.',
        '1863년 1월의 해방 선언이나 전쟁 후반의 일은 아직 도래하지 않은 미래요.',
      ],
      '1863-01': [
        '나는 어제인 1863년 1월 1일 최종 노예 해방 선언에 서명했소. 하지만 이 선언이 군사적 진전에 따라 현장에서 어떻게 집행될지, 또 후대에 헌법이 어떻게 개정될지는 아직 알 수 없소.',
        '기준일 이후의 역사적 결과는 현대 역사 해설과 추가 사료를 통해 검토해야 하오.',
      ],
      '1865-04': [
        '지금은 1865년 4월 14일 오전이오. 어제까지의 전황과 재건 구상에 대해서만 말할 수 있으며, 오늘 저녁 포드 극장에서 일어날 일이나 그 이후의 역사는 내가 알 수 없는 미래요.',
        '과거 인물이 자신의 사망이나 사후의 비준 절차를 예언하듯 말하는 것은 시대착오에 해당하오.',
      ],
    };
    return {
      paragraphs: limitLines[preset.id] || [defaultLines[preset.id]],
      quoteIds: defaultQuote ? [defaultQuote.id] : [],
      timeCheckNote: `${preset.label} 기준일(${preset.cutoffDate}) 이후의 사건 차단 규칙을 점검하는 질문입니다.`,
    };
  }

  // 1858년 시점: 인종 비하·혈통 모욕·흑색선전(드레드 스콧 판결 반박 연설 & 오타와 토론 사료 기반 반박)
  if (preset.id === '1858-10' && /니그로|흑인|인종|혼혈|창년|애미|새끼|궤변|그따위|위선/u.test(q)) {
    return {
      paragraphs: [
        '유세장에서도 반대파들이 나를 향해 인종 혼합을 주장한다며 원색적인 모욕과 인신공격을 퍼붓곤 하오. 하지만 내가 지난 1857년 6월 스프링필드 연설에서 분명히 반박했듯이, 흑인 여성을 노예로 삼기를 원하지 않는다고 해서 반드시 아내로 삼아야 한다는 식의 비난은 본질을 흐리는 거짓된 궤변이오. 노예로도 아내로도 삼을 필요 없이 그저 자유롭게 내버려 두면 될 일이오.',
        '또한 오타와와 앨턴 합동 토론에서 밝혔듯, 비록 내가 지금 일리노이주에서 사회적·정치적 권리까지 모두 같아야 한다고 주장하지는 않더라도, 독립선언서가 천명한 생명과 자유, 그리고 자신의 두 손으로 일해 얻은 빵을 남의 허락 없이 먹을 자연적 권리에 있어서는 흑인도 백인과 다름없이 동등하오. 노예제가 그릇된 제도이기에 연방 영토로 더 확산되는 것을 막아야 한다는 나의 신념은 어떠한 야유에도 흔들리지 않소.',
      ],
      quoteIds: [],
      timeCheckNote: '1858년 상원의원 선거 유세 당시 친노예제 진영이 링컨에게 가했던 인종적 비방과 그에 대한 링컨의 실제 사료 반박(1857.06.26 드레드 스콧 연설 및 1858.08.21 오타와 토론)을 재현했습니다.',
      customInterpretation: '1858년 일리노이 상원의원 선거 당시 스티븐 더글러스와 친노예제 진영은 노예제 확산을 반대하는 링컨에게 인종 혼합론자(amalgamationist)라는 원색적인 인신공격과 인종 비하를 가했습니다. 링컨은 1857년 드레드 스콧 판결 반박 연설에서 이를 거짓된 궤변(counterfeit logic)이라 일축하고, 1858년 제1차 오타와 토론에서 당시 사회적·정치적 평등에 대한 시대적 한계를 드러내면서도 독립선언서의 자연권(노동의 대가를 누릴 권리)만큼은 흑인에게도 동등하다고 반박했습니다.',
      preferredArchiveIds: ['archive-dred-scott-1857', 'archive-ottawa-debate-1858', 'archive-alton-debate-1858'],
    };
  }

  // 1858년 시점: 더글러스 토론·노예제 확산·정치적 주장 일반
  if (preset.id === '1858-10' && /더글러스|토론|확산|노예|주장|입장|목표|지위/u.test(q)) {
    return {
      paragraphs: [
        '스티븐 더글러스 상원의원과의 일곱 차례 합동 토론에서 내가 거듭 강조한 핵심은 노예제를 도덕적·정치적으로 그릇된 제도로 보느냐의 문제요. 나는 연방 영토로 노예제가 더 이상 확산되는 것을 막아야 한다고 믿소.',
        '나는 아직 대통령이 아니며 일리노이 공화당 상원의원 후보로서, 분열된 집이 영구히 반은 노예이고 반은 자유인 채로 존속할 수는 없으며 결국 헌법의 테두리 안에서 노예제가 소멸의 길로 들어서야 한다고 주장해 왔소.',
      ],
      quoteIds: [],
      timeCheckNote: '1858년 10월 15일 제7차 앨턴 토론 직후의 시점입니다. 학술 아카이브 보조 사료로 1858년 분열된 집 연설과 앨턴·오타와 토론 기록이 함께 연결됩니다.',
      preferredArchiveIds: ['archive-house-divided-1858', 'archive-ottawa-debate-1858', 'archive-alton-debate-1858'],
    };
  }

  if (preset.id === '1861-03' && /간섭|존재하는 주|제도|위선|남부/u.test(q)) {
    return {
      paragraphs: [
        '제1차 취임사에서 분명히 밝혔듯이, 나는 노예제가 이미 존재하는 주에서 그 제도에 직접적으로든 간접적으로든 간섭할 의도가 없소.',
        '내게는 그러한 간섭을 할 헌법상 권한도 없고 그런 성향도 없음을 거듭 확인했소. 다만 연방 자체는 영구하며 헌법과 법률은 지켜져야 하오.',
      ],
      quoteIds: ['q-first-inaugural'],
      timeCheckNote: '1861년 3월 4일 제1차 취임사 직후 시점으로, 기존 노예제 주에 대한 불간섭 약속과 연방 보전의 헌법적 근거를 다룹니다.',
    };
  }

  if (preset.id === '1862-08' && /개인적 소망|자유|다른가요|위선|새끼|그따위/u.test(q)) {
    return {
      paragraphs: [
        '나의 태도가 모순되거나 미온적이라고 비판하는 이들이 많다는 것을 잘 알고 있소. 그러나 대통령으로서 내가 수행해야 할 공적 직무의 최우선 목표는 헌법에 따라 연방을 구하는 것이며, 노예제를 살리거나 없애는 것 자체가 아니오.',
        '다만 공적 직무에 따른 원칙을 그렇게 밝혔다고 해서, 어디서나 모든 사람이 자유롭기를 바란다고 거듭 밝혀 온 나의 개인적 소망까지 바꾼 것은 결코 아니오.',
      ],
      quoteIds: ['q-greeley-duty', 'q-greeley-wish'],
      timeCheckNote: '1862년 8월 22일 그릴리 서한의 핵심인 공적 직무(official duty)와 개인적 소망(personal wish)의 구별을 보여 줍니다.',
    };
  }

  if (preset.id === '1863-01' && /군 복무|군대|흑인|병사|경계|위선|새끼/u.test(q)) {
    return {
      paragraphs: [
        '경계 주의 노예가 제외된 것을 두고 위선이라 비판할 수 있으나, 1863년 1월 1일 노예 해방 선언은 헌법상 군 통수권자로서 현재 연방에 맞서 무장 반란 상태에 있는 지정 지역에 내린 전시 군사 조치요. 반란 상태가 아닌 충성파 경계 주에는 전시 계엄적 몰수 조치와 같은 군사 명령을 그대로 적용할 헌법적 권한이 없었소.',
        '아울러 이번 선언에는 해방된 사람들 가운데 적합한 조건을 갖춘 이들을 미합중국 육군과 해군 복무에 받아들여 요새를 수비하고 군함에 승선하도록 한다는 조항을 명시했소.',
      ],
      quoteIds: ['q-emancipation-service'],
      timeCheckNote: '1863년 1월 1일 해방 선언의 헌법적·군사적 성격(경계 주 제외 이유)과 흑인 군 복무 허용 조항을 다룹니다.',
    };
  }

  if (preset.id === '1865-04' && /수정헌법|13조|비준|재건|복귀|위선|흑인|참정권/u.test(q)) {
    return {
      paragraphs: [
        '전시 군사 조치였던 해방 선언의 법적 한계를 넘어 미국 전역에서 노예제를 영구히 끝내기 위해, 지난 1865년 1월 말 연방 의회에서 수정헌법 제13조안이 통과되어 현재 각 주의 비준 절차가 진행 중이오. 다만 1865년 4월 14일 오전 현재 아직 전체 주의 최종 비준이 끝난 것은 아니오.',
        '전후 남부 주들의 연방 복귀와 관련해서는 사흘 전인 4월 11일 공개 연설에서 루이지애나 재건 정부 문제와 함께, 연방을 위해 군인으로 복무한 흑인 등에게 참정권을 부여하는 방안을 지지한다고 밝힌 바 있소.',
      ],
      quoteIds: [],
      timeCheckNote: '1865년 4월 14일 오전 시점입니다. 수정헌법 제13조의 의회 통과(1865.1)와 최종 비준 완료(1865.12, 사후)를 구별하며 4월 11일 마지막 연설의 참정권 언급을 연결합니다.',
      preferredArchiveIds: ['archive-second-inaugural-1865', 'archive-last-public-address-1865'],
    };
  }

  return {
    paragraphs: [defaultLines[preset.id]],
    quoteIds: defaultQuote ? [defaultQuote.id] : [],
    timeCheckNote: `${preset.label}을 선택했습니다. 연습 모드는 질문 주제에 맞춘 시점별 예시 응답을 보여 줍니다.`,
  };
}

export function demoAnswer(preset: Preset, question?: string): Answer {
  const available = eligibleSources(preset);
  const latest = available.at(-1);
  const variant = selectDemoVariant(preset, question);
  const allCutoffArchives = filterArchiveSourcesByCutoff(CURATED_ARCHIVE_POOL, preset);
  const archiveEligible = question
    ? (variant.preferredArchiveIds?.length
      ? allCutoffArchives.filter(s => variant.preferredArchiveIds!.includes(s.id))
      : allCutoffArchives.slice(-2))
    : [];
  const actor: ActorOutput = {
    paragraphs: variant.paragraphs,
    quoteIds: variant.quoteIds,
    sourceIds: latest ? [latest.id] : [],
    uncertainty: preset.editorialWarning,
  };
  const historianSourceIds = [
    ...(latest ? [latest.id] : []),
    ...archiveEligible.map(s => s.id),
  ];
  const factsParts: string[] = [];
  if (latest) factsParts.push(`서버 등록 전사문: ${latest.title} (${latest.documentDate}). ${latest.context}`);
  if (archiveEligible.length > 0) {
    factsParts.push(`학술 아카이브 사료 근거: ${archiveEligible.map(s => `${s.title} (${s.documentDate}) — ${s.context}`).join(' ')}`);
  }
  if (factsParts.length === 0) {
    factsParts.push('이 시점에 이용할 수 있는 기본 등록 전사문이 없습니다.');
  }

  return assemble('demo', preset, actor, {
    timeCheck: variant.timeCheckNote,
    facts: factsParts.join(' '),
    interpretations: variant.customInterpretation || '위 대사는 연습 모드 동작 및 사료 대조 학습을 위해 구성된 예시이며, 실제 링컨의 발언 기록이 아닙니다.',
    limitations: `${preset.editorialWarning} 번역은 검토 전 초안이며, 자동 해설은 역사학자의 검증 완료가 아닙니다.`,
    sourceIds: historianSourceIds,
  }, 'demo-fixed', { inputTokens: 0, outputTokens: 0 }, archiveEligible);
}

export async function liveAnswer(preset: Preset, text: string, turns: Turn[], config: { key: string; model: string }, signal: AbortSignal): Promise<Answer> {
  const archiveSources = await searchAcademicArchives(preset, text, signal);
  const allSources = [...SOURCES, ...archiveSources];
  const actorResponse = await generateJson({ ...config, system: actorPrompt(preset, archiveSources), prompt: text, history: buildHistory(turns), schema: ACTOR_JSON_SCHEMA, signal });
  const actor = validateActor(actorResponse.output, preset, archiveSources);
  let historian: HistorianOutput | null = null;
  const usage = { ...actorResponse.usage };
  try {
    const response = await generateJson({ ...config, system: historianPrompt(), prompt: historianData(preset, text, actor, allSources), schema: HISTORIAN_JSON_SCHEMA, signal });
    usage.inputTokens += response.usage.inputTokens; usage.outputTokens += response.usage.outputTokens;
    const parsed = historianSchema.safeParse(response.output);
    if (!parsed.success || parsed.data.sourceIds.some(id => !allSources.some(s => s.id === id))) throw new AppError('INVALID_MODEL_OUTPUT', 502);
    historian = parsed.data;
  } catch {
    // 배우 단계가 통과해도 역사 해설 실패를 숨기지 않는다. 검증 완료 배지를 붙이지 않는다.
    historian = null;
  }
  return assemble('live', preset, actor, historian, config.model, usage, archiveSources);
}
