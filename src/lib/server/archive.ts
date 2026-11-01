import { isHttpsSource } from '../core';
import type { Preset, Source } from '../types';

export const TRUSTED_ACADEMIC_HOSTS = new Set([
  'www.loc.gov',
  'loc.gov',
  'www.archives.gov',
  'archives.gov',
  'founders.archives.gov',
  'www.nps.gov',
  'nps.gov',
  'housedivided.dickinson.edu',
  'avalon.law.yale.edu',
  'quod.lib.umich.edu',
]);

export function isTrustedAcademicUrl(value: string): boolean {
  if (!isHttpsSource(value)) return false;
  try {
    const host = new URL(value).hostname.toLowerCase();
    return TRUSTED_ACADEMIC_HOSTS.has(host);
  } catch {
    return false;
  }
}

export const CURATED_ARCHIVE_POOL: Source[] = [
  {
    id: 'archive-dred-scott-1857',
    title: '[학술 아카이브] 드레드 스콧 판결 반박 연설 (Speech on the Dred Scott Decision)',
    documentDate: '1857-06-26',
    availableFrom: '1857-06-26',
    url: 'https://www.nps.gov/liho/learn/historyculture/dredscott.htm',
    locator: '미 국립공원관리청(NPS) Lincoln Home 전사문 · counterfeit logic 반박 문단',
    kind: 'archive-search',
    review: '신뢰된 공공 역사 아카이브(nps.gov) 자동 색인 사료. 전문 번역 및 인간 연구자 대조 미완료.',
    excerpt: 'I protest against that counterfeit logic which concludes that, because I do not want a black woman for a slave I must necessarily want her for a wife. I need not have her for either, I can just leave her alone. In some respects she certainly is not my equal; but in her natural right to eat the bread she earns with her own hands without asking leave of any one else, she is my equal, and the equal of all others.',
    context: '1857년 6월 26일 스프링필드 연설로, 노예제 반대자를 인종 혼합론자라며 원색적으로 비난하던 반대파의 흑색선전을 거짓된 궤변(counterfeit logic)이라고 정면 반박하며 흑인의 자연권을 옹호한 사료다.',
  },
  {
    id: 'archive-house-divided-1858',
    title: '[학술 아카이브] 분열된 집 연설 (House Divided Speech)',
    documentDate: '1858-06-16',
    availableFrom: '1858-06-16',
    url: 'https://www.nps.gov/liho/learn/historyculture/housedivided.htm',
    locator: '미 국립공원관리청(NPS) Lincoln Home 공개 전사문 · 서두 문단',
    kind: 'archive-search',
    review: '신뢰된 공공 역사 아카이브(nps.gov) 자동 색인 사료. 전문 번역 및 인간 연구자 대조 미완료.',
    excerpt: 'A house divided against itself cannot stand. I believe this government cannot endure, permanently half slave and half free. I do not expect the Union to be dissolved, I do not expect the house to fall, but I do expect it will cease to be divided.',
    context: '1858년 6월 일리노이 공화당 주 전당대회에서 상원의원 후보 지명을 수락하며 노예제 확산 저지 입장을 밝힌 연설이다.',
  },
  {
    id: 'archive-ottawa-debate-1858',
    title: '[학술 아카이브] 링컨-더글러스 제1차 합동 토론 (Ottawa Debate)',
    documentDate: '1858-08-21',
    availableFrom: '1858-08-21',
    url: 'https://www.nps.gov/liho/learn/historyculture/ottawa.htm',
    locator: '미 국립공원관리청(NPS) Lincoln-Douglas Debates 전사문 · 제1차 오타와 토론 링컨 답변부',
    kind: 'archive-search',
    review: '신뢰된 공공 역사 아카이브(nps.gov) 자동 색인 사료. 전문 번역 및 인간 연구자 대조 미완료.',
    excerpt: 'There is no reason in the world why the negro is not entitled to all the natural rights enumerated in the Declaration of Independence, the right to life, liberty, and the pursuit of happiness. I hold that he is as much entitled to these as the white man.',
    context: '1858년 8월 21일 오타와 토론에서 더글러스 진영의 인종 비하 공세에 맞서, 당대 일리노이주의 사회적·정치적 평등에 대한 한계를 인정하면서도 독립선언서가 천명한 자연권만큼은 흑인에게도 동등하게 보장되어야 한다고 밝힌 사료다.',
  },
  {
    id: 'archive-alton-debate-1858',
    title: '[학술 아카이브] 링컨-더글러스 제7차 합동 토론 (Alton Debate)',
    documentDate: '1858-10-15',
    availableFrom: '1858-10-15',
    url: 'https://www.nps.gov/liho/learn/historyculture/alton.htm',
    locator: '미 국립공원관리청(NPS) Lincoln-Douglas Debates 전사문 · 링컨 발언부',
    kind: 'archive-search',
    review: '신뢰된 공공 역사 아카이브(nps.gov) 자동 색인 사료. 전문 번역 및 인간 연구자 대조 미완료.',
    excerpt: 'The real issue in this controversy, the one pressing upon every mind, is the sentiment on the part of one class that looks upon the institution of slavery as a wrong, and of another class that does not look upon it as a wrong.',
    context: '1858년 10월 15일 앨턴에서 열린 스티븐 더글러스와의 마지막 제7차 상원의원 선거 토론 기록이다.',
  },
  {
    id: 'archive-gettysburg-1863',
    title: '[학술 아카이브] 게티즈버그 연설 (Gettysburg Address, Nicolay Copy)',
    documentDate: '1863-11-19',
    availableFrom: '1863-11-19',
    url: 'https://www.loc.gov/exhibits/gettysburg-address/ext/trans-nicolay-copy.html',
    locator: '미 의회도서관(LOC) Gettysburg Address Exhibition · Nicolay Copy 전사문',
    kind: 'archive-search',
    review: '미 의회도서관(loc.gov) 학술 아카이브 색인 사료. 이본 대조 및 인간 연구자 검토 미완료.',
    excerpt: 'It is rather for us to be here dedicated to the great task remaining before us, that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion, that this nation, under God, shall have a new birth of freedom.',
    context: '1863년 11월 19일 국립 병사 묘지 봉헌식에서 연방 보존의 의미를 자유의 새로운 탄생과 연결한 연설이다.',
  },
  {
    id: 'archive-second-inaugural-1865',
    title: '[학술 아카이브] 제2차 취임사 (Second Inaugural Address)',
    documentDate: '1865-03-04',
    availableFrom: '1865-03-04',
    url: 'https://www.nps.gov/liho/learn/historyculture/secondinaugural.htm',
    locator: '미 국립공원관리청(NPS) Second Inaugural Address 전사문 · 마지막 문단',
    kind: 'archive-search',
    review: '신뢰된 공공 역사 아카이브(nps.gov) 자동 색인 사료. 인간 연구자 검토 미완료.',
    excerpt: 'With malice toward none; with charity for all; with firmness in the right, as God gives us to see the right, let us strive on to finish the work we are in; to bind up the nations wounds.',
    context: '1865년 3월 4일 전쟁 종결을 앞두고 노예제가 전쟁의 원인이었음을 짚으며 화해와 재건의 기조를 밝힌 취임사다.',
  },
  {
    id: 'archive-last-public-address-1865',
    title: '[학술 아카이브] 전후 재건에 관한 마지막 공개 연설 (Last Public Address)',
    documentDate: '1865-04-11',
    availableFrom: '1865-04-11',
    url: 'https://www.loc.gov/resource/mal.4361300/',
    locator: '미 의회도서관(LOC) Abraham Lincoln Papers · 1865-04-11 연설 원고',
    kind: 'archive-search',
    review: '미 의회도서관(loc.gov) 학술 아카이브 색인 사료. 인간 연구자 검토 미완료.',
    excerpt: 'It is also unsatisfactory to some that the elective franchise is not given to the colored man. I would myself prefer that it were now conferred on the very intelligent, and on those who serve our cause as soldiers.',
    context: '1865년 4월 11일 루이지애나 재건 정부 승인과 흑인 참전 군인 등에게 참정권을 부여하는 방안을 언급한 마지막 공개 연설이다.',
  },
];

