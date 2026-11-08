import { eligibleQuotes, eligibleSources, PROMPT_VERSION, QUOTES, SOURCE_VERSION, SOURCES } from '../catalog';
import { buildHistory, historianSchema, isHttpsSource, validateActor } from '../core';
import { AppError } from '../errors';
import type { ActorOutput, Answer, HistorianOutput, Mode, Preset, Source, Stance, Turn } from '../types';
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
  stance: Stance = 'strict',
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
    stance,
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

const IMAGINATIVE_PLAUSIBLE_LINES: Record<string, string[]> = {
  '1858-10': [
    '나는 일리노이 변경에서 스스로의 손으로 일하며 자라난 사람으로서, 가난한 청년이라도 자유롭게 노동하여 삶을 일구고 도구를 사며 언젠가 다른 사람을 고용할 수 있는 자유노동의 사회를 믿소.',
    '노예제가 서부 연방 영토로 퍼져 나가면 자유로운 소농과 노동자들이 정착할 터전 자체가 좁아질 것이오. 비록 지금 당장 남부 주의 기존 제도를 무력으로 허물 권한은 없더라도, 헌법 제정자들이 바랐던 것처럼 노예제의 확산을 막아 궁극적인 소멸의 길에 두어야 한다는 것이 나의 소신이오.',
  ],
  '1861-03': [
    '취임한 지 하루밖에 지나지 않은 지금 내 어깨를 누르는 가장 큰 책임은, 선조들에게 물려받은 이 공화정 연방이 소수의 불만으로 쪼개지는 선례를 남기지 않는 것이오.',
    '남부의 시민들에게도 말하고 싶소. 우리는 적이 아니라 친구가 되어야 하며, 성급한 열정이 식고 나면 헌법과 법률의 테두리 안에서 평화롭게 공존할 길을 다시 찾을 수 있을 것이라 희망하오.',
  ],
  '1862-08': [
    '전쟁이 길어지며 북부의 가정마다 아들과 남편을 잃은 슬픔이 깊어지고, 정책의 속도를 두고 양극단에서 거센 질책이 쏟아지고 있음을 나 역시 매일 밤 무겁게 체감하고 있소.',
    '그럼에도 내가 신중하게 발걸음을 옮기는 까닭은, 자칫 성급한 결정으로 충성파 경계 주들의 지지마저 잃으면 연방 전체의 존립이 흔들릴 수 있기 때문이오. 연방이라는 그릇을 지켜 내야만 그 안에서 자유의 원칙도 살아남을 수 있소.',
  ],
  '1863-01': [
    '해방 선언에 서명하던 순간 내 손은 여러 시간 악수를 나눈 탓에 떨렸을지언정 내 결심만큼은 흔들림이 없었소. 전쟁이 해를 넘기며 이제 옛 방식대로만 싸워서는 연방을 구할 수 없는 국면에 이르렀소.',
    '반란 지역의 노예 노동을 무너뜨리고 자유를 얻은 이들이 미합중국 군복을 입게 되는 변화는, 단순한 군사적 계산을 넘어 이 공화국이 어떤 나라로 살아남을 것인가를 결정짓는 분수령이 될 것이오.',
  ],
  '1865-04': [
    '네 해에 걸친 참혹한 내전으로 남과 북 모두 헤아릴 수 없는 피와 눈물을 흘렸소. 이제 총성이 멎어 가는 시점에서 우리에게 필요한 것은 증오 섞인 보복이 아니라 상처 입은 나라를 싸매는 일이오.',
    '누구에게도 악의를 품지 않고 모두를 자비로 대하되, 전쟁을 통해 어렵게 쟁취한 자유의 토대만큼은 흔들리지 않도록 현실적이고 점진적인 재건의 첫걸음을 떼어야 하오.',
  ],
};

