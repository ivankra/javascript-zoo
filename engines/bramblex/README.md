# bramblex/jsjs

Toy metacircular JavaScript interpreter.

* Repository:       [bramblex/jsjs](https://github.com/bramblex/jsjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/bramblex/jsjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bramblex/jsjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [662](# "cloc src")
* Language:         TypeScript
* License:          Missing
* Years:            2018
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 87%</summary><ul>
<li>ES1: 91.9% (182/198)<pre>
<a href="../../conformance/es1/Function.js">Function.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.eval.js">asi.eval.js</a>: ReferenceError: 'eval'
<a href="../../conformance/es1/asi.js">asi.js</a>: FAIL: [Error] res 重复定义
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: FAIL: [Error] x 重复定义
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: FAIL: [Error] isNaN 重复定义
<a href="../../conformance/es1/eval.js">eval.js</a>: ReferenceError: 'eval'
<a href="../../conformance/es1/for-in.js">for-in.js</a>: FAIL
<a href="../../conformance/es1/for.js">for.js</a>: ReferenceError: 's'
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL: a 未定义
<a href="../../conformance/es1/var.js">var.js</a>: FAIL: [Error] n 重复定义
<a href="../../conformance/es1/with.js">with.js</a>: FAIL: 因为 with 很多问题，已经被基本弃用了，不实现
</pre></li>
<li>ES3: 94.6% (140/148)<pre>
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: wrong exception for undeclared variable; wrong exception for undeclared function; wrong exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: FAIL: wrong exception type; wrong exception for unclosed string; wrong exception for invalid token
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: wrong exception for Function.prototype.toString on non-function; wrong exception for Function.prototype.apply on non-function
<a href="../../conformance/es3/labelled.break.js">labelled.break.js</a>: FAIL: labelled break in while failed; labelled break to outer loop failed; labelled break from block failed
<a href="../../conformance/es3/labelled.continue.js">labelled.continue.js</a>: FAIL: labelled continue in while failed; labelled continue to outer loop failed
<a href="../../conformance/es3/labelled.statements.js">labelled.statements.js</a>: FAIL: basic label failed; labelled block failed; nested labelled blocks failed
<a href="../../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: ReferenceError: 'eval'
</pre></li>
<li>ES5: 60.8% (45/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.some.js">Array.prototype.some.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: ReferenceError: 'Function'
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: undefined 未定义
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: FAIL
<a href="../../conformance/es5/strict.js">strict.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 15%, ES2016+ 20%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 81.2%<pre>
<a href="../../conformance/compat-table/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: exception: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: exception: undefined 未定义
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: FAIL: exception: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL: exception: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-undefined.js">strict.this-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 15.4%</li>
<li>ES2016: 9.1%</li>
<li>ES2017: 26%</li>
<li>ES2018: 10.5%</li>
<li>ES2019: 35.4%</li>
<li>ES2020: 7.1%</li>
<li>ES2021: 7.1%</li>
<li>ES2022: 25.8%</li>
<li>ES2023: 62.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: FAIL: exception: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL: exception: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL: exception: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#' (1:0)
</pre></li>
<li>ES2024: 18.4%</li>
<li>ES2025: 15.8%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 26.1%, main 32.1%, staging 15.2%, annexB 13.2%, Next 3.4%, Intl 0.5%</summary>
<ul>
<li>Overall: 26.1% (13877/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 32.1% (13217/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 67.8% (5559/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 14.3% (1578/11054)<pre>
__proto__: 38.9% (7/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0% (0/268)
DataView: 0% (0/190)
DataView.prototype.getFloat32: 0% (0/7)
DataView.prototype.getFloat64: 0% (0/5)
DataView.prototype.getInt16: 0% (0/7)
DataView.prototype.getInt32: 0% (0/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 0% (0/7)
DataView.prototype.setUint8: 0% (0/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 25% (1/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 1.1% (8/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 27.3% (6/22)
String.prototype.endsWith: 70.4% (19/27)
String.prototype.includes: 73.1% (19/26)
Symbol: 0.4% (6/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0% (0/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 26.3% (5/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 33.8% (44/130)<pre>
Array.prototype.includes: 24.6% (17/69)
exponentiation: 13.6% (14/103)
u180e: 56% (14/25)
</pre></li>
<li>ES2017: 21.4% (163/761)<pre>
__getter__: 48.1% (13/27)
__setter__: 48.1% (13/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.7% (665/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 24.1% (7/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 23.5% (4/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 57% (57/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 25.5% (35/137)<pre>
Array.prototype.flat: 60% (9/15)
Array.prototype.flatMap: 19% (4/21)
Object.fromEntries: 32% (8/25)
String.prototype.trimEnd: 20.8% (5/24)
String.prototype.trimStart: 21.7% (5/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 22.2% (12/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 9.2% (199/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 11.8% (12/102)
String.prototype.matchAll: 6.2% (1/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 55.6% (5/9)
globalThis: 5.4% (8/148)
import.meta: 47.8% (11/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 15% (138/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 4.3% (4/92)
String.prototype.replaceAll: 31.7% (13/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 68.6% (109/159)
</pre></li>
<li>ES2022: 17.3% (944/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 82.3% (51/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.7% (382/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 12.9% (4/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 24% (74/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 20.2% (22/109)
change-array-by-copy: 25% (33/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 7.5% (63/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 50% (4/8)
String.prototype.toWellFormed: 50% (4/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.8% (52/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 18.1% (229/1264)<pre>
Float16Array: 4.1% (2/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 52.4% (11/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 25% (3/12)
regexp-modifiers: 86.1% (198/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 3.4% (280/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 53.8% (7/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13% (62/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 9.1% (2/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 36.8% (7/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 44.8% (3906/8720)</li>
</ul>
</details>
