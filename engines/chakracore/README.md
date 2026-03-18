# ChakraCore / Chakra Edge

JavaScript engine of the original Microsoft Edge browser (now Microsoft Edge Legacy), later open-sourced as ChakraCore.

* Repository:  [chakra-core/ChakraCore](https://github.com/chakra-core/ChakraCore.git) <span class="shields"><img src="https://img.shields.io/github/stars/chakra-core/ChakraCore?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/chakra-core/ChakraCore?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [779986](# "cloc --fullpath --not_match_f='(?i)(test)' lib pal")
* Language:    C++
* License:     MIT
* Org:         Microsoft
* Standard:    ES2019
* Years:       2015-2021
* Ancestor:    [JScript9 / Chakra](../jscript9/README.md)
* Features:    WebAssembly engine, deferred parsing
* Interpreter: register-based VM
* JIT:         2-tier JIT, arm/arm64, x86/x64
* DLL:         chakra.dll, chakracore.dll

## History

Originally kept the same name as the predecessor - IE9-11's [Jscript9](../jscript9/README.md)
aka "Chakra" engine (jscript9.dll, or the *legacy engine*). Sometimes
called the *new Chakra* engine, *Edge engine* or chakra.dll to distinguish
from it. The APIs have a breakage in a couple of key functions between them:
[Edge vs. Legacy JsRT APIs](https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/hosting/chakra-hosting/targeting-edge-vs-legacy-engines-in-jsrt-apis).

Open-sourced in 2016 under the name ChakraCore, except for minor
components like COM/browser bindings that stay in the closed-source
chakra.dll.

Used in Microsoft Edge browser (now Microsoft Edge Legacy), which
launched in 2015 and was discontinued in 2020 in favor of Chromium
(Blink). Subsequently, Microsoft discontinued maintenance of
ChakraCore and stopped providing security patches in March 2021
([ref](https://github.com/chakra-core/ChakraCore/issues/6384)),
then passed it to a rather inactive community of external maintainers.
Continued production use (especially with JIT) is thus risky from
a security perspective. It has partial ES2020 support, with
BigInt behind a compile flag.

## Runtimes

* [Node-Chakracore](https://github.com/nodejs/node-chakracore) <span class="shields"><img src="https://img.shields.io/github/stars/nodejs/node-chakracore?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nodejs/node-chakracore?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Node.js on ChakraCore

## Links

* [ChakraCore resources: blog posts and talks](https://github.com/chakra-core/ChakraCore/wiki/Resources)
* [ChakraCore shell built-ins (WScriptJsrt.cpp)](https://github.com/chakra-core/ChakraCore/blob/master/bin/ch/WScriptJsrt.cpp#L1088)

## Conformance

<details><summary>ES1-ES5: 90%</summary><ul>
<li>ES1: 97%, <b>6 crashes</b><pre>
<a href="../../conformance/es1/Function.js">Function.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/asi.eval.js">asi.eval.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/eval.js">eval.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/typeof.undeclared.js">typeof.undeclared.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: crashed: SIGABRT
</pre></li>
<li>ES3: 89%, <b>11 crashes</b><pre>
<a href="../../conformance/es3/Error.js">Error.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/Error.prototype.toString.js">Error.prototype.toString.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Invalid character
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Invalid character
<a href="../../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: crashed: SIGSEGV
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: Invalid character
<a href="../../conformance/es3/try-catch-finally.js">try-catch-finally.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/try-catch-throw.js">try-catch-throw.js</a>: crashed: SIGABRT
</pre></li>
<li>ES5: 70%, <b>22 crashes</b><pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/strict.js">strict.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: crashed: SIGSEGV
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: crashed: SIGSEGV
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 73%, ES2016+ 36%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 73%, <b>154 crashes</b><pre>
<a href="../../conformance/compat-table/es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Array.from.iterable.js">Array.from.iterable.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Function.name.new-Function.js">Function.name.new-Function.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Map.constructor-requires-new.js">Map.constructor-requires-new.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Number.parseFloat.js">Number.parseFloat.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Number.parseInt.js">Number.parseInt.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.constructor-requires-new.js">Promise.constructor-requires-new.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.prototype-not-instance.js">Promise.prototype-not-instance.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Proxy.constructor-requires-new.js">Proxy.constructor-requires-new.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/Proxy.handler.defineProperty.invariants.js">Proxy.handler.defineProperty.invariants.js</a>: crashed: SIGSEGV
...
</pre></li>
<li>ES2016: 67%, <b>4 crashes</b><pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: crashed: SIGSEGV
</pre></li>
<li>ES2017: 64%, <b>28 crashes</b><pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: failed
...
</pre></li>
<li>ES2018: 61%, <b>2 crashes</b><pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Octal numeric literals and escape characters not allowed in strict mode
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
</pre></li>
<li>ES2019: 60%, <b>11 crashes</b><pre>
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: crashed: SIGSEGV
</pre></li>
<li>ES2020: 14%, <b>5 crashes</b></li>
<li>ES2021: 21%, <b>3 crashes</b></li>
<li>ES2022: 14%, <b>11 crashes</b></li>
<li>ES2023: 40%, <b>8 crashes</b></li>
<li>ES2024: 0%, <b>8 crashes</b></li>
<li>ES2025: 0%, <b>24 crashes</b></li>
<li>Next: 6%, <b>29 crashes</b></li>
<li>Intl: 25%, <b>21 crashes</b></li>
</ul></details>

💥 **364 crashes during testing**
