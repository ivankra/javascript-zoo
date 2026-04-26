# kodjodevf/js_interpreter

Pure Dart JavaScript interpreter.

* Repository:  [kodjodevf/js_interpreter](https://github.com/kodjodevf/js_interpreter.git) <span class="shields"><img src="https://img.shields.io/github/stars/kodjodevf/js_interpreter?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/kodjodevf/js_interpreter?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [33250](# "cloc lib")
* Language:    Dart
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2026-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 84%</summary><ul>
<li>Tested version: <a href="https://github.com/kodjodevf/js_interpreter/commit/983c28d688a1c1e75b5578893d7c967c16f30e99">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/kodjodevf.json">json</a>)</li>
<li>ES1: 88.9% (176/198)<pre>
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setHours.js">Date.prototype.setHours.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMonth.js">Date.prototype.setMonth.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setSeconds.js">Date.prototype.setSeconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.toUTCString.js">Date.prototype.toUTCString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Number.prototype.toString.js">Number.prototype.toString.js</a>: FAIL: toString() failed; toString(10) failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
...
</pre></li>
<li>ES3: 81.1% (120/148)<pre>
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: delete on object failed; insert on object failed; negative start on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: empty array toLocaleString failed; multiple elements content failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: Array index should be enumerable failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es3/String.prototype.slice.generic.js">String.prototype.slice.generic.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '.'.split(/(.?)(.?)/).length !== 4
...
</pre></li>
<li>ES5: 75.7% (56/74)<pre>
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: Test262Error: Native function error in Date: Unsupported operation: Infinity or NaN toInt
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: cyclic structure does not throw TypeError; didn't call user-provided toJSON() method
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: FAIL: Properties argument failed
<a href="../../conformance/es5/String.prototype.trim.js">String.prototype.trim.js</a>: FAIL: String.prototype.trim not a function
<a href="../../conformance/es5/debugger.js">debugger.js</a>: SyntaxError: Unexpected reserved word
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: SyntaxError: Invalid assignment target (line 13)
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: TypeError: "caller", "callee", and "arguments" properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es5/strict.no-arguments-caller.js">strict.no-arguments-caller.js</a>: TypeError: "caller", "callee", and "arguments" properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 61%, ES2016+ 62%, Next 9%, Intl 50%</summary><ul>
<li>Tested version: <a href="https://github.com/kodjodevf/js_interpreter/commit/983c28d688a1c1e75b5578893d7c967c16f30e99">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/kodjodevf.json">json</a>)</li>
<li>ES5: 82.3%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.trim.js">String.prototype.trim.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: SyntaxError: Invalid assignment target (line 8)
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es5/strict.arguments-caller-error.js">strict.arguments-caller-error.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 61.1%<pre>
<a href="../../conformance/compat-table/es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.generator.js">Array.from.generator.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.iterable.js">Array.from.iterable.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.no-lexical.js">Function.name.shorthand.no-lexical.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-requires-new.js">Map.constructor-requires-new.js</a>: FAIL
...
</pre></li>
<li>ES2016: 71.2%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.typed-array.js">Array.prototype.includes.typed-array.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: Test262Error: Evaluation error: SyntaxError: SyntaxError: Illegal 'use strict' directive in function with non-simple parameter list
</pre></li>
<li>ES2017: 56.7%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: FAIL: exception: [object Object]
...
</pre></li>
<li>ES2018: 87.4%<pre>
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2019: 66.4%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL
</pre></li>
<li>ES2020: 78.6%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
</pre></li>
<li>ES2021: 71.4%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: FAIL
</pre></li>
<li>ES2022: 73.9%<pre>
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2022/class-fields.computed-instance.js">class-fields.computed-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.computed-static.js">class-fields.computed-static.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2023: 82.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2024: 46.3%</li>
<li>ES2025: 0%</li>
<li>Next: 9.1%</li>
<li>Intl: 50%<pre>
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: FAIL: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: FAIL: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: FAIL: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.valid-tags.js">Intl.DateTimeFormat.valid-tags.js</a>: FAIL: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: FAIL: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 49.6%, main 60.2%, staging 29.9%, annexB 29.5%, Next 6.2%, Intl 4.3%</summary>
<ul>
<li>Tested version: <a href="https://github.com/kodjodevf/js_interpreter/commit/983c28d688a1c1e75b5578893d7c967c16f30e99">2026-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/kodjodevf.json">json</a>)</li>
<li>Overall: 49.6% (26382/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 60.2% (25004/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 73.4% (6013/8197)<pre>
caller: 26.1% (6/23)
</pre></li>
<li>ES6: 61.6% (6809/11054)<pre>
__proto__: 16.7% (3/18)
Array.prototype.values: 25% (1/4)
ArrayBuffer: 9% (24/268)
DataView: 7.4% (14/190)
DataView.prototype.getFloat32: 42.9% (3/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 14.3% (1/7)
DataView.prototype.getInt32: 14.3% (1/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 14.3% (1/7)
DataView.prototype.getUint32: 14.3% (1/7)
DataView.prototype.setUint8: 50% (28/56)
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 60% (21/35)
Map: 35% (14/40)
Object.is: 100% (2/2)
Promise: 75% (3/4)
Proxy: 26.5% (124/468)
Reflect: 26.5% (124/468)
Reflect.construct: 39.9% (278/696)
Reflect.set: 32.6% (15/46)
Reflect.setPrototypeOf: 43.5% (10/23)
Set: 26.3% (10/38)
String.fromCodePoint: 77.3% (17/22)
String.prototype.endsWith: 63% (17/27)
String.prototype.includes: 57.7% (15/26)
Symbol: 26.3% (393/1494)
Symbol.hasInstance: 5.9% (1/17)
Symbol.isConcatSpreadable: 76.5% (26/34)
Symbol.iterator: 38.4% (717/1865)
Symbol.match: 14.8% (13/88)
Symbol.replace: 10.2% (10/98)
Symbol.search: 16.2% (6/37)
Symbol.species: 6.9% (19/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 8.2% (19/233)
Symbol.toStringTag: 6.1% (8/131)
Symbol.unscopables: 11.4% (5/44)
TypedArray: 15.1% (379/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 38% (30/79)
WeakSet: 26.5% (9/34)
arrow-function: 42.7% (405/949)
class: 72.5% (3458/4768)
computed-property-names: 36.4% (174/478)
const: 46.7% (7/15)
cross-realm: 1% (2/201)
default-parameters: 84.7% (1921/2269)
destructuring-assignment: 92.9% (131/141)
destructuring-binding: 81.9% (5437/6637)
for-of: 20% (1/5)
generators: 75.6% (3088/4085)
let: 41.6% (32/77)
new.target: 78.7% (48/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 0% (0/96)
super: 21.1% (4/19)
tail-call-optimization: 85.7% (30/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 74.6% (97/130)<pre>
Array.prototype.includes: 39.1% (27/69)
exponentiation: 58.3% (60/103)
u180e: 88% (22/25)
</pre></li>
<li>ES2017: 36.8% (281/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 5.3% (20/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 70.2% (495/705)
intl-normative-optional: 50% (2/4)
</pre></li>
<li>ES2018: 53.4% (2593/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 15.6% (84/538)
async-iteration: 62.1% (3087/4968)
object-rest: 84.2% (299/355)
object-spread: 65.2% (88/135)
regexp-dotall: 35.3% (6/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 21% (21/100)
regexp-unicode-property-escapes: 1.2% (8/681)
</pre></li>
<li>ES2019: 29.9% (41/137)<pre>
Array.prototype.flat: 73.3% (11/15)
Array.prototype.flatMap: 33.3% (7/21)
Object.fromEntries: 32% (8/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 25% (2/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 50% (2/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 31.1% (670/2156)<pre>
BigInt: 20.8% (312/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 17.7% (14/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 6.2% (1/16)
Symbol.matchAll: 11.1% (7/63)
coalesce-expression: 80.8% (21/26)
dynamic-import: 42.1% (398/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 55.6% (5/9)
globalThis: 39.2% (58/148)
import.meta: 43.5% (10/23)
optional-chaining: 55.4% (31/56)
</pre></li>
<li>ES2021: 37.5% (345/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 34.7% (17/49)
Intl.DateTimeFormat-datetimestyle: 6.2% (1/16)
Intl.DateTimeFormat-formatRange: 10.8% (4/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 8.6% (7/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 9.8% (4/41)
WeakRef: 40.5% (15/37)
align-detached-buffer-semantics-with-web-reality: 7.6% (12/158)
logical-assignment-operators: 71.3% (77/108)
numeric-separator-literal: 66% (105/159)
</pre></li>
<li>ES2022: 63.1% (3447/5465)<pre>
Array.prototype.at: 90.9% (10/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 26.6% (21/79)
Object.hasOwn: 83.9% (52/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 6.2% (1/16)
class-fields-private: 50.8% (576/1134)
class-fields-private-in: 68.4% (13/19)
class-fields-public: 63.6% (1309/2058)
class-methods-private: 70.9% (1211/1709)
class-static-block: 61.5% (40/65)
class-static-fields-private: 89.9% (310/345)
class-static-fields-public: 9.4% (20/213)
class-static-methods-private: 82.7% (1252/1513)
error-cause: 100% (5/5)
regexp-match-indices: 22.6% (7/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 25.9% (106/410)<pre>
Intl-enumeration: 8.6% (3/35)
Intl.NumberFormat-v3: 7.8% (8/102)
array-find-from-last: 27.5% (30/109)
change-array-by-copy: 32.6% (43/132)
hashbang: 62.1% (18/29)
symbols-as-weakmap-keys: 13.8% (4/29)
</pre></li>
<li>ES2024: 4.9% (41/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 64.3% (18/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 7% (13/187)
resizable-arraybuffer: 0.9% (4/463)
</pre></li>
<li>ES2025: 16.3% (206/1266)<pre>
Float16Array: 13.7% (7/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 62% (62/100)
iterator-helpers: 2.3% (13/567)
json-modules: 7.7% (1/13)
promise-try: 100% (12/12)
regexp-modifiers: 33.5% (77/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>ES2026: 13% (47/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0.1% (1/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 50% (5/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 13.6% (3/22)
uint8array-base64: 7.2% (5/69)
upsert: 31.9% (23/72)
</pre></li>
<li>Next: 6.2% (486/7895)<pre>
Atomics.pause: 16.7% (1/6)
ShadowRealm: 0% (0/64)
Temporal: 2.1% (140/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 7.4% (2/27)
explicit-resource-management: 28.9% (138/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 59.6% (5200/8718)</li>
</ul>
</details>
