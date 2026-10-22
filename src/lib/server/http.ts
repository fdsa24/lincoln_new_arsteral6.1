import 'server-only';
import { createHash, randomBytes, randomUUID, timingSafeEqual } from 'node:crypto';
import { NextRequest, NextResponse } from 'next/server';
import { AppError, messageFor } from '../errors';
import { appOrigin, getLiveConfig, getMode } from './config';
const COOKIE = 'lincoln_owner_v5';
function isAllowedOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin')?.trim().toLowerCase();
  const secFetchSite = request.headers.get('sec-fetch-site')?.trim().toLowerCase();

  if (process.env.NODE_ENV === 'production' && getMode() === 'live' && process.env.APP_ORIGIN) {
    return !!origin && origin === appOrigin().toLowerCase() && secFetchSite !== 'cross-site';
  }

  if (secFetchSite === 'same-origin') return true;
  if (!origin) return false;

  const allowed = new Set<string>([
    appOrigin().toLowerCase(),
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]);

  if (process.env.CODESPACE_NAME) {
    const cs = process.env.CODESPACE_NAME.toLowerCase();
    const domain = (process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev').toLowerCase();
    allowed.add(`https://${cs}-3000.${domain}`);
    allowed.add(`https://${cs}-3000.app.github.dev`);
    allowed.add(`https://${cs}-3000.preview.app.github.dev`);
  }

  for (const h of [request.headers.get('x-forwarded-host'), request.headers.get('host')]) {
    const host = (h || '').split(',')[0].trim().toLowerCase();
    if (host) {
      allowed.add(`http://${host}`);
      allowed.add(`https://${host}`);
    }
  }

  if (allowed.has(origin)) return true;

  if (!process.env.APP_ORIGIN) {
    try {
      const u = new URL(origin);
      if (u.protocol === 'https:' && (u.hostname.endsWith('.app.github.dev') || u.hostname.endsWith('.github.dev'))) {
        return true;
      }
      if (u.protocol === 'http:' && (u.hostname === 'localhost' || u.hostname === '127.0.0.1')) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}
export function guard(request: NextRequest) {
  if (!['GET', 'HEAD'].includes(request.method)) {
    if (!isAllowedOrigin(request)) {
      throw new AppError('ORIGIN_DENIED', 403);
    }
  }
  if (getMode() === 'live') {
    const expected = getLiveConfig().classroomCode;
    const supplied = request.headers.get('x-classroom-code') || '';
    if (
      supplied.length > 256 ||
      !timingSafeEqual(createHash('sha256').update(supplied).digest(), createHash('sha256').update(expected).digest())
    ) {
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
  if (cookie) response.cookies.set(COOKIE, cookie, { httpOnly: true, secure: process.env.NODE_ENV === 'production' && getMode() === 'live' && appOrigin().startsWith('https:'), sameSite: 'strict', path: '/', maxAge: 60 * 60 * 24 * 7 });
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