const KEYWORD_MAP: Array<{ pattern: RegExp; query: string }> = [
  { pattern: /더글러스|토론|상원|일리노이|분열|확산|니그로|인종|혼혈|궤변|주장|1858/u, query: 'Stephen Douglas debate slavery negro equality Dred Scott Illinois' },
  { pattern: /취임|분리|남부|헌법|간섭|1861/u, query: 'inaugural secession Constitution Union' },
  { pattern: /그릴리|서한|편지|소망|직무|위선|1862/u, query: 'Horace Greeley Union slavery letter' },
  { pattern: /해방|선언|경계|군대|군 복무|흑인|병사|1863/u, query: 'Emancipation Proclamation colored troops military border states' },
  { pattern: /게티즈버그|추모|봉헌/u, query: 'Gettysburg Address dedication freedom' },
  { pattern: /재건|복귀|루이지애나|참정권|투표|수정헌법|13조|화해|1865/u, query: 'reconstruction Louisiana amendment suffrage amnesty' },
  { pattern: /인신보호|영장|계엄|체포/u, query: 'habeas corpus martial law arrest' },
];

export function buildArchiveQuery(question: string): string {
  const matched = KEYWORD_MAP.filter(k => k.pattern.test(question)).map(k => k.query);
  const englishTokens = (question.match(/[A-Za-z]{4,}/g) || []).slice(0, 4).join(' ');
  const combined = [...matched, englishTokens].filter(Boolean).join(' ').trim();
  return combined || 'Abraham Lincoln Union slavery constitution';
}

