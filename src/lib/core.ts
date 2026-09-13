import { z } from 'zod';
import { eligibleQuotes, eligibleSources, findPreset } from './catalog';
import { AppError } from './errors';
import type { ActorOutput, HistoryPair, Preset, Turn } from './types';

export const createSessionSchema = z.object({ presetId: z.string().refine(id => !!findPreset(id)) }).strict();
export const sendMessageSchema = z.object({ clientRequestId: z.string().uuid(), text: z.string().trim().min(1).max(4000) }).strict();
export const actorSchema = z.object({
  paragraphs: z.array(z.string().trim().min(1).max(1600)).min(1).max(3),
  quoteIds: z.array(z.string().max(100)).max(2),
  sourceIds: z.array(z.string().max(100)).max(6),
  uncertainty: z.string().max(1000),
}).strict();
export const historianSchema = z.object({
  timeCheck: z.string().min(1).max(1600), facts: z.string().min(1).max(2000),
  interpretations: z.string().min(1).max(1600), limitations: z.string().min(1).max(1600),
  sourceIds: z.array(z.string().max(100)).max(6),
}).strict();
export function parseInput<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) throw new AppError('INVALID_INPUT');
  return result.data;
}
export function validateActor(data: unknown, preset: Preset): ActorOutput {
  const parsed = actorSchema.safeParse(data);
  if (!parsed.success) throw new AppError('INVALID_MODEL_OUTPUT', 502);
  const quotes = new Set(eligibleQuotes(preset).map(q => q.id));
  const sources = new Set(eligibleSources(preset).map(s => s.id));
  if (parsed.data.quoteIds.some(id => !quotes.has(id)) || parsed.data.sourceIds.some(id => !sources.has(id))) {
    throw new AppError('INVALID_MODEL_OUTPUT', 502);
  }
  // 직접 인용은 서버가 삽입하는 인용 카드만 허용한다. 내용의 진실성을 보장하는 검사는 아니다.
  if (parsed.data.paragraphs.some(p => /["“”«»]/u.test(p))) throw new AppError('INVALID_MODEL_OUTPUT', 502);
  if (parsed.data.paragraphs.join('').length > 3500) throw new AppError('INVALID_MODEL_OUTPUT', 502);
  return { ...parsed.data, quoteIds: [...new Set(parsed.data.quoteIds)], sourceIds: [...new Set(parsed.data.sourceIds)] };
}
export function buildHistory(turns: Turn[], maxPairs = 6, maxChars = 14000): HistoryPair[] {
  const pairs: HistoryPair[] = [];
  let used = 0;
  for (const turn of [...turns].reverse()) {
    if (turn.state !== 'complete' || !turn.answer) continue;
    const model = [ ...turn.answer.actor.paragraphs, ...turn.answer.quotes.map(q => q.original) ].join('\n\n');
    const pair = { user: turn.text, model };
    const size = pair.user.length + pair.model.length;
    if (used + size > maxChars || pairs.length >= maxPairs) break;
    pairs.unshift(pair); used += size;
  }
  return pairs;
}
export function isHttpsSource(value: string): boolean {
  try { const u = new URL(value); return u.protocol === 'https:' && !u.username && !u.password; }
  catch { return false; }
}
export async function readJsonLimited(request: Request, limit = 20000): Promise<unknown> {
  if (request.headers.get('content-type')?.split(';')[0].trim() !== 'application/json') throw new AppError('INVALID_INPUT');
  const length = Number(request.headers.get('content-length') ?? '0');
  if (Number.isFinite(length) && length > limit) throw new AppError('BODY_TOO_LARGE', 413);
  if (!request.body) throw new AppError('INVALID_INPUT');
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > limit) { await reader.cancel(); throw new AppError('BODY_TOO_LARGE', 413); }
      chunks.push(value);
    }
    const bytes = new Uint8Array(total);
    let offset = 0;
    for (const c of chunks) { bytes.set(c, offset); offset += c.byteLength; }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } catch (e) {
    if (e instanceof AppError) throw e;
    throw new AppError('INVALID_INPUT');
  } finally { reader.releaseLock(); }
}
