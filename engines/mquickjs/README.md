# MicroQuickJS

JavaScript engine targeted at embedded systems.

* Homepage:   [bellard.org/mquickjs](https://bellard.org/mquickjs/)
* Repository: [bellard/mquickjs](https://github.com/bellard/mquickjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/bellard/mquickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bellard/mquickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        [23653](# "cloc *.c *.h")
* Language:   C
* License:    MIT
* Standard:   ES5 (subset)
* Years:      2025-
* GC:         tracing GC

## Conformance

<details><summary>ES1-ES5: 56%</summary><ul>
<li>ES1: 62.6% (124/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: TypeError: invalid array subscript
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: TypeError: invalid array subscript
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: not an array
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: not an array
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: TypeError: Boolean constructor not supported
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: TypeError: Boolean constructor not supported
<a href="../../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: TypeError: Boolean constructor not supported
<a href="../../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: TypeError: Boolean constructor not supported
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.js">Date.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: TypeError: only Date.now() is supported
...
</pre></li>
<li>ES3: 60.8% (90/148)<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: TypeError: invalid array subscript
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: not a function
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: not an array
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: TypeError: only Date.now() is supported
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: TypeError: not an Error object
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: TypeError: not an array
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: SyntaxError: catch variable already exists
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: SyntaxError: catch variable already exists
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: TypeError: not a function
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: TypeError: not a function
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: TypeError: not a function
...
</pre></li>
<li>ES5: 29.7% (22/74)</li>
</ul></details>

<details><summary>compat-table: ES6 10%, ES2016+ 5%, Next 0%, Intl 0%</summary><ul>
<li>ES5: 62.3%<pre>
<a href="../../conformance/compat-table/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.defineProperties.js">Object.defineProperties.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.freeze.js">Object.freeze.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.getOwnPropertyDescriptor.js">Object.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isExtensible.js">Object.isExtensible.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isFrozen.js">Object.isFrozen.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.seal.js">Object.seal.js</a>: FAIL
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: TypeError: invalid 'in' operand
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: expecting ';'
...
</pre></li>
<li>ES6: 10%</li>
<li>ES2016: 12.1%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 14.3%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

<details><summary>test262: 17.7%, main 21.7%, staging 8.1%, annexB 4.4%, Next 3.2%, Intl 0%</summary>
<ul>
<li>Overall: 17.7% (9395/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 21.7% (8958/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 42.1% (3450/8197)<pre>
caller: 60.9% (14/23)
</pre></li>
<li>ES6: 12.6% (1392/11054)<pre>
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
Reflect: 0% (0/468)
Reflect.construct: 0.3% (2/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 18.2% (4/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.3% (4/1494)
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
TypedArray: 6.6% (165/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 6.7% (64/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 26.2% (16/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 21.1% (4/19)
tail-call-optimization: 68.6% (24/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 34.6% (45/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 31.1% (32/103)
u180e: 52% (13/25)
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
<li>ES2018: 13.2% (639/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 56% (56/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 10.2% (14/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 20.8% (5/24)
String.prototype.trimStart: 21.7% (5/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 50% (2/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 18.5% (10/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 8.6% (186/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 3.2% (2/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 56.5% (13/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 17.2% (158/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 24.4% (10/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 2.5% (4/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 83% (132/159)
</pre></li>
<li>ES2022: 16.3% (891/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
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
<li>ES2023: 8.1% (25/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 5.5% (6/109)
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
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0.2% (1/463)
</pre></li>
<li>ES2025: 13.6% (172/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 68.3% (157/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.2% (268/8357)<pre>
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
uint8array-base64: 7.2% (5/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 22.5% (1965/8720)</li>
</ul>
</details>