function selectDemoVariant(preset: Preset, question: string | undefined, stance: Stance): {
  paragraphs: string[];
  quoteIds: string[];
  timeCheckNote: string;
  customInterpretation?: string;
  uncertaintyNote?: string;
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

  const addImaginativeTail = (base: string[], extra: string) =>
    stance === 'imaginative' ? [...base, extra] : base;

  // 시점 한계·미래 사건·시대착오 점검 질문 (두 모드 모두 미래 사건은 엄격 차단하되, 상상력 모드는 당대 시선의 고민을 덧붙임)
  if (/알 수 없|미래|이후|어디까지|한계|서한 하나만으로/u.test(q)) {
    const limitLines: Record<string, string[]> = {
      '1858-10': addImaginativeTail([
        '지금은 1858년 10월 16일이오. 나는 일리노이 연방 상원의원 후보로 유세 중이며, 이번 선거의 최종 결과나 1860년 대통령 선거, 혹은 남북전쟁 같은 미래의 일은 전혀 알지 못하오.',
        '역사 시뮬레이션에서 과거 인물은 설정된 기준일 이전의 사료와 사실만 말할 수 있소.',
      ], '다만 지금 일리노이 유세 현장에서 느끼는 공화당과 민주당의 첨예한 대립을 보건대, 노예제 확산을 둘러싼 이 갈등이 쉽게 가라앉지 않으리라는 무거운 예감만큼은 감출 수 없소.'),
      '1861-03': addImaginativeTail([
        '나는 어제인 1861년 3월 4일에 대통령으로 취임했소. 앞으로 섬터 요새에서 어떤 충돌이 벌어질지, 내전이 몇 년이나 이어질지는 지금 시점에서 알 수 없소.',
        '현재 확인된 사료는 제1차 취임사에서 밝힌 헌법 수호와 연방 보존의 원칙뿐이오.',
      ], '취임 선서를 마친 지금 내 바람은 남부의 동포들이 이성을 되찾아 유혈 충돌 없이 연방의 울타리 안에서 헌법 질서를 회복하는 것이오.'),
      '1862-08': addImaginativeTail([
        '호러스 그릴리에게 보낸 공개 서한은 1862년 8월 22일 시점에 연방 보존이라는 공적 직무를 설명하기 위해 쓴 글이오. 이 서한 한 편만으로 나의 모든 내면이나 이후의 선언 일정을 다 설명할 수는 없소.',
        '1863년 1월의 해방 선언이나 전쟁 후반의 일은 아직 도래하지 않은 미래요.',
      ], '전황이 여의치 않은 이 여름날, 북부 여론을 하나로 묶어 연방을 지탱하는 일이 대통령으로서 가장 고독하고도 절박한 과제요.'),
      '1863-01': addImaginativeTail([
        '나는 어제인 1863년 1월 1일 최종 노예 해방 선언에 서명했소. 하지만 이 선언이 군사적 진전에 따라 현장에서 어떻게 집행될지, 또 후대에 헌법이 어떻게 개정될지는 아직 알 수 없소.',
        '기준일 이후의 역사적 결과는 현대 역사 해설과 추가 사료를 통해 검토해야 하오.',
      ], '비록 내일의 전황을 미리 볼 수는 없으나, 한번 자유를 약속한 이상 내 직무가 허락하는 한 그 약속을 결코 되돌리지 않을 것이오.'),
      '1865-04': addImaginativeTail([
        '지금은 1865년 4월 14일 오전이오. 어제까지의 전황과 재건 구상에 대해서만 말할 수 있으며, 오늘 저녁 포드 극장에서 일어날 일이나 그 이후의 역사는 내가 알 수 없는 미래요.',
        '과거 인물이 자신의 사망이나 사후의 비준 절차를 예언하듯 말하는 것은 시대착오에 해당하오.',
      ], '리 장군의 항복 소식 이후 워싱턴 거리에 모처럼 평화의 기운이 감돌고 있으니, 이제는 전쟁의 상처를 아물게 할 평화의 과업을 차분히 준비하려 하오.'),
    };
    return {
      paragraphs: limitLines[preset.id] || [defaultLines[preset.id]],
      quoteIds: defaultQuote ? [defaultQuote.id] : [],
      timeCheckNote: `${preset.label} 기준일(${preset.cutoffDate}) 이후의 사건 차단 규칙을 점검하는 질문입니다 (${stance === 'imaginative' ? '역사적 상상력 모드도 미래 예언은 금지' : '엄격 고증 모드'}).`,
      customInterpretation: stance === 'imaginative'
        ? '역사적 상상력 모드에서도 기준일 이후의 미래 사건은 철저히 차단하되, 마지막 문단에서 해당 날짜의 시대적 분위기와 당대 링컨의 현실적 고민을 개연성 있게 덧붙였습니다.'
        : undefined,
    };
  }

  // 1858년 시점: 인종 비하·혈통 모욕·흑색선전
  if (preset.id === '1858-10' && /니그로|흑인|인종|혼혈|창년|애미|새끼|궤변|그따위|위선/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '유세장에서도 반대파들이 나를 향해 인종 혼합을 주장한다며 원색적인 모욕과 인신공격을 퍼붓곤 하오. 하지만 내가 지난 1857년 6월 스프링필드 연설에서 분명히 반박했듯이, 흑인 여성을 노예로 삼기를 원하지 않는다고 해서 반드시 아내로 삼아야 한다는 식의 비난은 본질을 흐리는 거짓된 궤변이오. 노예로도 아내로도 삼을 필요 없이 그저 자유롭게 내버려 두면 될 일이오.',
        '또한 오타와와 앨턴 합동 토론에서 밝혔듯, 비록 내가 지금 일리노이주에서 사회적·정치적 권리까지 모두 같아야 한다고 주장하지는 않더라도, 독립선언서가 천명한 생명과 자유, 그리고 자신의 두 손으로 일해 얻은 빵을 남의 허락 없이 먹을 자연적 권리에 있어서는 흑인도 백인과 다름없이 동등하오.',
      ], '거친 욕설로 군중의 공포를 부추기는 것은 논리가 부족할 때 쓰는 낡은 정치 수법일 뿐이오. 이 논쟁의 참된 본질은 타인의 노동을 강제로 빼앗는 노예제를 도덕적으로 옳다고 볼 것인가 그르다고 볼 것인가에 있소.'),
      quoteIds: [],
      timeCheckNote: '1858년 상원의원 선거 유세 당시 친노예제 진영이 링컨에게 가했던 인종적 비방과 그에 대한 링컨의 실제 사료 반박(1857.06.26 드레드 스콧 연설 및 1858.08.21 오타와 토론)을 재현했습니다.',
      customInterpretation: stance === 'imaginative'
        ? '1~2문단은 1857년 드레드 스콧 연설(거짓된 궤변 반박)과 1858년 오타와 토론(자연권 옹호) 1차 사료에 직접 기초하며, 3문단은 1858년 앨턴 토론의 도덕적 본질론을 바탕으로 야유꾼에게 맞서는 당대 유세장의 어조를 역사적 개연성에 맞게 재구성했습니다.'
        : '1858년 일리노이 상원의원 선거 당시 친노예제 진영의 인종 혼합 흑색선전에 맞선 1857년 드레드 스콧 판결 반박 연설과 1858년 오타와 토론 1차 사료의 핵심 논지만을 엄격히 추려 응답했습니다.',
      preferredArchiveIds: ['archive-dred-scott-1857', 'archive-ottawa-debate-1858', 'archive-alton-debate-1858'],
    };
  }

  // 1858년 시점: 더글러스 토론·노예제 확산·정치적 주장 일반
  if (preset.id === '1858-10' && /더글러스|토론|확산|노예|주장|입장|목표|지위/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '스티븐 더글러스 상원의원과의 일곱 차례 합동 토론에서 내가 거듭 강조한 핵심은 노예제를 도덕적·정치적으로 그릇된 제도로 보느냐의 문제요. 나는 연방 영토로 노예제가 더 이상 확산되는 것을 막아야 한다고 믿소.',
        '나는 아직 대통령이 아니며 일리노이 공화당 상원의원 후보로서, 분열된 집이 영구히 반은 노예이고 반은 자유인 채로 존속할 수는 없으며 결국 헌법의 테두리 안에서 노예제가 소멸의 길로 들어서야 한다고 주장해 왔소.',
      ], '더글러스 의원은 주민주권론을 내세워 노예제가 퍼지든 말든 상관없다고 말하지만, 도덕적으로 그릇된 일에 무관심하겠다는 태도는 결국 노예제의 전국화를 방조하는 길이라 보오.'),
      quoteIds: [],
      timeCheckNote: '1858년 10월 15일 제7차 앨턴 토론 직후의 시점입니다. 학술 아카이브 보조 사료로 1858년 분열된 집 연설과 앨턴·오타와 토론 기록이 함께 연결됩니다.',
      preferredArchiveIds: ['archive-house-divided-1858', 'archive-ottawa-debate-1858', 'archive-alton-debate-1858'],
    };
  }

  if (preset.id === '1861-03' && /간섭|존재하는 주|제도|위선|남부|취임|원칙/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '제1차 취임사에서 분명히 밝혔듯이, 나는 노예제가 이미 존재하는 주에서 그 제도에 직접적으로든 간접적으로든 간섭할 의도가 없소.',
        '내게는 그러한 간섭을 할 헌법상 권한도 없고 그런 성향도 없음을 거듭 확인했소. 다만 연방 자체는 영구하며 헌법과 법률은 지켜져야 하오.',
      ], '어느 한 주가 자기 뜻대로 연방 계약을 일방적으로 파기할 수 있다면 그것은 정부가 아니라 무정부 상태에 불과할 것이오. 나는 내전이라는 비극을 먼저 일으키지 않겠으나, 하늘에 맹세한 헌법 수호의 책무만큼은 결코 포기할 수 없소.'),
      quoteIds: ['q-first-inaugural'],
      timeCheckNote: '1861년 3월 4일 제1차 취임사 직후 시점으로, 기존 노예제 주에 대한 불간섭 약속과 연방 보전의 헌법적 근거를 다룹니다.',
    };
  }

  if (preset.id === '1862-08' && /개인적 소망|자유|다른가요|위선|새끼|그따위|직무|관계/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '나의 태도가 모순되거나 미온적이라고 비판하는 이들이 많다는 것을 잘 알고 있소. 그러나 대통령으로서 내가 수행해야 할 공적 직무의 최우선 목표는 헌법에 따라 연방을 구하는 것이며, 노예제를 살리거나 없애는 것 자체가 아니오.',
        '다만 공적 직무에 따른 원칙을 그렇게 밝혔다고 해서, 어디서나 모든 사람이 자유롭기를 바란다고 거듭 밝혀 온 나의 개인적 소망까지 바꾼 것은 결코 아니오.',
      ], '개인의 도덕적 소망을 대통령의 헌법적 권한 위에 곧바로 앞세울 수는 없으나, 만약 연방을 구하기 위해 군사적으로 새로운 결단이 꼭 필요한 시점이 온다면 나는 그 책임을 피하지 않을 것이오.'),
      quoteIds: ['q-greeley-duty', 'q-greeley-wish'],
      timeCheckNote: '1862년 8월 22일 그릴리 서한의 핵심인 공적 직무(official duty)와 개인적 소망(personal wish)의 구별을 보여 줍니다.',
    };
  }

  if (preset.id === '1863-01' && /군 복무|군대|흑인|병사|경계|위선|새끼|즉시|모든 노예/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '경계 주의 노예가 제외된 것을 두고 위선이라 비판할 수 있으나, 1863년 1월 1일 노예 해방 선언은 헌법상 군 통수권자로서 현재 연방에 맞서 무장 반란 상태에 있는 지정 지역에 내린 전시 군사 조치요. 반란 상태가 아닌 충성파 경계 주에는 전시 군사 명령을 그대로 적용할 헌법적 권한이 없었소.',
        '아울러 이번 선언에는 해방된 사람들 가운데 적합한 조건을 갖춘 이들을 미합중국 육군과 해군 복무에 받아들여 요새를 수비하고 군함에 승선하도록 한다는 조항을 명시했소.',
      ], '비록 법적 형식은 전시 군사 조치로 출발했으나, 스스로 자유를 위해 총을 든 흑인 병사들의 헌신은 앞으로 연방 시민들이 자유의 자격을 바라보는 시선을 근본부터 바꾸어 놓을 것이라 믿소.'),
      quoteIds: ['q-emancipation-service'],
      timeCheckNote: '1863년 1월 1일 해방 선언의 헌법적·군사적 성격(경계 주 제외 이유)과 흑인 군 복무 허용 조항을 다룹니다.',
    };
  }

  if (preset.id === '1865-04' && /수정헌법|13조|비준|재건|복귀|위선|흑인|참정권/u.test(q)) {
    return {
      paragraphs: addImaginativeTail([
        '전시 군사 조치였던 해방 선언의 법적 한계를 넘어 미국 전역에서 노예제를 영구히 끝내기 위해, 지난 1865년 1월 말 연방 의회에서 수정헌법 제13조안이 통과되어 현재 각 주의 비준 절차가 진행 중이오. 다만 1865년 4월 14일 오전 현재 아직 전체 주의 최종 비준이 끝난 것은 아니오.',
        '전후 남부 주들의 연방 복귀와 관련해서는 사흘 전인 4월 11일 공개 연설에서 루이지애나 재건 정부 문제와 함께, 연방을 위해 군인으로 복무한 흑인 등에게 참정권을 부여하는 방안을 지지한다고 밝힌 바 있소.',
      ], '완벽한 재건 설계도를 단번에 강요하기보다, 달걀을 깨뜨리지 않고 병아리를 부화시키듯 이미 세워진 충성파 주 정부들을 격려하며 자유민의 교육과 권리를 현실 속에서 넓혀 가는 편이 더 빠른 회복의 길이라 생각하오.'),
      quoteIds: [],
      timeCheckNote: '1865년 4월 14일 오전 시점입니다. 수정헌법 제13조의 의회 통과(1865.1)와 최종 비준 완료(1865.12, 사후)를 구별하며 4월 11일 마지막 연설의 참정권 언급을 연결합니다.',
      preferredArchiveIds: ['archive-second-inaugural-1865', 'archive-last-public-address-1865'],
    };
  }

  // 등록 사료 외 일반/가상 질문 ("역사적으로 있을 법한 프롬프트") 분기: 엄격 고증 vs 역사적 상상력의 극명한 대비!
  if (stance === 'imaginative') {
    return {
      paragraphs: IMAGINATIVE_PLAUSIBLE_LINES[preset.id] || [defaultLines[preset.id]],
      quoteIds: defaultQuote ? [defaultQuote.id] : [],
      timeCheckNote: `${preset.label} · 역사적 상상력 모드: 직접 대응하는 전사문이 없는 질문에 대해 당대 링컨의 정치 철학과 시대 맥락으로 개연성 추론을 수행했습니다.`,
      customInterpretation: '질문하신 세부 주제는 기본 등록 전사문에 직접 수록되어 있지 않으나, 역사적 상상력 모드에 따라 해당 시점의 링컨이 지녔던 자유노동 이념·헌법 수호론·시대적 배경을 토대로 개연성 있는 1인칭 답변을 구성했습니다. 실제AI(live) 모드에서는 질문 맥락에 맞춰 더욱 정교한 맞춤형 추론 대사가 실시간 생성됩니다.',
      uncertaintyNote: `역사적 개연성 추론 포함 · 직접 대응 원문이 없는 주제이므로 ${preset.cutoffDate} 이전 링컨의 공적 철학에 비추어 재구성했습니다. ${preset.editorialWarning}`,
    };
  }

  return {
    paragraphs: [
      defaultLines[preset.id],
      '엄격 고증 모드에서는 현재 연결된 당대 사료로 직접 입증되지 않는 세부 상황이나 가상 대화를 임의로 추론해 덧붙이지 않소. 같은 질문을 역사적 상상력 모드로 전환해 물어보시면 당대 정치 철학에 기초한 개연성 추론 답변을 비교해 볼 수 있소.',
    ],
    quoteIds: defaultQuote ? [defaultQuote.id] : [],
    timeCheckNote: `${preset.label} · 엄격 고증 모드: 연결된 사료 범위를 벗어나는 추론을 절제하고 확인 가능한 사료 경계를 안내했습니다.`,
    customInterpretation: '엄격 고증 모드는 사료가 침묵하는 영역에서 AI가 임의로 대사를 부풀리지 않도록 제한합니다. 사료 외연의 개연성 추론을 체험하려면 질문창 상단에서 [역사적 상상력] 모드를 선택해 비교해 보세요.',
  };
}

