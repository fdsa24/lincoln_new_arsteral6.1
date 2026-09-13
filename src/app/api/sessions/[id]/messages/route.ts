import { NextRequest } from 'next/server';
import { parseInput, readJsonLimited, sendMessageSchema } from '@/lib/core';
import { AppError } from '@/lib/errors';
import { getLiveConfig, getMode } from '@/lib/server/config';
import { demoAnswer, liveAnswer } from '@/lib/server/generation';
import { checkedId, failure, guard, identity, json } from '@/lib/server/http';
import { getStore } from '@/lib/server/runtime';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 90;
export async function POST(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  let pending: { owner: string; sessionId: string; requestId: string } | undefined;
  try {
    guard(req); const who = identity(req); const id = checkedId((await context.params).id);
    const input = parseInput(sendMessageSchema, await readJsonLimited(req));
    const store = getStore();
    const result = await store.begin(who.owner, id, input.clientRequestId, input.text);
    if (result.cached) return json({ turn: result.turn, cached: true });
    pending = { owner: who.owner, sessionId: id, requestId: input.clientRequestId };
    const signal = AbortSignal.any([req.signal, AbortSignal.timeout(60000)]);
    const answer = getMode() === 'demo' ? demoAnswer(result.view.session.preset)
      : await liveAnswer(result.view.session.preset, input.text, result.view.turns, getLiveConfig(), signal);
    const turn = await store.complete(who.owner, id, input.clientRequestId, answer);
    return json({ turn, cached: false });
  } catch (e) {
    if (pending) {
      const code = e instanceof AppError ? e.code : 'INTERNAL_ERROR';
      await getStore().fail(pending.owner, pending.sessionId, pending.requestId, code).catch(() => undefined);
    }
    return failure(e);
  }
}
