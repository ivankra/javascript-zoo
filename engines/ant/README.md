# Ant

Ant-sized JavaScript runtime, notable for async/await, FFI, HTTP servers, crypto, while being under 4 MB.

* Repository:   [theMackabu/ant](https://github.com/theMackabu/ant.git) <span class="shields"><img src="https://img.shields.io/github/stars/theMackabu/ant?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/theMackabu/ant?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [34461](# "cloc src")
* Language:     C
* License:      MIT
* Standard:     ES5 (ES6 Partial)
* Years:        2025-
* Interpreter:  tree-walking
* Regex engine: PCRE2

## Links

- https://s.tail.so/js-in-one-month

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: <a href="https://github.com/theMackabu/ant/commit/12d3171b8efcbdebe50107e0b0b21385e168bec6">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/ant.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 86%, ES2016+ 89%, Next 6%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/theMackabu/ant/commit/12d3171b8efcbdebe50107e0b0b21385e168bec6">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/ant.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 85.8%<pre>
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.accessor.js">Function.name.accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-static.js">Function.name.class-static.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.configurable.js">Function.name.configurable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.new-Function.js">Function.name.new-Function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.variable.js">Function.name.variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL: Uncaught (in promise) 'qux'; Uncaught (in promise) 'baz'
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL: Uncaught (in promise) 'baz'; Uncaught (in promise) 'bar'
<a href="../../conformance/compat-table/es6/Proxy.Array.isArray.js">Proxy.Array.isArray.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.defineProperty.invariants.js">Proxy.handler.defineProperty.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.invariants.js">Proxy.handler.getOwnPropertyDescriptor.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 86.1%<pre>
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-line-break.js">async.no-line-break.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-prototype.js">async.no-prototype.js</a>: FAIL
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 70.2%<pre>
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Object.fromEntries iterable values must be entry objects
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.empty.js">Symbol.prototype.description.empty.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 92.9%<pre>
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: FAIL: Uncaught (in promise) 2
</pre></li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 63.2%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Set.prototype.difference.js">Set.prototype.difference.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.intersection.js">Set.prototype.intersection.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.isDisjointFrom.js">Set.prototype.isDisjointFrom.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.isSubsetOf.js">Set.prototype.isSubsetOf.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.isSupersetOf.js">Set.prototype.isSupersetOf.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.symmetricDifference.js">Set.prototype.symmetricDifference.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/Set.prototype.union.js">Set.prototype.union.js</a>: TypeError: undefined is not a function
</pre></li>
<li>Next: 6.1%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 32%, main 38.2%, staging 28.4%, annexB 42.4%, Next 1.6%, Intl 4.6%</summary>
<ul>
<li>Tested version: <a href="https://github.com/theMackabu/ant/commit/12d3171b8efcbdebe50107e0b0b21385e168bec6">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/ant.json">json</a>)</li>
<li>Overall: 32% (17014/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 38.2% (15861/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 67.7% (5546/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 33.1% (3657/11054)<pre>
__proto__: 50% (9/18)
Array.prototype.values: 25% (1/4)
ArrayBuffer: 14.2% (38/268)
DataView: 20.5% (39/190)
DataView.prototype.getFloat32: 14.3% (1/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 28.6% (2/7)
DataView.prototype.getInt32: 28.6% (2/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 28.6% (2/7)
DataView.prototype.getUint32: 28.6% (2/7)
DataView.prototype.setUint8: 53.6% (30/56)
Float32Array: 57.1% (4/7)
Float64Array: 57.1% (4/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 71.4% (25/35)
Map: 35% (14/40)
Object.is: 50% (1/2)
Promise: 75% (3/4)
Proxy: 29.5% (138/468)
Reflect: 15.8% (74/468)
Reflect.construct: 8% (56/696)
Reflect.set: 8.7% (4/46)
Reflect.setPrototypeOf: 17.4% (4/23)
Set: 34.2% (13/38)
String.fromCodePoint: 36.4% (8/22)
String.prototype.endsWith: 44.4% (12/27)
String.prototype.includes: 53.8% (14/26)
Symbol: 25.1% (375/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 47.1% (16/34)
Symbol.iterator: 11.8% (220/1865)
Symbol.match: 52.3% (46/88)
Symbol.replace: 33.7% (33/98)
Symbol.search: 48.6% (18/37)
Symbol.species: 24.6% (68/276)
Symbol.split: 55.2% (32/58)
Symbol.toPrimitive: 20.2% (47/233)
Symbol.toStringTag: 14.5% (19/131)
Symbol.unscopables: 9.1% (4/44)
TypedArray: 13.6% (343/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 0% (0/2)
Uint8Array: 36.4% (4/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 38% (30/79)
WeakSet: 38.2% (13/34)
arrow-function: 16.8% (159/949)
class: 13.6% (647/4768)
computed-property-names: 65.9% (315/478)
const: 80% (12/15)
cross-realm: 1% (2/201)
default-parameters: 1.5% (33/2269)
destructuring-assignment: 39% (55/141)
destructuring-binding: 18.5% (1225/6637)
for-of: 100% (5/5)
generators: 16.2% (660/4085)
let: 48.1% (37/77)
new.target: 29.5% (18/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 5.3% (1/19)
tail-call-optimization: 60% (21/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 60% (78/130)<pre>
Array.prototype.includes: 30.4% (21/69)
exponentiation: 53.4% (55/103)
u180e: 76% (19/25)
</pre></li>
<li>ES2017: 39.7% (303/763)<pre>
__getter__: 40.7% (11/27)
__setter__: 40.7% (11/27)
Atomics: 14.3% (54/378)
Intl.DateTimeFormat-dayPeriod: 8.3% (1/12)
SharedArrayBuffer: 15.5% (72/464)
async-functions: 40.1% (283/705)
intl-normative-optional: 50% (2/4)
</pre></li>
<li>ES2018: 14.2% (691/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 37.9% (11/29)
Symbol.asyncIterator: 1.7% (9/538)
async-iteration: 12.4% (614/4968)
object-rest: 17.7% (63/355)
object-spread: 77% (104/135)
regexp-dotall: 58.8% (10/17)
regexp-lookbehind: 36.8% (7/19)
regexp-named-groups: 11% (11/100)
regexp-unicode-property-escapes: 5.7% (39/681)
</pre></li>
<li>ES2019: 27.7% (38/137)<pre>
Array.prototype.flat: 46.7% (7/15)
Array.prototype.flatMap: 28.6% (6/21)
Object.fromEntries: 28% (7/25)
String.prototype.trimEnd: 12.5% (3/24)
String.prototype.trimStart: 13% (3/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 100% (4/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 50% (2/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 11.1% (6/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 26.9% (580/2156)<pre>
BigInt: 17.7% (265/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 17.6% (18/102)
String.prototype.matchAll: 43.8% (7/16)
Symbol.matchAll: 47.6% (30/63)
coalesce-expression: 73.1% (19/26)
dynamic-import: 27.1% (256/946)
export-star-as-namespace-from-module: 42.1% (8/19)
for-in-order: 22.2% (2/9)
globalThis: 37.8% (56/148)
import.meta: 26.1% (6/23)
optional-chaining: 33.9% (19/56)
</pre></li>
<li>ES2021: 26.4% (243/920)<pre>
AggregateError: 32.3% (10/31)
FinalizationRegistry: 44.9% (22/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 16.2% (6/37)
Intl.DateTimeFormat-fractionalSecondDigits: 10% (1/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 1.2% (1/81)
Intl.Locale: 0% (0/156)
Promise.any: 15.2% (14/92)
String.prototype.replaceAll: 14.6% (6/41)
WeakRef: 37.8% (14/37)
align-detached-buffer-semantics-with-web-reality: 7.6% (12/158)
logical-assignment-operators: 79.6% (86/108)
numeric-separator-literal: 61.6% (98/159)
</pre></li>
<li>ES2022: 18.2% (994/5465)<pre>
Array.prototype.at: 54.5% (6/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 20.3% (16/79)
Object.hasOwn: 88.7% (55/62)
String.prototype.at: 54.5% (6/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 56.2% (9/16)
class-fields-private: 12.8% (145/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 11.5% (237/2058)
class-methods-private: 8.5% (146/1709)
class-static-block: 35.4% (23/65)
class-static-fields-private: 1.2% (4/345)
class-static-fields-public: 68.5% (146/213)
class-static-methods-private: 7.9% (119/1513)
error-cause: 0% (0/5)
regexp-match-indices: 61.3% (19/31)
top-level-await: 88.9% (241/271)
</pre></li>
<li>ES2023: 29.8% (122/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 32.4% (33/102)
array-find-from-last: 23.9% (26/109)
change-array-by-copy: 28.8% (38/132)
hashbang: 86.2% (25/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 15.4% (129/840)<pre>
Atomics.waitAsync: 9.9% (10/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 50% (14/28)
arraybuffer-transfer: 27.1% (16/59)
promise-with-resolvers: 33.3% (3/9)
regexp-v-flag: 43.3% (81/187)
resizable-arraybuffer: 1.1% (5/463)
</pre></li>
<li>ES2025: 28.8% (364/1266)<pre>
Float16Array: 13.7% (7/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 52.4% (11/21)
import-attributes: 19% (19/100)
iterator-helpers: 40.7% (231/567)
json-modules: 15.4% (2/13)
promise-try: 25% (3/12)
regexp-modifiers: 25.2% (58/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>ES2026: 11.6% (42/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 76.9% (10/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 9.4% (3/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 8.7% (6/69)
upsert: 31.9% (23/72)
</pre></li>
<li>Next: 1.6% (128/7895)<pre>
Atomics.pause: 16.7% (1/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 10.8% (4/37)
canonical-tz: 15.8% (3/19)
decorators: 18.5% (5/27)
explicit-resource-management: 9.2% (44/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 17.9% (41/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 21.1% (4/19)
source-phase-imports: 9.2% (21/228)
source-phase-imports-module-source: 23.8% (20/84)
</pre></li>
<li>N/A: 47% (4099/8718)</li>
</ul>
</details>
