# cesanta/v7

JavaScript engine for microcontrollers.

* Repository:  [cesanta/v7](https://github.com/cesanta/v7.git) <span class="shields"><img src="https://img.shields.io/github/stars/cesanta/v7?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/cesanta/v7?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [24811](# "cloc v7.c v7.h")
* Language:    C
* License:     GPL-2.0-only
* Standard:    ES5 (subset)
* Years:       2013-2017
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 70%</summary><ul>
<li>ES1: 81.8% (162/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: new Array(len) failed; Array(len) failed
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: FAIL: new Array(len) length failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: FAIL: Date.now() called on object
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: FAIL: Function.prototype.constructor failed; function instance constructor failed
<a href="../../conformance/es1/Object.js">Object.js</a>: FAIL: cannot read property 'a' of undefined
...
</pre></li>
<li>ES3: 65.5% (97/148)<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: FAIL: splice is not a function
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: FAIL: push to object failed; push multiple to empty object failed; push no args to object failed
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: FAIL: push with no arguments failed; push to non-empty array failed
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: splice is not a function
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: delete on object failed; insert on object failed; negative start on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: a1.toLocaleString is not a function
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: cannot read property 'call' of undefined
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: FAIL: a1.unshift is not a function
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: FAIL: unshift is not a function
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: FAIL: max() with 0 args failed; max() with NaN failed
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: FAIL: min() with 0 args failed; min() with NaN failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; NaN failed; zero failed; Infinity failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0',...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: NaN failed; large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL: n1.toLocaleString is not a function
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: toPrecision(5) fixed notation failed; toPrecision() undefined arg failed; NaN failed; Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: o1.toLocaleString is not a function
...
</pre></li>
<li>ES5: 45.9% (34/74)</li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 4%, Next 0%, Intl 14%</summary><ul>
<li>ES5: 66.1%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.reduceRight.js">Array.prototype.reduceRight.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: FAIL: unshift is not a function
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.freeze.js">Object.freeze.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.seal.js">Object.seal.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: unexpected ast node
<a href="../../conformance/compat-table/es5/literals.getter-accessors.js">literals.getter-accessors.js</a>: SyntaxError
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: SyntaxError
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: FAIL: cannot read property 'propertyIsEnumerable' of undefined
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: SyntaxError
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
...
</pre></li>
<li>ES6: 1.9%</li>
<li>ES2016: 9.1%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 8.3%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 14.3%</li>
</ul></details>

<details><summary>test262: 20.6%, main 25.5%, staging 9.5%, annexB 8.5%, Next 2.2%, Intl 0.1%</summary>
<ul>
<li>Overall: 20.6% (10927/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 25.5% (10507/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 63.7% (5220/8197)<pre>
caller: 91.3% (21/23)
</pre></li>
<li>ES6: 10.3% (1141/11054)<pre>
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
Proxy: 10.5% (49/468)
Reflect: 0% (0/468)
Reflect.construct: 0.6% (4/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.2% (3/1494)
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
arrow-function: 6.7% (64/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.5% (216/2269)
destructuring-assignment: 65.2% (92/141)
destructuring-binding: 7.6% (502/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 96.9% (93/96)
super: 15.8% (3/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 23.8% (31/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 68% (17/25)
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
<li>ES2018: 12.5% (609/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 26% (26/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 5.1% (7/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 100% (4/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 5.4% (117/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 18.7% (177/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 21.7% (5/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 12.8% (118/920)<pre>
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
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 66.7% (106/159)
</pre></li>
<li>ES2022: 16.3% (893/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 9.1% (1/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.8% (383/1134)
class-fields-private-in: 36.8% (7/19)
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
<li>ES2023: 5.5% (17/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 44.8% (13/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.1% (51/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 26.7% (50/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 1.6% (20/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 14% (14/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 2.6% (6/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 2.2% (184/8357)<pre>
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
explicit-resource-management: 13.4% (64/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 21.8% (50/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 30.7% (70/228)
source-phase-imports-module-source: 40.5% (34/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 27.3% (2382/8720)</li>
</ul>
</details>
