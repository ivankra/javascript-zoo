# rust-js

JavaScript engine written in Rust.

* Repository:  [rust-js/rjs](https://github.com/rust-js/rjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/rust-js/rjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/rust-js/rjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [19008](# "cloc src")
* Language:    Rust
* License:     Apache-2.0
* Standard:    ES5
* Years:       2015
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>Tested version: <a href="https://github.com/rust-js/rjs/commit/61391286b0f0d6ce23720ee13501f62751c26b29">2015-07-19</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/rust-js.json">json</a>)</li>
<li>ES1: 99% (196/198)<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError
</pre></li>
<li>ES3: 89.2% (132/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: empty array toLocaleString failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential() undefined arg failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.25).toExponential(1) != '1.26e+0' (got: '1.3e0'); (1.255).toExponential(2) != '1.25e+0', got '1.25e0'
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: TypeError: Invalid operation on null
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: Value is not a function
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: FAIL: no exception for unclosed string
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/literals.regex.empty.js">literals.regex.empty.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: FAIL: backref failed; multiple backrefs failed; backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.escape.js">regex.escape.js</a>: SyntaxError: Cannot parse '\'
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: Invalid regular expression
</pre></li>
<li>ES5: 86.5% (64/74)<pre>
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: TypeError: Target must be callable
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: FAIL: array-like object not accepted
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: stringify object failed
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: CRASH: thread '&lt;main&gt;' panicked at 'assertion failed: `(left == right)` (left: `Undefined`, right: `Number`)', src/rt/value.rs:291
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: FAIL: space parameter failed
<a href="../../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: FAIL: basic property names failed
<a href="../../conformance/es5/Object.keys.js">Object.keys.js</a>: FAIL: basic keys failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: CRASH: thread '&lt;main&gt;' panicked at 'index out of bounds: the len is 5 but the index is 6', ../src/libcollections/vec.rs:1167
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/rust-js/rjs/commit/61391286b0f0d6ce23720ee13501f62751c26b29">2015-07-19</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/rust-js.json">json</a>)</li>
<li>ES5: 92.9%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
</pre></li>
<li>ES6: 2.5%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 27.6%, main 33.4%, staging 17%, annexB 21.9%, Next 3.3%, Intl 0.4%</summary>
<ul>
<li>Tested version: <a href="https://github.com/rust-js/rjs/commit/61391286b0f0d6ce23720ee13501f62751c26b29">2015-07-19</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/rust-js.json">json</a>)</li>
<li>Overall: 27.6% (14653/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 33.4% (13887/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 87.2% (7145/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 10.9% (1200/11054)<pre>
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
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 1.6% (11/696)
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
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.7% (511/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 52.6% (10/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 19.2% (25/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 44% (11/25)
</pre></li>
<li>ES2017: 18% (137/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 9.1% (442/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0.1% (1/681)
</pre></li>
<li>ES2019: 2.2% (3/137)<pre>
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
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.6% (186/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 60.9% (14/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 13% (120/920)<pre>
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
numeric-separator-literal: 67.9% (108/159)
</pre></li>
<li>ES2022: 16.3% (893/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.9% (384/1134)
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
<li>ES2023: 5.6% (23/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.2% (2/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 7.5% (95/1266)<pre>
Float16Array: 0% (0/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 34.8% (80/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 0% (0/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>Next: 3.3% (264/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.4% (64/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 47.2% (4118/8718)</li>
</ul>
</details>
