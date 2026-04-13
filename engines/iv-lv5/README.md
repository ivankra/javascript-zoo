# iv / lv5

JIT-enabled ES5 engine in C++.

* Repository:   [Constellation/iv](https://github.com/Constellation/iv.git) <span class="shields"><img src="https://img.shields.io/github/stars/Constellation/iv?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Constellation/iv?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [69771](# "cloc --not_match_d='(?i)(test|third_party)' iv")
* Language:     C++
* License:      BSD-2-Clause
* Standard:     ES5
* Years:        2009-2015
* Features:     PIC
* Interpreter:  register-based VM
* JIT:          context-threaded/method JIT, x64
* Regex engine: own engine, JIT-enabled (x64)

## Components

  * iv/lv5/railgun: bytecode compiler
  * iv/lv5/railgun/vm.h: direct-threaded register-based VM, 3-args binary ops
  * iv/lv5/breaker: JIT compiler
  * iv/aero: regex engine with x64 JIT

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: small number exponential notation failed; large number exponential notation failed
</pre></li>
<li>ES5: 94.6% (70/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: negative number failed
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer array failed
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 16%, ES2016+ 1%, Next 0%, Intl 46%</summary><ul>
<li>ES5: 96.1%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
</pre></li>
<li>ES6: 16.3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 1.8%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 46.4%</li>
</ul></details>

<details><summary>test262: 21.1%, main 25.1%, staging 14.2%, annexB 31.7%, Next 3.3%, Intl 0.9%</summary>
<ul>
<li>Overall: 21.1% (11198/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 25.1% (10341/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 54.5% (4471/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 13.6% (1503/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0.4% (1/268)
DataView: 0.5% (1/190)
DataView.prototype.getFloat32: 28.6% (2/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 28.6% (2/7)
DataView.prototype.getInt32: 28.6% (2/7)
DataView.prototype.getInt8: 40% (2/5)
DataView.prototype.getUint16: 28.6% (2/7)
DataView.prototype.getUint32: 28.6% (2/7)
DataView.prototype.setUint8: 17.9% (10/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 10% (4/40)
Object.is: 50% (1/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 6.4% (30/468)
Reflect.construct: 1.9% (13/696)
Reflect.set: 2.2% (1/46)
Reflect.setPrototypeOf: 8.7% (2/23)
Set: 28.9% (11/38)
String.fromCodePoint: 13.6% (3/22)
String.prototype.endsWith: 40.7% (11/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 7.7% (115/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 2.9% (1/34)
Symbol.iterator: 0.9% (16/1865)
Symbol.match: 1.1% (1/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 3.3% (9/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0.9% (2/233)
Symbol.toStringTag: 3.1% (4/131)
Symbol.unscopables: 4.5% (2/44)
TypedArray: 5.8% (147/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 18.2% (2/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 11.4% (9/79)
WeakSet: 0% (0/34)
arrow-function: 6.7% (64/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.6% (218/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.6% (506/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 99% (95/96)
super: 21.1% (4/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 12.3% (16/130)<pre>
Array.prototype.includes: 4.3% (3/69)
exponentiation: 13.6% (14/103)
u180e: 0% (0/25)
</pre></li>
<li>ES2017: 18% (137/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.1% (637/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 54% (54/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 2.9% (4/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.5% (184/2156)<pre>
BigInt: 2.7% (40/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 56.5% (13/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 9.5% (87/920)<pre>
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
align-detached-buffer-semantics-with-web-reality: 1.3% (2/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 45.9% (73/159)
</pre></li>
<li>ES2022: 16.3% (890/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 1.6% (1/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.7% (382/1134)
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
<li>ES2023: 7.5% (23/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.3% (53/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0.4% (2/463)
</pre></li>
<li>ES2025: 10.3% (130/1264)<pre>
Float16Array: 2% (1/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 49.6% (114/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.3% (272/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.2% (63/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 4.3% (3/69)
upsert: 8.3% (6/72)
</pre></li>
<li>N/A: 32% (2791/8720)</li>
</ul>
</details>
