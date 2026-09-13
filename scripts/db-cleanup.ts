import { Pool } from 'pg';
if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL이 필요합니다.');
const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 1 });
try {
  const a = await pool.query('DELETE FROM lincoln_sessions WHERE expires_at<=now()');
  const b = await pool.query('DELETE FROM lincoln_quotas WHERE expires_at<=now()');
  console.log(`만료 대화 ${a.rowCount}개, 만료 사용량 기록 ${b.rowCount}개 삭제.`);
} catch { console.error('만료 자료 정리 실패. DB 연결을 확인하세요.'); process.exitCode = 1; }
finally { await pool.end(); }
