# zuqe

JavaScript engine written in Rust.

* Repository:       [nupha/zuqe](https://github.com/nupha/zuqe.git)
* LOC:              [50141](# "cloc src")
* Language:         Rust
* License:          Apache-2.0
* Standard:         ES2023
* Years:            2025-
* Runtime platform: Rust

## Conformance

<details><summary>ES1-ES5: 97%</summary><ul>
<li>ES1: 98% (194/198)<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: 'escape' is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: 'unescape' is not defined
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: FAIL: +Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -2^31 failed; -2^31-1 failed
<a href="../../conformance/es1/unary.plus.str.js">unary.plus.str.js</a>: FAIL
</pre></li>
<li>ES3: 96.6% (143/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: wrong exception for encodeURI lone low surrogate; wrong exception for encodeURI lone high surrogate; wrong exception for encodeURIComponent lone low surrogate; wrong exception for encodeURIComponent l...
<a href="../../conformance/es3/global.encodeURIComponent.js">global.encodeURIComponent.js</a>: ReferenceError: 'encodeURIComponent' is not defined
<a href="../../conformance/es3/global.encodeURI.js">global.encodeURI.js</a>: ReferenceError: 'encodeURI' is not defined
</pre></li>
<li>ES5: 97.3% (72/74)<pre>
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var yield' did not throw in strict mode
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 93%, ES2016+ 77%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 95.6%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 93.3%<pre>
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.constructor-requires-new.js">Promise.constructor-requires-new.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.split.js">misc.Proxy.get.RegExp.Symbol.split.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp object expected
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 76.7%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: '__defineGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: '__defineSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: cannot read property 'call' of undefined
...
</pre></li>
<li>ES2018: 98.9%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: regex compilation error: unknown unicode script
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 71.4%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigInt.js">BigInt.js</a>: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: big int is not supported
</pre></li>
<li>ES2021: 42.9%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 67.3%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2025: 21.1%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 74.9%, main 91.4%, staging 65%, annexB 80.2%, Next 3.7%, Intl 0.6%</summary>
<ul>
<li>Overall: 74.9% (39836/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 91.4% (37676/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98% (8036/8197)<pre>
caller: 91.3% (21/23)
</pre></li>
<li>ES6: 95.3% (10531/11054)<pre>
__proto__: 94.4% (17/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 17.2% (46/268)
DataView: 24.2% (46/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 64.3% (36/56)
Float32Array: 33.3% (2/6)
Float64Array: 33.3% (2/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 82.9% (29/35)
Map: 90% (36/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 85.5% (400/468)
Reflect: 63.5% (297/468)
Reflect.construct: 62.6% (436/696)
Reflect.set: 78.3% (36/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 94.7% (36/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 51.4% (768/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 98.8% (1842/1865)
Symbol.match: 96.6% (85/88)
Symbol.replace: 94.9% (93/98)
Symbol.search: 91.9% (34/37)
Symbol.species: 71% (196/276)
Symbol.split: 89.7% (52/58)
Symbol.toPrimitive: 52.8% (123/233)
Symbol.toStringTag: 64.1% (84/131)
Symbol.unscopables: 95.5% (42/44)
TypedArray: 48.9% (1229/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 57% (45/79)
WeakSet: 70.6% (24/34)
arrow-function: 62.7% (595/949)
class: 98.4% (4694/4768)
computed-property-names: 83.7% (400/478)
const: 100% (15/15)
cross-realm: 0% (0/201)
default-parameters: 99.6% (2261/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.2% (6583/6637)
for-of: 80% (4/5)
generators: 98.9% (4042/4085)
let: 97.4% (75/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 93.1% (121/130)<pre>
Array.prototype.includes: 49.3% (34/69)
exponentiation: 85.4% (88/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 62.7% (477/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 33% (153/463)
async-functions: 92.8% (654/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 96.7% (4696/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.6% (536/538)
async-iteration: 98.8% (4908/4968)
object-rest: 100% (355/355)
object-spread: 82.2% (111/135)
regexp-dotall: 88.2% (15/17)
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
<li>ES2020: 49.5% (1067/2156)<pre>
BigInt: 9.9% (148/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 97.1% (99/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 93.7% (59/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 77.4% (732/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 88.5% (131/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 42.8% (394/920)<pre>
AggregateError: 90.3% (28/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 97.8% (90/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 25.9% (41/158)
logical-assignment-operators: 94.4% (102/108)
numeric-separator-literal: 81.8% (130/159)
</pre></li>
<li>ES2022: 97.2% (5312/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 81.2% (13/16)
class-fields-private: 98.2% (1114/1134)
class-fields-private-in: 89.5% (17/19)
class-fields-public: 99.8% (2053/2058)
class-methods-private: 98.9% (1691/1709)
class-static-block: 96.9% (63/65)
class-static-fields-private: 99.7% (344/345)
class-static-fields-public: 99.5% (212/213)
class-static-methods-private: 99.3% (1502/1513)
error-cause: 100% (5/5)
regexp-match-indices: 83.9% (26/31)
top-level-await: 93.4% (253/271)
</pre></li>
<li>ES2023: 71.1% (219/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 70.6% (77/109)
change-array-by-copy: 85.6% (113/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 30.6% (257/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 87.5% (7/8)
String.prototype.toWellFormed: 87.5% (7/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 18.6% (11/59)
promise-with-resolvers: 88.9% (8/9)
regexp-v-flag: 96.8% (181/187)
resizable-arraybuffer: 3.2% (15/463)
</pre></li>
<li>ES2025: 23.3% (294/1264)<pre>
Float16Array: 14.3% (7/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.1% (12/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 100% (230/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>Next: 3.7% (310/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.3% (73/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 8.7% (6/69)
upsert: 30.6% (22/72)
</pre></li>
<li>N/A: 91.6% (7985/8720)</li>
</ul>
</details>
