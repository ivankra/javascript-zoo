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

Runs SpiderMonkey's baseline interpreter only - it can't JIT JavaScript
code. However, the JS engine itself is typically JIT-compiled by a JIT-enabled
Wasm runtime.

Provides certain Web platform APIs like Fetch, crypto, and performance to
the JavaScript environment (see [builtins/web/](https://github.com/bytecodealliance/StarlingMonkey/tree/main/builtins/web)).

## Users

* See [ADOPTERS.md](https://github.com/bytecodealliance/StarlingMonkey/blob/main/ADOPTERS.md)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 94%, Next 36%, Intl 25%</summary><ul>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: failed
<a href="../../conformance/compat-table/es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: too much recursion
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: too much recursion
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 89%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 80%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: invalid class property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 36%</li>
<li>Intl: 25%</li>
</ul></details>
