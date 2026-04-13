# Espruino

Interpreter for a subset of JavaScript for Espruino microcontrollers.

* Homepage:    [espruino.com](https://www.espruino.com/)
* Repository:  [espruino/Espruino](https://github.com/espruino/Espruino.git) <span class="shields"><img src="https://img.shields.io/github/stars/espruino/Espruino?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/espruino/Espruino?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [28365](# "cloc src")
* Language:    C
* License:     MPL-2.0
* Standard:    no (can't run ES1)
* Years:       2013-
* Type:        JavaScript-like language
* Interpreter: interprets from source

## Conformance

<details><summary>ES1-ES5: 55%</summary><ul>
<li>ES1: 73.7% (146/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.length failed
<a href="../../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: TypeError: Assignment to a constant
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: TypeError: Assignment to a constant
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: Array.prototype.constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL: Function "join" not found!
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: FAIL: Function "reverse" not found!
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL: Function "sort" not found!
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: FAIL: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: FAIL: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: FAIL: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: FAIL: Function "UTC" not found!
...
</pre></li>
<li>ES3: 43.9% (65/148)</li>
<li>ES5: 29.7% (22/74)</li>
</ul></details>

<details><summary>compat-table: ES6 18%, ES2016+ 15%, Next 0%, Intl 0%</summary><ul>
<li>ES5: 47.7%</li>
<li>ES6: 17.6%</li>
<li>ES2016: 13.6%</li>
<li>ES2017: 32%</li>
<li>ES2018: 0%</li>
<li>ES2019: 16.7%</li>
<li>ES2020: 14.3%</li>
<li>ES2021: 23.8%</li>
<li>ES2022: 17.3%</li>
<li>ES2023: 0%</li>
<li>ES2024: 24.5%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

<details><summary>test262: 10.2%, main 12.1%, staging 10.4%, annexB 23.1%, Next 0.3%, Intl 0%</summary>
<ul>
<li>Overall: 10.2% (5411/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 12.1% (4977/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 38.7% (3172/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 5.3% (589/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0% (0/268)
DataView: 0.5% (1/190)
DataView.prototype.getFloat32: 28.6% (2/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 42.9% (3/7)
DataView.prototype.getInt32: 42.9% (3/7)
DataView.prototype.getInt8: 40% (2/5)
DataView.prototype.getUint16: 42.9% (3/7)
DataView.prototype.getUint32: 42.9% (3/7)
DataView.prototype.setUint8: 30.4% (17/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 0.3% (2/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 37% (10/27)
String.prototype.includes: 38.5% (10/26)
Symbol: 0.1% (2/1494)
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
TypedArray: 3.1% (78/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 18.2% (2/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 3% (28/949)
class: 1.4% (65/4768)
computed-property-names: 0.6% (3/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 0% (0/2269)
destructuring-assignment: 0% (0/141)
destructuring-binding: 0.5% (33/6637)
for-of: 0% (0/5)
generators: 0.2% (7/4085)
let: 31.2% (24/77)
new.target: 4.9% (3/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 0% (0/96)
super: 52.6% (10/19)
tail-call-optimization: 2.9% (1/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 16.2% (21/130)<pre>
Array.prototype.includes: 10.1% (7/69)
exponentiation: 0% (0/103)
u180e: 56% (14/25)
</pre></li>
<li>ES2017: 0% (0/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 0% (0/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 0.1% (4/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 3.4% (1/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 0% (0/4968)
object-rest: 0% (0/355)
object-spread: 0% (0/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 10.5% (2/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0.1% (1/681)
</pre></li>
<li>ES2019: 10.2% (14/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 16% (4/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 100% (4/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 1.7% (36/2156)<pre>
BigInt: 0.1% (1/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 65.4% (17/26)
dynamic-import: 4.5% (43/946)
export-star-as-namespace-from-module: 0% (0/19)
for-in-order: 11.1% (1/9)
globalThis: 0.7% (1/148)
import.meta: 4.3% (1/23)
optional-chaining: 1.8% (1/56)
</pre></li>
<li>ES2021: 8.9% (82/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 4.9% (2/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 5.6% (6/108)
numeric-separator-literal: 46.5% (74/159)
</pre></li>
<li>ES2022: 1% (55/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 0% (0/16)
class-fields-private: 0.8% (9/1134)
class-fields-private-in: 0% (0/19)
class-fields-public: 1.7% (35/2058)
class-methods-private: 0% (0/1709)
class-static-block: 0% (0/65)
class-static-fields-private: 0.6% (2/345)
class-static-fields-public: 3.3% (7/213)
class-static-methods-private: 0% (0/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 5.9% (16/271)
</pre></li>
<li>ES2023: 4.5% (14/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 48.3% (14/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.1% (1/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0% (0/187)
resizable-arraybuffer: 0.2% (1/463)
</pre></li>
<li>ES2025: 1.7% (21/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 8% (8/100)
iterator-helpers: 0% (0/567)
json-modules: 0% (0/13)
promise-try: 0% (0/12)
regexp-modifiers: 5.7% (13/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 0.3% (27/8357)<pre>
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
explicit-resource-management: 1.5% (7/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 4.4% (10/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 4.4% (10/228)
source-phase-imports-module-source: 11.9% (10/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 15.8% (1375/8720)</li>
</ul>
</details>
