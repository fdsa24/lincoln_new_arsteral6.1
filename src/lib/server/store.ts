import type { Answer, ChatSession, Limits, Mode, Preset, SessionView, Turn } from '../types';
export interface BeginResult { cached: boolean; turn: Turn; view: SessionView }
export interface Store {
  list(owner: string): Promise<ChatSession[]>;
  create(owner: string, preset: Preset, mode: Mode): Promise<ChatSession>;
  read(owner: string, id: string): Promise<SessionView>;
  remove(owner: string, id: string): Promise<void>;
  begin(owner: string, id: string, requestId: string, text: string): Promise<BeginResult>;
  complete(owner: string, id: string, requestId: string, answer: Answer): Promise<Turn>;
  fail(owner: string, id: string, requestId: string, code: string): Promise<void>;
}
export const DEFAULT_LIMITS: Limits = { globalDaily: 100, ownerDaily: 30, ownerMinute: 6 };
export const LEASE_MS = 120000;
export const SESSION_DAYS = 7;
export function quotaKeys(owner: string, now: Date, limits: Limits) {
  const day = now.toISOString().slice(0, 10);
  const minute = now.toISOString().slice(0, 16);
  return [
    { key: `global:${day}`, limit: limits.globalDaily },
    { key: `owner:${owner}:${day}`, limit: limits.ownerDaily },
    { key: `minute:${owner}:${minute}`, limit: limits.ownerMinute },
  ];
}
