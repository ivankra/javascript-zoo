# Escargot

Lightweight JavaScript engine by Samsung for mid-range devices like phones/TVs.

* Repository:   [Samsung/escargot](https://github.com/Samsung/escargot.git) <span class="shields"><img src="https://img.shields.io/github/stars/Samsung/escargot?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Samsung/escargot?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [116291](# "cloc src")
* Language:     C++
* License:      LGPL-2.1
* Org:          Samsung
* Standard:     ESnext
* Years:        2016-
* Features:     WebAssembly engine, hidden classes
* Interpreter:  register-based VM
* Regex engine: YARR

## Runtimes

* [lwnode](https://github.com/Samsung/lwnode) <span class="shields"><img src="https://img.shields.io/github/stars/Samsung/lwnode?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Samsung/lwnode?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Samsung's lightweight Node.js implementation

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: <a href="https://github.com/Samsung/escargot/commit/633fe63795cd470e1bf2893cd5ce6f98ff3ce70b">2026-04-16</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/escargot_full.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 99%, ES2016+ 100%, Next 39%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/Samsung/escargot/commit/633fe63795cd470e1bf2893cd5ce6f98ff3ce70b">2026-04-16</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/escargot_full.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 99.6%<pre>
<a href="../../conformance/compat-table/es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-shorthand-method.js">annex-b.__proto__.literals.not-shorthand-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-shorthand-property.js">annex-b.__proto__.literals.not-shorthand-property.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.Object.defineProperties.js">misc.Proxy.get.Object.defineProperties.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp.prototype.test: this value is not a RegExp object
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
<li>Next: 39.4%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 96.8%, main 99.1%, staging 91.2%, annexB 99.3%, Next 85%, Intl 78.5%</summary>
<ul>
<li>Tested version: <a href="https://github.com/Samsung/escargot/commit/633fe63795cd470e1bf2893cd5ce6f98ff3ce70b">2026-04-16</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/escargot_full.json">json</a>)</li>
<li>Overall: 96.8% (51446/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 99.1% (41175/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.8% (8184/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.5% (10994/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 98.9% (265/268)
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
Proxy: 97.2% (455/468)
Reflect: 98.5% (461/468)
Reflect.construct: 99.7% (694/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 99% (1479/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.9% (1863/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 99.3% (274/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 93.2% (41/44)
TypedArray: 99.8% (2508/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 99.8% (947/949)
class: 99.4% (4739/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 100% (201/201)
default-parameters: 99.3% (2253/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.6% (6608/6637)
for-of: 100% (5/5)
generators: 99.8% (4078/4085)
let: 98.7% (76/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 88.6% (31/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 100% (130/130)<pre>
Array.prototype.includes: 97.1% (67/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 99% (755/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 99.5% (376/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 99.1% (460/464)
async-functions: 99.1% (699/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 99.2% (4816/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.2% (4926/4968)
object-rest: 98.3% (349/355)
object-spread: 97.8% (132/135)
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
<li>ES2020: 97.4% (2101/2156)<pre>
BigInt: 99.7% (1496/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 100% (26/26)
dynamic-import: 84.1% (796/946)
export-star-as-namespace-from-module: 84.2% (16/19)
for-in-order: 88.9% (8/9)
globalThis: 66.2% (98/148)
import.meta: 100% (23/23)
optional-chaining: 98.2% (55/56)
</pre></li>
<li>ES2021: 98.3% (904/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 93.8% (15/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 95.5% (149/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 91.7% (99/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.7% (5447/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 83.3% (10/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 99.6% (1130/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 99.8% (1705/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 99.7% (1509/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 94.5% (256/271)
</pre></li>
<li>ES2023: 99.8% (409/410)<pre>
Intl-enumeration: 97.1% (34/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 99.3% (834/840)<pre>
Atomics.waitAsync: 100% (101/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 77.8% (7/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 98.9% (458/463)
</pre></li>
<li>ES2025: 98.3% (1245/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 99.1% (111/112)
RegExp.escape: 100% (21/21)
import-attributes: 88% (88/100)
iterator-helpers: 96.6% (548/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 94.7% (342/361)<pre>
Array.fromAsync: 86.3% (82/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 62.8% (969/1543)
Intl.Locale-info: 97.7% (42/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 90.9% (20/22)
uint8array-base64: 97.1% (67/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 85% (6713/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 98.4% (63/64)
Temporal: 89% (5940/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 84.2% (16/19)
decorators: 11.1% (3/27)
explicit-resource-management: 92.9% (443/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 96.8% (8435/8718)</li>
</ul>
</details>
