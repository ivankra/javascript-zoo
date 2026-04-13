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
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 94%, Next 36%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97.6%<pre>
<a href="../../conformance/compat-table/es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: FAIL
<a href="../../conformance/compat-table/es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
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
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 89.5%<pre>
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
<li>ES2024: 79.6%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: invalid class property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 36.4%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 79.5%, main 94.5%, staging 90.6%, annexB 93.5%, Next 12%, Intl 0.7%</summary>
<ul>
<li>Overall: 79.5% (42281/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 94.5% (38951/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.6% (8082/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 96.6% (10673/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 55.6% (149/268)
DataView: 59.5% (113/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 33.3% (2/6)
Float64Array: 33.3% (2/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 85.7% (30/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 90.4% (423/468)
Reflect: 72.2% (338/468)
Reflect.construct: 74.4% (518/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 62.8% (938/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 99.7% (1860/1865)
Symbol.match: 96.6% (85/88)
Symbol.replace: 95.9% (94/98)
Symbol.search: 89.2% (33/37)
Symbol.species: 88.4% (244/276)
Symbol.split: 93.1% (54/58)
Symbol.toPrimitive: 82.8% (193/233)
Symbol.toStringTag: 67.2% (88/131)
Symbol.unscopables: 93.2% (41/44)
TypedArray: 76.3% (1917/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 72.6% (689/949)
class: 98.3% (4685/4768)
computed-property-names: 93.7% (448/478)
const: 100% (15/15)
cross-realm: 1% (2/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.8% (6627/6637)
for-of: 100% (5/5)
generators: 99.5% (4064/4085)
let: 89.6% (69/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 92.3% (120/130)<pre>
Array.prototype.includes: 60.9% (42/69)
exponentiation: 98.1% (101/103)
u180e: 92% (23/25)
</pre></li>
<li>ES2017: 52.7% (401/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 93% (656/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 90.3% (4384/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.8% (537/538)
async-iteration: 99.2% (4928/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 94.1% (16/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 23.9% (163/681)
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
<li>ES2020: 79.5% (1714/2156)<pre>
BigInt: 70.8% (1062/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 95.2% (60/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 71.6% (677/946)
export-star-as-namespace-from-module: 52.6% (10/19)
for-in-order: 100% (9/9)
globalThis: 98% (145/148)
import.meta: 73.9% (17/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 59.1% (544/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 50.6% (80/158)
logical-assignment-operators: 96.3% (104/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 93.4% (5103/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 99.7% (1131/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.7% (2051/2058)
class-methods-private: 99.6% (1703/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 99.7% (344/345)
class-static-fields-public: 97.7% (208/213)
class-static-methods-private: 99.8% (1510/1513)
error-cause: 100% (5/5)
regexp-match-indices: 96.8% (30/31)
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 89% (274/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 92.7% (101/109)
change-array-by-copy: 98.5% (130/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 70.2% (590/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 83.1% (49/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 57.2% (107/187)
resizable-arraybuffer: 86.8% (402/463)
</pre></li>
<li>ES2025: 88.8% (1122/1264)<pre>
Float16Array: 85.7% (42/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 79% (79/100)
iterator-helpers: 98.1% (556/567)
json-modules: 23.1% (3/13)
promise-try: 100% (12/12)
regexp-modifiers: 96.5% (222/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 12% (1004/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 0% (0/6)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 97.5% (465/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 16.7% (1/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 94.2% (65/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 93.3% (8133/8720)</li>
</ul>
</details>
