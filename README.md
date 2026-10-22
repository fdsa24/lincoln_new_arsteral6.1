# Lincoln History Lab — V5 입문판

**Windows에서 처음 개발하는 역사교육 전공자를 위한 Next.js 프로젝트입니다.**
처음에는 비용 없는 고정 예시 모드로 실행하고, 준비된 뒤 Gemini + PostgreSQL에 연결합니다.

> 코드가 들어 있는 실행용 프로젝트이지, 이미 배포된 웹사이트가 아닙니다.
> 생성 환경에서 수행한 검사와 미실행 검사는 `VERIFICATION.md`에 구별되어 있습니다.
> `START_HERE.html`을 Windows에서 더블클릭하면 클릭 순서 안내가 브라우저에서 열립니다.

## 1. 처음 실행 — Codespaces 터미널에 한 줄씩

```bash
npm install
npm run setup
npm run check
npm run dev
```

- 처음 세 명령은 완료된 뒤 다음 명령을 입력합니다.
- `npm run check`가 실패하면 실제 오류를 해결한 뒤 진행하세요. 빨간 경고를 숨기거나 검사를 끄지 마세요.
- 마지막 명령은 서버가 켜져 있는 동안 종료되지 않는 것이 정상입니다.
- **PORTS → 3000 → Open in Browser**. Codespaces 주소로 열고 Port Visibility는 **Private**로 유지합니다.
- Codespaces 터미널은 브라우저 속 Linux 터미널입니다. Windows PowerShell에 위 명령을 입력하는 단계가 아닙니다.
- `npm install`이 실제 `package-lock.json`을 생성합니다. 생성된 파일을 GitHub에 커밋해야 전이 의존성이 고정됩니다.
- 이 패키지는 설치 도구를 실행하지 못한 상태에서 잠금 파일을 꾸며 넣지 않았습니다.

## 2. 구현 범위

| 기능 | 연습 모드 | 실제 모드 |
|---|---|---|
| 시점 5개, 별도 대화방, 삭제 | 가능 | 가능 |
| 질문을 분석하는 AI | 없음: 시점별 고정 예시 | Gemini 서버 호출 |
| 저장 | 서버 메모리, 재시작하면 사라짐 | PostgreSQL |
| 소유자 구별 | HttpOnly 무작위 쿠키 | 같은 방식 + 수업 입장 코드 |
| 역사 해설 | 고정 안내 | 배우와 별도 모델 호출 |
| 출처 | 등록 발췌만 | 모델이 선택한 등록 ID를 서버가 검사 |
| 사용량 제한 | 단일 프로세스 연습용 | DB 원자적 카운터, 여러 인스턴스 공유 |
| 보존 | 최대 7일, 메모리 생존 동안 | 7일 후 접근 만료; 물리 삭제는 정리 명령 필요 |

이 버전의 사료는 **3개 문서의 발췌, 4개 인용**입니다. 1858년 및 1865년의 세밀한 재현에 필요한 자료는 부족합니다.
영어 발췌는 공개 전사문에 맞추었지만 원본 이미지·이본·역사학자 검토는 미완료이며, 한국어 번역은 **초안**입니다.
일반 대사는 AI 또는 데모 작성자가 만든 창작문입니다. 출처가 연결되었다고 모든 문장이 검증되는 것은 아닙니다.

## 3. 실제 AI 연결

자세한 클릭 순서는 `docs/02-LIVE-MODE.md`를 참고하세요.
`.env.local`만 수정하며 **API 키나 DB 비밀번호를 채팅, 공개 저장소, 스크린샷에 넣지 마세요.**

1. Google AI Studio에서 API 키와 사용 가능한 모델을 확인합니다.
2. 관리형 PostgreSQL의 빈 개발용 DB와 연결 문자열을 준비합니다.
3. `.env.local`의 `GEMINI_API_KEY`, `DATABASE_URL`을 채웁니다.
4. 최초 `npm run setup`에서 생성한 `CLASSROOM_CODE`를 유지하거나 32자 이상 무작위 코드로 교체합니다.
5. `npm run db:setup` 실행 후 `APP_MODE=live`로 바꿉니다.
6. 서버를 Ctrl+C로 중지한 뒤 `npm run dev`로 다시 시작합니다.
7. 접속 화면에는 **수업 입장 코드**를 넣습니다. API 키를 넣지 않습니다.

Gemini 모델 기본값은 `gemini-3.8-flash`입니다(경량 모델로 `gemini-3.5-flash-lite` 등도 사용 가능). 계정의 제공 모델·요금·수명은 바뀔 수 있습니다.
이 프로젝트는 REST `generateContent`의 구조화 JSON 출력을 사용하며, 모델/API의 실호출 호환성은 사용자 환경에서 확인해야 합니다.
모델을 바꾸면 구조화 출력·응답 길이·처리 시간을 다시 시험해야 합니다.

