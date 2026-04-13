# otto

JavaScript engine in pure Go.

* Repository:       [robertkrimen/otto](https://github.com/robertkrimen/otto.git) <span class="shields"><img src="https://img.shields.io/github/stars/robertkrimen/otto?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/robertkrimen/otto?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [26462](# "cloc --fullpath --not_match_f='(?i)(test)' .")
* Language:         Go
* License:          MIT
* Standard:         ES5 (partial)
* Years:            2012-
* Runtime platform: Go (cgo-free)
* Interpreter:      tree walker
* Regex engine:     RE2 (not ECMAScript-compliant)

## Forks

Largely superseded by the newer, faster, and full-featured [goja](../goja/README.md) engine,
which started out by forking otto's parser.

## Conformance

<details><summary>ES1-ES5: 91%</summary><ul>
<li>ES1: 99% (196/198)<pre>
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: CRASH: panic: runtime error: invalid memory address or nil pointer dereference [recovered, repanicked]
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 91.2% (135/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; zero failed; Infinity failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0',...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: ''.split(/.?/).length !== 0
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: FAIL: property name 1e2 failed; property name 2.5e1 failed
<a href="../../conformance/es3/literals.object.hex.js">literals.object.hex.js</a>: FAIL: property name 0xff failed; property name 0x10 failed; property name 0xABC failed
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: SyntaxError: Invalid regular expression: re2: Invalid \1 &lt;backreference&gt; (and 2 more errors)
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: SyntaxError: Invalid regular expression: re2: Invalid (?=) &lt;lookahead&gt; (and 2 more errors)
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: Invalid regular expression: re2: Invalid (?!) &lt;lookahead&gt; (and 2 more errors)
</pre></li>
<li>ES5: 71.6% (53/74)<pre>
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: invalid date does not throw RangeError
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: Unexpected token ILLEGAL (and 5 more errors)
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.js">strict.js</a>: FAIL
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
<a href="../../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: FAIL: string 'this' was coerced to object
<a href="../../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: FAIL: outer 'this' is not undefined
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 5%, ES2016+ 6%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 79.7%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: Unexpected token ILLEGAL (and 3 more errors)
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-unmapped.js">strict.arguments-unmapped.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-methods.js">strict.this-not-coerced-methods.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-undefined.js">strict.this-undefined.js</a>: FAIL
...
</pre></li>
<li>ES6: 4.6%</li>
<li>ES2016: 0%</li>
<li>ES2017: 16%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 8.9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 28.8%, main 35.1%, staging 17%, annexB 29.2%, Next 3.2%, Intl 0.3%</summary>
<ul>
<li>Overall: 28.8% (15335/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 35.1% (14489/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 89.5% (7336/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 11.6% (1284/11054)<pre>
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
Reflect.construct: 1.6% (11/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.3% (4/1494)
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
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (518/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 52.6% (10/19)
tail-call-optimization: 80% (28/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 19.2% (25/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 44% (11/25)
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
<li>ES2018: 9.7% (469/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 25% (25/100)
regexp-unicode-property-escapes: 0.4% (3/681)
</pre></li>
<li>ES2019: 9.5% (13/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 20.8% (5/24)
String.prototype.trimStart: 21.7% (5/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 22.2% (12/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.7% (187/2156)<pre>
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
import.meta: 60.9% (14/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 9.1% (84/920)<pre>
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
numeric-separator-literal: 45.3% (72/159)
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
<li>ES2023: 7.5% (23/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.1% (1/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0% (0/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 14.2% (179/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 71.3% (164/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.2% (267/8357)<pre>
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
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 15.8% (3/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 50.9% (4437/8720)</li>
</ul>
</details>
