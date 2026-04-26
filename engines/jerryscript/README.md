# JerryScript

Lightweight JavaScript engine for microcontrollers.

* Homepage:    [jerryscript.net](https://jerryscript.net/)
* Repository:  [jerryscript-project/jerryscript](https://github.com/jerryscript-project/jerryscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/jerryscript-project/jerryscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jerryscript-project/jerryscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [108762](# "cloc jerry-*")
* Language:    C
* License:     Apache-2.0
* Org:         Samsung
* Standard:    ES2022 (partial, missing ES2018 regex and a few other features)
* Years:       2014-2024
* Interpreter: stack-based VM

## Notes

Very slow memory manager/GC: Splay benchmark score <1 with extremely slow SplaySetup().

## Runtimes

* [IoT.js](https://github.com/jerryscript-project/iotjs) <span class="shields"><img src="https://img.shields.io/github/stars/jerryscript-project/iotjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jerryscript-project/iotjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [Microlattice.js](https://github.com/iamblue/microlattice) <span class="shields"><img src="https://img.shields.io/github/stars/iamblue/microlattice?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/iamblue/microlattice?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [Kaluma](https://github.com/kaluma-project/kaluma) <span class="shields"><img src="https://img.shields.io/github/stars/kaluma-project/kaluma?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/kaluma-project/kaluma?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Tested version: <a href="https://github.com/jerryscript-project/jerryscript/commit/b7069350c2e52e7dc721dfb75f067147bd79b39b">2025-10-08</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/jerryscript.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 98% (145/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError
</pre></li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 70%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/jerryscript-project/jerryscript/commit/b7069350c2e52e7dc721dfb75f067147bd79b39b">2025-10-08</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/jerryscript.json">json</a>)</li>
<li>ES5: 98.6%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
</pre></li>
<li>ES6: 96.5%<pre>
<a href="../../conformance/compat-table/es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/template.escape-sequences.js">template.escape-sequences.js</a>: SyntaxError
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: FAIL
</pre></li>
<li>ES2018: 73.7%<pre>
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError
</pre></li>
<li>ES2019: 87.5%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 71.4%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError
</pre></li>
<li>ES2022: 85.7%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL
</pre></li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 74.6%, main 90%, staging 71.2%, annexB 84.4%, Next 3.6%, Intl 0.8%</summary>
<ul>
<li>Tested version: <a href="https://github.com/jerryscript-project/jerryscript/commit/b7069350c2e52e7dc721dfb75f067147bd79b39b">2025-10-08</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/jerryscript.json">json</a>)</li>
<li>Overall: 74.6% (39666/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 90% (37389/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.4% (8065/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 96.6% (10681/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 61.2% (164/268)
DataView: 75.3% (143/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 28.6% (2/7)
Float64Array: 28.6% (2/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 80% (28/35)
Map: 62.5% (25/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 96.2% (450/468)
Reflect: 84.8% (397/468)
Reflect.construct: 65.7% (457/696)
Reflect.set: 87% (40/46)
Reflect.setPrototypeOf: 91.3% (21/23)
Set: 97.4% (37/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 62.2% (929/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 98.1% (1830/1865)
Symbol.match: 89.8% (79/88)
Symbol.replace: 75.5% (74/98)
Symbol.search: 81.1% (30/37)
Symbol.species: 94.9% (262/276)
Symbol.split: 89.7% (52/58)
Symbol.toPrimitive: 81.1% (189/233)
Symbol.toStringTag: 54.2% (71/131)
Symbol.unscopables: 31.8% (14/44)
TypedArray: 78.9% (1982/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 57% (45/79)
WeakSet: 70.6% (24/34)
arrow-function: 66.5% (631/949)
class: 97% (4626/4768)
computed-property-names: 93.7% (448/478)
const: 100% (15/15)
cross-realm: 82.6% (166/201)
default-parameters: 99.7% (2262/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.8% (6627/6637)
for-of: 80% (4/5)
generators: 99% (4045/4085)
let: 80.5% (62/77)
new.target: 98.4% (60/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 93.1% (121/130)<pre>
Array.prototype.includes: 50.7% (35/69)
exponentiation: 87.4% (90/103)
u180e: 92% (23/25)
</pre></li>
<li>ES2017: 83.4% (636/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 41.8% (158/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 51.7% (240/464)
async-functions: 87.2% (615/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 87.6% (4254/4855)<pre>
IsHTMLDDA: 23.8% (10/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.6% (536/538)
async-iteration: 97% (4817/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 70.6% (12/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 58% (58/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 99.3% (136/137)<pre>
Array.prototype.flat: 93.3% (14/15)
Array.prototype.flatMap: 100% (21/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 74.5% (1607/2156)<pre>
BigInt: 75.1% (1128/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 96.1% (98/102)
String.prototype.matchAll: 87.5% (14/16)
Symbol.matchAll: 90.5% (57/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 44.1% (417/946)
export-star-as-namespace-from-module: 47.4% (9/19)
for-in-order: 100% (9/9)
globalThis: 71.6% (106/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 60.2% (554/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 96.7% (89/92)
String.prototype.replaceAll: 95.1% (39/41)
WeakRef: 83.8% (31/37)
align-detached-buffer-semantics-with-web-reality: 85.4% (135/158)
logical-assignment-operators: 79.6% (86/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 90.3% (4937/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 89.2% (1012/1134)
class-fields-private-in: 94.7% (18/19)
class-fields-public: 99.5% (2047/2058)
class-methods-private: 99.1% (1694/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 95.8% (204/213)
class-static-methods-private: 99.2% (1501/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 3.3% (9/271)
</pre></li>
<li>ES2023: 11.7% (48/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 16.5% (18/109)
change-array-by-copy: 7.6% (10/132)
hashbang: 69% (20/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 9.6% (81/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 3.4% (2/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 4.8% (22/463)
</pre></li>
<li>ES2025: 18.6% (236/1266)<pre>
Float16Array: 21.6% (11/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>ES2026: 8.6% (31/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 11.6% (8/69)
upsert: 31.9% (23/72)
</pre></li>
<li>Next: 3.6% (286/7895)<pre>
Atomics.pause: 16.7% (1/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 91.7% (7993/8718)</li>
</ul>
</details>
