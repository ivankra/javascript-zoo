# LibJS

JavaScript engine of Ladybird browser and SerenityOS.

* Homepage:    [ladybirdbrowser.github.io/libjs-website](https://ladybirdbrowser.github.io/libjs-website/)
* Repository:  [LadybirdBrowser/ladybird](https://github.com/LadybirdBrowser/ladybird.git) <span class="shields"><img src="https://img.shields.io/github/stars/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [Libraries/LibJS/](https://github.com/LadybirdBrowser/ladybird/tree/master/Libraries/LibJS))
* LOC:         [72562](# "cloc --not_match_d='(?i)(test)' Libraries/LibJS")
* Language:    C++
* License:     BSD-2-Clause
* Standard:    ESnext
* Years:       2020-
* Features:    WebAssembly engine (LibWasm)
* Interpreter: register-based VM

## Links

* [An introduction to the LibJS JavaScript engine - Linux Groh - November 2022 TC39 Meeting](https://docs.google.com/presentation/d/1-chE3GTNFnNRwZqk4Bf3GCPV_nINfKG-NUTM4IeEnVc/view)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: <a href="https://github.com/LadybirdBrowser/ladybird/commit/4b1ecbc9df6d862109a3e284d3a70c26b764459d">2026-04-14</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/libjs.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 100%, Next 18%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/LadybirdBrowser/ladybird/commit/4b1ecbc9df6d862109a3e284d3a70c26b764459d">2026-04-14</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/libjs.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 97.4%<pre>
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Not allowed to declare a function here
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype-chain.js">subclassing.Function.prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: Call stack size limit exceeded
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: Call stack size limit exceeded
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
<li>Next: 18.2%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 97.9%, main 98.9%, staging 92.6%, annexB 99.9%, Next 92.9%, Intl 100%</summary>
<ul>
<li>Tested version: <a href="https://github.com/LadybirdBrowser/ladybird/commit/4b1ecbc9df6d862109a3e284d3a70c26b764459d">2026-04-14</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/libjs.json">json</a>)</li>
<li>Overall: 97.9% (52061/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 98.9% (41081/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99% (8112/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 98.9% (10933/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 94.2% (179/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (7/7)
Float64Array: 100% (7/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.4% (465/468)
Reflect: 98.7% (462/468)
Reflect.construct: 99.3% (691/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 97% (1449/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 97.5% (1818/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 88.4% (206/233)
Symbol.toStringTag: 99.2% (130/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 94.4% (2373/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 92.7% (880/949)
class: 99% (4722/4768)
computed-property-names: 97.3% (465/478)
const: 100% (15/15)
cross-realm: 97.5% (196/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.3% (6588/6637)
for-of: 100% (5/5)
generators: 98.9% (4041/4085)
let: 94.8% (73/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 97.1% (67/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 92.9% (709/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 63% (238/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 70.7% (328/464)
async-functions: 92.6% (653/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 99.7% (4842/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.5% (4943/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
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
<li>ES2020: 98% (2112/2156)<pre>
BigInt: 96.3% (1445/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 81.8% (774/946)
export-star-as-namespace-from-module: 94.7% (18/19)
for-in-order: 100% (9/9)
globalThis: 99.3% (147/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 99.9% (919/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 100% (156/156)
Promise.any: 98.9% (91/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.5% (5440/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.5% (1128/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.7% (2051/2058)
class-methods-private: 99.6% (1703/1709)
class-static-block: 95.4% (62/65)
class-static-fields-private: 99.7% (344/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 99.8% (1510/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 91.5% (248/271)
</pre></li>
<li>ES2023: 100% (410/410)<pre>
Intl-enumeration: 100% (35/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 91.4% (768/840)<pre>
Atomics.waitAsync: 31.7% (32/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 99.8% (462/463)
</pre></li>
<li>ES2025: 99.9% (1265/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 100% (21/21)
import-attributes: 88% (88/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 97.5% (352/361)<pre>
Array.fromAsync: 100% (95/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 100% (1543/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 68.2% (15/22)
uint8array-base64: 97.1% (67/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 92.9% (7337/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 0% (0/64)
Temporal: 100% (6671/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 100% (19/19)
decorators: 11.1% (3/27)
explicit-resource-management: 68.1% (325/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
joint-iteration: 100% (78/78)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 98.6% (8596/8718)</li>
</ul>
</details>
