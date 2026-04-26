# Lampese/NocturneJS

JavaScript engine written in MoonBit.

* Repository:  [Lampese/NocturneJS](https://github.com/Lampese/NocturneJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/Lampese/NocturneJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Lampese/NocturneJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [103096](# "cloc .")
* Language:    MoonBit
* License:     Unknown
* Standard:    ESnext
* Years:       2026-
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: <a href="https://github.com/Lampese/NocturneJS/commit/a418a962bdeb2933bbb4ff08788e2a7e3b12d5ea">2026-01-30</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/nocturnejs.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 100%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/Lampese/NocturneJS/commit/a418a962bdeb2933bbb4ff08788e2a7e3b12d5ea">2026-01-30</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/nocturnejs.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 96.7%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: cannot convert to object
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: invalid regular expression
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: invalid regular expression
<a href="../../conformance/compat-table/es6/misc.Proxy.get.HasBinding.js">misc.Proxy.get.HasBinding.js</a>: ReferenceError: undefined variable
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/well-known.unscopables.js">well-known.unscopables.js</a>: ReferenceError: undefined variable
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 76.1%, main 91.3%, staging 91.4%, annexB 96.8%, Next 1.4%, Intl 0.7%</summary>
<ul>
<li>Tested version: <a href="https://github.com/Lampese/NocturneJS/commit/a418a962bdeb2933bbb4ff08788e2a7e3b12d5ea">2026-01-30</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/nocturnejs.json">json</a>)</li>
<li>Overall: 76.1% (40474/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 91.3% (37941/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96.6% (7920/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 93.5% (10341/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 97.8% (262/268)
DataView: 93.2% (177/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 71.4% (5/7)
Float64Array: 71.4% (5/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 94.3% (33/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.1% (464/468)
Reflect: 90% (421/468)
Reflect.construct: 74.3% (517/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 72.7% (16/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 69.9% (1044/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.8% (1862/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 87.6% (204/233)
Symbol.toStringTag: 69.5% (91/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 93.9% (2359/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 72.3% (686/949)
class: 88.4% (4216/4768)
computed-property-names: 92.5% (442/478)
const: 93.3% (14/15)
cross-realm: 87.6% (176/201)
default-parameters: 93.7% (2126/2269)
destructuring-assignment: 86.5% (122/141)
destructuring-binding: 95.6% (6343/6637)
for-of: 100% (5/5)
generators: 93.7% (3827/4085)
let: 85.7% (66/77)
new.target: 83.6% (51/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 0% (0/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 84.6% (110/130)<pre>
Array.prototype.includes: 63.8% (44/69)
exponentiation: 84.5% (87/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 89.1% (680/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 72.8% (275/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 81% (376/464)
async-functions: 79.3% (559/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 86% (4176/4855)<pre>
IsHTMLDDA: 97.6% (41/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 93.5% (4645/4968)
object-rest: 98.9% (351/355)
object-spread: 82.2% (111/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 35.4% (241/681)
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
<li>ES2020: 87% (1875/2156)<pre>
BigInt: 81.5% (1223/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 55.6% (526/946)
export-star-as-namespace-from-module: 31.6% (6/19)
for-in-order: 100% (9/9)
globalThis: 91.2% (135/148)
import.meta: 30.4% (7/23)
optional-chaining: 73.2% (41/56)
</pre></li>
<li>ES2021: 61.1% (562/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 88.9% (96/108)
numeric-separator-literal: 64.8% (103/159)
</pre></li>
<li>ES2022: 84.1% (4598/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 0% (0/16)
class-fields-private: 70.5% (799/1134)
class-fields-private-in: 78.9% (15/19)
class-fields-public: 89.8% (1849/2058)
class-methods-private: 87.1% (1489/1709)
class-static-block: 90.8% (59/65)
class-static-fields-private: 97.4% (336/345)
class-static-fields-public: 90.1% (192/213)
class-static-methods-private: 96.2% (1455/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 3.3% (9/271)
</pre></li>
<li>ES2023: 69.3% (284/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 87.6% (736/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 99.6% (461/463)
</pre></li>
<li>ES2025: 89.6% (1134/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 63% (63/100)
iterator-helpers: 99.8% (566/567)
json-modules: 7.7% (1/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 37.4% (135/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 11.6% (8/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 1.4% (114/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 0.4% (1/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 0.4% (1/228)
source-phase-imports-module-source: 0% (0/84)
</pre></li>
<li>N/A: 88% (7672/8718)</li>
</ul>
</details>
