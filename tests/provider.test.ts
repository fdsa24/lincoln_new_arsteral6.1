import test from 'node:test';
import assert from 'node:assert/strict';
import { decodeProvider, generateJson } from '../src/lib/server/provider';
test('입력 차단·후보 차단·빈 응답·잘린 응답을 정상 표시하지 않음', () => {
  assert.throws(()=>decodeProvider({promptFeedback:{blockReason:'SAFETY'}}),/MODEL_BLOCKED/);
  assert.throws(()=>decodeProvider({candidates:[{finishReason:'SAFETY'}]}),/MODEL_BLOCKED/);
  assert.throws(()=>decodeProvider({candidates:[]}),/INVALID_MODEL_OUTPUT/);
  assert.throws(()=>decodeProvider({candidates:[{finishReason:'MAX_TOKENS',content:{parts:[{text:'{}'}]}}]}),/INVALID_MODEL_OUTPUT/);
});
test('thought 파트는 사용자 출력 JSON에서 제외', () => {
  const d = decodeProvider({candidates:[{finishReason:'STOP',content:{parts:[{text:'not-json',thought:true},{text:'{"ok":true}'}]}}]});
  assert.deepEqual(d.output,{ok:true});
});
test('API 키는 URL이 아닌 서버 헤더로 전달, 검색 도구는 사용하지 않음', async () => {
  let inspected = false;
  const fake: typeof fetch = async (url, init) => {
    assert.ok(!String(url).includes('test-key'));
    assert.equal(new Headers(init?.headers).get('x-goog-api-key'),'test-key');
    const body = JSON.parse(String(init?.body)); assert.equal(body.tools,undefined);
    inspected = true;
    return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:'{"ok":true}'}]}}]});
  };
  const d = await generateJson({key:'test-key',model:'gemini-test',system:'system',prompt:'question',schema:{type:'object'},signal:AbortSignal.timeout(1000),fetcher:fake});
  assert.equal(inspected,true); assert.deepEqual(d.output,{ok:true});
});
test('안전 차단은 자동 재시도하지 않음', async () => {
  let calls = 0;
  const fake: typeof fetch = async () => { calls++; return Response.json({promptFeedback:{blockReason:'SAFETY'}}); };
  await assert.rejects(generateJson({key:'x',model:'gemini-test',system:'',prompt:'',schema:{},signal:AbortSignal.timeout(1000),fetcher:fake}),/MODEL_BLOCKED/);
  assert.equal(calls,1);
});