export function filterArchiveSourcesByCutoff(sources: Source[], preset: Preset): Source[] {
  return sources.filter(s =>
    /^\d{4}-\d{2}-\d{2}$/.test(s.documentDate) &&
    /^\d{4}-\d{2}-\d{2}$/.test(s.availableFrom) &&
    s.documentDate < preset.cutoffDate &&
    s.availableFrom < preset.cutoffDate &&
    isTrustedAcademicUrl(s.url)
  );
}

function sanitizeArchiveText(raw: string, maxLen = 420): string {
  return raw
    .replace(/["“”«»]/gu, "'")
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, maxLen);
}

interface LocApiItem {
  id?: string;
  url?: string;
  title?: string;
  date?: string;
  description?: string[];
}

export async function searchAcademicArchives(
  preset: Preset,
  question: string,
  signal: AbortSignal,
  fetcher: typeof fetch = fetch,
): Promise<Source[]> {
  const curatedEligible = filterArchiveSourcesByCutoff(CURATED_ARCHIVE_POOL, preset);
  if (process.env.ARCHIVE_SEARCH_ENABLED === 'false') {
    return curatedEligible.slice(0, 3);
  }

  const query = buildArchiveQuery(question);
  const dynamicSources: Source[] = [];
  try {
    const endpoint = `https://www.loc.gov/collections/abraham-lincoln-papers/?fo=json&c=5&q=${encodeURIComponent(query)}`;
    const timeoutSignal = AbortSignal.any([signal, AbortSignal.timeout(3800)]);
    const response = await fetcher(endpoint, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      signal: timeoutSignal,
      cache: 'no-store',
    });
    if (response.ok) {
      const data = (await response.json()) as { results?: LocApiItem[] };
      const results = Array.isArray(data?.results) ? data.results : [];
      for (const item of results) {
        const rawDate = typeof item.date === 'string' ? item.date.trim() : '';
        if (!/^\d{4}-\d{2}-\d{2}$/.test(rawDate)) continue;
        const rawUrl = typeof item.url === 'string' ? item.url.replace(/^http:\/\//i, 'https://') : typeof item.id === 'string' ? item.id.replace(/^http:\/\//i, 'https://') : '';
        if (!isTrustedAcademicUrl(rawUrl)) continue;
        const title = sanitizeArchiveText(typeof item.title === 'string' ? item.title : 'Abraham Lincoln Papers Document', 140);
        const desc = Array.isArray(item.description) && typeof item.description[0] === 'string'
          ? sanitizeArchiveText(item.description[0], 380)
          : `Library of Congress Abraham Lincoln Papers record (${rawDate}): ${title}`;
        if (!title || !desc) continue;
        const slug = rawUrl.replace(/[^a-zA-Z0-9]/g, '-').slice(-36).toLowerCase();
        dynamicSources.push({
          id: `loc-${rawDate}-${slug}`.slice(0, 64),
          title: `[미 의회도서관 LOC] ${title}`,
          documentDate: rawDate,
          availableFrom: rawDate,
          url: rawUrl,
          locator: 'Library of Congress · Abraham Lincoln Papers 공개 API 검색 레코드',
          kind: 'archive-search',
          review: '미 의회도서관(loc.gov) 학술 API 실시간 검색 결과. 시점(cutoffDate) 이전 문서 자동 필터링 완료, 인간 연구자 원문 대조 미완료.',
          excerpt: desc,
          context: '질문 키워드와 관련해 미 의회도서관(loc.gov)에서 실시간 검색된 당대 사료 메타데이터입니다. 등록 전사문(primary-transcript)과 구별하여 참고합니다.',
        });
      }
    }
  } catch {
    // 외부 학술 아카이브 네트워크 지연이나 오프라인 시에도 대화 흐름을 중단하지 않고 내장 학술 아카이브 풀로 폴백한다.
  }

  const verifiedDynamic = filterArchiveSourcesByCutoff(dynamicSources, preset);
  const merged = [...curatedEligible, ...verifiedDynamic];
  const seen = new Set<string>();
  const unique: Source[] = [];
  for (const s of merged) {
    if (seen.has(s.id) || seen.has(s.url)) continue;
    seen.add(s.id);
    seen.add(s.url);
    unique.push(s);
  }
  return unique.slice(-4);
}