## 4. 개발자가 알아둘 구조

- `src/components/ChatApp.tsx`: 대화 UI, 이전 요청 취소·무효화, 시점별 방 전환
- `src/lib/catalog.ts`: 서버가 사용하는 시점·문서·인용 목록
- `src/lib/core.ts`: 입력·출력·본문 크기 검증, 성공한 대화 쌍의 문맥 구성
- `src/lib/server/prompts.ts`: 링컨과 현대 해설의 서로 다른 프롬프트
- `src/lib/server/provider.ts`: 서버 Gemini REST 호출, 안전 차단·빈 응답·타임아웃 처리
- `src/lib/server/generation.ts`: 생성 순서, 인용 ID 검사 및 서버 인용 삽입
- `src/lib/server/memory-store.ts`: 무료 연습 저장소
- `src/lib/server/postgres-store.ts`: SQL 저장소, 소유권·멱등 요청·세션 잠금·공유 사용량 제한
- `src/lib/server/http.ts`: 출처(Origin) 검사, 소유자 쿠키, 입장 코드, 안전한 오류 응답
- `src/app/api/sessions/**`: API
- `db/001_initial.sql`: 실제 DB 초기 스키마
- `tests/`, `e2e/`: 단위·DB·브라우저 시험
- `.github/workflows/ci.yml`: 키 없이 실행하는 CI

## 5. API

모든 응답은 `Cache-Control: no-store`입니다. 실제 모드는 `x-classroom-code`가 필요합니다.
변경 요청은 허용된 Origin과 소유자 쿠키가 필요합니다.

| 요청 | 본문 / 결과 |
|---|---|
| GET `/api/sessions` | 소유자 쿠키 설정, 본인의 대화방 목록 |
| POST `/api/sessions` | `{presetId}` → 서버가 고정 시점 스냅샷을 저장 |
| GET `/api/sessions/:id` | 본인의 방·질문·응답 |
| POST `/api/sessions/:id/messages` | `{clientRequestId, text}` → 생성된 턴 |
| DELETE `/api/sessions/:id` | 본인의 방과 턴 삭제 |

클라이언트는 날짜·문체 지시·모델 대화 기록을 제출할 수 없습니다. `clientRequestId`는 UUID입니다.
같은 ID+본문의 완료 요청은 저장된 결과를 돌려주고, 다른 본문은 409입니다.
실패·만료된 같은 요청도 재생성하지 않습니다. 사용자가 새 요청으로 명시적으로 제출해야 합니다.

## 6. 시험 명령

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:db
npx playwright install chromium
npm run test:e2e
```

- 단위 시험: 입력 위조, 날짜, 출처, 해설 문맥 분리, 후보 차단, 중복·동시 생성 등.
- DB 시험: `TEST_DATABASE_URL`이 없으면 **건너뜀**. DB 이름은 `_test`로 끝나야 합니다. 운영 DB는 사용하지 마세요.
- 브라우저 시험: 먼저 build가 필요하며, 3000 포트의 개발 서버는 Ctrl+C로 중지해야 합니다.
- 실제 Gemini 호출은 CI에 넣지 않았습니다. 테스트가 통과해도 AI의 역사적 정확성은 별도 평가가 필요합니다.

## 7. 인터넷 공개 전

이 패키지는 **제한된 사용자 시험용 MVP**입니다. 무제한 공개 서비스의 운영 준비 완료를 뜻하지 않습니다.
수업 코드가 공유되면 코드 보유자는 새 쿠키로 사용자별 제한을 우회할 수 있으나 DB 글로벌 시도 상한은 공유됩니다.
기관용 계정·인증·WAF/IP 제한·금액 기반 예산 차단·알림·백업·자동 물리 삭제 작업은 별도입니다.
CSP에는 Next.js 인라인 스크립트 때문에 `unsafe-inline`이 포함되어 있으며 nonce 기반 엄격 CSP가 아닙니다.
최초 패키지 잠금 생성, CI 통과, 라이브 스모크 테스트, 번역·사료 검토 후 공개 범위를 결정하세요.

배포·롤백: `docs/03-DEPLOYMENT.md` / 구조·한계: `docs/ARCHITECTURE.md`.

## 8. 사용 종료

1. GitHub에 변경을 커밋·푸시하여 보관합니다. `.env.local`은 제외합니다.
2. https://github.com/codespaces → 해당 작업실의 `…` → **Stop codespace**.
3. 탭을 닫기만 했다고 즉시 정지되지는 않습니다. 정지 중에도 저장 공간 사용량은 남습니다.
4. 요금·무료 사용량은 계정의 Billing/사용량 화면에서 확인하세요.
