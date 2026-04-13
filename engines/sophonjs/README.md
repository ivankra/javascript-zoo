# SophonJS

Small footprint embedded ES5 engine.

* Repository:  [gkmail/SophonJS](https://github.com/gkmail/SophonJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/gkmail/SophonJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/gkmail/SophonJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [22531](# "cloc src include")
* Language:    C
* License:     BSD-3-Clause
* Standard:    ES5
* Years:       2015
* Interpreter: stack-based VM ([sophon_ins.c](https://github.com/gkmail/SophonJS/blob/master/src/sophon_ins.c))

## Conformance

<details><summary>ES1-ES5: 84%</summary><ul>
<li>ES1: 92.9% (184/198)<pre>
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: FAIL
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: FAIL
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/comma.js">comma.js</a>: FAIL: (m++, m++, m) failed
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: FAIL: 3.14 failed; 1e21 failed; 1e-7 failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: FAIL: 123 != '0123'; 123.0 != '0123'
<a href="../../conformance/es1/global.isFinite.js">global.isFinite.js</a>: FAIL: isFinite(0/0) failed
</pre></li>
<li>ES3: 76.4% (113/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: FAIL: concat two arrays failed; concat mixed array and non-array failed
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL: delete elements failed; delete and insert failed; insert without delete failed; negative start failed; splice on empty array failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: FAIL: max() with NaN failed
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: FAIL: min() with NaN failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: RangeError: Fraction should be in 0 ~ 20
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e0'); (1.255).toExponential(2) != '1.25e+0', got '...
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: toFixed(2) failed; negative number failed; large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: nonexistent property should be false failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: Value is not an clousre
...
</pre></li>
<li>ES5: 77% (57/74)<pre>
<a href="../../conformance/es5/Date.now.js">Date.now.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: TypeError: Cannot convert time to date
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: TypeError: Value is not an array
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: argument binding failed; length property incorrect; bound constructor failed; non-callable does not throw TypeError
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: SyntaxError: Parse JSON error
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: Structure is cyclical
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: FAIL: space parameter failed
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: TypeError: Value is not an object
<a href="../../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: FAIL: basic property names failed
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: undefined is not undefined after assignment
<a href="../../conformance/es5/literals.object.trailing-comma.js">literals.object.trailing-comma.js</a>: SyntaxError
<a href="../../conformance/es5/strict.js">strict.js</a>: ReferenceError: Unresolved reference
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: SyntaxError: Cannot delete binding in strict mode
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: SyntaxError
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 3%, ES2016+ 3%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 79.9%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-undefined.js">Array.prototype.sort.compareFn-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.now.js">Date.now.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: TypeError: Cannot convert time to date
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: RangeError: Fraction should be in 0 ~ 20
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.trailing-comma-object.js">literals.trailing-comma-object.js</a>: SyntaxError
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: TypeError: Value is not an array
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: TypeError: Property is not configurable
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: SyntaxError
</pre></li>
<li>ES6: 3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 8%</li>
<li>ES2018: 0%</li>
<li>ES2019: 6.2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 8.3%, main 10%, staging 0.9%, annexB 0.7%, Next 3.1%, Intl 0%</summary>
<ul>
<li>Overall: 8.3% (4398/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 10% (4115/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 7.9% (646/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 8.7% (959/11054)<pre>
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
Reflect.construct: 0% (0/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 0% (0/27)
String.prototype.includes: 0% (0/26)
Symbol: 0% (0/1494)
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
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (434/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 21.1% (4/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 10% (13/130)<pre>
Array.prototype.includes: 0% (0/69)
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
<li>ES2018: 9.1% (441/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 0.7% (1/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 0% (0/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.3% (180/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 47.8% (11/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 8.2% (75/920)<pre>
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
numeric-separator-literal: 39.6% (63/159)
</pre></li>
<li>ES2022: 16.3% (891/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
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
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 6.2% (19/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0% (0/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0% (0/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 1.2% (15/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 0% (0/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.1% (262/8357)<pre>
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
explicit-resource-management: 13% (62/477)
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
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 8.7% (759/8720)</li>
</ul>
</details>
