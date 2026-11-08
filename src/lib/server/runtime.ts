import 'server-only';
import { Pool } from 'pg';
import { getLiveConfig, getMode, limits } from './config';
import { MemoryStore } from './memory-store';
import { PostgresStore } from './postgres-store';
import type { Store } from './store';
const shared = globalThis as typeof globalThis & { lincolnDemo?: MemoryStore; lincolnPg?: PostgresStore };
export function getStore(): Store {
  if (getMode() === 'demo') return shared.lincolnDemo ??= new MemoryStore(limits());
  const config = getLiveConfig();
  if (!config.database) {
    // 개발·Codespaces 환경에서 DATABASE_URL 미설정 시 내장 메모리 저장소로 동작한다.
    return shared.lincolnDemo ??= new MemoryStore(limits());
  }
  if (!shared.lincolnPg) {
    // 관리형 PostgreSQL의 TLS 설정은 공급자가 준 연결 문자열을 사용한다. 인증서 검증을 끄지 않는다.
    const pool = new Pool({ connectionString: config.database, max: 3, connectionTimeoutMillis: 8000, idleTimeoutMillis: 10000, statement_timeout: 10000 });
    pool.on('error', () => console.error(JSON.stringify({ event: 'database_pool_error' })));
    shared.lincolnPg = new PostgresStore(pool, limits());
  }
  return shared.lincolnPg;
}
