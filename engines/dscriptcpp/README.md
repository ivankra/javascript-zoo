# DscriptCPP

[DMDScript](../dmdscript/README.md) version implemented in C++.

* Homepage:    [digitalmars.com/dscript/cppscript.html](https://www.digitalmars.com/dscript/cppscript.html)
* Repository:  [DigitalMars/DscriptCPP](https://github.com/DigitalMars/DscriptCPP.git) <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [43988](# "cloc src")
* Language:    C++
* License:     BSL-1.0
* Org:         Digital Mars
* Standard:    ES3
* Years:       2000
* Interpreter: register-based VM ([opcodes.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/opcodes.c))

## Notes

Hacky non-portable x86-only C++ implementation (inline assembly in gccbitops.h, Gcx::fullcollectshell(), GC that wants to scan stack, compiler-dependent vtable hack etc). Non-trivial effort needed to port it even to x64.

## Links

* https://news.ycombinator.com/item?id=45509636

## Conformance

<details><summary>ES1-ES5: 74%</summary><ul>
<li>ES1: 97% (192/198)<pre>
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: FAIL: numeric sort failed; string sort failed; sort with comparefn failed; reverse comparefn failed
<a href="../../conformance/es1/Object.prototype.toString.js">Object.prototype.toString.js</a>: FAIL
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: FAIL: non-compliant, expected to return 100 instead of 2000
<a href="../../conformance/es1/asi.js">asi.js</a>: FAIL: can't Put(0, 1) to a primitive N
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 77.7% (115/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; zero failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6e-10'); (12345).toExponential(3) != '1.235e+4' (got: '1e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1e+0'); (1.255).toExponential(2) != '1.2...
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: small number exponential notation failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: basic toLocaleString failed; toLocaleString should equal toString failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: spec example failed
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: FAIL: $$ failed; combined replacements failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: Error compiling regular expression
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: FAIL: Error compiling regular expression
<a href="../../conformance/es3/function-expressions.IIFE.js">function-expressions.IIFE.js</a>: FAIL: cannot assign to f
<a href="../../conformance/es3/function-expressions.js">function-expressions.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: FAIL: wrong exception for negative array length; wrong exception for array length exceeding 2^32-1
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: cannot assign to 1
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: FAIL: unsupported char 0xd0
<a href="../../conformance/es3/in.js">in.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: FAIL: array with only elision failed
<a href="../../conformance/es3/literals.array.trailing-comma.js">literals.array.trailing-comma.js</a>: FAIL: [1,].length failed; trailing comma failed; multiple elements with trailing comma failed
<a href="../../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: FAIL: identifier expected
<a href="../../conformance/es3/literals.object.hex.js">literals.object.hex.js</a>: FAIL: identifier expected
...
</pre></li>
<li>ES5: 5.4% (4/74)</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 1%, Next 3%, Intl 25%</summary><ul>
<li>ES5: 9.5%</li>
<li>ES6: 1.4%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 0%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 8.5%, main 10.6%, staging 5.3%, annexB 3.2%, Next 0.2%, Intl 0.2%</summary>
<ul>
<li>Overall: 8.5% (4509/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 10.6% (4374/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 38.5% (3156/8197)<pre>
caller: 21.7% (5/23)
</pre></li>
<li>ES6: 2.3% (252/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0.4% (1/268)
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
Map: 12.5% (5/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0.4% (2/468)
Reflect: 5.6% (26/468)
Reflect.construct: 0.6% (4/696)
Reflect.set: 4.3% (2/46)
Reflect.setPrototypeOf: 13% (3/23)
Set: 39.5% (15/38)
String.fromCodePoint: 4.5% (1/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 4.1% (61/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0.1% (1/1865)
Symbol.match: 1.1% (1/88)
Symbol.replace: 1% (1/98)
Symbol.search: 2.7% (1/37)
Symbol.species: 0% (0/276)
Symbol.split: 1.7% (1/58)
Symbol.toPrimitive: 1.7% (4/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0.1% (2/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 11.4% (9/79)
WeakSet: 17.6% (6/34)
arrow-function: 0% (0/949)
class: 0% (0/4768)
computed-property-names: 0% (0/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 0% (0/2269)
destructuring-assignment: 0% (0/141)
destructuring-binding: 0.1% (4/6637)
for-of: 0% (0/5)
generators: 0% (0/4085)
let: 0% (0/77)
new.target: 1.6% (1/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 0% (0/96)
super: 31.6% (6/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 6.9% (9/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 0% (0/103)
u180e: 32% (8/25)
</pre></li>
<li>ES2017: 0.9% (7/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0.5% (2/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 1.1% (5/463)
async-functions: 0% (0/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 0% (0/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 0% (0/4968)
object-rest: 0% (0/355)
object-spread: 0% (0/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 2.9% (4/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 50% (2/4)
optional-catch-binding: 0% (0/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 0.2% (4/2156)<pre>
BigInt: 0% (0/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 0% (0/26)
dynamic-import: 0% (0/946)
export-star-as-namespace-from-module: 0% (0/19)
for-in-order: 0% (0/9)
globalThis: 0% (0/148)
import.meta: 8.7% (2/23)
optional-chaining: 0% (0/56)
</pre></li>
<li>ES2021: 5.1% (47/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 2.1% (1/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 0% (0/108)
numeric-separator-literal: 28.3% (45/159)
</pre></li>
<li>ES2022: 0.1% (4/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 0% (0/16)
class-fields-private: 0.2% (2/1134)
class-fields-private-in: 0% (0/19)
class-fields-public: 0% (0/2058)
class-methods-private: 0% (0/1709)
class-static-block: 0% (0/65)
class-static-fields-private: 0% (0/345)
class-static-fields-public: 0% (0/213)
class-static-methods-private: 0% (0/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 0% (0/271)
</pre></li>
<li>ES2023: 0.6% (2/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 1.8% (2/109)
change-array-by-copy: 0% (0/132)
hashbang: 0% (0/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.6% (5/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 5.8% (73/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 0% (0/100)
iterator-helpers: 0.2% (1/567)
json-modules: 0% (0/13)
promise-try: 0% (0/12)
regexp-modifiers: 31.3% (72/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 0.2% (16/8357)<pre>
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
explicit-resource-management: 1% (5/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 0% (0/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 0% (0/228)
source-phase-imports-module-source: 0% (0/84)
uint8array-base64: 2.9% (2/69)
upsert: 9.7% (7/72)
</pre></li>
<li>N/A: 10.7% (930/8720)</li>
</ul>
</details>
