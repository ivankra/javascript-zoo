# Okojo

Experimental low allocation managed JavaScript engine for .NET.

* Repository:       [akeit0/okojo](https://github.com/akeit0/okojo.git) <span class="shields"><img src="https://img.shields.io/github/stars/akeit0/okojo?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/akeit0/okojo?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [137463](# "cloc src/Okojo")
* Language:         C#
* License:          MIT
* Standard:         ESnext
* Years:            2026-
* Runtime platform: .NET
* Interpreter:      register-based VM with accumulator (Ignition-like)

## Conformance

<details><summary>ES1-ES5: 95%</summary><ul>
<li>Tested version: 0.1.2-preview1 (<a href="https://github.com/akeit0/okojo/commit/ba775f44c6ce8c938397ad3ddbc2ab6dc8ad5e30">2026-04-18</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/okojo.json">json</a>)</li>
<li>ES1: 96% (190/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: FAIL: 0755 failed; max safe integer failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: Not a function
<a href="../../conformance/es1/with.js">with.js</a>: FAIL: NotSupportedException: With statements are not supported in Okojo
</pre></li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
</pre></li>
<li>ES5: 85.1% (63/74)<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 92%, ES2016+ 94%, Next 30%, Intl 100%</summary><ul>
<li>Tested version: 0.1.2-preview1 (<a href="https://github.com/akeit0/okojo/commit/ba775f44c6ce8c938397ad3ddbc2ab6dc8ad5e30">2026-04-18</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/okojo.json">json</a>)</li>
<li>ES5: 89.8%<pre>
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 91.5%<pre>
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: constructor is not a function
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: TypeError: Promise capability executor did not provide callables
<a href="../../conformance/compat-table/es6/Set.iterator-prototype-chain.js">Set.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/String.iterator-prototype-chain.js">String.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token '&gt;'
<a href="../../conformance/compat-table/es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: Invalid regular expression pattern
<a href="../../conformance/compat-table/es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: Invalid regular expression pattern
...
</pre></li>
<li>ES2016: 84.8%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 87.1%<pre>
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: __lookupGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: __lookupSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read properties of null or undefined
...
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 91.1%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 93.7%<pre>
<a href="../../conformance/compat-table/es2022/at-method.Array.js">at-method.Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: FAIL: InvalidOperationException: Captured binding 'ok' was not assigned a context slot.
</pre></li>
<li>ES2023: 80%<pre>
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Invalid private identifier
</pre></li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 30.3%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 74%, main 87%, staging 62.7%, annexB 37.6%, Next 8.9%, Intl 37.2%</summary>
<ul>
<li>Tested version: 0.1.2-preview1 (<a href="https://github.com/akeit0/okojo/commit/ba775f44c6ce8c938397ad3ddbc2ab6dc8ad5e30">2026-04-18</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/okojo.json">json</a>)</li>
<li>Overall: 74% (39355/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 87% (36138/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 93.4% (7657/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 85.6% (9462/11054)<pre>
__proto__: 16.7% (3/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 92.5% (248/268)
DataView: 88.9% (169/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 85.7% (6/7)
Float64Array: 85.7% (6/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 83.3% (390/468)
Reflect: 76.7% (359/468)
Reflect.construct: 77.6% (540/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 68.3% (1020/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 91.2% (31/34)
Symbol.iterator: 98.8% (1842/1865)
Symbol.match: 96.6% (85/88)
Symbol.replace: 95.9% (94/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 70.7% (195/276)
Symbol.split: 89.7% (52/58)
Symbol.toPrimitive: 93.6% (218/233)
Symbol.toStringTag: 77.9% (102/131)
Symbol.unscopables: 13.6% (6/44)
TypedArray: 86.3% (2168/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 69.2% (657/949)
class: 89.5% (4265/4768)
computed-property-names: 98.3% (470/478)
const: 93.3% (14/15)
cross-realm: 1% (2/201)
default-parameters: 89.5% (2031/2269)
destructuring-assignment: 36.2% (51/141)
destructuring-binding: 88.7% (5889/6637)
for-of: 100% (5/5)
generators: 88.1% (3600/4085)
let: 76.6% (59/77)
new.target: 68.9% (42/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 0% (0/96)
super: 94.7% (18/19)
tail-call-optimization: 91.4% (32/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 89.2% (116/130)<pre>
Array.prototype.includes: 98.6% (68/69)
exponentiation: 83.5% (86/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 68.8% (525/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 67.2% (254/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 73.1% (339/464)
async-functions: 70.2% (495/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 86% (4173/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.8% (537/538)
async-iteration: 88.3% (4385/4968)
object-rest: 98% (348/355)
object-spread: 100% (135/135)
regexp-dotall: 88.2% (15/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 45% (45/100)
regexp-unicode-property-escapes: 76.1% (518/681)
</pre></li>
<li>ES2019: 94.2% (129/137)<pre>
Array.prototype.flat: 86.7% (13/15)
Array.prototype.flatMap: 71.4% (15/21)
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
<li>ES2020: 75.7% (1633/2156)<pre>
BigInt: 75.1% (1127/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 98.7% (78/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 96.8% (61/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 50.5% (478/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 100% (9/9)
globalThis: 42.6% (63/148)
import.meta: 47.8% (11/23)
optional-chaining: 60.7% (34/56)
</pre></li>
<li>ES2021: 87.5% (805/920)<pre>
AggregateError: 93.5% (29/31)
FinalizationRegistry: 95.9% (47/49)
Intl.DateTimeFormat-datetimestyle: 62.5% (10/16)
Intl.DateTimeFormat-formatRange: 94.6% (35/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 97.9% (46/47)
Intl.ListFormat: 98.8% (80/81)
Intl.Locale: 99.4% (155/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 94.6% (35/37)
align-detached-buffer-semantics-with-web-reality: 53.8% (85/158)
logical-assignment-operators: 91.7% (99/108)
numeric-separator-literal: 85.5% (136/159)
</pre></li>
<li>ES2022: 88.3% (4824/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 97.5% (77/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 6.2% (1/16)
class-fields-private: 83.6% (948/1134)
class-fields-private-in: 68.4% (13/19)
class-fields-public: 92.3% (1899/2058)
class-methods-private: 90.2% (1541/1709)
class-static-block: 52.3% (34/65)
class-static-fields-private: 96.8% (334/345)
class-static-fields-public: 91.1% (194/213)
class-static-methods-private: 90.6% (1371/1513)
error-cause: 100% (5/5)
regexp-match-indices: 96.8% (30/31)
top-level-await: 87.1% (236/271)
</pre></li>
<li>ES2023: 94.9% (389/410)<pre>
Intl-enumeration: 71.4% (25/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 87.2% (95/109)
change-array-by-copy: 98.5% (130/132)
hashbang: 82.8% (24/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 86% (722/840)<pre>
Atomics.waitAsync: 45.5% (46/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 93.2% (55/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 72.7% (136/187)
resizable-arraybuffer: 98.7% (457/463)
</pre></li>
<li>ES2025: 85.9% (1088/1266)<pre>
Float16Array: 82.4% (42/51)
Intl.DurationFormat: 94.6% (106/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 51% (51/100)
iterator-helpers: 92.6% (525/567)
json-modules: 0% (0/13)
promise-try: 100% (12/12)
regexp-modifiers: 63.9% (147/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 94.5% (341/361)<pre>
Array.fromAsync: 100% (95/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0.3% (5/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 95.5% (21/22)
uint8array-base64: 94.2% (65/69)
upsert: 97.2% (70/72)
</pre></li>
<li>Next: 8.9% (703/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (2/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 21.1% (4/19)
decorators: 74.1% (20/27)
explicit-resource-management: 91.6% (437/477)
immutable-arraybuffer: 15% (3/20)
import-bytes: 0% (0/5)
import-defer: 30.6% (70/229)
import-text: 83.3% (5/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 75% (3/4)
regexp-duplicate-named-groups: 94.7% (18/19)
source-phase-imports: 55.7% (127/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 77.9% (6788/8718)</li>
</ul>
</details>
