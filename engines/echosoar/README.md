# echosoar/jsi

JavaScript interpreter written in Rust with QuickJS-inspired bytecode.

* Repository: [echosoar/jsi](https://github.com/echosoar/jsi.git) <span class="shields"><img src="https://img.shields.io/github/stars/echosoar/jsi?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/echosoar/jsi?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        [5945](# "cloc src")
* Language:   Rust
* License:    MIT
* Standard:   no (can't run ES1)
* Years:      2022-

## Conformance

<details><summary>ES1-ES5: 25%</summary><ul>
<li>ES1: 31.8% (63/198)</li>
<li>ES3: 20.3% (30/148)</li>
<li>ES5: 16.2% (12/74)</li>
</ul></details>

<details><summary>compat-table: ES6 7%, ES2016+ 4%, Next 0%, Intl 0%</summary><ul>
<li>ES5: 32.4%</li>
<li>ES6: 6.9%</li>
<li>ES2016: 0%</li>
<li>ES2017: 14%</li>
<li>ES2018: 0%</li>
<li>ES2019: 8.3%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 6%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

<details><summary>test262: 11%, main 13.1%, staging 4%, annexB 8.5%, Next 3.5%, Intl 0.9%</summary>
<ul>
<li>Overall: 11% (5870/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 13.1% (5400/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 18.6% (1522/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 9.7% (1073/11054)<pre>
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
Promise: 25% (1/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 0% (0/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 44.4% (12/27)
String.prototype.includes: 46.2% (12/26)
Symbol: 0.7% (10/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0.1% (1/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0.4% (10/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 5.9% (56/949)
class: 8.2% (391/4768)
computed-property-names: 4.8% (23/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 6.6% (150/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 6.3% (415/6637)
for-of: 0% (0/5)
generators: 7.5% (306/4085)
let: 6.5% (5/77)
new.target: 3.3% (2/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 75% (72/96)
super: 26.3% (5/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 13.8% (18/130)<pre>
Array.prototype.includes: 8.7% (6/69)
exponentiation: 8.7% (9/103)
u180e: 16% (4/25)
</pre></li>
<li>ES2017: 13.5% (103/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 19.9% (140/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 11.7% (570/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 6.9% (2/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 9.1% (454/4968)
object-rest: 1.1% (4/355)
object-spread: 11.9% (16/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 54% (54/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 3.6% (5/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 60% (3/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.8% (189/2156)<pre>
BigInt: 0.5% (8/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 57.7% (15/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 33.3% (3/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 2.4% (22/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 5.6% (6/108)
numeric-separator-literal: 6.9% (11/159)
</pre></li>
<li>ES2022: 9.7% (529/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 8.3% (1/12)
Intl.Segmenter: 5.1% (4/79)
Object.hasOwn: 8.1% (5/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 16.2% (184/1134)
class-fields-private-in: 31.6% (6/19)
class-fields-public: 7.3% (150/2058)
class-methods-private: 10.2% (175/1709)
class-static-block: 3.1% (2/65)
class-static-fields-private: 2.6% (9/345)
class-static-fields-public: 6.1% (13/213)
class-static-methods-private: 5.5% (83/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 30.6% (83/271)
</pre></li>
<li>ES2023: 6.8% (21/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 1.8% (2/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.3% (53/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 26.7% (50/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 7.9% (100/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 36.1% (83/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.5% (295/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0.1% (1/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 2% (2/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0.7% (44/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 7.8% (37/477)
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
uint8array-base64: 14.5% (10/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 15.7% (1370/8720)</li>
</ul>
</details>
