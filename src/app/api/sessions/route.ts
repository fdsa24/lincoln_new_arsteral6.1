import { NextRequest } from 'next/server';
import { findPreset } from '@/lib/catalog';
import { createSessionSchema, parseInput, readJsonLimited } from '@/lib/core';
import { AppError } from '@/lib/errors';
import { getMode } from '@/lib/server/config';
import { failure, guard, identity, json } from '@/lib/server/http';
import { getStore } from '@/lib/server/runtime';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try { guard(req); const who = identity(req, true); return json({ sessions: await getStore().list(who.owner) }, 200, who.cookie); }
  catch (e) { return failure(e); }
}
export async function POST(req: NextRequest) {
  try {
    guard(req); const who = identity(req);
    const input = parseInput(createSessionSchema, await readJsonLimited(req));
    const preset = findPreset(input.presetId);
    if (!preset) throw new AppError('INVALID_INPUT');
    return json({ session: await getStore().create(who.owner, preset, getMode()) }, 201);
  } catch (e) { return failure(e); }
}
