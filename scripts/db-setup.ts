import { readFile } from 'node:fs/promises';
import { Pool } from 'pg';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL을 .env.local에 설정해 주세요.');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  await pool.query(await readFile(new URL('../db/001_initial.sql', import.meta.url), 'utf8'));
  console.log('데이터베이스 테이블 준비 완료. 기존 대화를 삭제하지 않았습니다.');
} catch { console.error('DB 준비 실패. 연결 문자열·TLS·접근 권한을 확인하세요. 비밀번호는 공유하지 마세요.'); process.exitCode = 1; }
finally { await pool.end(); }
