import { NextRequest } from 'next/server';
import { checkedId, failure, guard, identity, json } from '@/lib/server/http';
import { getStore } from '@/lib/server/runtime';
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
type Context = { params: Promise<{ id: string }> };
export async function GET(req: NextRequest, context: Context) {
  try { guard(req); const who = identity(req); const id = checkedId((await context.params).id); return json(await getStore().read(who.owner, id)); }
  catch (e) { return failure(e); }
}
export async function DELETE(req: NextRequest, context: Context) {
  try { guard(req); const who = identity(req); const id = checkedId((await context.params).id); await getStore().remove(who.owner, id); return json({ deleted: true }); }
  catch (e) { return failure(e); }
}
