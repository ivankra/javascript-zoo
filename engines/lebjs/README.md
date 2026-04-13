# LebJS

Unfinished JavaScript engine written in Java.

* Repository:       [LebsterFace/LebJS](https://github.com/LebsterFace/LebJS) <span class="shields"><img src="https://img.shields.io/github/stars/LebsterFace/LebJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/LebsterFace/LebJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [13761](# "cloc src")
* Language:         Java
* License:          Apache-2.0
* Standard:         no (can't run ES1)
* Years:            2021-
* Runtime platform: Java
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 51%</summary><ul>
<li>ES1: 60.1% (119/198)<pre>
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.js">Date.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: ReferenceError: Date is not defined
...
</pre></li>
<li>ES3: 39.9% (59/148)</li>
<li>ES5: 47.3% (35/74)</li>
</ul></details>

<details><summary>compat-table: ES6 37%, ES2016+ 32%, Next 0%, Intl 14%</summary><ul>
<li>ES5: 68.7%<pre>
<a href="../../conformance/compat-table/es5/Date.now.js">Date.now.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/compat-table/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: ReferenceError: Date is not defined
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL: NotImplemented: Number.prototype.toExponential has not been implemented.
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL: NotImplemented: Number.prototype.toExponential has not been implemented.
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: NotImplemented: Number.prototype.toExponential has not been implemented.
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL: NotImplemented: RegExp.prototype [ @@split ] has not been implemented.
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: '0b'.substr is not a function
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: TypeError: Cannot assign to read-only property 'Infinity'
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: TypeError: Cannot assign to read-only property 'NaN'
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: TypeError: Cannot assign to read-only property 'undefined'
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: ReferenceError: arguments is not defined
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: FAIL: NotImplemented: The Function constructor has not been implemented.
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: Unexpected token '\' (8:8)
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-caller-error.js">strict.arguments-caller-error.js</a>: ReferenceError: arguments is not defined
<a href="../../conformance/compat-table/es5/strict.arguments-unmapped.js">strict.arguments-unmapped.js</a>: ReferenceError: arguments is not defined
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL: NotImplemented: Object.defineProperty has not been implemented.
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
...
</pre></li>
<li>ES6: 37.5%</li>
<li>ES2016: 43.9%</li>
<li>ES2017: 24%</li>
<li>ES2018: 21.1%</li>
<li>ES2019: 56%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of xyz.lebster.core.value.globals.Undefined@0
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Object.fromEntries call with non-array
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL: NullPointerException: Cannot invoke "xyz.lebster.core.value.Value.isStrictlyEqual(xyz.lebster.core.value.Value)" because "&lt;local2&gt;" is null
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: ' \t \n abc   \t\n'.trimLeft is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: ' \t \n abc   \t\n'.trimRight is not a function
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL: NotImplemented: The Function constructor has not been implemented.
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL: NotImplemented: Creating classes without constructors has not been implemented.
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL: NotImplemented: RegExp.prototype.test has not been implemented.
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Unexpected token '\', expected '(' (1:23)
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: SyntaxError: Parsing `async` functions has not been implemented (44:4).
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: Parsing Generator function declarations has not been implemented (9:12).
</pre></li>
<li>ES2020: 7.1%</li>
<li>ES2021: 25.4%</li>
<li>ES2022: 20.4%</li>
<li>ES2023: 82.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: Uint8Array is not defined
</pre></li>
<li>ES2024: 32.7%</li>
<li>ES2025: 50%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.extends.js">Iterator.extends.js</a>: FAIL: NotImplemented: Creating classes without constructors has not been implemented.
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Iterator.from is not a function
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: TypeError: Iterator.from is not a function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: FAIL: NotImplemented: Iterator.prototype.flatMap() has not been implemented.
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: ReferenceError: Promise is not defined
<a href="../../conformance/compat-table/es2025/RegExp.escape.js">RegExp.escape.js</a>: TypeError: RegExp.escape is not a function
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Invalid regular expression '(?&lt;year&gt;[0-9]{4})-[0-9]{2}|[0-9]{2}-(?&lt;year&gt;[0-9]{4})': Named capturing group &lt;year&gt; is already defined
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: FAIL: NotImplemented: RegExp.prototype.test has not been implemented.
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: FAIL: NotImplemented: RegExp.prototype.test has not been implemented.
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: FAIL: NotImplemented: RegExp.prototype.test has not been implemented.
</pre></li>
<li>Next: 0%</li>
<li>Intl: 14.3%</li>
</ul></details>

<details><summary>test262: 21.6%, main 26.3%, staging 14.2%, annexB 13.5%, Next 3.3%, Intl 0%</summary>
<ul>
<li>Overall: 21.6% (11470/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 26.3% (10832/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 33.6% (2756/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 27% (2988/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 25% (1/4)
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
Map: 65% (26/40)
Object.is: 100% (2/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 28.7% (200/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 65.8% (25/38)
String.fromCodePoint: 27.3% (6/22)
String.prototype.endsWith: 85.2% (23/27)
String.prototype.includes: 84.6% (22/26)
Symbol: 14.3% (214/1494)
Symbol.hasInstance: 41.2% (7/17)
Symbol.isConcatSpreadable: 35.3% (12/34)
Symbol.iterator: 9% (168/1865)
Symbol.match: 3.4% (3/88)
Symbol.replace: 1% (1/98)
Symbol.search: 2.7% (1/37)
Symbol.species: 3.6% (10/276)
Symbol.split: 5.2% (3/58)
Symbol.toPrimitive: 27% (63/233)
Symbol.toStringTag: 0.8% (1/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 1.3% (1/79)
WeakSet: 0% (0/34)
arrow-function: 27.4% (260/949)
class: 15.1% (722/4768)
computed-property-names: 14.2% (68/478)
const: 13.3% (2/15)
cross-realm: 0% (0/201)
default-parameters: 20.9% (475/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 25% (1659/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 33.8% (26/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 81.2% (78/96)
super: 42.1% (8/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 54.6% (71/130)<pre>
Array.prototype.includes: 27.5% (19/69)
exponentiation: 42.7% (44/103)
u180e: 60% (15/25)
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
<li>ES2018: 9.7% (471/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 2.8% (10/355)
object-spread: 26.7% (36/135)
regexp-dotall: 23.5% (4/17)
regexp-lookbehind: 36.8% (7/19)
regexp-named-groups: 3% (3/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 48.9% (67/137)<pre>
Array.prototype.flat: 46.7% (7/15)
Array.prototype.flatMap: 38.1% (8/21)
Object.fromEntries: 40% (10/25)
String.prototype.trimEnd: 54.2% (13/24)
String.prototype.trimStart: 56.5% (13/23)
Symbol.prototype.description: 25% (2/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 48.1% (26/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 16.7% (359/2156)<pre>
BigInt: 14.6% (219/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 6.2% (1/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 73.1% (19/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 19.6% (180/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 22% (9/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 25.9% (28/108)
numeric-separator-literal: 89.9% (143/159)
</pre></li>
<li>ES2022: 16.5% (901/5465)<pre>
Array.prototype.at: 72.7% (8/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 30.6% (19/62)
String.prototype.at: 72.7% (8/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34% (386/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 12.5% (258/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 12.9% (4/31)
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 31.8% (98/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 22% (24/109)
change-array-by-copy: 35.6% (47/132)
hashbang: 93.1% (27/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 2.7% (23/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 71.4% (20/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 1.6% (3/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 21.8% (275/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 16% (91/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 29.6% (68/230)
set-methods: 52.6% (101/192)
</pre></li>
<li>Next: 3.3% (279/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 18.8% (12/64)
Temporal: 0% (0/6670)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 10.9% (52/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 9.4% (3/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 9.7% (7/72)
</pre></li>
<li>N/A: 32.9% (2865/8720)</li>
</ul>
</details>
