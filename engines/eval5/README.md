# eval5

ES5 interpreter written in TypeScript.

* Repository:       [bplok20010/eval5](https://github.com/bplok20010/eval5.git) <span class="shields"><img src="https://img.shields.io/github/stars/bplok20010/eval5?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bplok20010/eval5?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [1745](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Standard:         ES5
* Years:            2019-2024
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript

## Notes

Just a thin library on top of Acorn, doesn't implement much of ECMAScript
standard library - passes through most of it from the host environment.

## Conformance

<details><summary>ES1-ES5: 94%</summary><ul>
<li>Tested version: <a href="https://github.com/bplok20010/eval5/commit/64f9f7ffc97b6eb0ada78078b13897d1d52aea12">2024-10-25</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/eval5.json">json</a>)</li>
<li>ES1: 98% (194/198)<pre>
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: FAIL: function instance constructor failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: Cannot create property '0' on number '1'
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: ReferenceError: EvalError is not defined
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: wrong exception for calling number; no exception for Function.prototype.toString on non-function
</pre></li>
<li>ES5: 71.6% (53/74)<pre>
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: Function.prototype.bind not a function
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: undefined is not undefined after assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.js">strict.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 41%, ES2016+ 31%, Next 6%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/bplok20010/eval5/commit/64f9f7ffc97b6eb0ada78078b13897d1d52aea12">2024-10-25</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/eval5.json">json</a>)</li>
<li>ES5: 83.2%<pre>
<a href="../../conformance/compat-table/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: TypeError: Cannot use 'in' operator to search for 'a' in undefined
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 41.2%</li>
<li>ES2016: 31.8%</li>
<li>ES2017: 36%</li>
<li>ES2018: 21.1%</li>
<li>ES2019: 62.5%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: The keyword 'class' is reserved
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: The keyword 'class' is reserved
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: SyntaxError: The keyword 'const' is reserved
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Unterminated string constant
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Unterminated string constant
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: Unexpected token
</pre></li>
<li>ES2020: 14.3%</li>
<li>ES2021: 7.1%</li>
<li>ES2022: 29.4%</li>
<li>ES2023: 62.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#'
</pre></li>
<li>ES2024: 22.4%</li>
<li>ES2025: 36.8%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 32.7%, main 39.4%, staging 23.5%, annexB 35.3%, Next 3.4%, Intl 0.5%</summary>
<ul>
<li>Tested version: <a href="https://github.com/bplok20010/eval5/commit/64f9f7ffc97b6eb0ada78078b13897d1d52aea12">2024-10-25</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/eval5.json">json</a>)</li>
<li>Overall: 32.7% (17372/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 39.4% (16358/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 82.6% (6774/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 24.8% (2745/11054)<pre>
__proto__: 55.6% (10/18)
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
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 20% (8/40)
Object.is: 50% (1/2)
Promise: 50% (2/4)
Proxy: 66.5% (311/468)
Reflect: 31.2% (146/468)
Reflect.construct: 6.2% (43/696)
Reflect.set: 50% (23/46)
Reflect.setPrototypeOf: 78.3% (18/23)
Set: 55.3% (21/38)
String.fromCodePoint: 31.8% (7/22)
String.prototype.endsWith: 85.2% (23/27)
String.prototype.includes: 88.5% (23/26)
Symbol: 23.8% (355/1494)
Symbol.hasInstance: 52.9% (9/17)
Symbol.isConcatSpreadable: 82.4% (28/34)
Symbol.iterator: 5.5% (103/1865)
Symbol.match: 54.5% (48/88)
Symbol.replace: 64.3% (63/98)
Symbol.search: 56.8% (21/37)
Symbol.species: 30.1% (83/276)
Symbol.split: 69% (40/58)
Symbol.toPrimitive: 27% (63/233)
Symbol.toStringTag: 11.5% (15/131)
Symbol.unscopables: 11.4% (5/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 45.6% (36/79)
WeakSet: 70.6% (24/34)
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 1% (2/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 52.6% (10/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 43.1% (56/130)<pre>
Array.prototype.includes: 36.2% (25/69)
exponentiation: 13.6% (14/103)
u180e: 76% (19/25)
</pre></li>
<li>ES2017: 22.4% (171/763)<pre>
__getter__: 63% (17/27)
__setter__: 63% (17/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.5% (654/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 27.6% (8/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 29.4% (5/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 61% (61/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 32.1% (44/137)<pre>
Array.prototype.flat: 73.3% (11/15)
Array.prototype.flatMap: 33.3% (7/21)
Object.fromEntries: 36% (9/25)
String.prototype.trimEnd: 25% (6/24)
String.prototype.trimStart: 26.1% (6/23)
Symbol.prototype.description: 25% (2/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 25.9% (14/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 10.4% (224/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 12.7% (13/102)
String.prototype.matchAll: 43.8% (7/16)
Symbol.matchAll: 28.6% (18/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 5.4% (8/148)
import.meta: 56.5% (13/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 15.7% (144/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 5.4% (5/92)
String.prototype.replaceAll: 43.9% (18/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 68.6% (109/159)
</pre></li>
<li>ES2022: 17.5% (954/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 93.5% (58/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.9% (384/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 16.1% (5/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 24.4% (100/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 25.7% (28/109)
change-array-by-copy: 28% (37/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 55.2% (16/29)
</pre></li>
<li>ES2024: 7.7% (65/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 50% (4/8)
String.prototype.toWellFormed: 50% (4/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 33.3% (3/9)
regexp-v-flag: 27.8% (52/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 15.3% (194/1266)<pre>
Float16Array: 3.9% (2/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 52.4% (11/21)
import-attributes: 15% (15/100)
iterator-helpers: 0.7% (4/567)
json-modules: 15.4% (2/13)
promise-try: 33.3% (4/12)
regexp-modifiers: 68.7% (158/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 5% (18/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 46.2% (6/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 9.1% (2/22)
uint8array-base64: 0% (0/69)
upsert: 13.9% (10/72)
</pre></li>
<li>Next: 3.4% (268/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.8% (66/477)
immutable-arraybuffer: 0% (0/20)
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
<li>N/A: 56.9% (4961/8718)</li>
</ul>
</details>
