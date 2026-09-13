# GitHub → Vercel 제한 공개 및 되돌리기

이 문서는 Codespaces의 실제 모드가 먼저 작동하고 CI가 통과한 다음 사용합니다.
GitHub Pages는 Next.js POST API를 실행할 수 없습니다.

## 공개 전 체크
- [ ] 최초 npm install로 생성한 package-lock.json 커밋
- [ ] GitHub Actions 검사 통과 (단위·PostgreSQL·브라우저)
- [ ] 실제 Gemini 호출 성공과 대화 재조회 시험
- [ ] 번역·원문·시점 시나리오 검토
- [ ] 이용 대상의 연령·학교 정책·데이터 처리 고지 검토
- [ ] DB 백업, 만료 자료 물리 삭제 일정, 모니터링 책임자 지정
- [ ] Google·DB·Vercel 사용량과 지출 제한 확인
- [ ] 제한된 수업 코드 사용자만 접근하도록 운영

## Vercel 설정
1. https://vercel.com 에 로그인하여 GitHub 계정을 연결합니다.
2. Add New → Project → 본인의 lincoln-v5 저장소를 Import합니다.
3. Framework Preset은 Next.js, Root Directory는 저장소 루트입니다.
4. Node.js는 24.x를 선택합니다. 플랫폼 지원 목록이 바뀌면 엔진·CI·개발 컨테이너를 함께 조정해야 합니다.
5. Environment Variables에 APP_MODE=live, GEMINI_API_KEY, GEMINI_MODEL, DATABASE_URL, CLASSROOM_CODE를 설정합니다.
6. **APP_ORIGIN에 해당 배포의 정확한 HTTPS origin**을 넣습니다. 예: Vercel이 실제 발급한 주소의 https://호스트 부분. 끝에 / 없이.
7. 생성 시도 제한도 설정합니다. 보수적으로 시작하세요.
8. 초기 발급 주소를 배포 전 알 수 없으면 첫 배포에서 발급된 주소를 확인한 뒤 APP_ORIGIN을 설정하고 Redeploy합니다. 설정이 없으면 API가 거부하도록 만들어져 있습니다.
9. 비밀값은 README나 소스 코드에 붙이지 않습니다. Production과 Preview 환경을 구분하세요.
10. 배포 완료 후 본인만 라이브 시험을 하고, 수업 코드를 신뢰하는 참여자에게만 전달합니다.

Preview 배포는 별도의 개발 DB/키를 사용하거나 APP_MODE=demo로 둡니다. Preview마다 APP_ORIGIN도 실제 주소와 맞아야 합니다.
데모를 Vercel에 올리면 인스턴스별 메모리가 달라 대화가 유지되지 않을 수 있으므로 Codespaces 단일 작업실에서 먼저 시험하세요.

## CI와 배포의 관계
기본 Vercel GitHub 연동은 GitHub Actions가 끝나기 전에 배포할 수 있습니다.
이 패키지는 **자동 배포가 CI 성공 뒤에만 일어나도록 강제한 상태가 아닙니다.**
간단한 운영 방법은 자동 Production 공개를 보류하고 초록색 검사를 확인한 커밋만 수동으로 Production에 승격하는 것입니다.
기관 운영에서는 보호 브랜치·필수 검사·배포 승인 또는 CI-gated 배포 워크플로를 별도로 설정하세요.

## 롤백
1. 문제 발생 시 APP_MODE=demo로 바꾸거나 외부 접근을 제한하고 Redeploy하여 유료 AI 요청을 중단합니다.
2. Vercel Deployments에서 마지막으로 확인된 정상 배포를 선택해 플랫폼의 롤백/승격 기능을 사용합니다.
3. 환경변수와 DB 스키마 호환성을 같이 확인합니다. 코드 롤백은 DB 롤백이 아닙니다.
4. 최초 스키마 이후 변경은 번호를 붙인 새 SQL 마이그레이션으로 관리하고 먼저 개발 DB에서 시험합니다.

## 아직 별도로 필요한 운영 장치
- 계정 로그인·학교 SSO·사용자별 영구 신원 확인
- WAF/IP별 제한과 입장 코드 시도 제한
- 원화/달러 기준의 강제 예산 제한과 알림
- 자동 만료 삭제, 백업·복원 시험, 운영 관측
- 더 많은 사료·문장별 주장과 근거 연결 및 전문가 검토
- nonce 기반 CSP, 의존성 취약점 감사, 독립 보안 점검
