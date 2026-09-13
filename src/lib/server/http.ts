import 'server-only';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { AppError, messageFor } from '../errors';
import { appOrigin, getLiveConfig, getMode } from './config';
const COOKIE = 'lincoln_owner_v5';
export function guard(request: NextRequest) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const allowed = new Set([appOrigin()]);
    if (process.env.NODE_ENV !== 'production' && !process.env.APP_ORIGIN && !process.env.CODESPACE_NAME) allowed.add('http://127.0.0.1:3000');
    if (!origin || !allowed.has(origin) || request.headers.get('sec-fetch-site') === 'cross-site') throw new AppError('ORIGIN_DENIED', 403);
  }
  if (getMode() === 'live') {
    const expected = getLiveConfig().classroomCode;
    const supplied = request.headers.get('x-classroom-code') || '';
    if (supplied.length > 256 || !timingSafeEqual(createHash('sha256').update(supplied).digest(), createHash('sha256').update(expected).digest())) {
      throw new AppError('ACCESS_DENIED', 401);
    }
  }
}
export function identity(request: NextRequest, allowCreate = false): { owner: string; cookie?: string } {
  const token = request.cookies.get(COOKIE)?.value;
  if (token && /^[a-f0-9]{64}$/.test(token)) return { owner: createHash('sha256').update(token).digest('hex') };
  if (!allowCreate) throw new AppError('NO_SESSION_COOKIE', 401);
  const fresh = randomBytes(32).toString('hex');
  return { owner: createHash('sha256').update(fresh).digest('hex'), cookie: fresh };
}
export function json(data: unknown, status = 200, cookie?: string) {
  const response = NextResponse.json(data, { status, headers: { 'Cache-Control': 'no-store' } });
  if (cookie) response.cookies.set(COOKIE, cookie, { httpOnly: true, secure: appOrigin().startsWith('https:'), sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
  return response;
}
export function failure(error: unknown) {
  const traceId = randomUUID();
  const problem = error instanceof AppError ? error : new AppError('INTERNAL_ERROR', 500);
  if (!(error instanceof AppError)) console.error(JSON.stringify({ event: 'api_error', code: problem.code, traceId }));
  const response = json({ error: { code: problem.code, message: messageFor(problem.code), traceId } }, problem.status);
  if (problem.retryAfter) response.headers.set('Retry-After', String(problem.retryAfter));
  return response;
}
export function checkedId(id: string): string {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new AppError('INVALID_INPUT');
  return id;
}
