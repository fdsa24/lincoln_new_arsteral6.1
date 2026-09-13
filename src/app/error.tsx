'use client';
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="fatal"><h1>화면을 불러오지 못했습니다</h1><p>서버 설정과 터미널의 오류를 확인해 주세요. 오류를 공유할 때 키·비밀번호는 가려 주세요.</p><button onClick={reset}>다시 시도</button></main>;
}
