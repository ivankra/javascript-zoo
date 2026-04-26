# GraalJS

High-performance JavaScript engine for JVM/GraalVM.

* Homepage:         [graalvm.org/javascript](https://www.graalvm.org/javascript/)
* Repository:       [oracle/graaljs](https://github.com/oracle/graaljs.git) <span class="shields"><img src="https://img.shields.io/github/stars/oracle/graaljs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/oracle/graaljs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [191606](# "cloc --not_match_d='(?i)(test)' graal-js/src")
* Language:         Java
* License:          GFTC, UPL-1.0
  * Oracle GraalVM - GraalVM Free Terms and Conditions
  * GraalVM Community Edition - Universal Permissive License 1.0
* Org:              Oracle
* Standard:         ESnext
* Years:            2018-
* Features:         WebAssembly engine (GraalWasm)
* Runtime platform: Java
* JIT:              2-tier JIT (HotSpot/Graal), arm64, x64
* Regex engine:     [TRegex](https://github.com/oracle/graal/tree/master/regex) (NFA-based)

## Tech

Truffle: framework for extending GraalVM with support for new languages by automatically deriving high-performance code from interpreters. Based on the idea of partial evaluation of interpreters (Futamura projection) - essentially, unrolling of interpreter's loop for a given input to it. Cons: compilation overhead.

Related: [weval](https://github.com/bytecodealliance/weval) ([blog](https://cfallin.org/blog/2024/08/28/weval/))

## Runtimes

* Ships with its own port of Node.js
* [Elide](https://github.com/elide-dev/elide) <span class="shields"><img src="https://img.shields.io/github/stars/elide-dev/elide?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/elide-dev/elide?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - multi-language runtime on top of GraalVM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: 25.1.0 with experimental flags (2026-04-22, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/graaljs_exp.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 100%, Next 62%, Intl 100%</summary><ul>
<li>Tested version: 25.1.0 with experimental flags (2026-04-22, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/graaljs_exp.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 98.1%<pre>
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
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
<li>Next: 62.2%<pre>
<a href="../../conformance/compat-table/next/Array.isTemplateObject.js">Array.isTemplateObject.js</a>: TypeError: (intermediate value).isTemplateObject is not a function
<a href="../../conformance/compat-table/next/AsyncIterator.prototype.Symbol.toStringTag.js">AsyncIterator.prototype.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/next/Map.prototype.upsert.js">Map.prototype.upsert.js</a>: TypeError: map.upsert is not a function
<a href="../../conformance/compat-table/next/WeakMap.prototype.upsert.js">WeakMap.prototype.upsert.js</a>: TypeError: map.upsert is not a function
<a href="../../conformance/compat-table/next/class-decorators.js">class-decorators.js</a>: TypeError: Cannot set property 'configurable' of undefined
<a href="../../conformance/compat-table/next/function.sent.js">function.sent.js</a>: SyntaxError: Expected ( but found .
<a href="../../conformance/compat-table/next/throw-expr.arrow.js">throw-expr.arrow.js</a>: SyntaxError: Expected an operand but found throw
<a href="../../conformance/compat-table/next/throw-expr.conditional.js">throw-expr.conditional.js</a>: SyntaxError: Expected an operand but found throw
<a href="../../conformance/compat-table/next/throw-expr.logical.js">throw-expr.logical.js</a>: SyntaxError: Expected an operand but found throw
<a href="../../conformance/compat-table/next/throw-expr.param-init.js">throw-expr.param-init.js</a>: SyntaxError: Expected an operand but found throw
</pre></li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 98.6%, main 99.9%, staging 97.8%, annexB 97.6%, Next 91.9%, Intl 84.5%</summary>
<ul>
<li>Tested version: 25.1.0 with experimental flags (2026-04-22, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/graaljs_exp.json">json</a>)</li>
<li>Overall: 98.6% (52426/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 99.9% (41513/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.9% (8195/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.7% (11021/11054)<pre>
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
Float32Array: 100% (7/7)
Float64Array: 100% (7/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 100% (468/468)
Reflect: 100% (468/468)
Reflect.construct: 99.7% (694/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 99.7% (1490/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.9% (1863/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 98% (96/98)
Symbol.search: 97.3% (36/37)
Symbol.species: 100% (276/276)
Symbol.split: 98.3% (57/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 99.9% (2512/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 99.5% (944/949)
class: 99.9% (4765/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 100% (201/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6633/6637)
for-of: 100% (5/5)
generators: 99.9% (4082/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 100% (130/130)<pre>
Array.prototype.includes: 100% (69/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 100% (763/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 100% (378/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 100% (464/464)
async-functions: 100% (705/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 99.5% (4831/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.8% (537/538)
async-iteration: 99.9% (4966/4968)
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
<li>ES2020: 99.8% (2152/2156)<pre>
BigInt: 99.9% (1499/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 100% (946/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 100% (148/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 99.8% (918/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 100% (156/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 100% (5465/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 100% (1134/1134)
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
<li>ES2023: 99.8% (409/410)<pre>
Intl-enumeration: 97.1% (34/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 100% (840/840)<pre>
Atomics.waitAsync: 100% (101/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 100% (463/463)
</pre></li>
<li>ES2025: 100% (1266/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 100% (21/21)
import-attributes: 100% (100/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 99.7% (360/361)<pre>
Array.fromAsync: 100% (95/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 71.2% (1099/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 100% (22/22)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 91.9% (7254/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 100% (64/64)
Temporal: 92% (6138/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 100% (19/19)
decorators: 100% (27/27)
explicit-resource-management: 100% (477/477)
immutable-arraybuffer: 100% (20/20)
import-bytes: 100% (5/5)
import-defer: 100% (229/229)
import-text: 100% (6/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 100% (4/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 100% (228/228)
source-phase-imports-module-source: 100% (84/84)
</pre></li>
<li>N/A: 99.6% (8685/8718)</li>
</ul>
</details>
