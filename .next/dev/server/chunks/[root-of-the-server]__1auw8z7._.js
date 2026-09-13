module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:crypto [external] (node:crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:crypto", () => require("node:crypto"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/src/app/api/sessions/[id]/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "DELETE",
    ()=>DELETE,
    "GET",
    ()=>GET,
    "dynamic",
    ()=>dynamic,
    "runtime",
    ()=>runtime
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/http.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$runtime$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/runtime.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$runtime$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__
]);
[__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$runtime$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
const runtime = 'nodejs';
const dynamic = 'force-dynamic';
async function GET(req, context) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["guard"])(req);
        const who = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["identity"])(req);
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkedId"])((await context.params).id);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["json"])(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$runtime$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getStore"])().read(who.owner, id));
    } catch (e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["failure"])(e);
    }
}
async function DELETE(req, context) {
    try {
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["guard"])(req);
        const who = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["identity"])(req);
        const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["checkedId"])((await context.params).id);
        await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$runtime$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getStore"])().remove(who.owner, id);
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["json"])({
            deleted: true
        });
    } catch (e) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$http$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["failure"])(e);
    }
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/errors.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AppError",
    ()=>AppError,
    "ERROR_MESSAGES",
    ()=>ERROR_MESSAGES,
    "messageFor",
    ()=>messageFor
]);
class AppError extends Error {
    code;
    status;
    retryAfter;
    constructor(code, status = 400, retryAfter){
        super(code), this.code = code, this.status = status, this.retryAfter = retryAfter;
        this.name = 'AppError';
    }
}
const ERROR_MESSAGES = {
    INVALID_INPUT: '입력 형식을 확인해 주세요. 질문은 1~4,000자입니다.',
    BODY_TOO_LARGE: '전송한 내용이 너무 큽니다. 질문을 짧게 나누어 주세요.',
    ORIGIN_DENIED: '접속 주소 설정이 맞지 않습니다. 안내서의 APP_ORIGIN 항목을 확인해 주세요.',
    ACCESS_DENIED: '수업 입장 코드를 확인해 주세요.',
    NO_SESSION_COOKIE: '브라우저의 쿠키를 허용한 뒤 페이지를 새로고침해 주세요.',
    NOT_FOUND: '대화가 없거나 만료되었습니다. 새 대화를 만들어 주세요.',
    RATE_LIMIT: '이용 횟수 상한에 도달했습니다. 잠시 후 다시 시도하거나 운영자에게 문의하세요.',
    SESSION_LIMIT: '대화방 또는 질문 수 상한입니다. 불필요한 대화를 삭제하거나 새 대화를 만들어 주세요.',
    BUSY: '이 대화의 답변이 아직 처리 중입니다. 잠시 후 대화를 다시 불러오세요.',
    REQUEST_CONFLICT: '같은 요청 번호에 다른 내용이 들어왔습니다. 새 질문으로 제출해 주세요.',
    MODEL_BLOCKED: '이번 요청의 답변을 제공하지 못했습니다. 사료 분석이나 역사적 사실 확인 형태로 질문해 보세요.',
    MODEL_TIMEOUT: 'AI 응답 대기 시간이 초과되었습니다. 대화를 다시 불러와 처리 상태를 확인해 주세요.',
    MODEL_BUSY: 'AI 서비스가 혼잡합니다. 잠시 후 다시 시도해 주세요.',
    MODEL_UNAVAILABLE: '모델 이름 또는 이용 권한을 확인해야 합니다. 운영자에게 문의하세요.',
    INVALID_MODEL_OUTPUT: 'AI 답변 형식·인용 검사를 통과하지 못해 대사를 표시하지 않았습니다.',
    CONFIG_ERROR: '서버 설정이 아직 완료되지 않았습니다. 실제 AI 연결 안내서를 확인해 주세요.',
    INTERNAL_ERROR: '처리 중 오류가 발생했습니다. 잠시 후 대화를 다시 불러오세요.'
};
function messageFor(code) {
    return ERROR_MESSAGES[code] ?? ERROR_MESSAGES.INTERNAL_ERROR;
}
}),
"[project]/src/lib/server/config.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "appOrigin",
    ()=>appOrigin,
    "getLiveConfig",
    ()=>getLiveConfig,
    "getMode",
    ()=>getMode,
    "limits",
    ()=>limits
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
;
;
function getMode() {
    const mode = process.env.APP_MODE || 'demo';
    if (mode !== 'demo' && mode !== 'live') throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('CONFIG_ERROR', 503);
    return mode;
}
function appOrigin() {
    if (process.env.APP_ORIGIN) {
        try {
            const u = new URL(process.env.APP_ORIGIN);
            if (u.username || u.password || u.pathname !== '/' || u.search || u.hash) throw new Error('origin');
            if (![
                'http:',
                'https:'
            ].includes(u.protocol)) throw new Error('protocol');
            if (("TURBOPACK compile-time value", "development") === 'production' && getMode() === 'live' && u.protocol !== 'https:') //TURBOPACK unreachable
            ;
            return u.origin;
        } catch  {
            throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('CONFIG_ERROR', 503);
        }
    }
    if (process.env.CODESPACE_NAME) return `https://${process.env.CODESPACE_NAME}-3000.${process.env.GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN || 'app.github.dev'}`;
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return 'http://localhost:3000';
}
function getLiveConfig() {
    const key = process.env.GEMINI_API_KEY?.trim();
    const database = process.env.DATABASE_URL?.trim();
    const classroomCode = process.env.CLASSROOM_CODE?.trim();
    const model = process.env.GEMINI_MODEL || 'gemini-3.5-flash';
    if (!key || !database || !classroomCode || classroomCode.length < 32 || !/^gemini-[a-z0-9.\-]+$/.test(model)) {
        throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('CONFIG_ERROR', 503);
    }
    appOrigin();
    return {
        key,
        database,
        classroomCode,
        model
    };
}
function limits() {
    const n = (key, fallback, max)=>{
        const value = Number(process.env[key] || fallback);
        if (!Number.isInteger(value) || value < 1 || value > max) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('CONFIG_ERROR', 503);
        return value;
    };
    return {
        globalDaily: n('GLOBAL_DAILY_TURN_LIMIT', 100, 10000),
        ownerDaily: n('OWNER_DAILY_TURN_LIMIT', 30, 1000),
        ownerMinute: n('OWNER_MINUTE_TURN_LIMIT', 6, 60)
    };
}
}),
"[project]/src/lib/server/http.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "checkedId",
    ()=>checkedId,
    "failure",
    ()=>failure,
    "guard",
    ()=>guard,
    "identity",
    ()=>identity,
    "json",
    ()=>json
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/config.ts [app-route] (ecmascript)");
;
;
;
;
;
const COOKIE = 'lincoln_owner_v5';
function guard(request) {
    return; // (모든 검사를 무시하고 즉시 통과시킴)
}
function identity(request, allowCreate = false) {
    const token = request.cookies.get(COOKIE)?.value;
    if (token && /^[a-f0-9]{64}$/.test(token)) return {
        owner: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])('sha256').update(token).digest('hex')
    };
    if (!allowCreate) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('NO_SESSION_COOKIE', 401);
    const fresh = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomBytes"])(32).toString('hex');
    return {
        owner: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["createHash"])('sha256').update(fresh).digest('hex'),
        cookie: fresh
    };
}
function json(data, status = 200, cookie) {
    const response = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(data, {
        status,
        headers: {
            'Cache-Control': 'no-store'
        }
    });
    if (cookie) response.cookies.set(COOKIE, cookie, {
        httpOnly: true,
        secure: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["appOrigin"])().startsWith('https:'),
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7
    });
    return response;
}
function failure(error) {
    const traceId = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])();
    const problem = error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"] ? error : new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('INTERNAL_ERROR', 500);
    if (!(error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"])) console.error(JSON.stringify({
        event: 'api_error',
        code: problem.code,
        traceId
    }));
    const response = json({
        error: {
            code: problem.code,
            message: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["messageFor"])(problem.code),
            traceId
        }
    }, problem.status);
    if (problem.retryAfter) response.headers.set('Retry-After', String(problem.retryAfter));
    return response;
}
function checkedId(id) {
    if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('INVALID_INPUT');
    return id;
}
}),
"[project]/src/lib/server/memory-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MemoryStore",
    ()=>MemoryStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/store.ts [app-route] (ecmascript)");
