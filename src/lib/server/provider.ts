import { setTimeout as sleep } from 'node:timers/promises';
import { z } from 'zod';
import { AppError } from '../errors';
import type { HistoryPair } from '../types';
const envelope = z.object({
  promptFeedback: z.object({ blockReason: z.string().optional() }).passthrough().optional(),
  candidates: z.array(z.object({
    finishReason: z.string().optional(),
    content: z.object({ parts: z.array(z.object({ text: z.string().optional(), thought: z.boolean().optional() }).passthrough()).optional() }).passthrough().optional(),
  }).passthrough()).optional(),
  usageMetadata: z.object({ promptTokenCount: z.number().optional(), candidatesTokenCount: z.number().optional(), thoughtsTokenCount: z.number().optional() }).passthrough().optional(),
}).passthrough();
export function decodeProvider(body: unknown) {
  const parsed = envelope.safeParse(body);
  if (!parsed.success) throw new AppError('INVALID_MODEL_OUTPUT', 502);
  const data = parsed.data;
  if (data.promptFeedback?.blockReason && data.promptFeedback.blockReason !== 'BLOCK_REASON_UNSPECIFIED') throw new AppError('MODEL_BLOCKED', 422);
  const candidate = data.candidates?.[0];
  if (candidate && ['SAFETY','BLOCKLIST','PROHIBITED_CONTENT','SPII','RECITATION'].includes(candidate.finishReason || '')) throw new AppError('MODEL_BLOCKED', 422);
  if (!candidate || candidate.finishReason !== 'STOP') throw new AppError('INVALID_MODEL_OUTPUT', 502);
  const raw = (candidate.content?.parts || []).filter(p => !p.thought && typeof p.text === 'string').map(p => p.text).join('');
  if (!raw || raw.length > 40000) throw new AppError('INVALID_MODEL_OUTPUT', 502);
  let output: unknown;
  try { output = JSON.parse(raw); } catch { throw new AppError('INVALID_MODEL_OUTPUT', 502); }
  return { output, usage: { inputTokens: data.usageMetadata?.promptTokenCount || 0, outputTokens: (data.usageMetadata?.candidatesTokenCount || 0) + (data.usageMetadata?.thoughtsTokenCount || 0) } };
}
export async function generateJson(args: {
  key: string; model: string; system: string; prompt: string;
  schema: Record<string, unknown>; history?: HistoryPair[]; signal: AbortSignal;
  fetcher?: typeof fetch;
}) {
  const contents = (args.history || []).flatMap(p => [
    { role: 'user', parts: [{ text: p.user }] }, { role: 'model', parts: [{ text: p.model }] },
  ]);
  contents.push({ role: 'user', parts: [{ text: args.prompt }] });
  const payload = { contents, systemInstruction: { parts: [{ text: args.system }] },
    generationConfig: { responseMimeType: 'application/json', responseJsonSchema: args.schema, maxOutputTokens: 4096 } };
  const doFetch = args.fetcher || fetch;
  for (let attempt = 0; attempt < 2; attempt++) {
    let response: Response;
    try {
      response = await doFetch(`https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(args.model)}:generateContent`, {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': args.key },
        body: JSON.stringify(payload), signal: args.signal, cache: 'no-store',
      });
    } catch {
      // 불확실한 네트워크 실패는 자동 재시도하지 않는다. 공급자 측 과금은 이미 발생했을 수 있다.
      throw new AppError(args.signal.aborted ? 'MODEL_TIMEOUT' : 'MODEL_BUSY', 503);
    }
    if (!response.ok) {
      const retryable = [429,502,503,504].includes(response.status);
      const retryHeader = response.headers.get('retry-after');
      const seconds = retryHeader ? (/^\d+$/.test(retryHeader) ? Number(retryHeader) : Math.max(0,(Date.parse(retryHeader)-Date.now())/1000)) : 0;
      await response.body?.cancel();
      if (retryable && attempt === 0 && Number.isFinite(seconds) && seconds <= 3) {
        const delay = Math.max(seconds * 1000, 700 * (2 ** attempt) + Math.random() * 250);
        try { await sleep(delay, undefined, { signal: args.signal }); } catch { throw new AppError('MODEL_TIMEOUT', 504); }
        continue;
      }
      throw new AppError(retryable ? 'MODEL_BUSY' : 'MODEL_UNAVAILABLE', 503);
    }
    let body: unknown;
    try { body = await response.json(); } catch { throw new AppError('INVALID_MODEL_OUTPUT', 502); }
    return decodeProvider(body);
  }
  throw new AppError('MODEL_BUSY', 503);
}
