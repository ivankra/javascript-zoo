# Stator

JavaScript engine written in Rust.

* Repository: [telecos/stator](https://github.com/telecos/stator)
* LOC:        [115276](# "cloc crates")
* Language:   Rust
* License:    MIT
* Standard:   ES2023 (partial)
* Years:      2026-

## Conformance

<details><summary>ES1-ES5: 83%</summary><ul>
<li>ES1: 93.4% (185/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.length failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: typeof Date() != 'string'
<a href="../../conformance/es1/Object.prototype.valueOf.js">Object.prototype.valueOf.js</a>: TypeError: Cannot read properties of undefined (reading 'a')
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/String.js">String.js</a>: FAIL: 15.5.1.2 String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/arguments.js">arguments.js</a>: FAIL: arguments[i] not available; arguments.length not available
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: x=225
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
</pre></li>
<li>ES3: 81.8% (121/148)<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: FAIL: apply with arguments object failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; zero failed; Infinity failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e0'); (1.255).toExponential(2) != '1.25e+0', got '...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: toPrecision(5) fixed notation failed; Infinity failed; small number exponential notation failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: FAIL: simple property failed; ToString conversion failed
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: FAIL: Object.prototype failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: enumerable property failed; ToString conversion failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: FAIL: non-global match failed
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: FAIL: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/function-expressions.IIFE.js">function-expressions.IIFE.js</a>: FAIL: IIFE closure failed
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
...
</pre></li>
<li>ES5: 58.1% (43/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: TypeError: Cannot read properties of undefined (reading 'toISOString')
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: bound constructor failed
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/range_analysis.rs:408:37:
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/range_analysis.rs:408:37:
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/range_analysis.rs:408:37:
<a href="../../conformance/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: FAIL: Object.prototype failed
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: undefined is not undefined after assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: FAIL
<a href="../../conformance/es5/strict.js">strict.js</a>: ReferenceError: testVariable is not defined
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 50%, ES2016+ 54%, Next 11%, Intl 79%</summary><ul>
<li>ES5: 74%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
...
</pre></li>
<li>ES6: 49.8%</li>
<li>ES2016: 63.6%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: InternalError: bytecode fell off the end without Return
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/codegen.rs:2104:57:
</pre></li>
<li>ES2017: 50.1%<pre>
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: TypeError: Cannot read properties of undefined (reading 'value')
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/codegen.rs:2104:57:
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'get')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'get')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/codegen.rs:2104:57:
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'set')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'set')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: CRASH: thread '&lt;unnamed&gt;' panicked at crates/stator_core/src/compiler/maglev/codegen.rs:2104:57:
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: FAIL
...
</pre></li>
<li>ES2018: 50.5%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: TypeError: Promise.prototype.finally called on non-Promise
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: TypeError: Promise.prototype.then called on non-Promise
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: TypeError: Promise.prototype.finally called on non-Promise
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: TypeError: Promise.prototype.then called on non-Promise
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: TypeError: Promise.prototype.then called on non-Promise
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Todhri}/: Invalid property name
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/: Invalid property name
</pre></li>
<li>ES2019: 57.1%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat.js">Array.prototype.flat.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Map.prototype.entries called on incompatible receiver
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: unterminated string literal
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: unterminated string literal
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: FAIL: found both ok and fail markers
</pre></li>
<li>ES2020: 71.4%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: DataView.prototype.setBigInt64 called on incompatible receiver
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: DataView.prototype.setBigUint64 called on incompatible receiver
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: TypeError: Promise.prototype.then called on non-Promise
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: Cannot read properties of undefined (reading 'value')
</pre></li>
<li>ES2021: 57.1%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: TypeError: Promise.prototype.catch called on non-Promise
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: TypeError: Promise.prototype.then called on non-Promise
<a href="../../conformance/compat-table/es2021/WeakRef.js">WeakRef.js</a>: TypeError: WeakRef.prototype.deref called on incompatible receiver
</pre></li>
<li>ES2022: 61.2%<pre>
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.computed-instance.js">class-fields.computed-instance.js</a>: InternalError: release_temporary: expected r1, got r0
<a href="../../conformance/compat-table/es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: TypeError: Cannot read properties of undefined (reading '0')
<a href="../../conformance/compat-table/es2022/class-fields.private-static.js">class-fields.private-static.js</a>: TypeError: Cannot read private member #x from an object whose class did not declare it
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: ReferenceError: y is not defined
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: TypeError: Cannot write to private member #x from an object whose class did not declare it
<a href="../../conformance/compat-table/es2022/class-methods.private-static.js">class-methods.private-static.js</a>: TypeError: Cannot read private member #x from an object whose class did not declare it
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: ReferenceError: ok is not defined
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: RegExp.prototype.flags requires that 'this' be an Object
</pre></li>
<li>ES2023: 82.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
</pre></li>
<li>ES2024: 30.6%</li>
<li>ES2025: 28.9%</li>
<li>Next: 10.5%</li>
<li>Intl: 78.6%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 7.1%, main 7.8%, staging 2.4%, annexB 26.2%, Next 2.5%, Intl 0%</summary>
<ul>
<li>Overall: 7.1% (3752/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 7.8% (3222/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 8% (657/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 6.7% (737/11054)<pre>
__proto__: 0% (0/18)
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
Promise: 0% (0/4)
Proxy: 0.9% (4/468)
Reflect: 0% (0/468)
Reflect.construct: 0% (0/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 0% (0/27)
String.prototype.includes: 0% (0/26)
Symbol: 0.3% (4/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0.3% (5/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 9.1% (4/44)
TypedArray: 0% (1/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 0.5% (5/949)
class: 8.8% (420/4768)
computed-property-names: 0.2% (1/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 8.8% (199/2269)
destructuring-assignment: 9.2% (13/141)
destructuring-binding: 7.2% (476/6637)
for-of: 0% (0/5)
generators: 8.4% (343/4085)
let: 0% (0/77)
new.target: 19.7% (12/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 32.3% (31/96)
super: 0% (0/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 10.8% (14/130)<pre>
Array.prototype.includes: 0% (0/69)
exponentiation: 13.6% (14/103)
u180e: 4% (1/25)
</pre></li>
<li>ES2017: 8.5% (65/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 14.6% (103/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 6.2% (303/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 8.5% (424/4968)
object-rest: 0.3% (1/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 0.7% (1/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 0% (0/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.3% (180/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.6% (318/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 0% (0/9)
globalThis: 6.1% (9/148)
import.meta: 47.8% (11/23)
optional-chaining: 37.5% (21/56)
</pre></li>
<li>ES2021: 7.6% (70/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 36.5% (58/159)
</pre></li>
<li>ES2022: 9% (494/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 6.2% (1/16)
class-fields-private: 18.6% (211/1134)
class-fields-private-in: 26.3% (5/19)
class-fields-public: 5.9% (122/2058)
class-methods-private: 15.4% (264/1709)
class-static-block: 32.3% (21/65)
class-static-fields-private: 1.2% (4/345)
class-static-fields-public: 0% (0/213)
class-static-methods-private: 7.9% (120/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 7.8% (24/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 82.8% (24/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0% (0/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0% (0/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 1.2% (15/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 0% (0/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 2.5% (211/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 2.3% (11/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 11.2% (981/8720)</li>
</ul>
</details>
