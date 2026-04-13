# XS

Lightweight engine for microcontrollers/IoT by Kinoma/Marvell.

* Homepage:    [moddable.com/faq](https://www.moddable.com/faq#what-is-xs)
* Repository:  [Moddable-OpenSource/moddable](https://github.com/Moddable-OpenSource/moddable.git) <span class="shields"><img src="https://img.shields.io/github/stars/Moddable-OpenSource/moddable?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Moddable-OpenSource/moddable?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [88837](# "cloc xs/sources xs/includes")
* Language:    C
* License:     Apache-2.0, LGPL-3.0-or-later
* Org:         Kinoma
* Standard:    ESnext
* Years:       2002-
* Interpreter: stack-based VM

## History

Originally developed by [Kinoma](https://en.wikipedia.org/wiki/Kinoma). First open-sourced in 2015 as part of [KinomaJS](https://github.com/Kinoma/kinomajs.git) IoT framework (the repo has older XS6 version with ES6/ES2015 support). Now hosted in [Moddable SDK](https://github.com/Moddable-OpenSource/moddable) repo.

## Runtimes

* [KinomaJS](https://github.com/Kinoma/kinomajs) / [Moddable SDK](https://github.com/Moddable-OpenSource/moddable)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
</pre></li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 98%, Next 30%, Intl 25%</summary><ul>
<li>ES5: 99.1%<pre>
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: call: not a function (in testCode)
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: call: not a function (in testCode)
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: get g: undefined variable (in testCode)
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: no block (strict code)
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: labeled function
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: missing expression
<a href="../../conformance/compat-table/es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError
<a href="../../conformance/compat-table/es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: SyntaxError
<a href="../../conformance/compat-table/es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 94%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: missing ;
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 89.3%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 30.3%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 82.1%, main 99.6%, staging 87.1%, annexB 23.4%, Next 12.4%, Intl 0.8%</summary>
<ul>
<li>Overall: 82.1% (43635/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.6% (41088/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.6% (8086/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 98.3% (10867/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 98.9% (265/268)
DataView: 100% (190/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.4% (465/468)
Reflect: 94% (440/468)
Reflect.construct: 76.4% (532/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 72.2% (1078/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.8% (1862/1865)
Symbol.match: 97.7% (86/88)
Symbol.replace: 98% (96/98)
Symbol.search: 97.3% (36/37)
Symbol.species: 98.2% (271/276)
Symbol.split: 96.6% (56/58)
Symbol.toPrimitive: 95.7% (223/233)
Symbol.toStringTag: 77.9% (102/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 96.1% (2416/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 77% (731/949)
class: 99.2% (4732/4768)
computed-property-names: 99% (473/478)
const: 100% (15/15)
cross-realm: 80.6% (162/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6630/6637)
for-of: 100% (5/5)
generators: 99.9% (4080/4085)
let: 97.4% (75/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 97.1% (34/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 63.8% (44/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 92.4% (703/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 74.2% (279/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 79.3% (367/463)
async-functions: 95.3% (672/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 99.4% (4828/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.7% (4954/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 88.2% (15/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 99% (99/100)
regexp-unicode-property-escapes: 100% (681/681)
</pre></li>
<li>ES2019: 100% (137/137)<pre>
Array.prototype.flat: 100% (15/15)
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
<li>ES2020: 92% (1984/2156)<pre>
BigInt: 84.3% (1265/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 84.2% (797/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 100% (148/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 68.3% (628/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 98.1% (5362/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 99.7% (1131/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 96.8% (30/31)
top-level-await: 95.6% (259/271)
</pre></li>
<li>ES2023: 92.2% (284/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 94.8% (796/840)<pre>
Atomics.waitAsync: 62.4% (63/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 99.5% (186/187)
resizable-arraybuffer: 98.7% (457/463)
</pre></li>
<li>ES2025: 90.4% (1143/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 100% (21/21)
import-attributes: 89% (89/100)
iterator-helpers: 97.2% (551/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 99.6% (229/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 12.4% (1033/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 16.7% (1/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 99.4% (474/477)
immutable-arraybuffer: 75% (15/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 94.7% (18/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 87.9% (7661/8720)</li>
</ul>
</details>
