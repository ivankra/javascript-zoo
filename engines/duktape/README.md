# Duktape

Embeddable JavaScript engine with a focus on portability and compact footprint.

* Homepage:    [duktape.org](https://duktape.org/)
* Repository:  [svaarala/duktape](https://github.com/svaarala/duktape.git) <span class="shields"><img src="https://img.shields.io/github/stars/svaarala/duktape?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/svaarala/duktape?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [72815](# "cloc --exclude-ext=txt src-input")
* Language:    C
* License:     MIT
* Standard:    ES5 (with some ES6 features)
* Years:       2013-
* Interpreter: register-based VM

## Users

* Browsers: [NetSurf](https://github.com/netsurf-browser/netsurf/tree/master/content/handlers/javascript)
* Runtimes:
  * [dukluv](https://github.com/creationix/dukluv) <span class="shields"><img src="https://img.shields.io/github/stars/creationix/dukluv?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/creationix/dukluv?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - libuv bindings for duktape
  * [lowjs](https://github.com/neonious/lowjs) <span class="shields"><img src="https://img.shields.io/github/stars/neonious/lowjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/neonious/lowjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - low-footprint Node.js port for duktape
* [Zabbix](https://github.com/zabbix/zabbix/tree/master/src/libs/zbxembed/)
* [wasm-jseval](https://github.com/maple3142/wasm-jseval) <span class="shields"><img src="https://img.shields.io/github/stars/maple3142/wasm-jseval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/maple3142/wasm-jseval?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - safe eval library based on WebAssembly and Duktape/QuickJS

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Tested version: <a href="https://github.com/svaarala/duktape/commit/50af773b1b32067170786c2b7c661705ec7425d4">2024-01-29</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/duktape.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 29%, ES2016+ 8%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/svaarala/duktape/commit/50af773b1b32067170786c2b7c661705ec7425d4">2024-01-29</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/duktape.json">json</a>)</li>
<li>ES5: 98.9%<pre>
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
</pre></li>
<li>ES6: 29.1%</li>
<li>ES2016: 21.2%</li>
<li>ES2017: 13%</li>
<li>ES2018: 0%</li>
<li>ES2019: 14.3%</li>
<li>ES2020: 14.3%</li>
<li>ES2021: 7.1%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 34.4%, main 41.6%, staging 27.8%, annexB 29.5%, Next 3.3%, Intl 0.5%</summary>
<ul>
<li>Tested version: <a href="https://github.com/svaarala/duktape/commit/50af773b1b32067170786c2b7c661705ec7425d4">2024-01-29</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/duktape.json">json</a>)</li>
<li>Overall: 34.4% (18289/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 41.6% (17276/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96% (7870/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 24.3% (2691/11054)<pre>
__proto__: 66.7% (12/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 1.5% (4/268)
DataView: 4.2% (8/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 64.3% (36/56)
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 8.6% (3/35)
Map: 0% (0/40)
Object.is: 50% (1/2)
Promise: 0% (0/4)
Proxy: 56.4% (264/468)
Reflect: 38.5% (180/468)
Reflect.construct: 2.7% (19/696)
Reflect.set: 32.6% (15/46)
Reflect.setPrototypeOf: 69.6% (16/23)
Set: 0% (0/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 92.6% (25/27)
String.prototype.includes: 96.2% (25/26)
Symbol: 25.2% (377/1494)
Symbol.hasInstance: 76.5% (13/17)
Symbol.isConcatSpreadable: 79.4% (27/34)
Symbol.iterator: 0.4% (8/1865)
Symbol.match: 11.4% (10/88)
Symbol.replace: 6.1% (6/98)
Symbol.search: 16.2% (6/37)
Symbol.species: 8.3% (23/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 29.2% (68/233)
Symbol.toStringTag: 8.4% (11/131)
Symbol.unscopables: 6.8% (3/44)
TypedArray: 13.5% (340/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 45.5% (5/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 4% (19/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 36.2% (51/141)
destructuring-binding: 7.7% (508/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 33.3% (1/3)
rest-parameters: 100% (96/96)
super: 68.4% (13/19)
tail-call-optimization: 60% (21/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 35.4% (46/130)<pre>
Array.prototype.includes: 4.3% (3/69)
exponentiation: 28.2% (29/103)
u180e: 60% (15/25)
</pre></li>
<li>ES2017: 24.5% (187/763)<pre>
__getter__: 92.6% (25/27)
__setter__: 92.6% (25/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.2% (640/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 57% (57/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 5.8% (8/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 100% (4/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 9.2% (199/2156)<pre>
BigInt: 2.9% (43/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 6.3% (4/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 66.7% (6/9)
globalThis: 6.8% (10/148)
import.meta: 56.5% (13/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 18.3% (168/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 6.3% (10/158)
logical-assignment-operators: 27.8% (30/108)
numeric-separator-literal: 80.5% (128/159)
</pre></li>
<li>ES2022: 16.4% (894/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.9% (384/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 9% (37/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 11% (12/109)
change-array-by-copy: 0% (0/132)
hashbang: 86.2% (25/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.7% (56/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0.6% (3/463)
</pre></li>
<li>ES2025: 14.4% (182/1266)<pre>
Float16Array: 13.7% (7/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 1.4% (5/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 7.2% (5/69)
upsert: 0% (0/72)
</pre></li>
<li>Next: 3.3% (264/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.4% (64/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 57.8% (5042/8718)</li>
</ul>
</details>
