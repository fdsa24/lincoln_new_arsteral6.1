import test from 'node:test';
import assert from 'node:assert/strict';
import { AppError } from '../src/lib/errors';
import { checkAccess, type AccessPolicy } from '../src/lib/server/guard';
const CODE = 'c'.repeat(40);
const ORIGIN = 'https://class.example.org';
const live: AccessPolicy = { mode: 'live', origin: ORIGIN, classroomCode: CODE };
const req = (method: string, headers: Record<string, string> = {}) => ({ method, headers: new Headers(headers) });
const denies = (run: () => void, code: string, status: number) =>
  assert.throws(run, (e: unknown) => e instanceof AppError && e.code === code && e.status === status);
test('연습 모드는 코드·Origin 없이도 통과', () => {
  assert.doesNotThrow(() => checkAccess(req('POST'), { mode: 'demo' }));
});
test('실제 모드: 올바른 코드의 조회(GET)는 Origin 없이 통과', () => {
  assert.doesNotThrow(() => checkAccess(req('GET', { 'x-classroom-code': CODE }), live));
});
test('실제 모드: 코드가 없거나 틀리면 ACCESS_DENIED(403)', () => {
  denies(() => checkAccess(req('GET'), live), 'ACCESS_DENIED', 403);
  denies(() => checkAccess(req('GET', { 'x-classroom-code': 'd'.repeat(40) }), live), 'ACCESS_DENIED', 403);
  denies(() => checkAccess(req('GET', { 'x-classroom-code': 'c'.repeat(39) }), live), 'ACCESS_DENIED', 403);
  denies(() => checkAccess(req('GET', { 'x-classroom-code': CODE + 'x' }), live), 'ACCESS_DENIED', 403);
});
test('실제 모드: 변경 요청은 Origin이 없거나 다르면 ORIGIN_DENIED(403)', () => {
  for (const method of ['POST', 'DELETE']) {
    denies(() => checkAccess(req(method, { 'x-classroom-code': CODE }), live), 'ORIGIN_DENIED', 403);
    denies(() => checkAccess(req(method, { 'x-classroom-code': CODE, origin: 'https://evil.example' }), live), 'ORIGIN_DENIED', 403);
  }
});
test('실제 모드: 올바른 Origin과 코드의 변경 요청은 통과', () => {
  for (const method of ['POST', 'DELETE']) {
    assert.doesNotThrow(() => checkAccess(req(method, { 'x-classroom-code': CODE, origin: ORIGIN }), live));
  }
});
test('실제 모드: 올바른 Origin이어도 코드가 틀리면 ACCESS_DENIED', () => {
  denies(() => checkAccess(req('POST', { origin: ORIGIN, 'x-classroom-code': 'wrong' }), live), 'ACCESS_DENIED', 403);
});
test('실제 모드: 서버 교실 코드가 비어 있으면 CONFIG_ERROR(503)로 차단', () => {
  denies(() => checkAccess(req('GET', { 'x-classroom-code': '' }), { mode: 'live', origin: ORIGIN, classroomCode: '' }), 'CONFIG_ERROR', 503);
});
