# StarlingMonkey

SpiderMonkey-based JavaScript runtime compiled to WebAssembly.

* Repository:       [bytecodealliance/StarlingMonkey](https://github.com/bytecodealliance/StarlingMonkey.git) <span class="shields"><img src="https://img.shields.io/github/stars/bytecodealliance/StarlingMonkey?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bytecodealliance/StarlingMonkey?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Language:         C++
* License:          Apache-2.0
* Standard:         ESnext
* Years:            2024-
* Ancestor:         [SpiderMonkey](../spidermonkey/README.md)
* Runtime platform: Wasm

## Tech

Compiles SpiderMonkey to WebAssembly using WASI SDK. The output is a
WASI component (`starling.wasm`) that can be run using a WebAssembly
Component-aware runtime like wasmtime.

Runs SpiderMonkey's baseline interpreter only - can't JIT JavaScript
code. But the JS engine itself typically would get JITted by a JIT-enabled
Wasm runtime.

Provides certain Web platform APIs like Fetch, crypto, performance to
JavaScript environment (see [builtins/web/](https://github.com/bytecodealliance/StarlingMonkey/tree/main/builtins/web)).

## Users

* See [ADOPTERS.md](https://github.com/bytecodealliance/StarlingMonkey/blob/main/ADOPTERS.md)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 94%, Next 12%, Intl 25%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: Log: kangax-es6/String.prototype.normalize.js: failed
<a href="../conformance/kangax-es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: Log: kangax-es6/regex.flags.u.case-folding.js: failed
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: Log: kangax-es6/tail-calls.direct.js: InternalError: too much recursion
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: Log: kangax-es6/tail-calls.mutual.js: InternalError: too much recursion
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: Log: kangax-es2017/Atomics.add.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: Log: kangax-es2017/Atomics.and.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: Log: kangax-es2017/Atomics.compareExchange.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: Log: kangax-es2017/Atomics.exchange.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: Log: kangax-es2017/Atomics.isLockFree.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: Log: kangax-es2017/Atomics.load.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: Log: kangax-es2017/Atomics.notify.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: Log: kangax-es2017/Atomics.or.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: Log: kangax-es2017/Atomics.store.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: Log: kangax-es2017/Atomics.sub.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: Log: kangax-es2017/Atomics.wait.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: Log: kangax-es2017/Atomics.xor.js: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: Log: kangax-es2017/SharedArrayBuffer.Symbol.species.js: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: Log: kangax-es2017/SharedArrayBuffer.js: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: Log: kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: Log: kangax-es2017/SharedArrayBuffer.prototype.byteLength.js: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: Log: kangax-es2017/SharedArrayBuffer.prototype.slice.js: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: Log: kangax-es2017/regex.flags.u.case-folding.js: failed
</pre></li>
<li>ES2018: 89%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.js:10:30 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-11.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-12.1.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-12.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-13.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-14.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-15.1.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-15.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-16.0.js:10:12 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Exception while evaluating top-level script regex.unicode-property-escapes.unicode-17.0.js:10:12 SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 80%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: Exception while evaluating top-level script regex.flags.v.properties-of-strings.js:9:13 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: Exception while evaluating top-level script regex.flags.v.set-notations.js:9:13 SyntaxError: invalid class property name in regular expression:
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: Exception while evaluating top-level script regex.flags.v.unicode-15.1.js:9:13 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: Exception while evaluating top-level script regex.flags.v.unicode-16.0.js:9:13 SyntaxError: invalid property name in regular expression:
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: Exception while evaluating top-level script regex.flags.v.unicode-17.0.js:9:13 SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 12%</li>
<li>Intl: 25%</li>
</ul></details>