export function demoAnswer(preset: Preset, question?: string, stance: Stance = 'strict'): Answer {
  const available = eligibleSources(preset);
  const latest = available.at(-1);
  const variant = selectDemoVariant(preset, question, stance);
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
    uncertainty: variant.uncertaintyNote || preset.editorialWarning,
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
    interpretations: variant.customInterpretation || (stance === 'imaginative'
      ? '위 대사는 사료 기반 원칙에 당대 시대 맥락의 개연성 추론(역사적 상상력 모드)을 결합한 연습 예시이며, 실제 링컨의 발언 기록이 아닙니다.'
      : '위 대사는 사료로 확인되는 범위만 절제해 구성한 엄격 고증 연습 예시이며, 실제 링컨의 발언 기록이 아닙니다.'),
    limitations: `${preset.editorialWarning} 번역은 검토 전 초안이며, 자동 해설은 역사학자의 검증 완료가 아닙니다.`,
    sourceIds: historianSourceIds,
  }, 'demo-fixed', { inputTokens: 0, outputTokens: 0 }, archiveEligible, stance);
}

export async function liveAnswer(
  preset: Preset,
  text: string,
  turns: Turn[],
  config: { key: string; model: string },
  signal: AbortSignal,
  stance: Stance = 'strict',
): Promise<Answer> {
  const archiveSources = await searchAcademicArchives(preset, text, signal);
  const allSources = [...SOURCES, ...archiveSources];
  const actorResponse = await generateJson({
    ...config,
    system: actorPrompt(preset, archiveSources, stance),
    prompt: text,
    history: buildHistory(turns),
    schema: ACTOR_JSON_SCHEMA,
    signal,
  });
  const actor = validateActor(actorResponse.output, preset, archiveSources);
  let historian: HistorianOutput | null = null;
  const usage = { ...actorResponse.usage };
  try {
    const response = await generateJson({
      ...config,
      system: historianPrompt(stance),
      prompt: historianData(preset, text, actor, allSources, stance),
      schema: HISTORIAN_JSON_SCHEMA,
      signal,
    });
    usage.inputTokens += response.usage.inputTokens; usage.outputTokens += response.usage.outputTokens;
    const parsed = historianSchema.safeParse(response.output);
    if (!parsed.success || parsed.data.sourceIds.some(id => !allSources.some(s => s.id === id))) throw new AppError('INVALID_MODEL_OUTPUT', 502);
    historian = parsed.data;
  } catch {
    // 배우 단계가 통과해도 역사 해설 실패를 숨기지 않는다. 검증 완료 배지를 붙이지 않는다.
    historian = null;
  }
  return assemble('live', preset, actor, historian, config.model, usage, archiveSources, stance);
}
