# QuickJS

Lightweight embeddable JavaScript engine by Fabrice Bellard and Charlie Gordon.

* Homepage:    https://bellard.org/quickjs/
* Repository:  https://github.com/bellard/quickjs.git <span class="shields"><img src="https://img.shields.io/github/stars/bellard/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bellard/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         73590 (`cloc *.c *.h`)
* Language:    C
* License:     MIT
* Standard:    ESnext
* Years:       2019-
* Features:    hidden classes
* Parser:      recursive descent, directly emits bytecode
* Interpreter: stack-based VM (`JS_CallInternal()` in [quickjs.c](https://github.com/bellard/quickjs/blob/master/quickjs.c#L16971))
* GC:          reference counting

## Forks

* [QuickJS-NG](quickjs-ng.md): community-oriented fork
* [PrimJS](primjs.md): ByteDance's fork with a mark-and-sweep GC
* [fastschema/qjs](fastschema-qjs.md): QuickJS-NG ported to Go via Wasm
* [modernc.org/quickjs](modernc-quickjs.md): QuickJS transpiled to pure Go
* [Hako](hako.md): QuickJS ported to Wasm with C#/Go bindings
* [QuickJIT](quickjit.md): QuickJS fork that JIT-translates bytecode using TCC
* [OpenQuickJS](https://github.com/OpenQuickJS/quickjs) <span class="shields"><img src="https://img.shields.io/github/stars/OpenQuickJS/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/OpenQuickJS/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>: old inactive fork

## Runtimes

* [LLRT](https://github.com/awslabs/llrt) <span class="shields"><img src="https://img.shields.io/github/stars/awslabs/llrt?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/awslabs/llrt?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - lightweight QuickJS/tokio-based runtime by Amazon
* [elsa](https://github.com/elsaland/elsa) <span class="shields"><img src="https://img.shields.io/github/stars/elsaland/elsa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/elsaland/elsa?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - minimal Deno-inspired JavaScript/TypeScript runtime written in Go

## Users

* Browsers:
  * [Elinks](https://github.com/rkd77/elinks) - can be configured to use SpiderMonkey, QuickJS or MuJS
  * [Edbrowse](https://edbrowse.org/)
* [Nginx](https://github.com/nginx/njs) - uses QuickJS as an alternative to home-grown [njs](njs.md) engine
* [PDF.js](https://github.com/mozilla/pdf.js/tree/master/external/quickjs) - uses QuickJS compiled to WASM for sandboxing JavaScript code in .pdf
* [javy](https://github.com/bytecodealliance/javy.git) <span class="shields"><img src="https://img.shields.io/github/stars/bytecodealliance/javy?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bytecodealliance/javy?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS to WASM toolchain in Rust
* [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) <span class="shields"><img src="https://img.shields.io/github/stars/justjake/quickjs-emscripten?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/justjake/quickjs-emscripten?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS/TS WASM bindings
* [sebastianwessel/quickjs](https://github.com/sebastianwessel/quickjs) <span class="shields"><img src="https://img.shields.io/github/stars/sebastianwessel/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sebastianwessel/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS/TS WASM sandbox
* [wasm-jseval](https://github.com/maple3142/wasm-jseval) <span class="shields"><img src="https://img.shields.io/github/stars/maple3142/wasm-jseval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maple3142/wasm-jseval?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - safe eval library based on WASM and Duktape/QuickJS

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/quickjs.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 100%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 97%<pre>
<a href="../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../conformance/kangax-es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: failed
<a href="../conformance/kangax-es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: failed
<a href="../conformance/kangax-es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: failed
<a href="../conformance/kangax-es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: failed
<a href="../conformance/kangax-es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: failed
<a href="../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: stack overflow
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: stack overflow
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
