# syoyo/lightjs

Vibe-coded JavaScript engine written in C++.

* Repository:  [syoyo/lightjs](https://github.com/syoyo/lightjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/syoyo/lightjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/syoyo/lightjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [28756](# "cloc src")
* Language:    C++
* License:     MIT
* Standard:    ES2020
* Years:       2025-
* Interpreter: tree-walker

## Conformance

<details><summary>ES1-ES5: 96%</summary><ul>
<li>Tested version: <a href="https://github.com/syoyo/lightjs/commit/f7c09511aeb9282b3e36dd9d9e94a69b0b0f65e6">2026-04-13</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/syoyo.json">json</a>)</li>
<li>ES1: 97.5% (193/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: FAIL
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: FAIL
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: FAIL
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: FAIL
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: FAIL
</pre></li>
<li>ES3: 93.9% (139/148)<pre>
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: FAIL: shift sparse array failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: FAIL: wrong exception for new Array with length &gt;= 2^32; no exception for array length exceeding 2^32-1
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: FAIL: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: FAIL
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: FAIL
</pre></li>
<li>ES5: 97.3% (72/74)<pre>
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: invalid JSON does not throw SyntaxError; trailing comma does not throw SyntaxError
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 78%, ES2016+ 80%, Next 21%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/syoyo/lightjs/commit/f7c09511aeb9282b3e36dd9d9e94a69b0b0f65e6">2026-04-13</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/syoyo.json">json</a>)</li>
<li>ES5: 97.6%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 78.3%<pre>
<a href="../../conformance/compat-table/es6/Array.from.generator.js">Array.from.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.iterable.js">Array.from.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.js">Promise.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.Array.isArray.js">Proxy.Array.isArray.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.constructor-requires-new.js">Proxy.constructor-requires-new.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.defineProperty.invariants.js">Proxy.handler.defineProperty.invariants.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 66.1%<pre>
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError
<a href="../../conformance/compat-table/es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.arrow.js">async.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await-non-promise.js">async.await-non-promise.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.constructor.js">async.constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.methods-class.js">async.methods-class.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.methods-object.js">async.methods-object.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.return.js">async.return.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.throw.js">async.throw.js</a>: FAIL
...
</pre></li>
<li>ES2018: 57.9%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Error in file 'regex.lookbehind.js': SyntaxError: Invalid regular expression
</pre></li>
<li>ES2019: 79.2%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 85.7%<pre>
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: FAIL
</pre></li>
<li>ES2021: 84.1%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 51%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: Error in file 'regex.flags.v.properties-of-strings.js': SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: Error in file 'regex.flags.v.set-notations.js': SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: Error in file 'regex.flags.v.unicode-15.1.js': SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: Error in file 'regex.flags.v.unicode-16.0.js': SyntaxError: Invalid regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: Error in file 'regex.flags.v.unicode-17.0.js': SyntaxError: Invalid regular expression
</pre></li>
<li>ES2025: 82.5%<pre>
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/RegExp.escape.js">RegExp.escape.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: FAIL
</pre></li>
<li>Next: 21.2%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 71%, main 78%, staging 57.7%, annexB 41.5%, Next 36%, Intl 59.2%</summary>
<ul>
<li>Tested version: <a href="https://github.com/syoyo/lightjs/commit/f7c09511aeb9282b3e36dd9d9e94a69b0b0f65e6">2026-04-13</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/syoyo.json">json</a>)</li>
<li>Overall: 71% (37775/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 78% (32426/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 97.1% (7962/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 87.7% (9690/11054)<pre>
__proto__: 72.2% (13/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 72.4% (194/268)
DataView: 81.1% (154/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 57.1% (4/7)
Float64Array: 57.1% (4/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 94.3% (33/35)
Map: 95% (38/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 33.5% (157/468)
Reflect: 51.9% (243/468)
Reflect.construct: 86.9% (605/696)
Reflect.set: 60.9% (28/46)
Reflect.setPrototypeOf: 73.9% (17/23)
Set: 100% (38/38)
String.fromCodePoint: 63.6% (14/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 62.1% (928/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 67.6% (23/34)
Symbol.iterator: 47% (876/1865)
Symbol.match: 87.5% (77/88)
Symbol.replace: 95.9% (94/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 53.3% (147/276)
Symbol.split: 89.7% (52/58)
Symbol.toPrimitive: 79.8% (186/233)
Symbol.toStringTag: 70.2% (92/131)
Symbol.unscopables: 56.8% (25/44)
TypedArray: 49.1% (1233/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 63.5% (603/949)
class: 77.6% (3698/4768)
computed-property-names: 87.9% (420/478)
const: 86.7% (13/15)
cross-realm: 1% (2/201)
default-parameters: 96.3% (2185/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 82.8% (5495/6637)
for-of: 100% (5/5)
generators: 87.6% (3580/4085)
let: 88.3% (68/77)
new.target: 96.7% (59/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 94.3% (33/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 79.2% (103/130)<pre>
Array.prototype.includes: 82.6% (57/69)
exponentiation: 78.6% (81/103)
u180e: 96% (24/25)
</pre></li>
<li>ES2017: 62.8% (479/763)<pre>
__getter__: 81.5% (22/27)
__setter__: 81.5% (22/27)
Atomics: 47.6% (180/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 60.6% (281/464)
async-functions: 31.2% (220/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 29.7% (1443/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 55.2% (16/29)
Symbol.asyncIterator: 0.9% (5/538)
async-iteration: 21.7% (1080/4968)
object-rest: 63.4% (225/355)
object-spread: 88.1% (119/135)
regexp-dotall: 82.4% (14/17)
regexp-lookbehind: 5.3% (1/19)
regexp-named-groups: 97% (97/100)
regexp-unicode-property-escapes: 26.3% (179/681)
</pre></li>
<li>ES2019: 83.9% (115/137)<pre>
Array.prototype.flat: 80% (12/15)
Array.prototype.flatMap: 66.7% (14/21)
Object.fromEntries: 92% (23/25)
String.prototype.trimEnd: 91.7% (22/24)
String.prototype.trimStart: 95.7% (22/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 81.5% (44/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 55.1% (1189/2156)<pre>
BigInt: 51.4% (772/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 96.2% (76/79)
Promise.allSettled: 41.2% (42/102)
String.prototype.matchAll: 75% (12/16)
Symbol.matchAll: 69.8% (44/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 55% (520/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 56.1% (83/148)
import.meta: 73.9% (17/23)
optional-chaining: 89.3% (50/56)
</pre></li>
<li>ES2021: 76.4% (703/920)<pre>
AggregateError: 61.3% (19/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 94.6% (35/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 89.4% (42/47)
Intl.ListFormat: 98.8% (80/81)
Intl.Locale: 99.4% (155/156)
Promise.any: 26.1% (24/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 20.9% (33/158)
logical-assignment-operators: 97.2% (105/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 72.1% (3941/5465)<pre>
Array.prototype.at: 81.8% (9/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 96.2% (76/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 46.2% (6/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 89.9% (1020/1134)
class-fields-private-in: 94.7% (18/19)
class-fields-public: 78.7% (1619/2058)
class-methods-private: 72.4% (1237/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 78.8% (272/345)
class-static-fields-public: 97.7% (208/213)
class-static-methods-private: 61.3% (928/1513)
error-cause: 100% (5/5)
regexp-match-indices: 90.3% (28/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 81% (332/410)<pre>
Intl-enumeration: 100% (35/35)
Intl.NumberFormat-v3: 98% (100/102)
array-find-from-last: 58.7% (64/109)
change-array-by-copy: 76.5% (101/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 65.4% (549/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 92.9% (26/28)
arraybuffer-transfer: 93.2% (55/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 43.9% (82/187)
resizable-arraybuffer: 82.7% (383/463)
</pre></li>
<li>ES2025: 85.9% (1088/1266)<pre>
Float16Array: 78.4% (40/51)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 0% (0/21)
import-attributes: 60% (60/100)
iterator-helpers: 80.8% (458/567)
json-modules: 15.4% (2/13)
promise-try: 75% (9/12)
regexp-modifiers: 100% (230/230)
set-methods: 97.4% (187/192)
</pre></li>
<li>ES2026: 47.1% (170/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 23.5% (363/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 9.4% (3/32)
json-parse-with-source: 95.5% (21/22)
uint8array-base64: 7.2% (5/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 36% (2846/7895)<pre>
Atomics.pause: 16.7% (1/6)
ShadowRealm: 0% (0/64)
Temporal: 32.2% (2151/6671)
await-dictionary: 37.8% (14/37)
canonical-tz: 100% (19/19)
decorators: 100% (27/27)
explicit-resource-management: 67.3% (321/477)
immutable-arraybuffer: 75% (15/20)
import-bytes: 0% (0/5)
import-defer: 50.2% (115/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 50% (2/4)
regexp-duplicate-named-groups: 89.5% (17/19)
source-phase-imports: 75.9% (173/228)
source-phase-imports-module-source: 100% (84/84)
</pre></li>
<li>N/A: 82.2% (7165/8718)</li>
</ul>
</details>
