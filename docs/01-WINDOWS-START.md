# Windows + GitHub 계정: 처음 실행하기

## 오늘의 목표
링컨 대화 화면을 본인 브라우저에서 여는 것뿐입니다. API 키·신용카드·DB는 이 단계에 필요하지 않습니다.
단, Codespaces 무료 할당량은 계정별 제한이 있으므로 소진 여부와 지출 설정은 확인하세요.

### 1. 압축 풀기
다운로드한 ZIP을 Windows 파일 탐색기에서 오른쪽 클릭 → **모두 압축 풀기** → **압축 풀기**.
압축을 푼 폴더를 열어 README.md, package.json, src 폴더가 함께 보이는 위치로 들어가세요.
`START_HERE.html`을 더블클릭하면 이 안내의 요약이 브라우저에서 열립니다.

### 2. 새 GitHub 저장소 만들기
https://github.com/new → Repository name: **lincoln-v5** → **Private** → **Add a README file** 활성화 → **Create repository**.
기존 프로젝트를 덮어쓰지 않고 새 저장소를 사용합니다. 개인 계정을 Owner로 선택하세요.

### 3. 실제 코드 업로드
저장소 화면 **Add file → Upload files**.
Windows에서 package.json이 보이는 폴더 **안의 모든 파일과 폴더**를 선택(Ctrl+A)해 업로드 영역에 끌어다 놓으세요.
ZIP 자체나 그 바깥 부모 폴더를 올리는 것이 아닙니다.
업로드 목록에 `.github`, `.devcontainer`, `.env.example`, `.gitignore`도 들어갔는지 확인합니다.
하단 **Commit changes**. 기존에 만든 빈 README가 교체되는 것은 정상입니다.
저장소 첫 화면에 `package.json`과 `src`가 바로 보여야 합니다.
이 패키지에는 비밀키가 없습니다. 나중에 만들어지는 `.env.local`은 수동 업로드하지 마세요.

### 4. 브라우저 작업실 열기
저장소의 초록색 **Code → Codespaces → Create codespace on main**.
기계 크기를 고를 경우 2-core부터 사용합니다. 시작까지는 몇 분이 걸릴 수 있습니다.
화면 왼쪽에 파일 목록, 아래에 **TERMINAL**이 보이면 정상입니다.
터미널이 없다면 상단 **Terminal → New Terminal**. Windows PowerShell이 아닌 이 칸에 명령을 입력합니다.

### 5. 설치와 검사
아래를 **한 줄씩**, 끝날 때까지 기다리며 입력합니다.

```bash
npm install
npm run setup
npm run check
```

`npm install`: 필요한 도구를 내려받습니다. 첫 설치는 느릴 수 있습니다.
`npm run setup`: 연습 모드 설정을 만듭니다. 기존 설정은 덮어쓰지 않습니다.
`npm run check`: 코드 문법·타입·단위 시험·프로덕션 빌드를 검사합니다.
검사 실패 시 오류를 숨기지 말고 터미널 끝부분을 복사해 도움을 요청하세요. 키·비밀번호는 지웁니다.

### 6. 실행

```bash
npm run dev
```

Ready 또는 서버 시작 안내가 보이면 **Open in Browser**를 누릅니다.
알림이 없다면 아래 **PORTS → 3000 → 지구본 아이콘(Open in Browser)**.
Windows 주소창에 localhost를 새로 타이핑하는 대신 Codespaces가 제공한 주소를 사용하세요.
**Port Visibility는 Private로 유지**합니다. 연습 화면 공유를 위해 Public으로 바꾸지 마세요.

### 7. 확인할 정상 화면
- Lincoln History Lab 제목
- 연습 모드 · AI 호출 없음 표시
- 날짜 선택 5개
- 질문 입력 및 ‘질문 보내기’ 버튼
- 질문 후 ‘고정 연습 예시’ / ‘현대 역사 해설’ 영역

연습 모드는 질문이 달라도 같은 날짜의 같은 예시가 나오는 것이 정상입니다.

### 8. 첫 잠금 파일 저장
개발 서버는 켜 둬도 됩니다. 상단 Terminal → New Terminal로 새 터미널을 연 뒤:

```bash
git status
```

`.env.local`이 목록에 보이면 중단하고 .gitignore를 확인하세요.
정상이라면:

```bash
git add package-lock.json
git commit -m "chore: lock installed dependencies"
git push
```

GitHub 저장소의 **Actions** 탭에서 실제 검사 결과를 봅니다. 초록색이어야 통과입니다.
이 작업은 사용자가 자기 계정에서 실행하는 것이며, AI가 대신 저장소에 업로드한 상태는 아닙니다.

### 9. 종료
터미널에서 Ctrl+C → https://github.com/codespaces → 해당 작업실 `…` → **Stop codespace**.
저장은 GitHub 커밋으로 보관하세요. 무료 사용량은 무제한이 아닙니다.

## 자주 생기는 문제
| 보이는 문제 | 확인할 것 |
|---|---|
| package.json을 못 찾는다고 함 | 저장소 최상위에 파일이 있는지 확인. 부모 폴더째 업로드했다면 그 폴더로 이동하거나 새 저장소 루트에 다시 업로드 |
| node 버전 오류 | Codespaces 컨테이너가 Node 24인지 `node -v`로 확인. .devcontainer가 올라갔는지 확인 후 컨테이너 재빌드 |
| npm 명령을 찾을 수 없음 | Windows PowerShell이 아니라 Codespaces 하단 터미널인지 확인 |
| 버전 없음/ETARGET | 오류에 표시된 패키지 이름과 버전을 공유. 임의로 --force를 쓰거나 최신 버전을 섞지 않기 |
| localhost 연결 안 됨 | PORTS의 전달 주소에서 Open in Browser |
| ORIGIN_DENIED | 서버를 3000에서 실행했는지, APP_ORIGIN을 틀리게 넣지 않았는지 확인 |
| 3000 포트 사용 중 | 같은 작업실에서 두 번째 개발 서버를 켜지 않았는지 확인. 이전 서버 Ctrl+C |
| 데모 대화가 사라짐 | 데모는 임시 메모리 저장이므로 재시작·만료 시 정상적으로 사라질 수 있음 |
| API 키 설정 오류 | 첫 단계는 APP_MODE=demo로 되돌려 연습 먼저 확인 |
