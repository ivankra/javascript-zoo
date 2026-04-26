# Reeva

JavaScript interpreter for JVM written in Kotlin.

* Repository:       [ReevaJS/reeva](https://github.com/ReevaJS/reeva.git) <span class="shields"><img src="https://img.shields.io/github/stars/ReevaJS/reeva?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ReevaJS/reeva?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [25566](# "cloc --not_match_d='(?i)(test)' src")
* Language:         Kotlin
* License:          BSD-2-Clause
* Years:            2020-2024
* Runtime platform: Java
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 77%</summary><ul>
<li>Tested version: <a href="https://github.com/ReevaJS/reeva/commit/f715163354ea06e37a97bd4e5e0bddc9c195c886">2024-01-18</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/reeva.json">json</a>)</li>
<li>ES1: 82.3% (163/198)<pre>
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: FAIL: reverse order failed; reverse single element failed
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: new Date(2000, 0, 1).getMonth() != 0
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setDate.js">Date.prototype.setDate.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es1/Date.prototype.setTime.js">Date.prototype.setTime.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: FAIL: ExpectationError: Expectation failed
...
</pre></li>
<li>ES3: 70.9% (105/148)<pre>
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: FAIL: slice object with start and end failed; slice object with start only failed; slice object with negative start failed
<a href="../../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: FAIL: slice with start and end failed; slice with start only failed; slice with negative start failed; slice with negative end failed; slice entire array failed
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: ECMAError: ECMA assertion failed
<a href="../../conformance/es3/RegExp.lastIndex.js">RegExp.lastIndex.js</a>: FAIL: after first match failed; after second match failed
<a href="../../conformance/es3/RegExp.prototype.constructor.js">RegExp.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: TypeError: cannot convert null to Object
<a href="../../conformance/es3/RegExp.prototype.test.js">RegExp.prototype.test.js</a>: FAIL: match failed
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: TypeError: cannot convert undefined to Object
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: TypeError: cannot convert undefined to Object
<a href="../../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: TypeError: cannot call value undefined
...
</pre></li>
<li>ES5: 74.3% (55/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: invalid date does not throw RangeError
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL: invalid date does not return null
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL: frozen object is sealed failed
<a href="../../conformance/es5/debugger.js">debugger.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: SyntaxError: invalid token "\ufeff"
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: FAIL: IllegalArgumentException: fromIndex(1) &gt; toIndex(0)
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 60%, ES2016+ 38%, Next 0%, Intl 14%</summary><ul>
<li>Tested version: <a href="https://github.com/ReevaJS/reeva/commit/f715163354ea06e37a97bd4e5e0bddc9c195c886">2024-01-18</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/reeva.json">json</a>)</li>
<li>ES5: 83.5%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-undefined.js">Array.prototype.sort.compareFn-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL: NotImplementedError: An operation is not implemented.
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: ExpectationError: Expectation failed
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL: NotImplementedError: An operation is not implemented: Handle duplicate parameter names
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../../conformance/compat-table/es5/strict.this-undefined.js">strict.this-undefined.js</a>: FAIL: IllegalArgumentException: fromIndex(1) &gt; toIndex(0)
</pre></li>
<li>ES6: 60%<pre>
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.expression.js">Function.name.expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.object-method.js">Function.name.object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.statement.js">Function.name.statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.variable.js">Function.name.variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Number.parseFloat.js">Number.parseFloat.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Number.parseInt.js">Number.parseInt.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right-hand side of "in" operator must be an object
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es6/Proxy.handler.has.invariants.js">Proxy.handler.has.invariants.js</a>: SyntaxError: expected }, but found in
<a href="../../conformance/compat-table/es6/Proxy.handler.ownKeys.invariants.js">Proxy.handler.ownKeys.invariants.js</a>: FAIL: IllegalStateException: Encountered unreachable() call
<a href="../../conformance/compat-table/es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: FAIL
...
</pre></li>
<li>ES2016: 66.7%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: FAIL: exception: undefined
</pre></li>
<li>ES2017: 48%</li>
<li>ES2018: 49.5%</li>
<li>ES2019: 64.6%<pre>
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: Symbol.prototype.description called on incompatible object
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: unicode codepoint escape sequence missing closing curly brace
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: FAIL
</pre></li>
<li>ES2020: 76.4%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: cannot call value undefined
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: SyntaxError: expected }, but found .
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: FAIL: ExpectationError: Expected block 10 to have initial stack height of 2, but found 1
</pre></li>
<li>ES2021: 9.5%</li>
<li>ES2022: 26.6%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 14.3%</li>
</ul></details>

<details><summary>test262: 36.7%, main 45.2%, staging 20.4%, annexB 11.6%, Next 3.4%, Intl 0.2%</summary>
<ul>
<li>Tested version: <a href="https://github.com/ReevaJS/reeva/commit/f715163354ea06e37a97bd4e5e0bddc9c195c886">2024-01-18</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/reeva.json">json</a>)</li>
<li>Overall: 36.7% (19502/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 45.2% (18797/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 76.4% (6262/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 44.5% (4921/11054)<pre>
__proto__: 72.2% (13/18)
Array.prototype.values: 25% (1/4)
ArrayBuffer: 31.3% (84/268)
DataView: 46.3% (88/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 50% (2/4)
Int8Array: 71.4% (25/35)
Map: 30% (12/40)
Object.is: 100% (2/2)
Promise: 50% (2/4)
Proxy: 75.6% (354/468)
Reflect: 65.2% (305/468)
Reflect.construct: 52.2% (363/696)
Reflect.set: 56.5% (26/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 55.3% (21/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 77.8% (21/27)
String.prototype.includes: 76.9% (20/26)
Symbol: 36.4% (544/1494)
Symbol.hasInstance: 23.5% (4/17)
Symbol.isConcatSpreadable: 88.2% (30/34)
Symbol.iterator: 16.8% (314/1865)
Symbol.match: 54.5% (48/88)
Symbol.replace: 8.2% (8/98)
Symbol.search: 32.4% (12/37)
Symbol.species: 41.3% (114/276)
Symbol.split: 17.2% (10/58)
Symbol.toPrimitive: 64.8% (151/233)
Symbol.toStringTag: 41.2% (54/131)
Symbol.unscopables: 13.6% (6/44)
TypedArray: 19.7% (494/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 45.5% (5/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 1.3% (1/79)
WeakSet: 0% (0/34)
arrow-function: 42.1% (400/949)
class: 22.7% (1083/4768)
computed-property-names: 63.2% (302/478)
const: 6.7% (1/15)
cross-realm: 62.2% (125/201)
default-parameters: 12.6% (286/2269)
destructuring-assignment: 66% (93/141)
destructuring-binding: 17.9% (1185/6637)
for-of: 0% (0/5)
generators: 15.8% (645/4085)
let: 9.1% (7/77)
new.target: 45.9% (28/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 90.6% (87/96)
super: 10.5% (2/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 46.2% (60/130)<pre>
Array.prototype.includes: 29% (20/69)
exponentiation: 41.7% (43/103)
u180e: 60% (15/25)
</pre></li>
<li>ES2017: 23.3% (178/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 29.1% (205/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 10.4% (504/4855)<pre>
IsHTMLDDA: 23.8% (10/42)
Promise.prototype.finally: 48.3% (14/29)
Symbol.asyncIterator: 0.4% (2/538)
async-iteration: 8.5% (423/4968)
object-rest: 5.1% (18/355)
object-spread: 17.8% (24/135)
regexp-dotall: 52.9% (9/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 50% (50/100)
regexp-unicode-property-escapes: 20.4% (139/681)
</pre></li>
<li>ES2019: 75.2% (103/137)<pre>
Array.prototype.flat: 73.3% (11/15)
Array.prototype.flatMap: 90.5% (19/21)
Object.fromEntries: 72% (18/25)
String.prototype.trimEnd: 91.7% (22/24)
String.prototype.trimStart: 91.3% (21/23)
Symbol.prototype.description: 50% (4/8)
json-superset: 50% (2/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 81.5% (44/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 33.6% (724/2156)<pre>
BigInt: 30.2% (453/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 65.7% (67/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 42.9% (27/63)
coalesce-expression: 73.1% (19/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 15.8% (3/19)
for-in-order: 44.4% (4/9)
globalThis: 23% (34/148)
import.meta: 56.5% (13/23)
optional-chaining: 67.9% (38/56)
</pre></li>
<li>ES2021: 19.2% (177/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 27.8% (44/158)
logical-assignment-operators: 37% (40/108)
numeric-separator-literal: 57.9% (92/159)
</pre></li>
<li>ES2022: 23% (1255/5465)<pre>
Array.prototype.at: 81.8% (9/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 81.8% (9/11)
TypedArray.prototype.at: 23.1% (3/13)
arbitrary-module-namespace-names: 12.5% (2/16)
class-fields-private: 33.8% (383/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 23.5% (484/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 42.7% (91/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 53.9% (146/271)
</pre></li>
<li>ES2023: 8% (33/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 9.2% (10/109)
change-array-by-copy: 3% (4/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 1.4% (12/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 4.3% (8/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 8.8% (111/1266)<pre>
Float16Array: 21.6% (11/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 36.1% (83/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 3.6% (13/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 8.7% (6/69)
upsert: 9.7% (7/72)
</pre></li>
<li>Next: 3.4% (270/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 7.4% (2/27)
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
<li>N/A: 56% (4879/8718)</li>
</ul>
</details>
