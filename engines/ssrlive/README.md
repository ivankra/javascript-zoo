# ssrlive/javascript

JavaScript engine written in Rust.

* Repository:  [ssrlive/javascript](https://github.com/ssrlive/javascript.git) <span class="shields"><img src="https://img.shields.io/github/stars/ssrlive/javascript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ssrlive/javascript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [84773](# "cloc src")
* Language:    Rust
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2025-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 97%</summary><ul>
<li>Tested version: <a href="https://github.com/ssrlive/javascript/commit/46d998190bac056e0c90bbb7e8a8997d343d3e71">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/ssrlive.json">json</a>)</li>
<li>ES1: 98% (194/198)<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Octal literals are not allowed in strict mode
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Octal escape sequences are not allowed in strict mode
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Uncaught: SyntaxError: Delete of an unqualified identifier in strict mode.
<a href="../../conformance/es1/with.js">with.js</a>: ReferenceError: Uncaught: ReferenceError: x is not defined
</pre></li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
</pre></li>
<li>ES5: 90.5% (67/74)<pre>
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Uncaught: TypeError: Cannot add property a, object is not extensible
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Uncaught: TypeError: Cannot assign to read only property 'x' of object
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 93%, ES2016+ 93%, Next 33%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/ssrlive/javascript/commit/46d998190bac056e0c90bbb7e8a8997d343d3e71">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/ssrlive.json">json</a>)</li>
<li>ES5: 98.2%<pre>
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
</pre></li>
<li>ES6: 92.6%<pre>
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: TypeError: Cannot read properties of undefined (reading 'name')
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Set.zero-key.js">Set.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Function declarations are only allowed inside blocks in strict mode
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Function declarations are only allowed inside blocks in strict mode
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Invalid regular expression: /[\x1]/: Unbalanced bracket
<a href="../../conformance/compat-table/es6/annex-b.__proto__.Object.prototype.absent-from-null.js">annex-b.__proto__.Object.prototype.absent-from-null.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.lexical-arguments.js">arrow.lexical-arguments.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/class.block-scoped.js">class.block-scoped.js</a>: FAIL
<a href="../../conformance/compat-table/es6/class.implicit-strict.js">class.implicit-strict.js</a>: FAIL
<a href="../../conformance/compat-table/es6/class.lexical-name.js">class.lexical-name.js</a>: TypeError: Assignment to constant variable 'C'
<a href="../../conformance/compat-table/es6/class.new-target.js">class.new-target.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-assign.object-primitives.js">destructuring-assign.object-primitives.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: SyntaxError: Unexpected token
...
</pre></li>
<li>ES2016: 90.9%<pre>
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 88.1%<pre>
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: __lookupGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: __lookupSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2017/async.constructor.js">async.constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.must-await-value.js">async.must-await-value.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
</pre></li>
<li>ES2018: 89.5%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: FAIL
</pre></li>
<li>ES2019: 89.3%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 88.6%<pre>
<a href="../../conformance/compat-table/es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: Value is not a function
</pre></li>
<li>ES2021: 100%</li>
<li>ES2022: 90.5%<pre>
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: FAIL
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 33.3%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 93.8%, main 94.7%, staging 66.2%, annexB 54.1%, Next 98.6%, Intl 99.7%</summary>
<ul>
<li>Tested version: <a href="https://github.com/ssrlive/javascript/commit/46d998190bac056e0c90bbb7e8a8997d343d3e71">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/ssrlive.json">json</a>)</li>
<li>Overall: 93.8% (49862/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 94.7% (39348/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96.4% (7906/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 96.2% (10633/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 93.3% (250/268)
DataView: 94.7% (180/190)
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
Proxy: 87.6% (410/468)
Reflect: 77.8% (364/468)
Reflect.construct: 99% (689/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 94.7% (1415/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 94.1% (32/34)
Symbol.iterator: 73.7% (1374/1865)
Symbol.match: 97.7% (86/88)
Symbol.replace: 96.9% (95/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 91.7% (253/276)
Symbol.split: 93.1% (54/58)
Symbol.toPrimitive: 95.3% (222/233)
Symbol.toStringTag: 93.9% (123/131)
Symbol.unscopables: 75% (33/44)
TypedArray: 86.3% (2169/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 93.3% (885/949)
class: 98.7% (4708/4768)
computed-property-names: 99.6% (476/478)
const: 100% (15/15)
cross-realm: 1% (2/201)
default-parameters: 99.1% (2249/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 98.7% (6549/6637)
for-of: 100% (5/5)
generators: 98.2% (4013/4085)
let: 84.4% (65/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 88.6% (31/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 100% (130/130)<pre>
Array.prototype.includes: 100% (69/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 91.3% (697/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 68% (257/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 75% (348/464)
async-functions: 90.2% (636/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 88.9% (4314/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 75.9% (22/29)
Symbol.asyncIterator: 7.6% (41/538)
async-iteration: 86% (4274/4968)
object-rest: 97.7% (347/355)
object-spread: 94.1% (127/135)
regexp-dotall: 94.1% (16/17)
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
<li>ES2020: 91% (1963/2156)<pre>
BigInt: 89.2% (1339/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 98.7% (78/79)
Promise.allSettled: 96.1% (98/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 96.8% (61/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 90.2% (853/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 67.6% (100/148)
import.meta: 95.7% (22/23)
optional-chaining: 98.2% (55/56)
</pre></li>
<li>ES2021: 89.5% (823/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 97.9% (46/47)
Intl.ListFormat: 98.8% (80/81)
Intl.Locale: 99.4% (155/156)
Promise.any: 97.8% (90/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 46.2% (73/158)
logical-assignment-operators: 97.2% (105/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 95.9% (5242/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 97.5% (77/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.9% (1133/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2057/2058)
class-methods-private: 93.9% (1605/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 99.7% (344/345)
class-static-fields-public: 99.5% (212/213)
class-static-methods-private: 93.3% (1412/1513)
error-cause: 100% (5/5)
regexp-match-indices: 96.8% (30/31)
top-level-await: 93% (252/271)
</pre></li>
<li>ES2023: 97.6% (400/410)<pre>
Intl-enumeration: 100% (35/35)
Intl.NumberFormat-v3: 100% (102/102)
array-find-from-last: 92.7% (101/109)
change-array-by-copy: 98.5% (130/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 91.9% (772/840)<pre>
Atomics.waitAsync: 45.5% (46/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 93.2% (55/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 99.5% (186/187)
resizable-arraybuffer: 98.7% (457/463)
</pre></li>
<li>ES2025: 96.4% (1221/1266)<pre>
Float16Array: 82.4% (42/51)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 91% (91/100)
iterator-helpers: 95.4% (541/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 87% (314/361)<pre>
Array.fromAsync: 57.9% (55/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 100% (1543/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 95.5% (21/22)
uint8array-base64: 94.2% (65/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 98.6% (7783/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 95.3% (61/64)
Temporal: 99.9% (6670/6671)
await-dictionary: 100% (37/37)
canonical-tz: 100% (19/19)
decorators: 7.4% (2/27)
explicit-resource-management: 94.8% (452/477)
immutable-arraybuffer: 100% (20/20)
import-bytes: 100% (5/5)
import-defer: 96.1% (220/229)
import-text: 100% (6/6)
joint-iteration: 100% (78/78)
legacy-regexp: 73.1% (19/26)
nonextensible-applies-to-private: 75% (3/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 82% (187/228)
source-phase-imports-module-source: 97.6% (82/84)
</pre></li>
<li>N/A: 86.3% (7527/8718)</li>
</ul>
</details>
