# V8

JavaScript engine of Chrome, Node.js etc.

* Homepage:     [v8.dev](https://v8.dev/)
* Repository:   [chromium.googlesource.com/v8/v8.git](https://chromium.googlesource.com/v8/v8.git)
* GitHub:       [v8/v8](https://github.com/v8/v8.git) <span class="shields"><img src="https://img.shields.io/github/stars/v8/v8?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/v8/v8?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [1323810](# "cloc include src")
* Language:     C++
* License:      BSD-3-Clause
* Org:          Google
* Standard:     ESnext
* Years:        2008-
* Features:     WebAssembly engine
* Interpreter:  register-based VM with accumulator (Ignition)
* JIT:          3-tier JIT, arm/arm64, x86/x64, mips64/mips64el, riscv32/riscv64, ppc64, s390x, loong64
* Regex engine: Irregexp (backtracking, JIT-enabled), [Experimental](https://v8.dev/blog/non-backtracking-regexp)/Linear (non-backtracking)

## History

* 2008: V8 1.0. Full-codegen: a baseline compiler that translates AST directly to machine code, without intermediate bytecode/IR. Hidden classes and PIC.
* 2009: [Irregexp](https://blog.chromium.org/2009/02/irregexp-google-chromes-new-regexp.html) - JIT-enabled regex engine.
* 2010: [Crankshaft](https://blog.chromium.org/2010/12/new-crankshaft-for-v8.html) - optimizing SSA-based JIT, type feedback, deopts
* 2015: [TurboFan](https://blog.chromium.org/2015/07/revving-up-javascript-performance-with.html) - optimizing JIT compiler. Notable for having used a non-orthodox IR form: sea of nodes; later switched to CFG ([docs](https://v8.dev/docs/turbofan))
* 2017: [Ignition](https://v8.dev/blog/launching-ignition-and-turbofan): register-based indirect-threaded VM interpreter ([docs](https://v8.dev/docs/ignition)). New pipeline [Ignition+TurboFan](https://v8.dev/blog/launching-ignition-and-turbofan) replaced the original codegen and Crankshaft.
  * Bytecode is designed for compactness and to serve as a source-of-truth input for later compilation stages instead of AST. Design: register VM with an accumulator - implicit input/output register, leads to compact 1-arg binary ops. Machine code for each [opcode](https://github.com/v8/v8/blob/main/src/interpreter/interpreter-generator.cc) is machine-generated from C++ definitions by TurboFan backend, rather than being hand-written or coded in macroassembler.
* 2021: Sparkplug - new baseline compiler. A fast non-optimizing compiler, translates bytecode direct to machine code, no IR.
* 2023: [Maglev](https://v8.dev/blog/maglev) - mid-tier JIT, fast SSA-based optimizing compiler.
* 2023: [TurboShaft](https://v8.dev/blog/holiday-season-2023), [CFG-based IR](https://v8.dev/blog/leaving-the-sea-of-nodes) for TurboFan
* 2025+: [TurboLev](https://blog.seokho.dev/development/2025/07/15/V8-Expanding-To-Turbolev.html) - Maglev as a frontend for TurboShaft

## Users

* Browsers:
  * Google Chrome
  * Chromium/Blink-based browsers: Chromium, Opera (2013+), Microsoft Edge (2020+), Brave, Yandex Browser, [Helium](https://github.com/imputnet/helium)
  * QtWebEngine/Blink-based browsers: [Angelfish](https://github.com/KDE/angelfish), [Falkon](https://en.wikipedia.org/wiki/Falkon), [morph-browser](https://gitlab.com/ubports/development/core/morph-browser)
* Runtimes:
  * [Node.js](https://github.com/nodejs/node) <span class="shields"><img src="https://img.shields.io/github/stars/nodejs/node?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nodejs/node?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [Deno](https://github.com/denoland/deno) <span class="shields"><img src="https://img.shields.io/github/stars/denoland/deno?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/denoland/deno?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - V8/tokio-based JavaScript/TypeScript runtime written in Rust
  * [Napa.js](https://github.com/microsoft/napajs) <span class="shields"><img src="https://img.shields.io/github/stars/microsoft/napajs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/microsoft/napajs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Microsoft's multi-threaded V8 runtime (obsolete)
  * [workerd](https://github.com/cloudflare/workerd) <span class="shields"><img src="https://img.shields.io/github/stars/cloudflare/workerd?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/cloudflare/workerd?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Cloudflare's JavaScript/WebAssembly runtime
  * [Just](https://github.com/just-js/just) <span class="shields"><img src="https://img.shields.io/github/stars/just-js/just?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/just-js/just?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - small V8 runtime (obsolete)
  * [Window.js](https://github.com/windowjs/windowjs) <span class="shields"><img src="https://img.shields.io/github/stars/windowjs/windowjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/windowjs/windowjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JavaScript runtime for desktop graphics programming
  * [Lagon](https://github.com/lagonapp/lagon) <span class="shields"><img src="https://img.shields.io/github/stars/lagonapp/lagon?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/lagonapp/lagon?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [bare](https://github.com/holepunchto/bare) <span class="shields"><img src="https://img.shields.io/github/stars/holepunchto/bare?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/holepunchto/bare?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - small modular JavaScript runtime
  * [Vercel Edge Runtime](https://github.com/vercel/edge-runtime) <span class="shields"><img src="https://img.shields.io/github/stars/vercel/edge-runtime?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/vercel/edge-runtime?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [dune](https://github.com/aalykiot/dune) <span class="shields"><img src="https://img.shields.io/github/stars/aalykiot/dune?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/aalykiot/dune?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - a hobby JavaScript/TypeScript runtime written in Rust
  * [lo](https://github.com/just-js/lo) <span class="shields"><img src="https://img.shields.io/github/stars/just-js/lo?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/just-js/lo?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Just's successor
  * [sable](https://github.com/sableland/sable) <span class="shields"><img src="https://img.shields.io/github/stars/sableland/sable?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sableland/sable?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Deno-inspired runtime
* [Electron](https://www.electronjs.org/) framework
* Foxit Reader - for evaluation of JavaScript code in .pdf

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Next 36%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: failed
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/kangax-es6/well-known.isConcatSpreadable.poisoned-getter.js">well-known.isConcatSpreadable.poisoned-getter.js</a>: failed
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 99%<pre>
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: regex.unicode-property-escapes.unicode-17.0.js:10: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 36%</li>
<li>Intl: 100%</li>
</ul></details>
