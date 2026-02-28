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
<li>ES1: 84%<pre>
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Date.prototype.getUTCDay.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setHours.js">Date.prototype.setHours.js</a>: Date.prototype.setHours.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: Date.prototype.setMilliseconds.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: Date.prototype.setMinutes.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setMonth.js">Date.prototype.setMonth.js</a>: Date.prototype.setMonth.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setSeconds.js">Date.prototype.setSeconds.js</a>: Date.prototype.setSeconds.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: Date.prototype.setUTCDate.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: Date.prototype.setUTCHours.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: Date.prototype.setUTCMilliseconds.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: Date.prototype.setUTCMinutes.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: Date.prototype.setUTCMonth.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: Date.prototype.setUTCSeconds.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Date.prototype.toUTCString.js">Date.prototype.toUTCString.js</a>: Date.prototype.toUTCString.js: TypeError: undefined is not a function
<a href="../../conformance/es1/Number.prototype.toString.js">Number.prototype.toString.js</a>: toString() failed; toString(10) failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: String.generics.js: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: annex-b.Date.prototype.getYear.js: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: annex-b.Date.prototype.setYear.js: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: annex-b.Date.prototype.toGMTString.js: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: annex-b.global.escape.js: ReferenceError: escape is not defined
...
</pre></li>
<li>ES3: 78%<pre>
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: slice object with start and end failed; slice object with start only failed; slice object with negative start failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: delete on object failed; insert on object failed; negative start on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: empty array toLocaleString failed; multiple elements content failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: Date.prototype.toDateString.js: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Date.prototype.toLocaleDateString.js: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Date.prototype.toLocaleTimeString.js: TypeError: undefined is not a function
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: Date.prototype.toTimeString.js: TypeError: undefined is not a function
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: Array index should be enumerable failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: format failed
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: String.prototype.concat.generic.js: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: String.prototype.localeCompare.js: TypeError: undefined is not a function
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: String.prototype.match.generic.js: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: String.prototype.replace.generic.js: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: String.prototype.search.generic.js: TypeError: Function.prototype.call called on non-function
<a href="../../conformance/es3/String.prototype.slice.generic.js">String.prototype.slice.generic.js</a>: String.prototype.slice.generic.js: TypeError: Function.prototype.call called on non-function
...
</pre></li>
<li>ES5: 70%<pre>
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: Date.prototype.toISOString not a function; Date.prototype.toISOString.js: Error: Native function error in Date: Unsupported operation: Infinity or NaN toInt
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: Date.prototype.toJSON not a function; Date.prototype.toJSON.js: Error: Native function error in Date: Unsupported operation: Infinity or NaN toInt
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: cyclic structure does not throw TypeError; didn't call user-provided toJSON() method
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: Properties argument failed
<a href="../../conformance/es5/String.prototype.trim.js">String.prototype.trim.js</a>: String.prototype.trim not a function
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../../conformance/es5/debugger.js">debugger.js</a>: debugger.js: ReferenceError: debugger is not defined
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: global.undefined.immutable.js: SyntaxError: Invalid left-hand side in assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 57%, ES2016+ 59%, Next 3%, Intl 61%</summary><ul>
<li>ES6: 57%<pre>
<a href="../../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: [object Object]
<a href="../../conformance/kangax-es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: failed
<a href="../../conformance/kangax-es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: [object Object]
<a href="../../conformance/kangax-es6/Function.name.accessor.js">Function.name.accessor.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.expression.js">Function.name.expression.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.statement.js">Function.name.statement.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../../conformance/kangax-es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: failed
<a href="../../conformance/kangax-es6/Map.constructor-requires-new.js">Map.constructor-requires-new.js</a>: failed
<a href="../../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: failed
<a href="../../conformance/kangax-es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: [object Object]
<a href="../../conformance/kangax-es6/Map.prototype.Symbol.iterator.js">Map.prototype.Symbol.iterator.js</a>: failed
<a href="../../conformance/kangax-es6/Map.prototype.clear.js">Map.prototype.clear.js</a>: failed
<a href="../../conformance/kangax-es6/Map.prototype.delete.js">Map.prototype.delete.js</a>: failed
...
</pre></li>
<li>ES2016: 85%<pre>
<a href="../../conformance/kangax-es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: [object Object]
</pre></li>
<li>ES2017: 55%<pre>
<a href="../../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: failed
<a href="../../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: failed
<a href="../../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: [object Object]
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: [object Object]
...
</pre></li>
<li>ES2018: 45%</li>
<li>ES2019: 73%<pre>
<a href="../../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: [object Object]
</pre></li>
<li>ES2020: 79%<pre>
<a href="../../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: failed
<a href="../../conformance/kangax-es2020/BigUint64Array.js">BigUint64Array.js</a>: failed
<a href="../../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: [object Object]
<a href="../../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: [object Object]
<a href="../../conformance/kangax-es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: failed
</pre></li>
<li>ES2021: 93%<pre>
<a href="../../conformance/kangax-es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed
</pre></li>
<li>ES2022: 75%<pre>
<a href="../../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../../conformance/kangax-es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../../conformance/kangax-es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: [object Object]
<a href="../../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: Internal error: type 'PrivateIdentifierExpression' is not a subtype of type 'IdentifierExpression' in type cast
<a href="../../conformance/kangax-es2022/class-fields.static.define.js">class-fields.static.define.js</a>: failed
<a href="../../conformance/kangax-es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: [object Object]
<a href="../../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: [object Object]
</pre></li>
<li>ES2023: 83%<pre>
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: [object Object]
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: [object Object]
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: [object Object]
</pre></li>
<li>ES2024: 18%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 61%<pre>
<a href="../../conformance/kangax-intl/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../../conformance/kangax-intl/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: [object Object]
<a href="../../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: Internal error: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/kangax-intl/Intl.DateTimeFormat.valid-tags.js">Intl.DateTimeFormat.valid-tags.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: Internal error: LocaleDataException: Locale data has not been initialized, call initializeDateFormatting(&lt;locale&gt;).
<a href="../../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
<a href="../../conformance/kangax-intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: failed
</pre></li>
</ul></details>
