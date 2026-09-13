'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DEFAULT_PRESET, PRESETS } from '@/lib/catalog';
import { messageFor } from '@/lib/errors';
import type { ChatSession, Mode, Preset, SessionView, Turn } from '@/lib/types';

async function request<T>(path: string, code: string, signal: AbortSignal, method = 'GET', body?: unknown): Promise<T> {
  const response = await fetch(path, { method, signal, cache: 'no-store', credentials: 'same-origin',
    headers: { ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}), ...(code ? { 'x-classroom-code': code } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || '서버 통신 중 오류가 발생했습니다.');
  return data as T;
}
function TurnCard({ turn, preset }: { turn: Turn; preset: Preset }) {
  const answer = turn.answer;
  return <article className="turn">
    <div className="user-bubble"><span className="eyebrow">나의 질문</span><p>{turn.text}</p></div>
    {turn.state === 'pending' && <p className="notice">서버에서 처리 중입니다. 잠시 후 ‘대화 다시 불러오기’를 누르세요.</p>}
    {(turn.state === 'failed' || turn.state === 'blocked') && <p className="error" role="status">{messageFor(turn.errorCode || 'INTERNAL_ERROR')}</p>}
    {answer && <div className="answer-card">
      <div className="answer-heading"><span className="badge">{answer.mode === 'demo' ? '고정 연습 예시' : 'AI 생성 대사 · 실제 발언 아님'}</span><span>{preset.cutoffDate}</span></div>
      <h3>링컨의 관점에서</h3>
      {answer.actor.paragraphs.map((p,i) => <p className="dialogue" key={i}>{p}</p>)}
      {answer.actor.uncertainty && <p className="limitation">재현의 한계 · {answer.actor.uncertainty}</p>}
      {answer.quotes.map(q => <section className="quote-card" key={q.id} aria-label="등록 사료 인용">
        <strong>등록 원문 발췌 · {q.source.title}</strong>
        <blockquote lang="en">{q.original}</blockquote>
        <p><span className="small-label">한국어 번역 초안 · 미검토</span>{q.koreanDraft}</p>
        <a href={q.source.url} target="_blank" rel="noopener noreferrer">전사문 출처 열기 ↗</a>
      </section>)}
      <details className="historian" open>
        <summary>현대 역사 해설 <span>AI 자동 검토 · 전문가 검증 아님</span></summary>
        {answer.historian ? <dl>
          <dt>시점 검토</dt><dd>{answer.historian.timeCheck}</dd>
          <dt>자료로 확인할 사실</dt><dd>{answer.historian.facts}</dd>
          <dt>해석과 추론</dt><dd>{answer.historian.interpretations}</dd>
          <dt>미확인·제한 사항</dt><dd>{answer.historian.limitations}</dd>
        </dl> : <p className="notice">현대 해설 생성에 실패했습니다. 위 대사가 역사 검증을 통과했다는 뜻은 아닙니다.</p>}
      </details>
      {answer.sources.length > 0 && <details className="source-list"><summary>연결된 자료 {answer.sources.length}건 · 전체 대사의 정확성을 보증하지 않음</summary>
        <ul>{answer.sources.map(s => <li key={s.id}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title} ({s.documentDate}) ↗</a><p>{s.locator}</p><p>{s.review}</p></li>)}</ul>
      </details>}
    </div>}
  </article>;
}
export default function ChatApp({ mode }: { mode: Mode }) {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [view, setView] = useState<SessionView | null>(null);
  const [input, setInput] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [unlocked, setUnlocked] = useState(mode === 'demo');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [pendingText, setPendingText] = useState('');
  const [pendingPreset, setPendingPreset] = useState<Preset | null>(null);
  const active = useRef<AbortController | null>(null);
  const access = useRef('');
  const bottom = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const cancelButton = useRef<HTMLButtonElement>(null);

  const begin = useCallback(() => {
    active.current?.abort();
    const c = new AbortController(); active.current = c;
    setBusy(true); setError(''); setPendingText('');
    return c;
  }, []);
  const current = (c: AbortController) => active.current === c && !c.signal.aborted;
  const finish = useCallback((c: AbortController) => {
    if (active.current === c) { active.current = null; setBusy(false); setPendingText(''); }
  }, []);
  const initialize = useCallback(async (code: string) => {
    const c = begin(); access.current = code;
    try {
      const list = await request<{ sessions: ChatSession[] }>('/api/sessions', code, c.signal);
      let selected = list.sessions[0];
      if (!selected) {
        selected = (await request<{ session: ChatSession }>('/api/sessions', code, c.signal, 'POST', { presetId: DEFAULT_PRESET })).session;
        list.sessions.unshift(selected);
      }
      const data = await request<SessionView>(`/api/sessions/${selected.id}`, code, c.signal);
      if (active.current !== c || c.signal.aborted) return;
      setSessions(list.sessions); setView(data); setUnlocked(true);
    } catch (e) { if (active.current === c && !c.signal.aborted) setError(e instanceof Error ? e.message : '연결 오류'); }
    finally { finish(c); }
  }, [begin, finish]);
  useEffect(() => {
    if (mode === 'demo') void initialize('');
    return () => { active.current?.abort(); active.current = null; };
  }, [mode, initialize]);
  useEffect(() => { bottom.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }); }, [view?.turns.length, busy]);
  useEffect(() => {
    if (pendingPreset && dialog.current && !dialog.current.open) { dialog.current.showModal(); cancelButton.current?.focus(); }
    if (!pendingPreset && dialog.current?.open) dialog.current.close();
  }, [pendingPreset]);

  async function openSession(id: string) {
    const c = begin();
    try {
      const data = await request<SessionView>(`/api/sessions/${id}`, access.current, c.signal);
      if (current(c)) { setView(data); setInput(''); }
    } catch (e) { if (current(c)) setError(e instanceof Error ? e.message : '연결 오류'); }
    finally { finish(c); }
  }
  async function createSession(preset: Preset) {
    setPendingPreset(null);
    const c = begin();
    try {
      const data = await request<{ session: ChatSession }>('/api/sessions', access.current, c.signal, 'POST', { presetId: preset.id });
      if (!current(c)) return;
      setView({ session: data.session, turns: [] }); setSessions(prev => [data.session, ...prev]); setInput('');
    } catch (e) { if (current(c)) setError(e instanceof Error ? e.message : '연결 오류'); }
    finally { finish(c); }
  }
  async function deleteSession() {
    if (!view || !window.confirm('이 대화방과 질문·응답을 삭제할까요? 되돌릴 수 없습니다.')) return;
    const id = view.session.id;
    const c = begin();
    try {
      await request(`/api/sessions/${id}`, access.current, c.signal, 'DELETE');
      if (!current(c)) return;
      setSessions(prev => prev.filter(s => s.id !== id)); setView(null); setInput('');
    } catch (e) { if (current(c)) setError(e instanceof Error ? e.message : '연결 오류'); }
    finally { finish(c); }
  }
  async function send() {
    const text = input.trim();
    if (!view || !text || active.current) return;
    const sessionId = view.session.id;
    const c = begin(); setPendingText(text); setInput('');
    try {
      const data = await request<{ turn: Turn }>(`/api/sessions/${sessionId}/messages`, access.current, c.signal, 'POST', { clientRequestId: crypto.randomUUID(), text });
      if (!current(c)) return;
      setView(prev => prev?.session.id === sessionId ? { ...prev, turns: [...prev.turns.filter(t => t.id !== data.turn.id), data.turn] } : prev);
    } catch (e) {
      if (current(c)) { setError(e instanceof Error ? e.message : '연결 오류'); setInput(text); }
    } finally { finish(c); }
  }
  function cancelRequest() {
    const c = active.current; active.current = null; c?.abort(); setBusy(false); setPendingText('');
    setError('화면의 대기를 중지했습니다. 서버 처리·과금까지 취소되었다는 뜻은 아닙니다. 대화를 다시 불러와 확인하세요.');
  }
  return <div className="shell">
    <a className="skip-link" href="#question">질문 입력으로 이동</a>
    <header className="topbar"><div><p className="brand-kicker">HISTORY / EVIDENCE / DIALOGUE</p><h1>Lincoln History Lab</h1><p>링컨의 시대를 묻고, 사료로 다시 읽기</p></div><span className={`mode-badge ${mode}`}>{mode === 'demo' ? '연습 모드 · AI 호출 없음' : '실제 AI 모드 · 이용 비용 발생 가능'}</span></header>
    <div className="intro-strip"><strong>역사 시뮬레이션, 실제 인물의 답변이 아닙니다.</strong><span>생성 대사 · 원문 발췌 · 번역 초안 · 현대 해설을 구별해 읽으세요.</span></div>
    {mode === 'demo' && <p className="demo-warning">연습 모드는 질문을 분석하지 않고 시점별 고정 예시를 보여 줍니다. 대화는 서버 메모리에 임시 보관되며 서버 재시작·만료 시 사라질 수 있습니다.</p>}
    {!unlocked && <form className="unlock" onSubmit={e => { e.preventDefault(); void initialize(codeInput.trim()); }}><h2>수업 입장 코드</h2><p>운영자가 설정한 코드를 입력하세요. Gemini API 키를 입력하는 칸이 아닙니다.</p><label htmlFor="class-code">입장 코드</label><input id="class-code" type="password" autoComplete="off" value={codeInput} maxLength={256} onChange={e => setCodeInput(e.target.value)} /><button disabled={busy || !codeInput.trim()}>입장</button></form>}
    {error && <div className="error global-error" role="alert">{error}{view && <button onClick={() => void openSession(view.session.id)}>대화 다시 불러오기</button>}{!view && unlocked && <button onClick={() => void initialize(access.current)}>연결 다시 시도</button>}</div>}
    {unlocked && <div className="workspace">
      <aside className="sidebar"><h2>역사적 시점</h2><label htmlFor="timeline">새 대화의 날짜</label><select id="timeline" value={view?.session.preset.id || DEFAULT_PRESET} onChange={e => { const p = PRESETS.find(p => p.id === e.target.value); if (p) setPendingPreset(p); }}>{PRESETS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}</select>
        <button className="outline full" onClick={() => setPendingPreset(view?.session.preset || PRESETS[3])}>이 시점으로 새 대화</button>
        <div className="sidebar-divider"/><h2>내 대화방 <span>{sessions.length}/10</span></h2><p className="muted">이 브라우저의 소유자 쿠키로 구별합니다. 쿠키를 지우면 다시 찾을 수 없습니다.</p>
        <ul className="session-list">{sessions.map(s => <li key={s.id}><button className={view?.session.id === s.id ? 'selected' : ''} onClick={() => void openSession(s.id)}><span>{s.preset.label}</span><small>{new Date(s.createdAt).toLocaleString('ko-KR')}</small></button></li>)}</ul>
        <p className="muted">최대 7일 후 만료 · 방당 100개 질문<br/>개인정보·학생 이름을 입력하지 마세요.</p>
      </aside>
      <main className="chat-panel" aria-label="역사 대화">
        {view ? <><div className="chat-toolbar"><div><span className="eyebrow">현재 고정된 시점</span><h2>{view.session.preset.label}</h2><p>{view.session.preset.office}</p></div><button className="text-button" onClick={() => void deleteSession()}>대화 삭제</button></div>
          <div className="conversation" aria-busy={busy}>
            {view.turns.length === 0 && <section className="welcome"><span className="welcome-number">01 — ASK THE PAST</span><h2>같은 질문도,<br/>다른 시점에서 살펴보세요.</h2><p>예시 질문을 눌러 시작할 수 있습니다.</p><div className="suggestions">{['노예 해방 선언은 모든 노예를 즉시 해방했나요?','연방 보존과 노예 해방은 어떤 관계인가요?','이 시점에서 무엇을 알 수 없나요?'].map(q => <button key={q} onClick={() => setInput(q)}>{q}</button>)}</div><p className="limitation">{view.session.preset.editorialWarning}</p></section>}
            {view.turns.map(t => <TurnCard key={t.id} turn={t} preset={view.session.preset} />)}
            {busy && <div className="loading" role="status"><span className="spinner"/>{pendingText ? '답변을 준비하고 있습니다…' : '대화를 불러오고 있습니다…'}{pendingText && <p>보낸 질문: {pendingText}</p>}<button onClick={cancelRequest}>대기 중지</button></div>}
            <div ref={bottom}/>
          </div>
          <form className="composer" onSubmit={e => { e.preventDefault(); void send(); }}><label htmlFor="question">링컨에게 질문하기</label><textarea id="question" placeholder="사료와 당시의 관점을 물어보세요." value={input} maxLength={4000} rows={3} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (!e.nativeEvent.isComposing && e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void send(); } }}/><div><small>{input.length}/4,000 · Enter 전송 / Shift+Enter 줄바꿈</small><button type="submit" disabled={busy || !input.trim()}>질문 보내기</button></div></form>
        </> : <div className="welcome"><h2>대화를 선택하거나 새로 만들어 주세요.</h2><button disabled={busy} onClick={() => void createSession(PRESETS[3])}>1863년 연습 대화 만들기</button></div>}
      </main>
    </div>}
    <footer>V5 입문판 · 자유 생성의 오류와 시대착오를 완전히 차단하지 못합니다. 공개 수업 전 사료·번역·개인정보·이용 연령 조건을 검토하세요.</footer>
    <dialog ref={dialog} className="timeline-dialog" aria-labelledby="dialog-title" onCancel={e => { e.preventDefault(); setPendingPreset(null); }}><h2 id="dialog-title">새로운 시점으로 대화할까요?</h2><p>{pendingPreset?.label}</p><p>기존 대화는 보존됩니다. 진행 중인 요청의 화면 대기는 중지되며, 이전 응답은 새 대화에 섞이지 않습니다.</p><div><button ref={cancelButton} className="outline" onClick={() => setPendingPreset(null)}>취소</button><button onClick={() => { if (pendingPreset) void createSession(pendingPreset); }}>새 대화 만들기</button></div></dialog>
  </div>;
}
