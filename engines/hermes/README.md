# Hermes

JavaScript engine from Facebook optimized for running React Native mobile apps.

* Homepage:    [hermesengine.dev](https://hermesengine.dev/)
* Repository:  [facebook/hermes](https://github.com/facebook/hermes.git) <span class="shields"><img src="https://img.shields.io/github/stars/facebook/hermes?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/facebook/hermes?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Branch:      [main](https://github.com/facebook/hermes/tree/main)
* LOC:         [170021](# "cloc include lib tools/hermes")
* Language:    C++
* License:     MIT
* Org:         Facebook
* Standard:    ES2023 (partial)
* Years:       2019-
* Features:    optimizing LLVM-based AOT compiler to bytecode
* Interpreter: register-based VM
* GC:          generational GC

## Notes

Only `static_h` branch is being actively developed now - [Hermes V1](../hermes-v1/README.md) (formerly "Static Hermes").

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99.5% (197/198)<pre>
<a href="../../conformance/es1/with.js">with.js</a>: SyntaxError: invalid statement encountered
</pre></li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 97.3% (72/74)<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 78%, ES2016+ 57%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 98%<pre>
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
</pre></li>
<li>ES6: 77.7%<pre>
<a href="../../conformance/compat-table/es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: SyntaxError: Invalid expression encountered
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: SyntaxError: Invalid expression encountered
<a href="../../conformance/compat-table/es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: SyntaxError: invalid statement encountered
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: SyntaxError: invalid statement encountered
<a href="../../conformance/compat-table/es6/Function.name.class-static.js">Function.name.class-static.js</a>: SyntaxError: invalid statement encountered
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: SyntaxError: Invalid expression encountered
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Promise.prototype-not-instance.js">Promise.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.RegExp-subclassing.js">Reflect.construct.RegExp-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.Symbol.species.js">RegExp.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Set.Symbol.species.js">Set.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 68%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: SyntaxError: invalid statement encountered
<a href="../../conformance/compat-table/es2017/async.arrow.js">async.arrow.js</a>: SyntaxError: async functions are unsupported
<a href="../../conformance/compat-table/es2017/async.methods-class.js">async.methods-class.js</a>: SyntaxError: invalid statement encountered
...
</pre></li>
<li>ES2018: 76.8%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: for await..of loops are currently unsupported
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: SyntaxError: async generators are unsupported
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: Invalid property name
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: Invalid property name
</pre></li>
<li>ES2019: 76.8%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of undefined
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 2:1:')' expected at end of function parameter list
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: 1:14:Invalid expression encountered
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: 1:2:Invalid expression encountered
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 42.9%</li>
<li>ES2022: 33.3%</li>
<li>ES2023: 77.1%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 50.4%, main 61.3%, staging 50.3%, annexB 43%, Next 3.7%, Intl 0.7%</summary>
<ul>
<li>Overall: 50.4% (26807/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 61.3% (25271/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 95.5% (7829/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 67.2% (7433/11054)<pre>
__proto__: 88.9% (16/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 27.6% (74/268)
DataView: 43.7% (83/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 50% (2/4)
Int8Array: 71.4% (25/35)
Map: 57.5% (23/40)
Object.is: 100% (2/2)
Promise: 25% (1/4)
Proxy: 78.6% (368/468)
Reflect: 57.5% (269/468)
Reflect.construct: 58.9% (410/696)
Reflect.set: 63% (29/46)
Reflect.setPrototypeOf: 87% (20/23)
Set: 92.1% (35/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 46.8% (699/1494)
Symbol.hasInstance: 88.2% (15/17)
Symbol.isConcatSpreadable: 91.2% (31/34)
Symbol.iterator: 31.4% (586/1865)
Symbol.match: 87.5% (77/88)
Symbol.replace: 82.7% (81/98)
Symbol.search: 75.7% (28/37)
Symbol.species: 15.9% (44/276)
Symbol.split: 44.8% (26/58)
Symbol.toPrimitive: 75.5% (176/233)
Symbol.toStringTag: 42.7% (56/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 44.6% (1121/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 45.5% (5/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 51.9% (41/79)
WeakSet: 58.8% (20/34)
arrow-function: 53% (503/949)
class: 15.8% (752/4768)
computed-property-names: 23.4% (112/478)
const: 13.3% (2/15)
cross-realm: 0% (0/201)
default-parameters: 38.8% (881/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 44.1% (2929/6637)
for-of: 80% (4/5)
generators: 38.3% (1564/4085)
let: 16.9% (13/77)
new.target: 45.9% (28/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 78.9% (15/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 86.2% (112/130)<pre>
Array.prototype.includes: 40.6% (28/69)
exponentiation: 72.8% (75/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 30.6% (233/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 34.9% (246/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 23.5% (1142/4855)<pre>
IsHTMLDDA: 26.2% (11/42)
Promise.prototype.finally: 51.7% (15/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 34.9% (124/355)
object-spread: 68.1% (92/135)
regexp-dotall: 82.4% (14/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 98% (98/100)
regexp-unicode-property-escapes: 57.6% (392/681)
</pre></li>
<li>ES2019: 90.5% (124/137)<pre>
Array.prototype.flat: 80% (12/15)
Array.prototype.flatMap: 66.7% (14/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 62.5% (5/8)
json-superset: 100% (4/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 46.7% (1007/2156)<pre>
BigInt: 48% (721/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 39.2% (40/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 81% (51/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 88.9% (8/9)
globalThis: 39.2% (58/148)
import.meta: 69.6% (16/23)
optional-chaining: 83.9% (47/56)
</pre></li>
<li>ES2021: 42.1% (387/920)<pre>
AggregateError: 90.3% (28/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 59.8% (55/92)
String.prototype.replaceAll: 92.7% (38/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 32.9% (52/158)
logical-assignment-operators: 54.6% (59/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 18.5% (1013/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 46.2% (6/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34% (386/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 80% (4/5)
regexp-match-indices: 83.9% (26/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 50% (154/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 62.4% (68/109)
change-array-by-copy: 44.7% (59/132)
hashbang: 93.1% (27/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 7.5% (63/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 1.3% (6/463)
</pre></li>
<li>ES2025: 17.8% (225/1264)<pre>
Float16Array: 14.3% (7/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>Next: 3.7% (309/8357)<pre>
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
decorators: 0% (0/27)
explicit-resource-management: 15.3% (73/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 19.2% (5/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 8.7% (6/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 77.7% (6776/8720)</li>
</ul>
</details>
