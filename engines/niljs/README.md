# NiL.JS

JavaScript interpreter for .NET.

* Repository:       [nilproject/NiL.JS](https://github.com/nilproject/NiL.JS.git) <span class="shields"><img src="https://img.shields.io/github/stars/nilproject/NiL.JS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nilproject/NiL.JS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [42214](# "cloc NiL.JS")
* Language:         C#
* License:          BSD-3-Clause
* Standard:         ES6
* Years:            2013-
* Runtime platform: .NET
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 96%</summary><ul>
<li>Tested version: 2.6.1721 (<a href="https://github.com/nilproject/NiL.JS/commit/027efd6b753851c8ef206bc26cbe899e646b5f1f">2026-03-10</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/niljs.json">json</a>)</li>
<li>ES1: 98.5% (195/198)<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: FAIL
<a href="../../conformance/es1/comments.js">comments.js</a>: SyntaxError: Invalid pattern '(*' at offset 2. Quantifier '*' following nothing.
<a href="../../conformance/es1/conversions.js">conversions.js</a>: FAIL: 123 != '0123'; 123.0 != '0123'
</pre></li>
<li>ES3: 93.9% (139/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; zero failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-011'); (25).toExponential(0) != '3e+1' (got: '2.5e+001'); (12345).toExponential(3) != '1.235e+4' (got: '1.2e+004'); (1.25).toExponential(1) !=...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RangeError: toPrecision() argument must be between 1 and 100
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: TypeError: Cannot get prototype of null or undefined
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: FAIL: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '0'.split(undefined, 0).length !== 0; 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: Unknown identifier "var" at
</pre></li>
<li>ES5: 94.6% (70/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: RangeError: Invalid time value
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: Invalid variable definition at
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 44%, ES2016+ 19%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: 2.6.1721 (<a href="https://github.com/nilproject/NiL.JS/commit/027efd6b753851c8ef206bc26cbe899e646b5f1f">2026-03-10</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/niljs.json">json</a>)</li>
<li>ES5: 91.1%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: Invalid variable definition at
</pre></li>
<li>ES6: 44%</li>
<li>ES2016: 39.4%</li>
<li>ES2017: 16%</li>
<li>ES2018: 26.3%</li>
<li>ES2019: 18.5%</li>
<li>ES2020: 35.7%</li>
<li>ES2021: 0%</li>
<li>ES2022: 14.4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 19.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 34.6%, main 41.8%, staging 27.3%, annexB 35.8%, Next 3.4%, Intl 0.2%</summary>
<ul>
<li>Tested version: 2.6.1721 (<a href="https://github.com/nilproject/NiL.JS/commit/027efd6b753851c8ef206bc26cbe899e646b5f1f">2026-03-10</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/niljs.json">json</a>)</li>
<li>Overall: 34.6% (18420/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 41.8% (17353/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96.2% (7888/8197)<pre>
caller: 91.3% (21/23)
</pre></li>
<li>ES6: 28.6% (3161/11054)<pre>
__proto__: 27.8% (5/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 1.1% (3/268)
DataView: 0% (0/190)
DataView.prototype.getFloat32: 0% (0/7)
DataView.prototype.getFloat64: 0% (0/5)
DataView.prototype.getInt16: 0% (0/7)
DataView.prototype.getInt32: 0% (0/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 0% (0/7)
DataView.prototype.setUint8: 0% (0/56)
Float32Array: 28.6% (2/7)
Float64Array: 28.6% (2/7)
Int16Array: 100% (2/2)
Int32Array: 75% (3/4)
Int8Array: 5.7% (2/35)
Map: 40% (16/40)
Object.is: 100% (2/2)
Promise: 75% (3/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 36.2% (252/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 63.2% (24/38)
String.fromCodePoint: 31.8% (7/22)
String.prototype.endsWith: 51.9% (14/27)
String.prototype.includes: 50% (13/26)
Symbol: 8% (119/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 11.8% (4/34)
Symbol.iterator: 9.5% (177/1865)
Symbol.match: 13.6% (12/88)
Symbol.replace: 7.1% (7/98)
Symbol.search: 13.5% (5/37)
Symbol.species: 9.1% (25/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 2.1% (5/233)
Symbol.toStringTag: 1.5% (2/131)
Symbol.unscopables: 9.1% (4/44)
TypedArray: 10.9% (274/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 18.2% (2/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 1.3% (1/79)
WeakSet: 0% (0/34)
arrow-function: 36.6% (347/949)
class: 19.4% (926/4768)
computed-property-names: 7.5% (36/478)
const: 33.3% (5/15)
cross-realm: 0% (0/201)
default-parameters: 20.8% (471/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 16.2% (1076/6637)
for-of: 0% (0/5)
generators: 15.2% (619/4085)
let: 39% (30/77)
new.target: 32.8% (20/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 31.2% (30/96)
super: 78.9% (15/19)
tail-call-optimization: 77.1% (27/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 42.3% (55/130)<pre>
Array.prototype.includes: 27.5% (19/69)
exponentiation: 24.3% (25/103)
u180e: 44% (11/25)
</pre></li>
<li>ES2017: 19.8% (151/763)<pre>
__getter__: 63% (17/27)
__setter__: 48.1% (13/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 26.7% (188/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 11.6% (564/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 24.1% (7/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (590/4968)
object-rest: 11.5% (41/355)
object-spread: 59.3% (80/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 78.9% (15/19)
regexp-named-groups: 8% (8/100)
regexp-unicode-property-escapes: 0.1% (1/681)
</pre></li>
<li>ES2019: 15.3% (21/137)<pre>
Array.prototype.flat: 40% (6/15)
Array.prototype.flatMap: 28.6% (6/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 25% (2/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 12% (259/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 84.6% (22/26)
dynamic-import: 38.7% (366/946)
export-star-as-namespace-from-module: 15.8% (3/19)
for-in-order: 44.4% (4/9)
globalThis: 5.4% (8/148)
import.meta: 69.6% (16/23)
optional-chaining: 32.1% (18/56)
</pre></li>
<li>ES2021: 11.8% (109/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 2.5% (4/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 57.9% (92/159)
</pre></li>
<li>ES2022: 17.2% (940/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34.4% (390/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 15.8% (326/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 10.8% (23/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 8% (33/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 7.3% (8/109)
change-array-by-copy: 4.5% (6/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.8% (7/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 11.4% (144/1266)<pre>
Float16Array: 0% (0/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 1.2% (7/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 40% (92/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>ES2026: 3.3% (12/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 8.7% (6/69)
upsert: 8.3% (6/72)
</pre></li>
<li>Next: 3.4% (270/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.4% (64/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 10.5% (2/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 55.1% (4806/8718)</li>
</ul>
</details>
