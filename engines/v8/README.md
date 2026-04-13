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
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Next 39%, Intl 100%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es6/well-known.isConcatSpreadable.poisoned-getter.js">well-known.isConcatSpreadable.poisoned-getter.js</a>: FAIL
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 98.9%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 95.9%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 39.4%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 99%, main 99.2%, staging 99.3%, annexB 97.5%, Next 98.1%, Intl 98.9%</summary>
<ul>
<li>Experimental flags were enabled.</li>
<li>Overall: 99% (52650/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.2% (40905/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.2% (8135/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.5% (11003/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 100% (190/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 98.9% (463/468)
Reflect: 97.6% (457/468)
Reflect.construct: 99.7% (694/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 99.7% (1490/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 100% (1865/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 99.3% (274/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 93.2% (41/44)
TypedArray: 99.6% (2503/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 99.7% (946/949)
class: 99.3% (4736/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 96% (193/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 100% (6637/6637)
for-of: 100% (5/5)
generators: 100% (4085/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 95.7% (66/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 99.9% (760/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 98.4% (370/376)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 100% (463/463)
async-functions: 100% (705/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 98.4% (4776/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 100% (4968/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 87.7% (597/681)
</pre></li>
<li>ES2019: 100% (137/137)<pre>
Array.prototype.flat: 100% (15/15)
Array.prototype.flatMap: 100% (21/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 98.4% (2121/2156)<pre>
BigInt: 99.8% (1498/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 99.9% (945/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 78.4% (116/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 99.9% (919/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 93.8% (15/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 100% (156/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.9% (5461/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.6% (1130/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 100% (2058/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 100% (271/271)
</pre></li>
<li>ES2023: 99.4% (306/308)<pre>
Intl-enumeration: 91.4% (32/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 98.8% (830/840)<pre>
Atomics.waitAsync: 99% (100/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 97.3% (182/187)
resizable-arraybuffer: 98.9% (458/463)
</pre></li>
<li>ES2025: 99.8% (1262/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 98.2% (110/112)
RegExp.escape: 100% (21/21)
import-attributes: 89% (89/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 98.1% (8199/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 99.7% (1539/1543)
Intl.Locale-info: 100% (43/43)
Intl.NumberFormat-v3: 100% (102/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 96.9% (62/64)
Temporal: 99.7% (6653/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 78.9% (15/19)
decorators: 25.9% (7/27)
explicit-resource-management: 100% (477/477)
immutable-arraybuffer: 75% (15/20)
import-bytes: 0% (0/5)
import-defer: 100% (229/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 48.7% (38/78)
json-parse-with-source: 100% (22/22)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 100% (4/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 100% (228/228)
source-phase-imports-module-source: 100% (84/84)
uint8array-base64: 98.6% (68/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 98.8% (8612/8720)</li>
</ul>
</details>
