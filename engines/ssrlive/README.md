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

<details><summary>ES1-ES5: 90%</summary><ul>
<li>ES1: 94.9% (188/198)<pre>
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TypeError: Uncaught: TypeError: Cannot read properties of undefined (reading 'length')
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Uncaught: TypeError: Value is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Uncaught: TypeError: Value is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Uncaught: TypeError: Value is not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: Uncaught: ReferenceError: escape is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: Uncaught: ReferenceError: unescape is not defined
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Octal literals are not allowed in strict mode
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Uncaught: SyntaxError: Delete of an unqualified identifier in strict mode.
<a href="../../conformance/es1/with.js">with.js</a>: ReferenceError: Uncaught: ReferenceError: x is not defined
</pre></li>
<li>ES3: 91.2% (135/148)<pre>
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: FAIL: apply with arguments object failed
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: FAIL
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: FAIL
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: FAIL: match with string failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: object with toString failed; Number failed; Boolean failed; Array failed; regex with capture failed
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: FAIL
<a href="../../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: FAIL: search with string failed
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: FAIL: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/String.prototype.slice.generic.js">String.prototype.slice.generic.js</a>: FAIL
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '0'.split(undefined, 0).length !== 0; 'test'.split(/(?:)/, -1).length !== 4; ''.split(/.?/).length !== 0
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: FAIL: split by empty regex failed
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: no exception for Function.prototype.toString on non-function
</pre></li>
<li>ES5: 71.6% (53/74)<pre>
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: FAIL: array-like object not accepted
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: length property incorrect; non-callable does not throw TypeError
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: invalid JSON does not throw SyntaxError; trailing comma does not throw SyntaxError
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: CRASH: SIGABRT
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer function failed; replacer array failed
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: FAIL: space parameter failed
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Uncaught: TypeError: Cannot add property a, object is not extensible
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Uncaught: TypeError: Cannot assign to read only property 'x' of object
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Uncaught: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: undefined is not undefined after assignment
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 80%, ES2016+ 71%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 88.7%<pre>
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at src/core/parser.rs:2103:16:
</pre></li>
<li>ES6: 80%<pre>
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: TypeError: Cannot read properties of undefined (reading 'name')
<a href="../../conformance/compat-table/es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: Cannot use 'in' operator to search for 'get' in undefined
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-requires-new.js">Map.constructor-requires-new.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: TypeError: Cannot read properties of null (reading 'hasOwnProperty')
<a href="../../conformance/compat-table/es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.prototype.Symbol.iterator.js">Map.prototype.Symbol.iterator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.prototype.Symbol.match.js">RegExp.prototype.Symbol.match.js</a>: FAIL
...
</pre></li>
<li>ES2016: 84.8%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 84.1%<pre>
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: __lookupGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: __lookupSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.constructor.js">async.constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.must-await-value.js">async.must-await-value.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
</pre></li>
<li>ES2018: 84.2%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: TypeError: Cannot read properties of undefined (reading 'year')
</pre></li>
<li>ES2019: 56.2%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read properties of undefined (reading 'flat')
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
</pre></li>
<li>ES2020: 67.1%<pre>
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: Value is not a function
</pre></li>
<li>ES2021: 100%</li>
<li>ES2022: 82.5%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/at-method.String.js">at-method.String.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: FAIL
</pre></li>
<li>ES2023: 65.7%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toReversed.js">Array.prototype.toReversed.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2023/Array.prototype.toSpliced.js">Array.prototype.toSpliced.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2023/Array.prototype.with.js">Array.prototype.with.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Value is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Value is not a function
</pre></li>
<li>ES2024: 42.9%</li>
<li>ES2025: 26.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 66.3%, main 82.1%, staging 38.4%, annexB 44.9%, Next 3.8%, Intl 0.6%</summary>
<ul>
<li>Overall: 66.3% (35266/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 82.1% (33875/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 89.3% (7317/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 83.4% (9218/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 88.1% (236/268)
DataView: 86.3% (164/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 97.1% (34/35)
Map: 45% (18/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 78.2% (366/468)
Reflect: 73.3% (343/468)
Reflect.construct: 63.1% (439/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 44.7% (17/38)
String.fromCodePoint: 4.5% (1/22)
String.prototype.endsWith: 40.7% (11/27)
String.prototype.includes: 38.5% (10/26)
Symbol: 57.4% (857/1494)
Symbol.hasInstance: 23.5% (4/17)
Symbol.isConcatSpreadable: 2.9% (1/34)
Symbol.iterator: 68.8% (1284/1865)
Symbol.match: 10.2% (9/88)
Symbol.replace: 11.2% (11/98)
Symbol.search: 5.4% (2/37)
Symbol.species: 78.3% (216/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 66.1% (154/233)
Symbol.toStringTag: 63.4% (83/131)
Symbol.unscopables: 4.5% (2/44)
TypedArray: 82.4% (2071/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 46.8% (37/79)
WeakSet: 64.7% (22/34)
arrow-function: 61.2% (581/949)
class: 92.4% (4407/4768)
computed-property-names: 94.8% (453/478)
const: 93.3% (14/15)
cross-realm: 0% (0/201)
default-parameters: 97.5% (2212/2269)
destructuring-assignment: 32.6% (46/141)
destructuring-binding: 98.4% (6531/6637)
for-of: 40% (2/5)
generators: 92.2% (3767/4085)
let: 81.8% (63/77)
new.target: 95.1% (58/61)
proxy-missing-checks: 33.3% (1/3)
rest-parameters: 0% (0/96)
super: 78.9% (15/19)
tail-call-optimization: 85.7% (30/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 88.5% (115/130)<pre>
Array.prototype.includes: 58% (40/69)
exponentiation: 84.5% (87/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 71.1% (541/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 66.8% (251/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 73% (338/463)
async-functions: 63.8% (450/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 70.3% (3414/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 69% (20/29)
Symbol.asyncIterator: 7.6% (41/538)
async-iteration: 79.8% (3966/4968)
object-rest: 97.5% (346/355)
object-spread: 76.3% (103/135)
regexp-dotall: 88.2% (15/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 11% (11/100)
regexp-unicode-property-escapes: 11.2% (76/681)
</pre></li>
<li>ES2019: 40.9% (56/137)<pre>
Array.prototype.flat: 93.3% (14/15)
Array.prototype.flatMap: 95.2% (20/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 12.5% (3/24)
String.prototype.trimStart: 13% (3/23)
Symbol.prototype.description: 25% (2/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 11.1% (6/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 73% (1574/2156)<pre>
BigInt: 72.7% (1091/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 91.2% (93/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 80.8% (21/26)
dynamic-import: 60% (568/946)
export-star-as-namespace-from-module: 78.9% (15/19)
for-in-order: 66.7% (6/9)
globalThis: 24.3% (36/148)
import.meta: 13% (3/23)
optional-chaining: 89.3% (50/56)
</pre></li>
<li>ES2021: 44% (405/920)<pre>
AggregateError: 93.5% (29/31)
FinalizationRegistry: 61.2% (30/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 90.2% (83/92)
String.prototype.replaceAll: 12.2% (5/41)
WeakRef: 64.9% (24/37)
align-detached-buffer-semantics-with-web-reality: 37.3% (59/158)
logical-assignment-operators: 97.2% (105/108)
numeric-separator-literal: 69.8% (111/159)
</pre></li>
<li>ES2022: 87.1% (4761/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 94.1% (1067/1134)
class-fields-private-in: 73.7% (14/19)
class-fields-public: 92.9% (1911/2058)
class-methods-private: 88.6% (1515/1709)
class-static-block: 61.5% (40/65)
class-static-fields-private: 95.7% (330/345)
class-static-fields-public: 86.9% (185/213)
class-static-methods-private: 88.2% (1334/1513)
error-cause: 0% (0/5)
regexp-match-indices: 64.5% (20/31)
top-level-await: 93% (252/271)
</pre></li>
<li>ES2023: 49.4% (152/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 91.7% (100/109)
change-array-by-copy: 20.5% (27/132)
hashbang: 55.2% (16/29)
symbols-as-weakmap-keys: 55.2% (16/29)
</pre></li>
<li>ES2024: 74.4% (625/840)<pre>
Atomics.waitAsync: 41.6% (42/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 57.1% (16/28)
arraybuffer-transfer: 3.4% (2/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 70.1% (131/187)
resizable-arraybuffer: 93.5% (433/463)
</pre></li>
<li>ES2025: 20.8% (263/1264)<pre>
Float16Array: 14.3% (7/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 59% (59/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 63.9% (147/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>Next: 3.8% (320/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 16.7% (1/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 14.8% (4/27)
explicit-resource-management: 14.7% (70/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 68.6% (157/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 13.6% (3/22)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 75% (3/4)
regexp-duplicate-named-groups: 21.1% (4/19)
source-phase-imports: 20.2% (46/228)
source-phase-imports-module-source: 47.6% (40/84)
uint8array-base64: 8.7% (6/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 74.6% (6505/8720)</li>
</ul>
</details>
