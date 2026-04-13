# MuJS

Embeddable JavaScript engine from MuPDF.

* Homepage:    [mujs.com](https://mujs.com/)
* Repository:  [codeberg.org/ccxvii/mujs](https://codeberg.org/ccxvii/mujs.git) <span class="shields"><img src="https://img.shields.io/gitea/stars/ccxvii/mujs?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Stars" title="Stars"><img src="https://img.shields.io/gitea/last-commit/ccxvii/mujs?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Last commit" title="Last commit"></span>
* GitHub:      [ccxvii/mujs](https://github.com/ccxvii/mujs.git) <span class="shields"><img src="https://img.shields.io/github/stars/ccxvii/mujs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ccxvii/mujs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [18490](# "cloc *.c *.h")
* Language:    C
* License:     ISC
* Standard:    ES5
* Years:       2013-
* Interpreter: stack-based VM

## Users

* [MuPDF](https://github.com/ArtifexSoftware/mupdf)
* [SumatraPDF](https://github.com/sumatrapdfreader/sumatrapdf)
* [mpv](https://github.com/mpv-player/mpv/blob/master/DOCS/man/javascript.rst) - for scripting with JS, as alternative to Lua
* [Elinks](https://github.com/rkd77/elinks) browser - can be configured to use SpiderMonkey, QuickJS or MuJS
* [jSH](https://github.com/SuperIlu/jSH) - JavaScript engine for MS-DOS

## Conformance

<details><summary>ES1-ES5: 92%</summary><ul>
<li>ES1: 96% (190/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.length failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not callable
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not callable
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not callable
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: 'escape' is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: 'unescape' is not defined
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: number with leading zero
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
</pre></li>
<li>ES3: 89.9% (133/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: empty array toLocaleString failed; multiple elements content failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RangeError: precision 0 out of range
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: Array index should be enumerable failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.concat.js">String.prototype.concat.js</a>: FAIL: concat with no arguments failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '0'.split(undefined, 0).length !== 0
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: undefined is not callable
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for decodeURI invalid UTF-8; no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exce...
<a href="../../conformance/es3/regex.disjunction.js">regex.disjunction.js</a>: FAIL: complex disjunction failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: FAIL: spec example failed
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: unexpected character: \u2000
</pre></li>
<li>ES5: 86.5% (64/74)<pre>
<a href="../../conformance/es5/Object.getOwnPropertyDescriptor.js">Object.getOwnPropertyDescriptor.js</a>: FAIL: inherited property failed
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: unexpected character: \u200C
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 2%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 86.3%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: undefined is not callable
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: unexpected character: \u200C
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 1.4%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
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

<details><summary>test262: 27%, main 32.9%, staging 13.7%, annexB 30%, Next 3.2%, Intl 0.2%</summary>
<ul>
<li>Overall: 27% (14354/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 32.9% (13552/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 80.6% (6603/8197)<pre>
caller: 95.7% (22/23)
</pre></li>
<li>ES6: 10.6% (1167/11054)<pre>
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
Reflect.construct: 0.1% (1/696)
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
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 23% (14/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 52.6% (10/19)
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
for-in-order: 22.2% (2/9)
globalThis: 5.4% (8/148)
import.meta: 56.5% (13/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 13.2% (121/920)<pre>
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
numeric-separator-literal: 68.6% (109/159)
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
<li>ES2023: 8.4% (26/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 75.9% (22/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.2% (52/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 7.4% (93/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 33.9% (78/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.2% (264/8357)<pre>
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
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 47.8% (4169/8720)</li>
</ul>
</details>
