import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
if (!existsSync('.env.local')) {
  const example = readFileSync('.env.example', 'utf8');
  writeFileSync('.env.local', example.replace(/^CLASSROOM_CODE=$/m, `CLASSROOM_CODE=${randomBytes(24).toString('hex')}`));
  console.log('연습 모드 설정을 만들었습니다. .env.local은 GitHub 업로드 금지 파일입니다.');
} else console.log('기존 .env.local을 유지했습니다.');
console.log('다음: npm install → npm run check → npm run dev');
