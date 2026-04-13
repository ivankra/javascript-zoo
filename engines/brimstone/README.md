# Brimstone

JavaScript engine written in Rust, with nearly complete ES2025 support.

* Repository:   [Hans-Halverson/brimstone](https://github.com/Hans-Halverson/brimstone.git) <span class="shields"><img src="https://img.shields.io/github/stars/Hans-Halverson/brimstone?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Hans-Halverson/brimstone?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [74409](# "cloc src")
* Language:     Rust
* License:      MIT
* Standard:     ESnext
* Years:        2022-
* Interpreter:  register-based VM ([vm.rs](https://github.com/Hans-Halverson/brimstone/blob/master/src/js/runtime/bytecode/vm.rs), Ignition-inspired)
* Regex engine: own ([regexp](https://github.com/Hans-Halverson/brimstone/tree/master/src/js/runtime/regexp/))

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 97%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97.3%<pre>
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Unexpected token function
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token &gt;
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Stack Overflow
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Stack Overflow
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 84%<pre>
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
</pre></li>
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

<details><summary>test262: 80%, main 98.1%, staging 89.4%, annexB 35%, Next 4.2%, Intl 0.7%</summary>
<ul>
<li>Overall: 80% (42541/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 98.1% (40468/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 97.6% (7997/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 99.1% (10960/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 60.1% (161/268)
DataView: 64.7% (123/190)
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
Map: 95% (38/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 98.5% (461/468)
Reflect: 91% (426/468)
Reflect.construct: 70.1% (488/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 63.5% (949/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.8% (1862/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 98% (96/98)
Symbol.search: 97.3% (36/37)
Symbol.species: 96.7% (267/276)
Symbol.split: 98.3% (57/58)
Symbol.toPrimitive: 82% (191/233)
Symbol.toStringTag: 74.8% (98/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 82.3% (2067/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 72.2% (57/79)
WeakSet: 100% (34/34)
arrow-function: 71.3% (677/949)
class: 99.2% (4731/4768)
computed-property-names: 95.6% (457/478)
const: 100% (15/15)
cross-realm: 85.1% (171/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.8% (6627/6637)
for-of: 100% (5/5)
generators: 99.9% (4079/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 62.3% (43/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 52.3% (398/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 92.6% (653/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 99.5% (4831/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.7% (4955/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 99% (99/100)
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
<li>ES2020: 88.5% (1908/2156)<pre>
BigInt: 77.5% (1164/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 84.1% (796/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 67.7% (623/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 96.8% (153/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 98.3% (5371/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.7% (1131/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 95.4% (62/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 95.6% (259/271)
</pre></li>
<li>ES2023: 92.2% (284/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 81% (680/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 89.8% (53/59)
promise-with-resolvers: 88.9% (8/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 87.9% (407/463)
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
<li>Next: 4.2% (355/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
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
iterator-sequencing: 9.4% (3/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 88.5% (7715/8720)</li>
</ul>
</details>
