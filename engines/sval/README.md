# sval

Metacircular JavaScript interpreter.

* Repository:       [Siubaak/sval](https://github.com/Siubaak/sval.git) <span class="shields"><img src="https://img.shields.io/github/stars/Siubaak/sval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Siubaak/sval?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [2124](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Years:            2018-
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript

## Notes

Just a thin library on top of Acorn, doesn't implement much of ECMAScript
standard library - passes through most of it from the host environment.

## Conformance

<details><summary>ES1-ES5: 95%</summary><ul>
<li>Tested version: <a href="https://github.com/Siubaak/sval/commit/58550fd3a5e4202fdbfda3eb652099667b4c976f">2026-04-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/sval.json">json</a>)</li>
<li>ES1: 98% (194/198)<pre>
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: Cannot create property '0' on number '1'
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Delete of an unqualified identifier in strict mode
</pre></li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/labelled.statements.js">labelled.statements.js</a>: SyntaxError: ExpressionStatement cannot be labeled
</pre></li>
<li>ES5: 79.7% (59/74)<pre>
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 89%, ES2016+ 93%, Next 18%, Intl 100%</summary><ul>
<li>Tested version: <a href="https://github.com/Siubaak/sval/commit/58550fd3a5e4202fdbfda3eb652099667b4c976f">2026-04-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/sval.json">json</a>)</li>
<li>ES5: 89.8%<pre>
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 88.7%<pre>
<a href="../../conformance/compat-table/es6/Function.name.accessor.js">Function.name.accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-static.js">Function.name.class-static.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.object-method.js">Function.name.object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.deleteProperty.js">Proxy.handler.deleteProperty.js</a>: TypeError: 'deleteProperty' on proxy: trap returned falsish for property 'foo'
<a href="../../conformance/compat-table/es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: TypeError: 'set' on proxy: trap returned falsish for property 'foo'
<a href="../../conformance/compat-table/es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: TypeError: 'set' on proxy: trap returned falsish for property 'foo'
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: TypeError: r.apply is not a function
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: FunctionDeclaration cannot be labeled
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-shorthand-method.js">annex-b.__proto__.literals.not-shorthand-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-shorthand-property.js">annex-b.__proto__.literals.not-shorthand-property.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.no-prototype.js">arrow.no-prototype.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 88%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.constructor.js">async.constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-prototype.js">async.no-prototype.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.prototype-chain.js">async.prototype-chain.js</a>: FAIL
</pre></li>
<li>ES2018: 83.2%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: TypeError: iterator is not a function
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/: Invalid property value
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 92.9%<pre>
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: FAIL
</pre></li>
<li>ES2021: 90.5%<pre>
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: FAIL
</pre></li>
<li>ES2022: 92.5%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: TypeError: Cannot read properties of null
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: TypeError: Cannot assign to read only property 'name' of function 'function() {
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 18.2%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 69.3%, main 81%, staging 67.9%, annexB 41%, Next 7%, Intl 35.5%</summary>
<ul>
<li>Tested version: <a href="https://github.com/Siubaak/sval/commit/58550fd3a5e4202fdbfda3eb652099667b4c976f">2026-04-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/sval.json">json</a>)</li>
<li>Overall: 69.3% (36819/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 81% (33662/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 94.1% (7713/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 76.6% (8468/11054)<pre>
__proto__: 83.3% (15/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 93.3% (250/268)
DataView: 87.4% (166/190)
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
Map: 95% (38/40)
Object.is: 100% (2/2)
Promise: 50% (2/4)
Proxy: 85.3% (399/468)
Reflect: 73.3% (343/468)
Reflect.construct: 79.9% (556/696)
Reflect.set: 82.6% (38/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 66.1% (987/1494)
Symbol.hasInstance: 88.2% (15/17)
Symbol.isConcatSpreadable: 91.2% (31/34)
Symbol.iterator: 31.7% (592/1865)
Symbol.match: 93.2% (82/88)
Symbol.replace: 84.7% (83/98)
Symbol.search: 83.8% (31/37)
Symbol.species: 90.6% (250/276)
Symbol.split: 86.2% (50/58)
Symbol.toPrimitive: 91.4% (213/233)
Symbol.toStringTag: 67.9% (89/131)
Symbol.unscopables: 22.7% (10/44)
TypedArray: 84.1% (2113/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 70.9% (56/79)
WeakSet: 97.1% (33/34)
arrow-function: 74.1% (703/949)
class: 78.6% (3748/4768)
computed-property-names: 92.5% (442/478)
const: 73.3% (11/15)
cross-realm: 1% (2/201)
default-parameters: 66.3% (1504/2269)
destructuring-assignment: 67.4% (95/141)
destructuring-binding: 62.6% (4156/6637)
for-of: 60% (3/5)
generators: 60.3% (2463/4085)
let: 44.2% (34/77)
new.target: 77% (47/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 78.9% (15/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 91.3% (63/69)
exponentiation: 96.1% (99/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 87.8% (670/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 65.9% (249/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 74.6% (346/464)
async-functions: 82.6% (582/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 61.7% (2995/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 93.1% (27/29)
Symbol.asyncIterator: 0.2% (1/538)
async-iteration: 54.6% (2712/4968)
object-rest: 90.4% (321/355)
object-spread: 88.1% (119/135)
regexp-dotall: 94.1% (16/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 99% (99/100)
regexp-unicode-property-escapes: 98.8% (673/681)
</pre></li>
<li>ES2019: 97.8% (134/137)<pre>
Array.prototype.flat: 93.3% (14/15)
Array.prototype.flatMap: 95.2% (20/21)
Object.fromEntries: 92% (23/25)
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
<li>ES2020: 75.3% (1623/2156)<pre>
BigInt: 74.4% (1117/1501)
Intl.NumberFormat-unified: 98.5% (66/67)
Intl.RelativeTimeFormat: 96.2% (76/79)
Promise.allSettled: 98% (100/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 92.1% (58/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 49.6% (469/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 41.9% (62/148)
import.meta: 87% (20/23)
optional-chaining: 83.9% (47/56)
</pre></li>
<li>ES2021: 84.3% (776/920)<pre>
AggregateError: 87.1% (27/31)
FinalizationRegistry: 95.9% (47/49)
Intl.DateTimeFormat-datetimestyle: 56.2% (9/16)
Intl.DateTimeFormat-formatRange: 94.6% (35/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 95.7% (45/47)
Intl.ListFormat: 98.8% (80/81)
Intl.Locale: 92.9% (145/156)
Promise.any: 97.8% (90/92)
String.prototype.replaceAll: 87.8% (36/41)
WeakRef: 89.2% (33/37)
align-detached-buffer-semantics-with-web-reality: 46.2% (73/158)
logical-assignment-operators: 60.2% (65/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 77.2% (4219/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 97.5% (77/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 78.3% (888/1134)
class-fields-private-in: 78.9% (15/19)
class-fields-public: 85.3% (1756/2058)
class-methods-private: 66.1% (1130/1709)
class-static-block: 92.3% (60/65)
class-static-fields-private: 95.7% (330/345)
class-static-fields-public: 79.3% (169/213)
class-static-methods-private: 75.1% (1137/1513)
error-cause: 100% (5/5)
regexp-match-indices: 96.8% (30/31)
top-level-await: 69% (187/271)
</pre></li>
<li>ES2023: 95.1% (390/410)<pre>
Intl-enumeration: 60% (21/35)
Intl.NumberFormat-v3: 99% (101/102)
array-find-from-last: 87.2% (95/109)
change-array-by-copy: 97% (128/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 91% (764/840)<pre>
Atomics.waitAsync: 44.6% (45/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 89.8% (53/59)
promise-with-resolvers: 55.6% (5/9)
regexp-v-flag: 99.5% (186/187)
resizable-arraybuffer: 97% (449/463)
</pre></li>
<li>ES2025: 91.7% (1161/1266)<pre>
Float16Array: 84.3% (43/51)
Intl.DurationFormat: 89.3% (100/112)
RegExp.escape: 85.7% (18/21)
import-attributes: 49% (49/100)
iterator-helpers: 93.7% (531/567)
json-modules: 0% (0/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 92.7% (178/192)
</pre></li>
<li>ES2026: 69.5% (251/361)<pre>
Array.fromAsync: 89.5% (85/95)
Error.isError: 76.9% (10/13)
Intl.Era-monthcode: 0.1% (2/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 9.4% (3/32)
json-parse-with-source: 95.5% (21/22)
uint8array-base64: 92.8% (64/69)
upsert: 31.9% (23/72)
</pre></li>
<li>Next: 7% (553/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 7.4% (2/27)
explicit-resource-management: 66% (315/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 80% (6973/8718)</li>
</ul>
</details>
