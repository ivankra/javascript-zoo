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
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 79%, ES2016+ 79%, Next 9%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 79%<pre>
<a href="../../conformance/compat-table/es6/Array.from.generator.js">Array.from.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: FAIL
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
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL: Uncaught (in promise) 'qux'; Uncaught (in promise) 'baz'
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL: Uncaught (in promise) 'baz'; Uncaught (in promise) 'bar'
<a href="../../conformance/compat-table/es6/Proxy.Array.isArray.js">Proxy.Array.isArray.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: FAIL
...
</pre></li>
<li>ES2016: 50%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.typed-array.js">Array.prototype.includes.typed-array.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: TypeError: Cannot read properties of undefined (reading 'next')
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 74.1%<pre>
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: '__defineGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: '__defineSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: '__lookupSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
...
</pre></li>
<li>ES2018: 89.5%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2019: 64.3%<pre>
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.empty.js">Symbol.prototype.description.empty.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: TypeError: Cannot read properties of undefined (reading 'next')
</pre></li>
<li>ES2020: 64.3%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
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
<li>Next: 9.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 31.6%, main 38.6%, staging 26.7%, annexB 30.8%, Next 1.8%, Intl 0.2%</summary>
<ul>
<li>Overall: 31.6% (16783/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 38.6% (15901/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 65.7% (5389/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 38.6% (4264/11054)<pre>
__proto__: 33.3% (6/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 6.3% (17/268)
DataView: 7.4% (14/190)
DataView.prototype.getFloat32: 14.3% (1/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 28.6% (2/7)
DataView.prototype.getInt32: 28.6% (2/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 0% (0/7)
DataView.prototype.setUint8: 28.6% (16/56)
Float32Array: 66.7% (4/6)
Float64Array: 66.7% (4/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 71.4% (25/35)
Map: 35% (14/40)
Object.is: 50% (1/2)
Promise: 75% (3/4)
Proxy: 24.1% (113/468)
Reflect: 14.1% (66/468)
Reflect.construct: 8.2% (57/696)
Reflect.set: 8.7% (4/46)
Reflect.setPrototypeOf: 13% (3/23)
Set: 34.2% (13/38)
String.fromCodePoint: 13.6% (3/22)
String.prototype.endsWith: 40.7% (11/27)
String.prototype.includes: 50% (13/26)
Symbol: 22.6% (337/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 47.1% (16/34)
Symbol.iterator: 13.4% (249/1865)
Symbol.match: 51.1% (45/88)
Symbol.replace: 32.7% (32/98)
Symbol.search: 45.9% (17/37)
Symbol.species: 26.4% (73/276)
Symbol.split: 53.4% (31/58)
Symbol.toPrimitive: 19.3% (45/233)
Symbol.toStringTag: 9.2% (12/131)
Symbol.unscopables: 9.1% (4/44)
TypedArray: 13.7% (344/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 0% (0/2)
Uint8Array: 36.4% (4/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 36.7% (29/79)
WeakSet: 38.2% (13/34)
arrow-function: 11.7% (111/949)
class: 18.2% (867/4768)
computed-property-names: 63.8% (305/478)
const: 86.7% (13/15)
cross-realm: 1% (2/201)
default-parameters: 39.8% (903/2269)
destructuring-assignment: 33.3% (47/141)
destructuring-binding: 36.9% (2449/6637)
for-of: 100% (5/5)
generators: 10.8% (441/4085)
let: 46.8% (36/77)
new.target: 26.2% (16/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 3.1% (3/96)
super: 5.3% (1/19)
tail-call-optimization: 60% (21/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 50.8% (66/130)<pre>
Array.prototype.includes: 13% (9/69)
exponentiation: 52.4% (54/103)
u180e: 72% (18/25)
</pre></li>
<li>ES2017: 39.9% (304/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 10.6% (40/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 13.2% (61/463)
async-functions: 40.4% (285/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 8.1% (391/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 34.5% (10/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 6.6% (327/4968)
object-rest: 14.9% (53/355)
object-spread: 56.3% (76/135)
regexp-dotall: 41.2% (7/17)
regexp-lookbehind: 36.8% (7/19)
regexp-named-groups: 7% (7/100)
regexp-unicode-property-escapes: 0.3% (2/681)
</pre></li>
<li>ES2019: 21.2% (29/137)<pre>
Array.prototype.flat: 26.7% (4/15)
Array.prototype.flatMap: 19% (4/21)
Object.fromEntries: 20% (5/25)
String.prototype.trimEnd: 8.3% (2/24)
String.prototype.trimStart: 8.7% (2/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 100% (4/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 50% (2/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 7.4% (4/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 24% (518/2156)<pre>
BigInt: 17.7% (266/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 73.1% (19/26)
dynamic-import: 25.4% (240/946)
export-star-as-namespace-from-module: 42.1% (8/19)
for-in-order: 11.1% (1/9)
globalThis: 37.8% (56/148)
import.meta: 21.7% (5/23)
optional-chaining: 28.6% (16/56)
</pre></li>
<li>ES2021: 25% (230/920)<pre>
AggregateError: 32.3% (10/31)
FinalizationRegistry: 44.9% (22/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 15.2% (14/92)
String.prototype.replaceAll: 12.2% (5/41)
WeakRef: 37.8% (14/37)
align-detached-buffer-semantics-with-web-reality: 7.6% (12/158)
logical-assignment-operators: 79.6% (86/108)
numeric-separator-literal: 61.6% (98/159)
</pre></li>
<li>ES2022: 22.5% (1231/5465)<pre>
Array.prototype.at: 36.4% (4/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 87.1% (54/62)
String.prototype.at: 45.5% (5/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 56.2% (9/16)
class-fields-private: 12.6% (143/1134)
class-fields-private-in: 36.8% (7/19)
class-fields-public: 11.1% (228/2058)
class-methods-private: 16.9% (288/1709)
class-static-block: 35.4% (23/65)
class-static-fields-private: 1.2% (4/345)
class-static-fields-public: 65.7% (140/213)
class-static-methods-private: 17.1% (259/1513)
error-cause: 0% (0/5)
regexp-match-indices: 19.4% (6/31)
top-level-await: 88.2% (239/271)
</pre></li>
<li>ES2023: 26.6% (82/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 20.2% (22/109)
change-array-by-copy: 26.5% (35/132)
hashbang: 86.2% (25/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 5.5% (46/840)<pre>
Atomics.waitAsync: 7.9% (8/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 50% (14/28)
arraybuffer-transfer: 23.7% (14/59)
promise-with-resolvers: 33.3% (3/9)
regexp-v-flag: 1.1% (2/187)
resizable-arraybuffer: 1.1% (5/463)
</pre></li>
<li>ES2025: 21.8% (275/1264)<pre>
Float16Array: 14.3% (7/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 52.4% (11/21)
import-attributes: 22% (22/100)
iterator-helpers: 25.2% (143/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 25.2% (58/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>Next: 1.8% (149/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 16.7% (1/6)
Error.isError: 61.5% (8/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 10.8% (4/37)
canonical-tz: 0% (0/19)
decorators: 18.5% (5/27)
explicit-resource-management: 6.1% (29/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 17.9% (41/229)
import-text: 16.7% (1/6)
iterator-sequencing: 9.4% (3/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 15.8% (3/19)
source-phase-imports: 8.8% (20/228)
source-phase-imports-module-source: 23.8% (20/84)
uint8array-base64: 8.7% (6/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 43.7% (3809/8720)</li>
</ul>
</details>
