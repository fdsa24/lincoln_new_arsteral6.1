import type { Preset, Quote, Source } from './types';

export const PROMPT_VERSION = 'lincoln-v5-1';
export const SOURCE_VERSION = 'three-transcripts-starter-1';
export const PRESETS: Preset[] = [
  { id: '1858-10', label: '1858.10.16 · 상원의원 선거', cutoffDate: '1858-10-16',
    timePolicy: '1858년 10월 15일까지의 사건만 확정적으로 사용한다.',
    office: '일리노이 공화당 연방 상원의원 후보, 전 연방 하원의원',
    brief: '당시의 지위로 말한다. 대통령이라고 자신을 소개하지 않는다.',
    editorialWarning: '이 입문판에는 1858년 이전 원문 발췌가 아직 없습니다. 구체적인 입장 재현에는 사료 확충이 필요합니다.' },
  { id: '1861-03', label: '1861.03.05 · 취임 직후', cutoffDate: '1861-03-05',
    timePolicy: '1861년 3월 4일까지의 사건만 확정적으로 사용한다.',
    office: '미국 대통령', brief: '제1차 취임사의 연방 보존과 기존 노예제에 대한 간섭 부인 약속을 구별한다.',
    editorialWarning: '등록된 발췌는 제1차 취임사 일부입니다. 남부 분리 과정 전체를 검증하는 자료 묶음은 아닙니다.' },
  { id: '1862-08', label: '1862.08.23 · 그릴리 서한', cutoffDate: '1862-08-23',
    timePolicy: '1862년 8월 22일까지의 사건만 확정적으로 사용한다.',
    office: '미국 대통령', brief: '서한의 공적 직무상 목적과 개인적 소망을 구별한다. 사료 없이 내면이나 비밀 의도를 꾸미지 않는다.',
    editorialWarning: '그릴리 서한만으로 노예제에 대한 모든 입장과 정책 결정을 설명할 수는 없습니다.' },
  { id: '1863-01', label: '1863.01.02 · 해방 선언 직후', cutoffDate: '1863-01-02',
    timePolicy: '1863년 1월 1일까지의 사건만 확정적으로 사용한다.',
    office: '미국 대통령', brief: '해방 선언의 지정 지역, 예외 지역, 전쟁 조치의 성격을 구별한다. 미국 전체의 노예제가 즉시 폐지되었다고 말하지 않는다.',
    editorialWarning: '해방 선언의 실제 효력과 노예였던 사람들의 행위는 별도의 사료 검토가 필요합니다.' },
  { id: '1865-04', label: '1865.04.14 오전 · 재건 논의', cutoffDate: '1865-04-14',
    timePolicy: '1865년 4월 14일 오전의 인물이다. 확인된 사건 정보는 전날까지로 제한한다.',
    office: '미국 대통령', brief: '이후 사건을 알고 있거나 예언하는 표현을 피한다. 수정헌법 제13조의 의회 통과와 비준 완료를 혼동하지 않는다.',
    editorialWarning: '이 입문판에는 1865년 재건·참정권 관련 원문이 아직 없습니다. 해당 주제의 상세 재현은 제한됩니다.' },
];
export const DEFAULT_PRESET = '1863-01';
export const SOURCES: Source[] = [
  { id: 'first-inaugural', title: '제1차 취임사', documentDate: '1861-03-04', availableFrom: '1861-03-04',
    url: 'https://www.nps.gov/liho/learn/historyculture/firstinaugural.htm',
    locator: '본문 중 I have no purpose로 시작하는 인용 문장', kind: 'primary-transcript',
    review: '공개 전사문 발췌 대조. 원본 이미지·이본 대조 및 인간 연구자 검토는 미완료.',
    excerpt: 'I have no purpose, directly or indirectly, to interfere with the institution of slavery in the States where it exists.',
    context: '노예제가 존재하는 주에서의 간섭 부인 약속이다. 노예제 확산에 대한 모든 입장을 이 한 문장으로 환원하지 않는다.' },
  { id: 'greeley', title: '호러스 그릴리에게 보낸 서한', documentDate: '1862-08-22', availableFrom: '1862-08-22',
    url: 'https://housedivided.dickinson.edu/sites/lincoln/letter-to-horace-greeley-august-22-1862/',
    locator: 'Searchable Text, My paramount object 문장 및 마지막 문단', kind: 'primary-transcript',
    review: '대학 공개 전사문 발췌 대조. 원본 이미지·이본 대조 및 인간 연구자 검토는 미완료.',
    excerpt: 'My paramount object in this struggle is to save the Union, and is not either to save or to destroy slavery.\nI have here stated my purpose according to my view of official duty; and I intend no modification of my oft-expressed personal wish that all men every where could be free.',
    context: '공적 직무에 대한 설명과 모든 사람의 자유를 바라는 개인적 소망을 구분한다. 서한의 공개일과 작성일은 별개다.' },
  { id: 'emancipation', title: '노예 해방 선언', documentDate: '1863-01-01', availableFrom: '1863-01-01',
    url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation',
    locator: 'Transcript, And by virtue 문단 및 And I further declare 문단', kind: 'primary-transcript',
    review: '미 국립문서기록관리청 전사문 발췌 대조. 인간 연구자와 번역자의 검토는 미완료.',
    excerpt: 'And by virtue of the power, and for the purpose aforesaid, I do order and declare that all persons held as slaves within said designated States, and parts of States, are, and henceforward shall be free; and that the Executive government of the United States, including the military and naval authorities thereof, will recognize and maintain the freedom of said persons.\nAnd I further declare and make known, that such persons of suitable condition, will be received into the armed service of the United States to garrison forts, positions, stations, and other places, and to man vessels of all sorts in said service.',
    context: '본문은 반란 중인 지정 주와 주의 일부를 열거하고 예외 지역도 명시한다. 충성파 경계 주의 노예제는 이 선언으로 폐지되지 않았다. 자유의 실현은 군사적 진전에 의존했다.' },
];
export const QUOTES: Quote[] = [
  { id: 'q-first-inaugural', sourceId: 'first-inaugural',
    original: SOURCES[0].excerpt,
    koreanDraft: '나는 노예제가 존재하는 주에서 그 제도에 직접적으로든 간접적으로든 간섭할 의도가 없습니다.',
    translationStatus: 'draft', isExcerpt: true },
  { id: 'q-greeley-duty', sourceId: 'greeley',
    original: 'My paramount object in this struggle is to save the Union, and is not either to save or to destroy slavery.',
    koreanDraft: '이 투쟁에서 나의 가장 중요한 목적은 연방을 구하는 것이며, 노예제를 보존하거나 없애는 것 자체가 아닙니다.',
    translationStatus: 'draft', isExcerpt: true },
  { id: 'q-greeley-wish', sourceId: 'greeley',
    original: 'I have here stated my purpose according to my view of official duty; and I intend no modification of my oft-expressed personal wish that all men every where could be free.',
    koreanDraft: '여기서는 공적 직무에 대한 나의 견해에 따라 목적을 밝혔습니다. 어디서나 모든 사람이 자유롭기를 바란다고 거듭 표현해 온 개인적 소망을 바꾸려는 뜻은 없습니다.',
    translationStatus: 'draft', isExcerpt: true },
  { id: 'q-emancipation-service', sourceId: 'emancipation',
    original: 'And I further declare and make known, that such persons of suitable condition, will be received into the armed service of the United States to garrison forts, positions, stations, and other places, and to man vessels of all sorts in said service.',
    koreanDraft: '또한 적합한 조건을 갖춘 그러한 사람들을 미국의 군 복무에 받아들여 요새·진지·주둔지 등에서 복무하고 여러 종류의 군용 선박에 승선하게 할 것임을 선언합니다.',
    translationStatus: 'draft', isExcerpt: true },
];
export function findPreset(id: string): Preset | undefined { return PRESETS.find(p => p.id === id); }
export function eligibleSources(preset: Preset): Source[] {
  // 모든 시작 프리셋은 당일 사건을 제외한다. 날짜 문자열은 서버 상수의 ISO 형식이다.
  return SOURCES.filter(s => s.documentDate < preset.cutoffDate && s.availableFrom < preset.cutoffDate);
}
export function eligibleQuotes(preset: Preset): Quote[] {
  const ids = new Set(eligibleSources(preset).map(s => s.id));
  return QUOTES.filter(q => ids.has(q.sourceId));
}
