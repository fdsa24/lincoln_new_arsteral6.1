import 'server-only';
import { AppError } from '../errors';
import type { Limits, Mode } from '../types';
export function getMode(): Mode {
  const mode = process.env.APP_MODE || 'demo';
  if (mode !== 'demo' && mode !== 'live') throw new AppError('CONFIG_ERROR', 503);
  return mode;
}
export function appOrigin(): string {
  if (process.env.APP_ORIGIN) {
    try {
      const u = new URL(process.env.APP_ORIGIN);
      if (u.username || u.password || u.pathname !== '/' || u.search || u.hash) throw new Error('origin');
      if (!['http:', 'https:'].includes(u.protocol)) throw new Error('protocol');
      if (process.env.NODE_ENV === 'production' && getMode() === 'live' && u.protocol !== 'https:') throw new Error('tls');
      return u.origin;
    } catch { throw new AppError('CONFIG_ERROR', 503); }
  }
  if (process.env.CODESPACE_NAME) return `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'}`;
  if (process.env.NODE_ENV === 'production' && getMode() === 'live') throw new AppError('CONFIG_ERROR', 503);
  return 'http://localhost:3000';
}
export function getLiveConfig() {
  const key = process.env.GEMINI_API_KEY?.trim();
  const database = process.env.DATABASE_URL?.trim();
  const classroomCode = process.env.CLASSROOM_CODE?.trim();
  const model = process.env.GEMINI_MODEL || 'gemini-3.8-flash';
  if (!key || !database || !classroomCode || classroomCode.length < 32 || !/^gemini-[a-z0-9.\-]+$/.test(model)) {
    throw new AppError('CONFIG_ERROR', 503);
  }
  appOrigin();
  return { key, database, classroomCode, model };
}
export function limits(): Limits {
  const n = (key: string, fallback: number, max: number) => {
    const value = Number(process.env[key] || fallback);
    if (!Number.isInteger(value) || value < 1 || value > max) throw new AppError('CONFIG_ERROR', 503);
    return value;
  };
  return { globalDaily: n('GLOBAL_DAILY_TURN_LIMIT', 100, 10000), ownerDaily: n('OWNER_DAILY_TURN_LIMIT', 30, 1000), ownerMinute: n('OWNER_MINUTE_TURN_LIMIT', 6, 60) };
}
