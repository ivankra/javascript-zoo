# Starlight

JavaScript engine written in Rust.

* Repository:  [Starlight-JS/starlight](https://github.com/Starlight-JS/starlight.git) <span class="shields"><img src="https://img.shields.io/github/stars/Starlight-JS/starlight?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Starlight-JS/starlight?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [27826](# "cloc crates/starlight*")
* Language:    Rust
* License:     MPL-2.0
* Standard:    no (can't run ES1)
* Years:       2021
* Features:    PIC
* Interpreter: stack-based VM

Unmaintained old Rust codebase, only builds on x64.

## Conformance

<details><summary>ES1-ES5: 69%</summary><ul>
<li>ES1: 80.3% (159/198)<pre>
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: FAIL: function with 0 params length failed; function with 3 params length failed
<a href="../../conformance/es1/Math.atan2.js">Math.atan2.js</a>: FAIL
<a href="../../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: FAIL
<a href="../../conformance/es1/Object.prototype.valueOf.js">Object.prototype.valueOf.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/String.fromCharCode.js">String.fromCharCode.js</a>: TypeError: not a callable object
<a href="../../conformance/es1/String.length.js">String.length.js</a>: FAIL: String object length failed
<a href="../../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: FAIL: charAt out of bounds failed; charAt negative failed
...
</pre></li>
<li>ES3: 64.2% (95/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: TypeError: Array.prototype.concat requires array-like arguments
<a href="../../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: RangeError: Out of memory for array values
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: undefined does not have properties ('call')
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: undefined does not have properties ('call')
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Error.prototype.toString.js">Error.prototype.toString.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: TypeError: not a callable object
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: TypeError: 'instanceof' requires constructor
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: toFixed(0) failed; toFixed() undefined arg failed; NaN failed; large number precision failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: Infinity failed; small number exponential notation failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: FAIL: ToString conversion failed
...
</pre></li>
<li>ES5: 50% (37/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: TypeError: not a callable object
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.indexOf.js">Array.prototype.indexOf.js</a>: FAIL: negative fromIndex failed
<a href="../../conformance/es5/Array.prototype.lastIndexOf.js">Array.prototype.lastIndexOf.js</a>: TypeError: not a callable object
<a href="../../conformance/es5/Array.prototype.reduceRight.js">Array.prototype.reduceRight.js</a>: TypeError: not a callable object
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: date with milliseconds format incorrect; invalid date does not throw RangeError
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL: invalid date does not return null
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: TypeError: null does not have properties
<a href="../../conformance/es5/JSON.js">JSON.js</a>: FAIL: typeof JSON !== 'object'
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: TypeError: undefined does not have properties ('parse')
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: TypeError: undefined does not have properties ('parse')
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: TypeError: not a callable object
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/debugger.js">debugger.js</a>: SyntaxError: Compilation failed: SyntaxError: Compile Error NotYetImpl("NYI: Debugger(DebuggerStmt { span: Span { lo: BytePos(216), hi: BytePos(225), ctxt: #0 } })")
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 28%, ES2016+ 15%, Next 0%, Intl 4%</summary><ul>
<li>ES5: 63.6%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.every.js">Array.prototype.every.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.lastIndexOf.js">Array.prototype.lastIndexOf.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.reduceRight.js">Array.prototype.reduceRight.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: TypeError: not a callable object
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/JSON.js">JSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: TypeError: not a callable object
<a href="../../conformance/compat-table/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.getter-accessors.js">literals.getter-accessors.js</a>: SyntaxError: Compilation failed: SyntaxError: Compile Error NotYetImpl("NYI: Getter(GetterProp { span: Span { lo: BytePos(252), hi: BytePos(271), ctxt: #0 }, key: Ident(Ident { span: Span { lo: BytePos(256), hi: B...
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: SyntaxError: Compilation failed: SyntaxError: Compile Error NotYetImpl("NYI: Setter(SetterProp { span: Span { lo: BytePos(262), hi: BytePos(284), ctxt: #0 }, key: Ident(Ident { span: Span { lo: BytePos(266), hi: B...
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: SyntaxError: Compilation failed: SyntaxError: Compile Error NotYetImpl("NYI: Getter(GetterProp { span: Span { lo: BytePos(657), hi: BytePos(667), ctxt: #0 }, key: Ident(Ident { span: Span { lo: BytePos(661), hi: B...
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
...
</pre></li>
<li>ES6: 27.9%</li>
<li>ES2016: 9.1%</li>
<li>ES2017: 16%</li>
<li>ES2018: 10.5%</li>
<li>ES2019: 30.2%</li>
<li>ES2020: 14.3%</li>
<li>ES2021: 35.7%</li>
<li>ES2022: 9.3%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 3.6%</li>
</ul></details>

<details><summary>test262: 22%, main 26.9%, staging 11%, annexB 17.7%, Next 3.2%, Intl 0.1%</summary>
<ul>
<li>Overall: 22% (11710/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 26.9% (11086/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 56.8% (4654/8197)<pre>
caller: 69.6% (16/23)
</pre></li>
<li>ES6: 16.7% (1842/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 9% (24/268)
DataView: 12.6% (24/190)
DataView.prototype.getFloat32: 57.1% (4/7)
DataView.prototype.getFloat64: 40% (2/5)
DataView.prototype.getInt16: 0% (0/7)
DataView.prototype.getInt32: 0% (0/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 28.6% (2/7)
DataView.prototype.setUint8: 46.4% (26/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 50% (1/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0.2% (1/468)
Reflect.construct: 12.1% (84/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 4.5% (1/22)
String.prototype.endsWith: 37% (10/27)
String.prototype.includes: 73.1% (19/26)
Symbol: 14.5% (216/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 41.2% (14/34)
Symbol.iterator: 3.5% (66/1865)
Symbol.match: 10.2% (9/88)
Symbol.replace: 32.7% (32/98)
Symbol.search: 5.4% (2/37)
Symbol.species: 6.2% (17/276)
Symbol.split: 25.9% (15/58)
Symbol.toPrimitive: 3% (7/233)
Symbol.toStringTag: 0.8% (1/131)
Symbol.unscopables: 4.5% (2/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 16.5% (157/949)
class: 15.8% (752/4768)
computed-property-names: 2.5% (12/478)
const: 13.3% (2/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 12.2% (497/4085)
let: 10.4% (8/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 93.8% (90/96)
super: 26.3% (5/19)
tail-call-optimization: 77.1% (27/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 32.3% (42/130)<pre>
Array.prototype.includes: 24.6% (17/69)
exponentiation: 13.6% (14/103)
u180e: 48% (12/25)
</pre></li>
<li>ES2017: 17.7% (135/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 28.5% (201/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 12.9% (628/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 3.4% (1/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 10.5% (2/19)
regexp-named-groups: 54% (54/100)
regexp-unicode-property-escapes: 21.1% (144/681)
</pre></li>
<li>ES2019: 21.2% (29/137)<pre>
Array.prototype.flat: 60% (9/15)
Array.prototype.flatMap: 23.8% (5/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 12.5% (3/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 50% (2/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 5.6% (3/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 7.4% (159/2156)<pre>
BigInt: 3.1% (46/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 12.5% (2/16)
Symbol.matchAll: 3.2% (2/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 29.3% (277/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 12.5% (115/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 2.2% (2/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 29.7% (11/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 56.6% (90/159)
</pre></li>
<li>ES2022: 16.5% (902/5465)<pre>
Array.prototype.at: 63.6% (7/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.8% (383/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 10.7% (33/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 5.5% (6/109)
change-array-by-copy: 3% (4/132)
hashbang: 79.3% (23/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 2.1% (18/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 7.5% (14/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 15.3% (194/1264)<pre>
Float16Array: 10.2% (5/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.1% (12/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.2% (266/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.2% (63/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
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
<li>N/A: 30.9% (2693/8720)</li>
</ul>
</details>
