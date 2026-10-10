// Access checks for the API routes (origin + classroom code).
// No 'server-only' import and no environment access on purpose: http.ts supplies
// the policy, which keeps this module unit-testable.
import { createHash, timingSafeEqual } from 'node:crypto';
import { AppError } from '../errors';

export type AccessPolicy =
  | { mode: 'demo' }
  | { mode: 'live'; origin: string; classroomCode: string };

type GuardRequest = Pick<Request, 'method' | 'headers'>;

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

// Hash both values first so the comparison is constant-time and length-independent.
function sameSecret(supplied: string, expected: string): boolean {
  const a = createHash('sha256').update(supplied).digest();
  const b = createHash('sha256').update(expected).digest();
  return timingSafeEqual(a, b);
}

export function checkAccess(request: GuardRequest, policy: AccessPolicy): void {
  if (policy.mode === 'demo') return;
  if (!policy.classroomCode) throw new AppError('CONFIG_ERROR', 503);
  if (!SAFE_METHODS.has(request.method.toUpperCase()) && request.headers.get('origin') !== policy.origin) {
    throw new AppError('ORIGIN_DENIED', 403);
  }
  if (!sameSecret(request.headers.get('x-classroom-code') ?? '', policy.classroomCode)) {
    throw new AppError('ACCESS_DENIED', 403);
  }
}
