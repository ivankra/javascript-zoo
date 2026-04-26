# pmatos/jsse

Agent-coded JavaScript engine in Rust passing nearly 100% of test262.

* Homepage:   [ocmatos.com/blog](https://p.ocmatos.com/blog/jsse-a-javascript-engine-built-by-an-agent.html)
* Repository: [pmatos/jsse](https://github.com/pmatos/jsse) <span class="shields"><img src="https://img.shields.io/github/stars/pmatos/jsse?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/pmatos/jsse?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        [158373](# "cloc src")
* Language:   Rust
* License:    MIT
* Standard:   ESnext
* Years:      2026-

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Tested version: <a href="https://github.com/pmatos/jsse/commit/78b95414de39af2b956d02a43d982f80c28f72a8">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/jsse.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
</pre></li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 100%, Next 39%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/pmatos/jsse/commit/78b95414de39af2b956d02a43d982f80c28f72a8">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/jsse.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: object (class=Object, callable=false, id=1072, keys=[]) is not a function
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Set.iterator-prototype-chain.js">Set.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: SyntaxError: Invalid regular expression flags 'undefined'
<a href="../../conformance/compat-table/es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: FAIL
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

<details><summary>test262: 99.9%, main 99.9%, staging 98.7%, annexB 100%, Next 99.7%, Intl 100%</summary>
<ul>
<li>Tested version: <a href="https://github.com/pmatos/jsse/commit/78b95414de39af2b956d02a43d982f80c28f72a8">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/jsse.json">json</a>)</li>
<li>Overall: 99.9% (53116/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 99.9% (41542/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 100% (8197/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.9% (11053/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 100% (190/190)
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
Proxy: 100% (468/468)
Reflect: 99.8% (467/468)
Reflect.construct: 100% (696/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 99.7% (1490/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 100% (1865/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 100% (2513/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 99.9% (948/949)
class: 100% (4768/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 100% (201/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 100% (6637/6637)
for-of: 100% (5/5)
generators: 100% (4085/4085)
let: 98.7% (76/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 100% (35/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 98.6% (68/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 99.6% (760/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 100% (378/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 100% (464/464)
async-functions: 99.6% (702/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 100% (4855/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 100% (4968/4968)
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
<li>ES2020: 100% (2156/2156)<pre>
BigInt: 99.9% (1499/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 100% (26/26)
dynamic-import: 100% (946/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 100% (148/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 100% (920/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 100% (156/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 100% (5465/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 100% (1134/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 100% (2058/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 100% (271/271)
</pre></li>
<li>ES2023: 100% (410/410)<pre>
Intl-enumeration: 100% (35/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 100% (840/840)<pre>
Atomics.waitAsync: 100% (101/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 100% (463/463)
</pre></li>
<li>ES2025: 100% (1266/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 100% (21/21)
import-attributes: 100% (100/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 100% (361/361)<pre>
Array.fromAsync: 100% (95/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 100% (1543/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 100% (22/22)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 99.7% (7868/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 100% (64/64)
Temporal: 100% (6671/6671)
await-dictionary: 37.8% (14/37)
canonical-tz: 100% (19/19)
decorators: 100% (27/27)
explicit-resource-management: 99.8% (476/477)
immutable-arraybuffer: 100% (20/20)
import-bytes: 100% (5/5)
import-defer: 99.1% (227/229)
import-text: 100% (6/6)
joint-iteration: 100% (78/78)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 100% (4/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 99.6% (227/228)
source-phase-imports-module-source: 100% (84/84)
</pre></li>
<li>N/A: 99.8% (8699/8718)</li>
</ul>
</details>