;
;
;
class MemoryStore {
    limits;
    clock;
    entries;
    counters;
    constructor(limits = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"], clock = ()=>Date.now()){
        this.limits = limits;
        this.clock = clock;
        this.entries = new Map();
        this.counters = new Map();
    }
    cleanup() {
        const now = this.clock();
        for (const [id, e] of this.entries)if (Date.parse(e.view.session.expiresAt) <= now) this.entries.delete(id);
        for (const [key, value] of this.counters)if (value.expires <= now) this.counters.delete(key);
    }
    entry(owner, id) {
        this.cleanup();
        const e = this.entries.get(id);
        if (!e || e.owner !== owner) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('NOT_FOUND', 404);
        for (const t of e.view.turns)if (t.state === 'pending' && (e.leases.get(t.id) ?? 0) <= this.clock()) {
            t.state = 'failed';
            t.errorCode = 'MODEL_TIMEOUT';
        }
        return e;
    }
    async list(owner) {
        this.cleanup();
        return structuredClone([
            ...this.entries.values()
        ].filter((e)=>e.owner === owner).map((e)=>e.view.session).sort((a, b)=>b.createdAt.localeCompare(a.createdAt)));
    }
    async create(owner, preset, mode) {
        this.cleanup();
        if (this.entries.size >= 200 || [
            ...this.entries.values()
        ].filter((e)=>e.owner === owner).length >= 10) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('SESSION_LIMIT', 429);
        const now = this.clock();
        const session = {
            id: (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(),
            preset: structuredClone(preset),
            mode,
            createdAt: new Date(now).toISOString(),
            expiresAt: new Date(now + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_DAYS"] * 86400000).toISOString()
        };
        this.entries.set(session.id, {
            owner,
            view: {
                session,
                turns: []
            },
            leases: new Map()
        });
        return structuredClone(session);
    }
    async read(owner, id) {
        return structuredClone(this.entry(owner, id).view);
    }
    async remove(owner, id) {
        this.entry(owner, id);
        this.entries.delete(id);
    }
    async begin(owner, id, requestId, text) {
        // 이 메서드의 검사~기록 사이에는 await가 없다. 단일 프로세스 데모용일 뿐 분산 제한이 아니다.
        const e = this.entry(owner, id);
        const existing = e.view.turns.find((t)=>t.id === requestId);
        if (existing) {
            if (existing.text !== text) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('REQUEST_CONFLICT', 409);
            if (existing.state === 'pending') throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('BUSY', 409);
            return {
                cached: true,
                turn: structuredClone(existing),
                view: structuredClone(e.view)
            };
        }
        if (e.view.turns.some((t)=>t.state === 'pending')) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('BUSY', 409);
        if (e.view.turns.length >= 100) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('SESSION_LIMIT', 429);
        const now = this.clock();
        const keys = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quotaKeys"])(owner, new Date(now), this.limits);
        if (keys.some((k)=>(this.counters.get(k.key)?.count || 0) >= k.limit)) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('RATE_LIMIT', 429, 60);
        for (const k of keys)this.counters.set(k.key, {
            count: (this.counters.get(k.key)?.count || 0) + 1,
            expires: now + 86400000
        });
        const turn = {
            id: requestId,
            seq: e.view.turns.length + 1,
            text,
            state: 'pending',
            answer: null,
            errorCode: null,
            createdAt: new Date(now).toISOString()
        };
        e.view.turns.push(turn);
        e.leases.set(requestId, now + __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LEASE_MS"]);
        return {
            cached: false,
            turn: structuredClone(turn),
            view: structuredClone(e.view)
        };
    }
    async complete(owner, id, requestId, answer) {
        const e = this.entry(owner, id);
        const t = e.view.turns.find((t)=>t.id === requestId);
        if (!t || t.state !== 'pending') throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('REQUEST_CONFLICT', 409);
        t.state = 'complete';
        t.answer = structuredClone(answer);
        e.leases.delete(requestId);
        return structuredClone(t);
    }
    async fail(owner, id, requestId, code) {
        const e = this.entries.get(id);
        if (!e || e.owner !== owner) return;
        const t = e.view.turns.find((t)=>t.id === requestId);
        if (t?.state === 'pending') {
            t.state = code === 'MODEL_BLOCKED' ? 'blocked' : 'failed';
            t.errorCode = code;
            e.leases.delete(requestId);
        }
    }
}
}),
"[project]/src/lib/server/postgres-store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PostgresStore",
    ()=>PostgresStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:crypto [external] (node:crypto, cjs)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/store.ts [app-route] (ecmascript)");
;
;
;
function session(row) {
    return {
        id: row.id,
        preset: row.preset_snapshot,
        mode: row.mode,
        createdAt: row.created_at.toISOString(),
        expiresAt: row.expires_at.toISOString()
    };
}
function turn(row) {
    const stale = row.state === 'pending' && row.lease_until.getTime() <= Date.now();
    return {
        id: row.request_id,
        seq: row.seq,
        text: row.text,
        state: stale ? 'failed' : row.state,
        answer: row.answer,
        errorCode: stale ? 'MODEL_TIMEOUT' : row.error_code,
        createdAt: row.created_at.toISOString()
    };
}
class PostgresStore {
    pool;
    limits;
    constructor(pool, limits = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["DEFAULT_LIMITS"]){
        this.pool = pool;
        this.limits = limits;
    }
    async tx(fn) {
        const c = await this.pool.connect();
        try {
            await c.query('BEGIN');
            const value = await fn(c);
            await c.query('COMMIT');
            return value;
        } catch (e) {
            await c.query('ROLLBACK').catch(()=>undefined);
            throw e;
        } finally{
            c.release();
        }
    }
    async owned(c, owner, id) {
        const r = await c.query('SELECT * FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 AND expires_at>now() FOR UPDATE', [
            id,
            owner
        ]);
        if (!r.rows[0]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('NOT_FOUND', 404);
        return session(r.rows[0]);
    }
    async list(owner) {
        const r = await this.pool.query('SELECT * FROM lincoln_sessions WHERE owner_hash=$1 AND expires_at>now() ORDER BY created_at DESC LIMIT 10', [
            owner
        ]);
        return r.rows.map(session);
    }
    async create(owner, preset, mode) {
        return this.tx(async (c)=>{
            // 같은 소유자의 방 생성을 직렬화한다. 짧은 트랜잭션 동안만 잠근다.
            await c.query('SELECT pg_advisory_xact_lock(hashtextextended($1,0))', [
                owner
            ]);
            const count = await c.query('SELECT count(*) AS n FROM lincoln_sessions WHERE owner_hash=$1 AND expires_at>now()', [
                owner
            ]);
            if (Number(count.rows[0].n) >= 10) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('SESSION_LIMIT', 429);
            const r = await c.query(`INSERT INTO lincoln_sessions(id,owner_hash,preset_snapshot,mode,expires_at)
        VALUES($1,$2,$3::jsonb,$4,now()+($5::text || ' days')::interval) RETURNING *`, [
                (0, __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$crypto__$5b$external$5d$__$28$node$3a$crypto$2c$__cjs$29$__["randomUUID"])(),
                owner,
                JSON.stringify(preset),
                mode,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["SESSION_DAYS"]
            ]);
            return session(r.rows[0]);
        });
    }
    async read(owner, id) {
        const r = await this.pool.query('SELECT * FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 AND expires_at>now()', [
            id,
            owner
        ]);
        if (!r.rows[0]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('NOT_FOUND', 404);
        const t = await this.pool.query(`SELECT t.* FROM lincoln_turns t JOIN lincoln_sessions s ON s.id=t.session_id
      WHERE s.id=$1 AND s.owner_hash=$2 AND s.expires_at>now() ORDER BY t.seq`, [
            id,
            owner
        ]);
        return {
            session: session(r.rows[0]),
            turns: t.rows.map(turn)
        };
    }
    async remove(owner, id) {
        const r = await this.pool.query('DELETE FROM lincoln_sessions WHERE id=$1 AND owner_hash=$2 RETURNING id', [
            id,
            owner
        ]);
        if (!r.rowCount) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('NOT_FOUND', 404);
    }
    async begin(owner, id, requestId, text) {
        return this.tx(async (c)=>{
            const s = await this.owned(c, owner, id);
            await c.query(`UPDATE lincoln_turns SET state='failed', error_code='MODEL_TIMEOUT' WHERE session_id=$1 AND state='pending' AND lease_until<=now()`, [
                id
            ]);
            const rows = await c.query('SELECT * FROM lincoln_turns WHERE session_id=$1 ORDER BY seq', [
                id
            ]);
            const turns = rows.rows.map(turn);
            const existing = turns.find((t)=>t.id === requestId);
            if (existing) {
                if (existing.text !== text) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('REQUEST_CONFLICT', 409);
                if (existing.state === 'pending') throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('BUSY', 409);
                return {
                    cached: true,
                    turn: existing,
                    view: {
                        session: s,
                        turns
                    }
                };
            }
            if (turns.some((t)=>t.state === 'pending')) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('BUSY', 409);
            if (turns.length >= 100) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('SESSION_LIMIT', 429);
            // 글로벌 → 소유자 일 → 소유자 분 순서로 원자적으로 생성 시도 예산을 예약한다.
            const time = await c.query('SELECT now() AS at');
            for (const bucket of (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["quotaKeys"])(owner, time.rows[0].at, this.limits)){
                const used = await c.query(`INSERT INTO lincoln_quotas(bucket,used,expires_at) VALUES($1,1,now()+interval '2 days')
          ON CONFLICT(bucket) DO UPDATE SET used=lincoln_quotas.used+1
          WHERE lincoln_quotas.used<$2 RETURNING used`, [
                    bucket.key,
                    bucket.limit
                ]);
                if (!used.rowCount) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('RATE_LIMIT', 429, 60);
            }
            const inserted = await c.query(`INSERT INTO lincoln_turns(session_id,request_id,seq,text,state,lease_until)
        VALUES($1,$2,$3,$4,'pending',now()+($5::text || ' milliseconds')::interval) RETURNING *`, [
                id,
                requestId,
                turns.length + 1,
                text,
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["LEASE_MS"]
            ]);
            const t = turn(inserted.rows[0]);
            return {
                cached: false,
                turn: t,
                view: {
                    session: s,
                    turns: [
                        ...turns,
                        t
                    ]
                }
            };
        });
    }
    async complete(owner, id, requestId, answer) {
        const r = await this.pool.query(`UPDATE lincoln_turns t SET state='complete',answer=$4::jsonb,error_code=NULL
      FROM lincoln_sessions s WHERE t.session_id=s.id AND s.id=$1 AND s.owner_hash=$2 AND s.expires_at>now()
      AND t.request_id=$3 AND t.state='pending' AND t.lease_until>now() RETURNING t.*`, [
            id,
            owner,
            requestId,
            JSON.stringify(answer)
        ]);
        if (!r.rows[0]) throw new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["AppError"]('REQUEST_CONFLICT', 409);
        return turn(r.rows[0]);
    }
    async fail(owner, id, requestId, code) {
        await this.pool.query(`UPDATE lincoln_turns t SET state=$4,error_code=$5 FROM lincoln_sessions s
      WHERE t.session_id=s.id AND s.id=$1 AND s.owner_hash=$2 AND t.request_id=$3 AND t.state='pending'`, [
            id,
            owner,
            requestId,
            code === 'MODEL_BLOCKED' ? 'blocked' : 'failed',
            code
        ]);
    }
}
}),
"[project]/src/lib/server/runtime.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s([
    "getStore",
    ()=>getStore
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__ = __turbopack_context__.i("[externals]/pg [external] (pg, esm_import, [project]/node_modules/pg)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/config.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$memory$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/memory-store.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$postgres$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/server/postgres-store.ts [app-route] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
;
const shared = globalThis;
function getStore() {
    if ((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getMode"])() === 'demo') return shared.lincolnDemo ??= new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$memory$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["MemoryStore"]((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limits"])());
    if (!shared.lincolnPg) {
        const config = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getLiveConfig"])();
        // 관리형 PostgreSQL의 TLS 설정은 공급자가 준 연결 문자열을 사용한다. 인증서 검증을 끄지 않는다.
        const pool = new __TURBOPACK__imported__module__$5b$externals$5d2f$pg__$5b$external$5d$__$28$pg$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$pg$29$__["Pool"]({
            connectionString: config.database,
            max: 3,
            connectionTimeoutMillis: 8000,
            idleTimeoutMillis: 10000,
            statement_timeout: 10000
        });
        pool.on('error', ()=>console.error(JSON.stringify({
                event: 'database_pool_error'
            })));
        shared.lincolnPg = new __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$postgres$2d$store$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["PostgresStore"](pool, (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$server$2f$config$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["limits"])());
    }
    return shared.lincolnPg;
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/src/lib/server/store.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_LIMITS",
    ()=>DEFAULT_LIMITS,
    "LEASE_MS",
    ()=>LEASE_MS,
    "SESSION_DAYS",
    ()=>SESSION_DAYS,
    "quotaKeys",
    ()=>quotaKeys
]);
const DEFAULT_LIMITS = {
    globalDaily: 100,
    ownerDaily: 30,
    ownerMinute: 6
};
const LEASE_MS = 120000;
const SESSION_DAYS = 7;
function quotaKeys(owner, now, limits) {
    const day = now.toISOString().slice(0, 10);
    const minute = now.toISOString().slice(0, 16);
    return [
        {
            key: `global:${day}`,
            limit: limits.globalDaily
        },
        {
            key: `owner:${owner}:${day}`,
            limit: limits.ownerDaily
        },
        {
            key: `minute:${owner}:${minute}`,
            limit: limits.ownerMinute
        }
    ];
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1auw8z7._.js.map