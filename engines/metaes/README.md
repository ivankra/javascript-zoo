# metaes

Metacircular JavaScript interpreter.

* Repository:       [metaes/metaes](https://github.com/metaes/metaes.git) <span class="shields"><img src="https://img.shields.io/github/stars/metaes/metaes?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/metaes/metaes?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [2833](# "cloc lib")
* Language:         TypeScript
* License:          MIT
* Years:            2015-2022
* Parser:           Meriyah
* Runtime platform: JavaScript

## Conformance

<details><summary>ES1-ES5: 34%</summary><ul>
<li>ES1: 30.8% (61/198)</li>
<li>ES3: 48% (71/148)</li>
<li>ES5: 14.9% (11/74)</li>
</ul></details>

<details><summary>compat-table: ES6 16%, ES2016+ 21%, Next 0%, Intl 0%</summary><ul>
<li>ES5: 29.7%</li>
<li>ES6: 16.1%</li>
<li>ES2016: 18.2%</li>
<li>ES2017: 22%</li>
<li>ES2018: 29.5%</li>
<li>ES2019: 33.3%</li>
<li>ES2020: 0%</li>
<li>ES2021: 14.3%</li>
<li>ES2022: 0%</li>
<li>ES2023: 62.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: "Uint8Array" is not defined.
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: "Uint8Array" is not defined.
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: "Uint8Array" is not defined.
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: FAIL
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 39.5%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

<details><summary>test262: 13.4%, main 16.2%, staging 6.8%, annexB 5.8%, Next 3.3%, Intl 0.2%</summary>
<ul>
<li>Overall: 13.4% (7106/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 16.2% (6660/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 23.2% (1902/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 12.2% (1348/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0% (0/268)
DataView: 0% (0/190)
DataView.prototype.getFloat32: 0% (0/7)
DataView.prototype.getFloat64: 0% (0/5)
DataView.prototype.getInt16: 0% (0/7)
DataView.prototype.getInt32: 0% (0/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 0% (0/7)
DataView.prototype.setUint8: 0% (0/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0.2% (1/468)
Reflect.construct: 0% (0/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 40.7% (11/27)
String.prototype.includes: 38.5% (10/26)
Symbol: 0.1% (1/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0% (0/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 7.6% (72/949)
class: 14.3% (680/4768)
computed-property-names: 2.5% (12/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 9.3% (212/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 8.9% (592/6637)
for-of: 0% (0/5)
generators: 9.9% (406/4085)
let: 3.9% (3/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 26.3% (5/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 22.3% (29/130)<pre>
Array.prototype.includes: 7.2% (5/69)
exponentiation: 13.6% (14/103)
u180e: 44% (11/25)
</pre></li>
<li>ES2017: 14.6% (111/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 24.5% (173/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 12.5% (607/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.2% (557/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 5.9% (1/17)
regexp-lookbehind: 15.8% (3/19)
regexp-named-groups: 56% (56/100)
regexp-unicode-property-escapes: 24.2% (165/681)
</pre></li>
<li>ES2019: 5.1% (7/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 50% (2/4)
optional-catch-binding: 60% (3/5)
stable-array-sort: 50% (2/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 0% (0/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 9.8% (212/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 36.4% (344/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 12.4% (114/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 19.5% (8/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 59.1% (94/159)
</pre></li>
<li>ES2022: 13.7% (749/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 22.8% (259/1134)
class-fields-private-in: 26.3% (5/19)
class-fields-public: 12.1% (248/2058)
class-methods-private: 18.5% (316/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.1% (14/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.8% (164/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 3.3% (9/271)
</pre></li>
<li>ES2023: 9.7% (30/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 4.6% (5/109)
change-array-by-copy: 0.8% (1/132)
hashbang: 82.8% (24/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6% (50/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 26.7% (50/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 12.2% (154/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 54.8% (126/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.3% (277/8357)<pre>
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
decorators: 29.6% (8/27)
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
regexp-duplicate-named-groups: 31.6% (6/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 17.4% (1516/8720)</li>
</ul>
</details>
