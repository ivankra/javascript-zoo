# Brimstone

Javascript engine written in Rust, with nearly complete ES2025 support.

* Repository:   https://github.com/Hans-Halverson/brimstone.git <span class="shields"><img src="https://img.shields.io/github/stars/Hans-Halverson/brimstone?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Hans-Halverson/brimstone?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          74409 (`cloc src`)
* Language:     Rust
* License:      MIT
* Standard:     ESnext
* Years:        2022-
* Interpreter:  register-based VM ([vm.rs](https://github.com/Hans-Halverson/brimstone/blob/master/src/js/runtime/bytecode/vm.rs), Ignition-inspired)
* Regex engine: own ([regexp](https://github.com/Hans-Halverson/brimstone/tree/master/src/js/runtime/regexp/))

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/brimstone.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 97%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 97%<pre>
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Unexpected token function
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token &gt;
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Stack Overflow
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Stack Overflow
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 84%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 0%<br>
<li>Intl: 25%<br>
</ul></details>
