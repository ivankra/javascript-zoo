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

<details><summary>ES1-ES5: 80%</summary><ul>
<li>ES1: 84.3% (167/198)<pre>
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setHours.js">Date.prototype.setHours.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMonth.js">Date.prototype.setMonth.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setSeconds.js">Date.prototype.setSeconds.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: TypeError: undefined is not a function
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
...
</pre></li>
<li>ES3: 77.7% (115/148)<pre>
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: FAIL: slice object with start and end failed; slice object with start only failed; slice object with negative start failed
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
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: FAIL: format failed
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: TypeError: Function.prototype.call called on non-function
...
</pre></li>
<li>ES5: 71.6% (53/74)<pre>
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: Test262Error: Native function error in Date: Unsupported operation: Infinity or NaN toInt
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: Test262Error: Native function error in Date: Unsupported operation: Infinity or NaN toInt
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: cyclic structure does not throw TypeError; didn't call user-provided toJSON() method
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: FAIL: Properties argument failed
<a href="../../conformance/es5/String.prototype.trim.js">String.prototype.trim.js</a>: FAIL: String.prototype.trim not a function
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/es5/debugger.js">debugger.js</a>: ReferenceError: debugger is not defined
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: SyntaxError: Invalid left-hand side in assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 59%, ES2016+ 59%, Next 6%, Intl 61%</summary><ul>
<li>ES5: 79.2%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.trim.js">String.prototype.trim.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES6: 59.4%<pre>
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Function.name.accessor.js">Function.name.accessor.js</a>: FAIL
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
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-requires-new.js">Map.constructor-requires-new.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es6/Map.prototype.Symbol.iterator.js">Map.prototype.Symbol.iterator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.prototype.clear.js">Map.prototype.clear.js</a>: FAIL
...
</pre></li>
<li>ES2016: 84.8%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: FAIL: exception: [object Object]
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
<li>ES2018: 45.3%</li>
<li>ES2019: 72.9%<pre>
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2020: 78.6%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
</pre></li>
<li>ES2021: 92.9%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: FAIL: [object Promise]
</pre></li>
<li>ES2022: 74.9%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: FAIL: exception: Internal error: type 'PrivateIdentifierExpression' is not a subtype of type 'IdentifierExpression' in type cast
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2023: 82.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL: exception: [object Object]
</pre></li>
<li>ES2024: 18.4%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 60.7%<pre>
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: FAIL: exception: [object Object]
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: FAIL: exception: Internal error: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.valid-tags.js">Intl.DateTimeFormat.valid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: FAIL: exception: Internal error: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 42.1%, main 50.9%, staging 28.8%, annexB 29.3%, Next 6.6%, Intl 4.6%</summary>
<ul>
<li>Overall: 42.1% (22391/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 50.9% (20975/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 71.5% (5861/8197)<pre>
caller: 87% (20/23)
</pre></li>
<li>ES6: 54.9% (6071/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 25% (1/4)
ArrayBuffer: 9.3% (25/268)
DataView: 7.4% (14/190)
DataView.prototype.getFloat32: 42.9% (3/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 14.3% (1/7)
DataView.prototype.getInt32: 14.3% (1/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 14.3% (1/7)
DataView.prototype.getUint32: 14.3% (1/7)
DataView.prototype.setUint8: 50% (28/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 60% (21/35)
Map: 35% (14/40)
Object.is: 100% (2/2)
Promise: 25% (1/4)
Proxy: 24.4% (114/468)
Reflect: 27.4% (128/468)
Reflect.construct: 39.4% (274/696)
Reflect.set: 39.1% (18/46)
Reflect.setPrototypeOf: 30.4% (7/23)
Set: 31.6% (12/38)
String.fromCodePoint: 68.2% (15/22)
String.prototype.endsWith: 63% (17/27)
String.prototype.includes: 57.7% (15/26)
Symbol: 25% (374/1494)
Symbol.hasInstance: 5.9% (1/17)
Symbol.isConcatSpreadable: 70.6% (24/34)
Symbol.iterator: 15.9% (296/1865)
Symbol.match: 14.8% (13/88)
Symbol.replace: 10.2% (10/98)
Symbol.search: 16.2% (6/37)
Symbol.species: 8.7% (24/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 8.6% (20/233)
Symbol.toStringTag: 3.1% (4/131)
Symbol.unscopables: 47.7% (21/44)
TypedArray: 15.4% (387/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 34.2% (27/79)
WeakSet: 29.4% (10/34)
arrow-function: 30.9% (293/949)
class: 48.9% (2333/4768)
computed-property-names: 57.7% (276/478)
const: 26.7% (4/15)
cross-realm: 1% (2/201)
default-parameters: 77.7% (1762/2269)
destructuring-assignment: 34.8% (49/141)
destructuring-binding: 67.4% (4473/6637)
for-of: 0% (0/5)
generators: 60.7% (2479/4085)
let: 41.6% (32/77)
new.target: 39.3% (24/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 0% (0/96)
super: 15.8% (3/19)
tail-call-optimization: 88.6% (31/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 72.3% (94/130)<pre>
Array.prototype.includes: 42% (29/69)
exponentiation: 60.2% (62/103)
u180e: 84% (21/25)
</pre></li>
<li>ES2017: 35.6% (271/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 5.1% (19/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 55.7% (393/705)
intl-normative-optional: 50% (2/4)
</pre></li>
<li>ES2018: 25.4% (1234/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 34.5% (10/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 22.5% (1116/4968)
object-rest: 54.9% (195/355)
object-spread: 35.6% (48/135)
regexp-dotall: 35.3% (6/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 21% (21/100)
regexp-unicode-property-escapes: 1.6% (11/681)
</pre></li>
<li>ES2019: 32.1% (44/137)<pre>
Array.prototype.flat: 80% (12/15)
Array.prototype.flatMap: 38.1% (8/21)
Object.fromEntries: 36% (9/25)
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
<li>ES2020: 24.8% (534/2156)<pre>
BigInt: 20.1% (301/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 19% (15/79)
Promise.allSettled: 21.6% (22/102)
String.prototype.matchAll: 6.2% (1/16)
Symbol.matchAll: 11.1% (7/63)
coalesce-expression: 80.8% (21/26)
dynamic-import: 35.8% (339/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 55.6% (5/9)
globalThis: 45.3% (67/148)
import.meta: 26.1% (6/23)
optional-chaining: 41.1% (23/56)
</pre></li>
<li>ES2021: 26% (239/920)<pre>
AggregateError: 29% (9/31)
FinalizationRegistry: 22.4% (11/49)
Intl.DateTimeFormat-datetimestyle: 6.2% (1/16)
Intl.DateTimeFormat-formatRange: 10.8% (4/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 9.9% (8/81)
Intl.Locale: 0% (0/156)
Promise.any: 20.7% (19/92)
String.prototype.replaceAll: 9.8% (4/41)
WeakRef: 43.2% (16/37)
align-detached-buffer-semantics-with-web-reality: 8.9% (14/158)
logical-assignment-operators: 52.8% (57/108)
numeric-separator-literal: 66% (105/159)
</pre></li>
<li>ES2022: 44.1% (2412/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 29.1% (23/79)
Object.hasOwn: 85.5% (53/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 6.2% (1/16)
class-fields-private: 37.8% (429/1134)
class-fields-private-in: 5.3% (1/19)
class-fields-public: 50.8% (1046/2058)
class-methods-private: 44.6% (762/1709)
class-static-block: 50.8% (33/65)
class-static-fields-private: 63.8% (220/345)
class-static-fields-public: 58.7% (125/213)
class-static-methods-private: 49% (742/1513)
error-cause: 80% (4/5)
regexp-match-indices: 22.6% (7/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 33.8% (104/308)<pre>
Intl-enumeration: 8.6% (3/35)
array-find-from-last: 34.9% (38/109)
change-array-by-copy: 32.6% (43/132)
hashbang: 69% (20/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 5.7% (48/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 57.1% (16/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 55.6% (5/9)
regexp-v-flag: 11.8% (22/187)
resizable-arraybuffer: 1.1% (5/463)
</pre></li>
<li>ES2025: 14.2% (180/1264)<pre>
Float16Array: 14.3% (7/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 46% (46/100)
iterator-helpers: 2.3% (13/567)
json-modules: 7.7% (1/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 33.5% (77/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>Next: 6.6% (553/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 16.7% (1/6)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0.1% (1/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 7.8% (8/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 2.1% (139/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 32.5% (155/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 13.6% (3/22)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 7.2% (5/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 54.4% (4746/8720)</li>
</ul>
</details>
