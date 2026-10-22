# 실제 검증 기록

## 환경 확인 (2026-10-22 로컬 검증 완료)
```json
{
  "node": {
    "version": "v24.20.0"
  },
  "npm": {
    "version": "11.19.0"
  },
  "tsc": {
    "version": "5.9.3"
  }
}
```

## 수행 완료한 검사 (PASS)
- PASS JSON parse: `package.json`, `tsconfig.json`, `.devcontainer/devcontainer.json`
- PASS YAML parse: `.github/workflows/ci.yml`, `.github/dependabot.yml`
- PASS Dotfiles 복원: `.env.example`, `.devcontainer/devcontainer.json`, `.github/workflows/ci.yml`, `.github/dependabot.yml`, `.nvmrc`, `.gitattributes`
- PASS `npm install` 및 `npm run setup` (`.env.local` 자동 생성 확인)
- PASS `npm run lint` (`eslint . --max-warnings=0`, 경고 0건·오류 0건 통과)
- PASS `npm run typecheck` (`tsc --noEmit` 통과)
- PASS `npm test` (단위 테스트 15건 전체 통과: `core.test.ts`, `memory.test.ts`, `provider.test.ts`)
- PASS `npm run build` (Next.js 16.3.3 프로덕션 빌드 통과)
- PASS 보안 점검: `src/lib/server/http.ts`의 `guard()` Origin/CSRF 및 Live 모드 수업 입장 코드 검증 복원

## 아직 수행하지 않은 검사 (사용자 계정/인프라 연결 필요)
- PostgreSQL 통합 시험 (`npm run test:db`): `TEST_DATABASE_URL` 연결 후 실행 필요.
- 실제 Gemini 호출·Google 이용 계정 권한·모델/API 호환성·요금 확인: 사용자 API 키 설정 후 확인 필요.
- 실제 PostgreSQL 연결과 Vercel 배포: 사용자 계정에서 필요.
- 인간 역사학자·번역자의 원본/이본/한국어 번역 검토: 미완료.
