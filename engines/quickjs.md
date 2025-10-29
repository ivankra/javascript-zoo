# QuickJS

Lightweight embeddable JavaScript engine by Fabrice Bellard and Charlie Gordon.

* Homepage:    https://bellard.org/quickjs/
* Repository:  https://github.com/bellard/quickjs.git <span class="shields"><img src="https://img.shields.io/github/stars/bellard/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bellard/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         73590 (`cloc *.c *.h`)
* Language:    C
* License:     MIT
* Standard:    ES2023
* Years:       2019-
* Features:    hidden classes
* Parser:      recursive descent, directly emits bytecode
* Interpreter: stack-based VM
  * `JS_CallInternal()` at [quickjs.c:16850](https://github.com/bellard/quickjs/blob/master/quickjs.c#L16850)
* GC:          reference counting

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

## Forks

* [QuickJS-NG](quickjs-ng.md)
* [OpenQuickJS](https://github.com/OpenQuickJS/quickjs) <span class="shields"><img src="https://img.shields.io/github/stars/OpenQuickJS/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/OpenQuickJS/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [PrimJS](primjs.md): ByteDance's fork with a mark-and-sweep GC
* [Hako](hako.md): PrimJS ported to WASM
* [modernc.org/quickjs](modernc-quickjs.md): QuickJS transpiled to pure Go
* [fastschema/qjs](https://github.com/fastschema/qjs): QuickJS ported to Go via WASM

## Runtimes

* [LLRT](https://github.com/awslabs/llrt) <span class="shields"><img src="https://img.shields.io/github/stars/awslabs/llrt?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/awslabs/llrt?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - lightweight QuickJS/tokio-based runtime by Amazon
* [elsa](https://github.com/elsaland/elsa) <span class="shields"><img src="https://img.shields.io/github/stars/elsaland/elsa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/elsaland/elsa?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - minimal Deno-inspired JavaScript/TypeScript runtime written in Go
