# QuickJS

Lightweight embeddable JavaScript engine by Fabrice Bellard and Charlie Gordon.

* Homepage:    [bellard.org/quickjs](https://bellard.org/quickjs/)
* Repository:  [bellard/quickjs](https://github.com/bellard/quickjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/bellard/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bellard/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [73590](# "cloc *.c *.h")
* Language:    C
* License:     MIT
* Standard:    ESnext
* Years:       2019-
* Features:    hidden classes
* Parser:      recursive descent, directly emits bytecode
* Interpreter: stack-based VM (`JS_CallInternal()` in [quickjs.c](https://github.com/bellard/quickjs/blob/master/quickjs.c#L16971))
* GC:          reference counting

## Users

* Browsers:
  * [Elinks](https://github.com/rkd77/elinks) - can be configured to use SpiderMonkey, QuickJS or MuJS
  * [Edbrowse](https://edbrowse.org/)
* Runtimes:
  * [LLRT](https://github.com/awslabs/llrt) <span class="shields"><img src="https://img.shields.io/github/stars/awslabs/llrt?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/awslabs/llrt?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - lightweight QuickJS/tokio-based runtime by Amazon
  * [elsa](https://github.com/elsaland/elsa) <span class="shields"><img src="https://img.shields.io/github/stars/elsaland/elsa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/elsaland/elsa?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - minimal Deno-inspired JavaScript/TypeScript runtime written in Go
* Forks:
  * [QuickJS-NG](../quickjs-ng/README.md): community-oriented fork
  * [Hako](../hako/README.md): QuickJS ported to Wasm with C#/Go bindings
  * [PrimJS](../primjs/README.md): ByteDance's fork with a mark-and-sweep GC
  * [fastschema/qjs](../fastschema-qjs/README.md): QuickJS-NG ported to Go via Wasm
  * [modernc.org/quickjs](../modernc-quickjs/README.md): QuickJS transpiled to pure Go
  * [OpenQuickJS](https://github.com/OpenQuickJS/quickjs) <span class="shields"><img src="https://img.shields.io/github/stars/OpenQuickJS/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/OpenQuickJS/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>: old inactive fork
  * [QuickJIT](https://github.com/bnoordhuis/quickjit.git) <span class="shields"><img src="https://img.shields.io/github/stars/bnoordhuis/quickjit?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bnoordhuis/quickjit?label=&style=flat-square" alt="Last commit" title="Last commit"></span>: proof-of-concept project adding JIT via tcc
* [Nginx](https://github.com/nginx/njs) - uses QuickJS as an alternative to home-grown [njs](../njs/README.md) engine
* [PDF.js](https://github.com/mozilla/pdf.js/tree/master/external/quickjs) - uses QuickJS compiled to WASM for sandboxing JavaScript code in .pdf
* [javy](https://github.com/bytecodealliance/javy.git) <span class="shields"><img src="https://img.shields.io/github/stars/bytecodealliance/javy?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bytecodealliance/javy?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS to WASM toolchain in Rust
* [quickjs-emscripten](https://github.com/justjake/quickjs-emscripten) <span class="shields"><img src="https://img.shields.io/github/stars/justjake/quickjs-emscripten?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/justjake/quickjs-emscripten?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS/TS WASM bindings
* [sebastianwessel/quickjs](https://github.com/sebastianwessel/quickjs) <span class="shields"><img src="https://img.shields.io/github/stars/sebastianwessel/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sebastianwessel/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JS/TS WASM sandbox
* [wasm-jseval](https://github.com/maple3142/wasm-jseval) <span class="shields"><img src="https://img.shields.io/github/stars/maple3142/wasm-jseval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maple3142/wasm-jseval?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - safe eval library based on WASM and Duktape/QuickJS

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 100%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: stack overflow
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: stack overflow
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

<details><summary>test262: 82.8%, main 99.6%, staging 93.2%, annexB 97%, Next 5.6%, Intl 0.7%</summary>
<ul>
<li>Overall: 82.8% (43997/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.6% (41079/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.5% (8073/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.3% (10975/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 97.8% (262/268)
DataView: 93.2% (177/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 66.7% (4/6)
Float64Array: 66.7% (4/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 94.3% (33/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.4% (465/468)
Reflect: 93.2% (436/468)
Reflect.construct: 74.6% (519/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 70.3% (1050/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.9% (1864/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 87.6% (204/233)
Symbol.toStringTag: 76.3% (100/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 94% (2361/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 73.9% (701/949)
class: 99.3% (4734/4768)
computed-property-names: 95.6% (457/478)
const: 100% (15/15)
cross-realm: 87.6% (176/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6631/6637)
for-of: 100% (5/5)
generators: 99.9% (4083/4085)
let: 98.7% (76/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 63.8% (44/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 97.9% (745/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 73.1% (275/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 81.4% (377/463)
async-functions: 93.2% (657/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 100% (4855/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.8% (4956/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 100% (681/681)
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
<li>ES2020: 92.8% (2001/2156)<pre>
BigInt: 83.7% (1257/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 84.2% (797/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 68.5% (630/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 98.2% (5369/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 75% (12/16)
class-fields-private: 99.7% (1131/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 95.9% (260/271)
</pre></li>
<li>ES2023: 92.2% (284/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 88% (739/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 99.6% (461/463)
</pre></li>
<li>ES2025: 91.7% (1159/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 100% (21/21)
import-attributes: 89% (89/100)
iterator-helpers: 99.8% (566/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 5.6% (471/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 96.7% (8436/8720)</li>
</ul>
</details>
