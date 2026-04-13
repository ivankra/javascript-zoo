# KJS

Original JavaScript engine of KDE's Konqueror browser.

* Homepage:     [invent.kde.org/frameworks/kjs](https://invent.kde.org/frameworks/kjs)
* Repository:   [KDE/kjs](https://github.com/KDE/kjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/KDE/kjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/KDE/kjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [42352](# "cloc src")
* Language:     C++
* License:      LGPL-2.1-only (most source files are LGPL 2.0+)
* Org:          KDE
* Standard:     ES5
* Years:        1998-2023
* Interpreter:  tree walker, register-based VM (2008)
* Regex engine: PCRE2

## History

* 2001: KHTML/KJS forked by Apple as WebCore/[JavaScriptCore](../jsc/README.md) for their WebKit browser engine.
* 2008: implemented a bytecode interpreter "FrostByte" (https://blogs.kde.org/2008/05/22/news-land-konquerors/)
* Mostly dead by KDE 5 (2014)
* Dropped from KDE 6 (2024)

## Conformance

<details><summary>ES1-ES5: 86%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 77.7% (115/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: FAIL: non-global match failed; global match failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: spec example failed; $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: regex with capture failed
<a href="../../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: FAIL: non-global regex replace failed; global regex replace failed
<a href="../../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: FAIL: search for digits failed
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: FAIL: string with \d+ pattern failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: attempted toString() call on null or non-function object; no exception for instanceof non-callable
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError
<a href="../../conformance/es3/literals.regex.empty.js">literals.regex.empty.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: FAIL: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: FAIL
<a href="../../conformance/es3/regex.bracket.ranges.js">regex.bracket.ranges.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.class.esc-d.js">regex.class.esc-d.js</a>: FAIL: \d failed; \d+ failed; \D failed; \d in bracket failed; range with \d failed; \D in bracket failed
<a href="../../conformance/es3/regex.class.esc-s.js">regex.class.esc-s.js</a>: FAIL: \s in bracket failed; range with \s failed; \S in bracket failed
...
</pre></li>
<li>ES5: 64.9% (48/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: FAIL: array-like object not accepted
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: trailing comma does not throw SyntaxError
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: failed to drop undefined/function values; undefined/function values in array not converted to null
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: SyntaxError
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError
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
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 6%, ES2016+ 4%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 77.7%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError
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
...
</pre></li>
<li>ES6: 6.4%</li>
<li>ES2016: 18.2%</li>
<li>ES2017: 10%</li>
<li>ES2018: 0%</li>
<li>ES2019: 6.2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 27.4%, main 33.7%, staging 16.4%, annexB 16.2%, Next 3.2%, Intl 0.3%</summary>
<ul>
<li>Overall: 27.4% (14591/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 33.7% (13897/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 86.5% (7094/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 11.7% (1295/11054)<pre>
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
String.prototype.endsWith: 59.3% (16/27)
String.prototype.includes: 61.5% (16/26)
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
destructuring-binding: 7.7% (509/6637)
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
<li>ES2016: 33.8% (44/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 35% (36/103)
u180e: 32% (8/25)
</pre></li>
<li>ES2017: 21.2% (161/761)<pre>
__getter__: 44.4% (12/27)
__setter__: 44.4% (12/27)
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
<li>ES2020: 8.5% (184/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 56.5% (13/23)
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
<li>ES2023: 7.5% (23/308)<pre>
Intl-enumeration: 0% (0/35)
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
<li>ES2025: 7.1% (90/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 32.6% (75/230)
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
<li>N/A: 45.6% (3979/8720)</li>
</ul>
</details>
