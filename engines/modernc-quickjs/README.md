# ModerncQuickJS

[QuickJS](../quickjs/README.md) transpiled to pure Go.

* Homepage:         [modernc.org/quickjs](https://modernc.org/quickjs)
* Repository:       [quickjs](https://gitlab.com/cznic/quickjs.git) <span class="shields"><img src="https://img.shields.io/gitlab/stars/cznic/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/gitlab/last-commit/cznic/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [167235](# "cloc lib*.go ccgo_linux_amd64.go")
* Language:         Go
* License:          BSD-3-Clause, MIT
* Standard:         ES2023
* Years:            2024-
* Ancestor:         [QuickJS](../quickjs/README.md)
* Runtime platform: Go (cgo-free)
* Interpreter:      stack-based VM

## Links

* [Show HN: Pure Go QuickJS JavaScript engine (Golang)](https://news.ycombinator.com/item?id=43962304)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: 0.18.0 (<a href="https://gitlab.com/cznic/quickjs/-/commit/0d9935b5f36c42824ff1640cd124ad4ee8d38f5b">2026-04-13</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/modernc-quickjs.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 78%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: 0.18.0 (<a href="https://gitlab.com/cznic/quickjs/-/commit/0d9935b5f36c42824ff1640cd124ad4ee8d38f5b">2026-04-13</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/modernc-quickjs.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 93.9%<pre>
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.js">Promise.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Promise.js">subclassing.Promise.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
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
</pre></li>
<li>ES2018: 56.8%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 95.8%<pre>
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: FAIL
</pre></li>
<li>ES2020: 92.9%<pre>
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: FAIL
</pre></li>
<li>ES2021: 85.7%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: FAIL
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 67.3%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2025: 26.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 68.3%, main 81.8%, staging 72%, annexB 92%, Next 3.4%, Intl 0.7%</summary>
<ul>
<li>Tested version: 0.18.0 (<a href="https://gitlab.com/cznic/quickjs/-/commit/0d9935b5f36c42824ff1640cd124ad4ee8d38f5b">2026-04-13</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/modernc-quickjs.json">json</a>)</li>
<li>Overall: 68.3% (36338/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 81.8% (33977/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.6% (8086/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 95.4% (10551/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 63.4% (170/268)
DataView: 73.7% (140/190)
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
Int8Array: 85.7% (30/35)
Map: 92.5% (37/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 90.4% (423/468)
Reflect: 72.4% (339/468)
Reflect.construct: 70.3% (489/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 97.4% (37/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 61.8% (924/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 49.3% (920/1865)
Symbol.match: 93.2% (82/88)
Symbol.replace: 88.8% (87/98)
Symbol.search: 83.8% (31/37)
Symbol.species: 87.3% (241/276)
Symbol.split: 86.2% (50/58)
Symbol.toPrimitive: 84.1% (196/233)
Symbol.toStringTag: 48.9% (64/131)
Symbol.unscopables: 65.9% (29/44)
TypedArray: 77.8% (1954/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 72.2% (57/79)
WeakSet: 100% (34/34)
arrow-function: 53.6% (509/949)
class: 77.3% (3684/4768)
computed-property-names: 87.9% (420/478)
const: 86.7% (13/15)
cross-realm: 0% (0/201)
default-parameters: 96.3% (2185/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 82.8% (5495/6637)
for-of: 100% (5/5)
generators: 88% (3593/4085)
let: 89.6% (69/77)
new.target: 96.7% (59/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 97.1% (34/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 52.2% (36/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 66.4% (507/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 52.9% (200/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 55.8% (259/464)
async-functions: 33% (233/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 38% (1847/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 58.6% (17/29)
Symbol.asyncIterator: 0.9% (5/538)
async-iteration: 22.1% (1096/4968)
object-rest: 63.4% (225/355)
object-spread: 88.1% (119/135)
regexp-dotall: 94.1% (16/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 87.8% (598/681)
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
<li>ES2020: 66.3% (1430/2156)<pre>
BigInt: 72% (1080/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 44.1% (45/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 92.1% (58/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 45.5% (430/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 40.5% (60/148)
import.meta: 91.3% (21/23)
optional-chaining: 89.3% (50/56)
</pre></li>
<li>ES2021: 52.7% (485/920)<pre>
AggregateError: 87.1% (27/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 29.3% (27/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 53.8% (85/158)
logical-assignment-operators: 97.2% (105/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 70.9% (3877/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 89.8% (1018/1134)
class-fields-private-in: 94.7% (18/19)
class-fields-public: 79.1% (1627/2058)
class-methods-private: 72.5% (1239/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 78.8% (272/345)
class-static-fields-public: 98.1% (209/213)
class-static-methods-private: 61.5% (930/1513)
error-cause: 100% (5/5)
regexp-match-indices: 87.1% (27/31)
top-level-await: 3.7% (10/271)
</pre></li>
<li>ES2023: 66.8% (274/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 89% (97/109)
change-array-by-copy: 96.2% (127/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 30.5% (256/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 3.4% (2/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 97.3% (182/187)
resizable-arraybuffer: 4.8% (22/463)
</pre></li>
<li>ES2025: 31.3% (396/1266)<pre>
Float16Array: 80.4% (41/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 90.5% (19/21)
import-attributes: 49% (49/100)
iterator-helpers: 2.3% (13/567)
json-modules: 0% (0/13)
promise-try: 75% (9/12)
regexp-modifiers: 100% (230/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>ES2026: 11.1% (40/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 8.7% (6/69)
upsert: 31.9% (23/72)
</pre></li>
<li>Next: 3.4% (272/7895)<pre>
Atomics.pause: 16.7% (1/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 13.6% (65/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 92.4% (8057/8718)</li>
</ul>
</details>
