(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/src/components/ChatApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatApp
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/catalog.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/errors.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
async function request(path, code, signal, method = 'GET', body) {
    const response = await fetch(path, {
        method,
        signal,
        cache: 'no-store',
        credentials: 'same-origin',
        headers: {
            ...body !== undefined ? {
                'Content-Type': 'application/json'
            } : {},
            ...code ? {
                'x-classroom-code': code
            } : {}
        },
        ...body !== undefined ? {
            body: JSON.stringify(body)
        } : {}
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data?.error?.message || '서버 통신 중 오류가 발생했습니다.');
    return data;
}
function TurnCard({ turn, preset }) {
    const answer = turn.answer;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "turn",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "user-bubble",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "eyebrow",
                        children: "나의 질문"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 19,
                        columnNumber: 34
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: turn.text
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 19,
                        columnNumber: 72
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, this),
            turn.state === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "notice",
                children: "서버에서 처리 중입니다. 잠시 후 ‘대화 다시 불러오기’를 누르세요."
            }, void 0, false, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 20,
                columnNumber: 34
            }, this),
            (turn.state === 'failed' || turn.state === 'blocked') && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error",
                role: "status",
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$errors$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["messageFor"])(turn.errorCode || 'INTERNAL_ERROR')
            }, void 0, false, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 21,
                columnNumber: 63
            }, this),
            answer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "answer-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "answer-heading",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "badge",
                                children: answer.mode === 'demo' ? '고정 연습 예시' : 'AI 생성 대사 · 실제 발언 아님'
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 23,
                                columnNumber: 39
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: preset.cutoffDate
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 23,
                                columnNumber: 131
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 23,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        children: "링컨의 관점에서"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 24,
                        columnNumber: 7
                    }, this),
                    answer.actor.paragraphs.map((p, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "dialogue",
                            children: p
                        }, i, false, {
                            fileName: "[project]/src/components/ChatApp.tsx",
                            lineNumber: 25,
                            columnNumber: 45
                        }, this)),
                    answer.actor.uncertainty && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "limitation",
                        children: [
                            "재현의 한계 · ",
                            answer.actor.uncertainty
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 26,
                        columnNumber: 36
                    }, this),
                    answer.quotes.map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                            className: "quote-card",
                            "aria-label": "등록 사료 인용",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        "등록 원문 발췌 · ",
                                        q.source.title
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 28,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("blockquote", {
                                    lang: "en",
                                    children: q.original
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 29,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "small-label",
                                            children: "한국어 번역 초안 · 미검토"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 30,
                                            columnNumber: 12
                                        }, this),
                                        q.koreanDraft
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 30,
                                    columnNumber: 9
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    href: q.source.url,
                                    target: "_blank",
                                    rel: "noopener noreferrer",
                                    children: "전사문 출처 열기 ↗"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 31,
                                    columnNumber: 9
                                }, this)
                            ]
                        }, q.id, true, {
                            fileName: "[project]/src/components/ChatApp.tsx",
                            lineNumber: 27,
                            columnNumber: 31
                        }, this)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "historian",
                        open: true,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: [
                                    "현대 역사 해설 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "AI 자동 검토 · 전문가 검증 아님"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 34,
                                        columnNumber: 27
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 34,
                                columnNumber: 9
                            }, this),
                            answer.historian ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dl", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "시점 검토"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 36,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: answer.historian.timeCheck
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 36,
                                        columnNumber: 25
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "자료로 확인할 사실"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 37,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: answer.historian.facts
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 37,
                                        columnNumber: 30
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "해석과 추론"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 38,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: answer.historian.interpretations
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 38,
                                        columnNumber: 26
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dt", {
                                        children: "미확인·제한 사항"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 39,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dd", {
                                        children: answer.historian.limitations
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 39,
                                        columnNumber: 29
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 35,
                                columnNumber: 29
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "notice",
                                children: "현대 해설 생성에 실패했습니다. 위 대사가 역사 검증을 통과했다는 뜻은 아닙니다."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 40,
                                columnNumber: 17
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 33,
                        columnNumber: 7
                    }, this),
                    answer.sources.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("details", {
                        className: "source-list",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("summary", {
                                children: [
                                    "연결된 자료 ",
                                    answer.sources.length,
                                    "건 · 전체 대사의 정확성을 보증하지 않음"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 42,
                                columnNumber: 70
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                children: answer.sources.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                href: s.url,
                                                target: "_blank",
                                                rel: "noopener noreferrer",
                                                children: [
                                                    s.title,
                                                    " (",
                                                    s.documentDate,
                                                    ") ↗"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/ChatApp.tsx",
                                                lineNumber: 43,
                                                columnNumber: 53
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: s.locator
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatApp.tsx",
                                                lineNumber: 43,
                                                columnNumber: 145
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: s.review
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ChatApp.tsx",
                                                lineNumber: 43,
                                                columnNumber: 163
                                            }, this)
                                        ]
                                    }, s.id, true, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 43,
                                        columnNumber: 38
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 43,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 42,
                        columnNumber: 37
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 22,
                columnNumber: 16
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatApp.tsx",
        lineNumber: 18,
        columnNumber: 10
    }, this);
}
_c = TurnCard;
function ChatApp({ mode }) {
    _s();
    const [sessions, setSessions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [view, setView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [codeInput, setCodeInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [unlocked, setUnlocked] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(mode === 'demo');
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pendingText, setPendingText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [pendingPreset, setPendingPreset] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const active = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const access = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])('');
    const bottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const dialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cancelButton = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const begin = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatApp.useCallback[begin]": ()=>{
            active.current?.abort();
            const c = new AbortController();
            active.current = c;
            setBusy(true);
            setError('');
            setPendingText('');
            return c;
        }
    }["ChatApp.useCallback[begin]"], []);
    const current = (c)=>active.current === c && !c.signal.aborted;
    const finish = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatApp.useCallback[finish]": (c)=>{
            if (active.current === c) {
                active.current = null;
                setBusy(false);
                setPendingText('');
            }
        }
    }["ChatApp.useCallback[finish]"], []);
    const initialize = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatApp.useCallback[initialize]": async (code)=>{
            const c = begin();
            access.current = code;
            try {
                const list = await request('/api/sessions', code, c.signal);
                let selected = list.sessions[0];
                if (!selected) {
                    selected = (await request('/api/sessions', code, c.signal, 'POST', {
                        presetId: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PRESET"]
                    })).session;
                    list.sessions.unshift(selected);
                }
                const data = await request(`/api/sessions/${selected.id}`, code, c.signal);
                if (active.current !== c || c.signal.aborted) return;
                setSessions(list.sessions);
                setView(data);
                setUnlocked(true);
            } catch (e) {
                if (active.current === c && !c.signal.aborted) setError(e instanceof Error ? e.message : '연결 오류');
            } finally{
                finish(c);
            }
        }
    }["ChatApp.useCallback[initialize]"], [
        begin,
        finish
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatApp.useEffect": ()=>{
            if (mode === 'demo') void initialize('');
            return ({
                "ChatApp.useEffect": ()=>{
                    active.current?.abort();
                    active.current = null;
                }
            })["ChatApp.useEffect"];
        }
    }["ChatApp.useEffect"], [
        mode,
        initialize
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatApp.useEffect": ()=>{
            bottom.current?.scrollIntoView({
                behavior: 'smooth',
                block: 'end'
            });
        }
    }["ChatApp.useEffect"], [
        view?.turns.length,
        busy
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatApp.useEffect": ()=>{
            if (pendingPreset && dialog.current && !dialog.current.open) {
                dialog.current.showModal();
                cancelButton.current?.focus();
            }
            if (!pendingPreset && dialog.current?.open) dialog.current.close();
        }
    }["ChatApp.useEffect"], [
        pendingPreset
    ]);
    async function openSession(id) {
        const c = begin();
        try {
            const data = await request(`/api/sessions/${id}`, access.current, c.signal);
            if (current(c)) {
                setView(data);
                setInput('');
            }
        } catch (e) {
            if (current(c)) setError(e instanceof Error ? e.message : '연결 오류');
        } finally{
            finish(c);
        }
    }
    async function createSession(preset) {
        setPendingPreset(null);
        const c = begin();
        try {
            const data = await request('/api/sessions', access.current, c.signal, 'POST', {
                presetId: preset.id
            });
            if (!current(c)) return;
            setView({
                session: data.session,
                turns: []
            });
            setSessions((prev)=>[
                    data.session,
                    ...prev
                ]);
            setInput('');
        } catch (e) {
            if (current(c)) setError(e instanceof Error ? e.message : '연결 오류');
        } finally{
            finish(c);
        }
    }
    async function deleteSession() {
        if (!view || !window.confirm('이 대화방과 질문·응답을 삭제할까요? 되돌릴 수 없습니다.')) return;
        const id = view.session.id;
        const c = begin();
        try {
            await request(`/api/sessions/${id}`, access.current, c.signal, 'DELETE');
            if (!current(c)) return;
            setSessions((prev)=>prev.filter((s)=>s.id !== id));
            setView(null);
            setInput('');
        } catch (e) {
            if (current(c)) setError(e instanceof Error ? e.message : '연결 오류');
        } finally{
            finish(c);
        }
    }
    async function send() {
        const text = input.trim();
        if (!view || !text || active.current) return;
        const sessionId = view.session.id;
        const c = begin();
        setPendingText(text);
        setInput('');
        try {
            const data = await request(`/api/sessions/${sessionId}/messages`, access.current, c.signal, 'POST', {
                clientRequestId: crypto.randomUUID(),
                text
            });
            if (!current(c)) return;
            setView((prev)=>prev?.session.id === sessionId ? {
                    ...prev,
                    turns: [
                        ...prev.turns.filter((t)=>t.id !== data.turn.id),
                        data.turn
                    ]
                } : prev);
        } catch (e) {
            if (current(c)) {
                setError(e instanceof Error ? e.message : '연결 오류');
                setInput(text);
            }
        } finally{
            finish(c);
        }
    }
    function cancelRequest() {
        const c = active.current;
        active.current = null;
        c?.abort();
        setBusy(false);
        setPendingText('');
        setError('화면의 대기를 중지했습니다. 서버 처리·과금까지 취소되었다는 뜻은 아닙니다. 대화를 다시 불러와 확인하세요.');
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                className: "skip-link",
                href: "#question",
                children: "질문 입력으로 이동"
            }, void 0, false, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 146,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "brand-kicker",
                                children: "HISTORY / EVIDENCE / DIALOGUE"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 147,
                                columnNumber: 37
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                children: "Lincoln History Lab"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 147,
                                columnNumber: 98
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "링컨의 시대를 묻고, 사료로 다시 읽기"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 147,
                                columnNumber: 126
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 147,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: `mode-badge ${mode}`,
                        children: mode === 'demo' ? '연습 모드 · AI 호출 없음' : '실제 AI 모드 · 이용 비용 발생 가능'
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 147,
                        columnNumber: 160
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 147,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "intro-strip",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "역사 시뮬레이션, 실제 인물의 답변이 아닙니다."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 148,
                        columnNumber: 34
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "생성 대사 · 원문 발췌 · 번역 초안 · 현대 해설을 구별해 읽으세요."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 148,
                        columnNumber: 77
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 148,
                columnNumber: 5
            }, this),
            mode === 'demo' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "demo-warning",
                children: "연습 모드는 질문을 분석하지 않고 시점별 고정 예시를 보여 줍니다. 대화는 서버 메모리에 임시 보관되며 서버 재시작·만료 시 사라질 수 있습니다."
            }, void 0, false, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 149,
                columnNumber: 25
            }, this),
            !unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "unlock",
                onSubmit: (e)=>{
                    e.preventDefault();
                    void initialize(codeInput.trim());
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "수업 입장 코드"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 150,
                        columnNumber: 119
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "운영자가 설정한 코드를 입력하세요. Gemini API 키를 입력하는 칸이 아닙니다."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 150,
                        columnNumber: 136
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        htmlFor: "class-code",
                        children: "입장 코드"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 150,
                        columnNumber: 190
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        id: "class-code",
                        type: "password",
                        autoComplete: "off",
                        value: codeInput,
                        maxLength: 256,
                        onChange: (e)=>setCodeInput(e.target.value)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 150,
                        columnNumber: 231
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        disabled: busy || !codeInput.trim(),
                        children: "입장"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 150,
                        columnNumber: 370
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 150,
                columnNumber: 19
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "error global-error",
                role: "alert",
                children: [
                    error,
                    view && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void openSession(view.session.id),
                        children: "대화 다시 불러오기"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 151,
                        columnNumber: 80
                    }, this),
                    !view && unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>void initialize(access.current),
                        children: "연결 다시 시도"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 151,
                        columnNumber: 180
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 151,
                columnNumber: 15
            }, this),
            unlocked && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "sidebar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "역사적 시점"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 153,
                                columnNumber: 34
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                htmlFor: "timeline",
                                children: "새 대화의 날짜"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 153,
                                columnNumber: 49
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                id: "timeline",
                                value: view?.session.preset.id || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DEFAULT_PRESET"],
                                onChange: (e)=>{
                                    const p = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESETS"].find((p)=>p.id === e.target.value);
                                    if (p) setPendingPreset(p);
                                },
                                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESETS"].map((p)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: p.id,
                                        children: p.label
                                    }, p.id, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 153,
                                        columnNumber: 283
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 153,
                                columnNumber: 91
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "outline full",
                                onClick: ()=>setPendingPreset(view?.session.preset || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESETS"][3]),
                                children: "이 시점으로 새 대화"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 154,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sidebar-divider"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 155,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: [
                                    "내 대화방 ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: [
                                            sessions.length,
                                            "/10"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 155,
                                        columnNumber: 53
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 155,
                                columnNumber: 43
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "이 브라우저의 소유자 쿠키로 구별합니다. 쿠키를 지우면 다시 찾을 수 없습니다."
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 155,
                                columnNumber: 91
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                className: "session-list",
                                children: sessions.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: view?.session.id === s.id ? 'selected' : '',
                                            onClick: ()=>void openSession(s.id),
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    children: s.preset.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 175
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    children: new Date(s.createdAt).toLocaleString('ko-KR')
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 156,
                                                    columnNumber: 204
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 156,
                                            columnNumber: 72
                                        }, this)
                                    }, s.id, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 156,
                                        columnNumber: 57
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 156,
                                columnNumber: 9
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: [
                                    "최대 7일 후 만료 · 방당 100개 질문",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                        fileName: "[project]/src/components/ChatApp.tsx",
                                        lineNumber: 157,
                                        columnNumber: 53
                                    }, this),
                                    "개인정보·학생 이름을 입력하지 마세요."
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 157,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 153,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                        className: "chat-panel",
                        "aria-label": "역사 대화",
                        children: view ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "chat-toolbar",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "eyebrow",
                                                    children: "현재 고정된 시점"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 54
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: view.session.preset.label
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 96
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: view.session.preset.office
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 132
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 160,
                                            columnNumber: 49
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "text-button",
                                            onClick: ()=>void deleteSession(),
                                            children: "대화 삭제"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 160,
                                            columnNumber: 173
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 160,
                                    columnNumber: 19
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "conversation",
                                    "aria-busy": busy,
                                    children: [
                                        view.turns.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                            className: "welcome",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "welcome-number",
                                                    children: "01 — ASK THE PAST"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 70
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                    children: [
                                                        "같은 질문도,",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/src/components/ChatApp.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 138
                                                        }, this),
                                                        "다른 시점에서 살펴보세요."
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 127
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: "예시 질문을 눌러 시작할 수 있습니다."
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 162
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "suggestions",
                                                    children: [
                                                        '노예 해방 선언은 모든 노예를 즉시 해방했나요?',
                                                        '연방 보존과 노예 해방은 어떤 관계인가요?',
                                                        '이 시점에서 무엇을 알 수 없나요?'
                                                    ].map((q)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            onClick: ()=>setInput(q),
                                                            children: q
                                                        }, q, false, {
                                                            fileName: "[project]/src/components/ChatApp.tsx",
                                                            lineNumber: 162,
                                                            columnNumber: 308
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 190
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "limitation",
                                                    children: view.session.preset.editorialWarning
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 162,
                                                    columnNumber: 372
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 162,
                                            columnNumber: 41
                                        }, this),
                                        view.turns.map((t)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TurnCard, {
                                                turn: t,
                                                preset: view.session.preset
                                            }, t.id, false, {
                                                fileName: "[project]/src/components/ChatApp.tsx",
                                                lineNumber: 163,
                                                columnNumber: 34
                                            }, this)),
                                        busy && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "loading",
                                            role: "status",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "spinner"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 61
                                                }, this),
                                                pendingText ? '답변을 준비하고 있습니다…' : '대화를 불러오고 있습니다…',
                                                pendingText && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    children: [
                                                        "보낸 질문: ",
                                                        pendingText
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 155
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: cancelRequest,
                                                    children: "대기 중지"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 164,
                                                    columnNumber: 183
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 164,
                                            columnNumber: 22
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            ref: bottom
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 165,
                                            columnNumber: 13
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 161,
                                    columnNumber: 11
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                    className: "composer",
                                    onSubmit: (e)=>{
                                        e.preventDefault();
                                        void send();
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            htmlFor: "question",
                                            children: "링컨에게 질문하기"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 167,
                                            columnNumber: 91
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                            id: "question",
                                            placeholder: "사료와 당시의 관점을 물어보세요.",
                                            value: input,
                                            maxLength: 4000,
                                            rows: 3,
                                            onChange: (e)=>setInput(e.target.value),
                                            onKeyDown: (e)=>{
                                                if (!e.nativeEvent.isComposing && e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    void send();
                                                }
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 167,
                                            columnNumber: 134
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                    children: [
                                                        input.length,
                                                        "/4,000 · Enter 전송 / Shift+Enter 줄바꿈"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 404
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    type: "submit",
                                                    disabled: busy || !input.trim(),
                                                    children: "질문 보내기"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ChatApp.tsx",
                                                    lineNumber: 167,
                                                    columnNumber: 468
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/ChatApp.tsx",
                                            lineNumber: 167,
                                            columnNumber: 399
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 167,
                                    columnNumber: 11
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ChatApp.tsx",
                            lineNumber: 160,
                            columnNumber: 17
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "welcome",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "대화를 선택하거나 새로 만들어 주세요."
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 168,
                                    columnNumber: 40
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    disabled: busy,
                                    onClick: ()=>void createSession(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$catalog$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PRESETS"][3]),
                                    children: "1863년 연습 대화 만들기"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ChatApp.tsx",
                                    lineNumber: 168,
                                    columnNumber: 70
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ChatApp.tsx",
                            lineNumber: 168,
                            columnNumber: 15
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 159,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 152,
                columnNumber: 18
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                children: "V5 입문판 · 자유 생성의 오류와 시대착오를 완전히 차단하지 못합니다. 공개 수업 전 사료·번역·개인정보·이용 연령 조건을 검토하세요."
            }, void 0, false, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 171,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("dialog", {
                ref: dialog,
                className: "timeline-dialog",
                "aria-labelledby": "dialog-title",
                onCancel: (e)=>{
                    e.preventDefault();
                    setPendingPreset(null);
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        id: "dialog-title",
                        children: "새로운 시점으로 대화할까요?"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 172,
                        columnNumber: 149
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: pendingPreset?.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 172,
                        columnNumber: 191
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "기존 대화는 보존됩니다. 진행 중인 요청의 화면 대기는 중지되며, 이전 응답은 새 대화에 섞이지 않습니다."
                    }, void 0, false, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 172,
                        columnNumber: 220
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                ref: cancelButton,
                                className: "outline",
                                onClick: ()=>setPendingPreset(null),
                                children: "취소"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 172,
                                columnNumber: 291
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>{
                                    if (pendingPreset) void createSession(pendingPreset);
                                },
                                children: "새 대화 만들기"
                            }, void 0, false, {
                                fileName: "[project]/src/components/ChatApp.tsx",
                                lineNumber: 172,
                                columnNumber: 388
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ChatApp.tsx",
                        lineNumber: 172,
                        columnNumber: 286
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ChatApp.tsx",
                lineNumber: 172,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ChatApp.tsx",
        lineNumber: 145,
        columnNumber: 10
    }, this);
}
_s(ChatApp, "PbbvOX9WrSYdCkIBVxDmpIr+wn4=");
_c1 = ChatApp;
var _c, _c1;
__turbopack_context__.k.register(_c, "TurnCard");
__turbopack_context__.k.register(_c1, "ChatApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/catalog.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DEFAULT_PRESET",
    ()=>DEFAULT_PRESET,
    "PRESETS",
    ()=>PRESETS,
    "PROMPT_VERSION",
    ()=>PROMPT_VERSION,
    "QUOTES",
    ()=>QUOTES,
    "SOURCES",
    ()=>SOURCES,
    "SOURCE_VERSION",
    ()=>SOURCE_VERSION,
    "eligibleQuotes",
    ()=>eligibleQuotes,
    "eligibleSources",
    ()=>eligibleSources,
    "findPreset",
    ()=>findPreset
]);
const PROMPT_VERSION = 'lincoln-v5-1';
const SOURCE_VERSION = 'three-transcripts-starter-1';
const PRESETS = [
    {
        id: '1858-10',
        label: '1858.10.16 · 상원의원 선거',
        cutoffDate: '1858-10-16',
        timePolicy: '1858년 10월 15일까지의 사건만 확정적으로 사용한다.',
        office: '일리노이 공화당 연방 상원의원 후보, 전 연방 하원의원',
        brief: '당시의 지위로 말한다. 대통령이라고 자신을 소개하지 않는다.',
        editorialWarning: '이 입문판에는 1858년 이전 원문 발췌가 아직 없습니다. 구체적인 입장 재현에는 사료 확충이 필요합니다.'
    },
    {
        id: '1861-03',
        label: '1861.03.05 · 취임 직후',
        cutoffDate: '1861-03-05',
        timePolicy: '1861년 3월 4일까지의 사건만 확정적으로 사용한다.',
        office: '미국 대통령',
        brief: '제1차 취임사의 연방 보존과 기존 노예제에 대한 간섭 부인 약속을 구별한다.',
        editorialWarning: '등록된 발췌는 제1차 취임사 일부입니다. 남부 분리 과정 전체를 검증하는 자료 묶음은 아닙니다.'
    },
    {
        id: '1862-08',
        label: '1862.08.23 · 그릴리 서한',
        cutoffDate: '1862-08-23',
        timePolicy: '1862년 8월 22일까지의 사건만 확정적으로 사용한다.',
        office: '미국 대통령',
        brief: '서한의 공적 직무상 목적과 개인적 소망을 구별한다. 사료 없이 내면이나 비밀 의도를 꾸미지 않는다.',
        editorialWarning: '그릴리 서한만으로 노예제에 대한 모든 입장과 정책 결정을 설명할 수는 없습니다.'
    },
    {
        id: '1863-01',
        label: '1863.01.02 · 해방 선언 직후',
        cutoffDate: '1863-01-02',
        timePolicy: '1863년 1월 1일까지의 사건만 확정적으로 사용한다.',
        office: '미국 대통령',
        brief: '해방 선언의 지정 지역, 예외 지역, 전쟁 조치의 성격을 구별한다. 미국 전체의 노예제가 즉시 폐지되었다고 말하지 않는다.',
        editorialWarning: '해방 선언의 실제 효력과 노예였던 사람들의 행위는 별도의 사료 검토가 필요합니다.'
    },
    {
        id: '1865-04',
        label: '1865.04.14 오전 · 재건 논의',
        cutoffDate: '1865-04-14',
        timePolicy: '1865년 4월 14일 오전의 인물이다. 확인된 사건 정보는 전날까지로 제한한다.',
        office: '미국 대통령',
        brief: '이후 사건을 알고 있거나 예언하는 표현을 피한다. 수정헌법 제13조의 의회 통과와 비준 완료를 혼동하지 않는다.',
        editorialWarning: '이 입문판에는 1865년 재건·참정권 관련 원문이 아직 없습니다. 해당 주제의 상세 재현은 제한됩니다.'
    }
];
const DEFAULT_PRESET = '1863-01';
const SOURCES = [
    {
        id: 'first-inaugural',
        title: '제1차 취임사',
        documentDate: '1861-03-04',
        availableFrom: '1861-03-04',
        url: 'https://www.nps.gov/liho/learn/historyculture/firstinaugural.htm',
        locator: '본문 중 I have no purpose로 시작하는 인용 문장',
        kind: 'primary-transcript',
        review: '공개 전사문 발췌 대조. 원본 이미지·이본 대조 및 인간 연구자 검토는 미완료.',
        excerpt: 'I have no purpose, directly or indirectly, to interfere with the institution of slavery in the States where it exists.',
        context: '노예제가 존재하는 주에서의 간섭 부인 약속이다. 노예제 확산에 대한 모든 입장을 이 한 문장으로 환원하지 않는다.'
    },
    {
        id: 'greeley',
        title: '호러스 그릴리에게 보낸 서한',
        documentDate: '1862-08-22',
        availableFrom: '1862-08-22',
        url: 'https://housedivided.dickinson.edu/sites/lincoln/letter-to-horace-greeley-august-22-1862/',
        locator: 'Searchable Text, My paramount object 문장 및 마지막 문단',
        kind: 'primary-transcript',
        review: '대학 공개 전사문 발췌 대조. 원본 이미지·이본 대조 및 인간 연구자 검토는 미완료.',
        excerpt: 'My paramount object in this struggle is to save the Union, and is not either to save or to destroy slavery.\nI have here stated my purpose according to my view of official duty; and I intend no modification of my oft-expressed personal wish that all men every where could be free.',
        context: '공적 직무에 대한 설명과 모든 사람의 자유를 바라는 개인적 소망을 구분한다. 서한의 공개일과 작성일은 별개다.'
    },
    {
        id: 'emancipation',
        title: '노예 해방 선언',
        documentDate: '1863-01-01',
        availableFrom: '1863-01-01',
        url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation',
        locator: 'Transcript, And by virtue 문단 및 And I further declare 문단',
        kind: 'primary-transcript',
        review: '미 국립문서기록관리청 전사문 발췌 대조. 인간 연구자와 번역자의 검토는 미완료.',
        excerpt: 'And by virtue of the power, and for the purpose aforesaid, I do order and declare that all persons held as slaves within said designated States, and parts of States, are, and henceforward shall be free; and that the Executive government of the United States, including the military and naval authorities thereof, will recognize and maintain the freedom of said persons.\nAnd I further declare and make known, that such persons of suitable condition, will be received into the armed service of the United States to garrison forts, positions, stations, and other places, and to man vessels of all sorts in said service.',
        context: '본문은 반란 중인 지정 주와 주의 일부를 열거하고 예외 지역도 명시한다. 충성파 경계 주의 노예제는 이 선언으로 폐지되지 않았다. 자유의 실현은 군사적 진전에 의존했다.'
    }
];
const QUOTES = [
    {
        id: 'q-first-inaugural',
        sourceId: 'first-inaugural',
        original: SOURCES[0].excerpt,
        koreanDraft: '나는 노예제가 존재하는 주에서 그 제도에 직접적으로든 간접적으로든 간섭할 의도가 없습니다.',
        translationStatus: 'draft',
        isExcerpt: true
    },
    {
        id: 'q-greeley-duty',
        sourceId: 'greeley',
        original: 'My paramount object in this struggle is to save the Union, and is not either to save or to destroy slavery.',
        koreanDraft: '이 투쟁에서 나의 가장 중요한 목적은 연방을 구하는 것이며, 노예제를 보존하거나 없애는 것 자체가 아닙니다.',
        translationStatus: 'draft',
        isExcerpt: true
    },
    {
        id: 'q-greeley-wish',
        sourceId: 'greeley',
        original: 'I have here stated my purpose according to my view of official duty; and I intend no modification of my oft-expressed personal wish that all men every where could be free.',
        koreanDraft: '여기서는 공적 직무에 대한 나의 견해에 따라 목적을 밝혔습니다. 어디서나 모든 사람이 자유롭기를 바란다고 거듭 표현해 온 개인적 소망을 바꾸려는 뜻은 없습니다.',
        translationStatus: 'draft',
        isExcerpt: true
    },
    {
        id: 'q-emancipation-service',
        sourceId: 'emancipation',
        original: 'And I further declare and make known, that such persons of suitable condition, will be received into the armed service of the United States to garrison forts, positions, stations, and other places, and to man vessels of all sorts in said service.',
        koreanDraft: '또한 적합한 조건을 갖춘 그러한 사람들을 미국의 군 복무에 받아들여 요새·진지·주둔지 등에서 복무하고 여러 종류의 군용 선박에 승선하게 할 것임을 선언합니다.',
        translationStatus: 'draft',
        isExcerpt: true
    }
];
function findPreset(id) {
    return PRESETS.find((p)=>p.id === id);
}
function eligibleSources(preset) {
    // 모든 시작 프리셋은 당일 사건을 제외한다. 날짜 문자열은 서버 상수의 ISO 형식이다.
    return SOURCES.filter((s)=>s.documentDate < preset.cutoffDate && s.availableFrom < preset.cutoffDate);
}
function eligibleQuotes(preset) {
    const ids = new Set(eligibleSources(preset).map((s)=>s.id));
    return QUOTES.filter((q)=>ids.has(q.sourceId));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/errors.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_13r5c53._.js.map