# Yavashark

JavaScript/TypeScript engine written in Rust.

* Repository:  [Sharktheone/yavashark](https://github.com/Sharktheone/yavashark.git) <span class="shields"><img src="https://img.shields.io/github/stars/Sharktheone/yavashark?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Sharktheone/yavashark?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [177309](# "cloc --not_match_d='(?i)(test)' crates src")
* Language:    Rust
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2024-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 88%</summary><ul>
<li>Tested version: <a href="https://github.com/Sharktheone/yavashark/commit/c684cdb1b4689e82e2311b02e58c280825442e7d">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/yavashark.json">json</a>)</li>
<li>ES1: 91.9% (182/198)<pre>
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: FAIL: Function.length failed
<a href="../../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: FAIL: charAt out of bounds failed; charAt negative failed
<a href="../../conformance/es1/String.prototype.charCodeAt.js">String.prototype.charCodeAt.js</a>: FAIL: charCodeAt out of bounds NaN failed
<a href="../../conformance/es1/String.prototype.substring.js">String.prototype.substring.js</a>: FAIL: substring swap failed
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: FAIL
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: yavashark_env::object::MutObject is not callable
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/assignment.unsigned-shift.js">assignment.unsigned-shift.js</a>: FAIL: &gt;&gt;&gt;= failed
<a href="../../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: FAIL: -12345 &gt;&gt;&gt; 2 != 1073738737 (got: 0); -12345 &gt;&gt;&gt; 0 != 4294954951 (got: 0)
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: FAIL: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -2^31-1 failed
<a href="../../conformance/es1/conversions.ToInteger.js">conversions.ToInteger.js</a>: FAIL: -1.9 failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: FAIL: +Infinity failed; 2^32 failed; -1 failed; -2^31 failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: FAIL: 123 != '0123'; 123.0 != '0123'
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
<a href="../../conformance/es1/with.js">with.js</a>: FAIL: assignment failed
</pre></li>
<li>ES3: 92.6% (137/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: expected object
<a href="../../conformance/es3/Error.js">Error.js</a>: TypeError: ErrorObjConstructor is not callable
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: inherited property should be false failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: RuntimeError: Not implemented
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: FAIL: no exception for negative array length; no exception for array length exceeding 2^32-1
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: FAIL: no exception for unclosed string
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: Nothing to repeat at position 3
</pre></li>
<li>ES5: 68.9% (51/74)<pre>
<a href="../../conformance/es5/Array.isArray.js">Array.isArray.js</a>: TypeError: expected object
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: FAIL: named function prototype is enumerable; prototype appears in for-in
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: length property incorrect; bound constructor failed
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: stringify object failed; stringify array failed; stringify number failed; failed to drop undefined/function values; undefined/function values in array not converted to null; NaN and Infinity not conve...
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer function failed; replacer array failed
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: FAIL: space parameter failed
<a href="../../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL: sealed object failed; frozen object is sealed failed
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: FAIL: prevented property addition failed; prevented property deletion failed
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 64%, ES2016+ 73%, Next 4%, Intl 68%</summary><ul>
<li>Tested version: <a href="https://github.com/Sharktheone/yavashark/commit/c684cdb1b4689e82e2311b02e58c280825442e7d">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/yavashark.json">json</a>)</li>
<li>ES5: 86.8%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-undefined.js">strict.this-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 64.3%<pre>
<a href="../../conformance/compat-table/es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Array.from.iterable.js">Array.from.iterable.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.array-like.js">Array.from.map.array-like.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.of.js">Array.of.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Function.name.accessor.js">Function.name.accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.object-method.js">Function.name.object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Map.constructor-accepts-null.js">Map.constructor-accepts-null.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
...
</pre></li>
<li>ES2016: 81.8%<pre>
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 64.4%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/String.prototype.padEnd.js">String.prototype.padEnd.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/String.prototype.padStart.js">String.prototype.padStart.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Expected(";", ")")
<a href="../../conformance/compat-table/es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: TIMEOUT: &gt;60s
...
</pre></li>
<li>ES2018: 64.9%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: CRASH: thread 'main' panicked at crates/yavashark_env/src/builtins/promise.rs:33:1:
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: FAIL: Interpreter: Object([object Promise])
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: FAIL: Interpreter: Object([object Promise])
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Invalid escape sequence in template literal
</pre></li>
<li>ES2019: 56.2%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
</pre></li>
<li>ES2020: 87.1%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2020/optional-chaining.method-call.js">optional-chaining.method-call.js</a>: FAIL
</pre></li>
<li>ES2021: 59.5%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: FAIL: Interpreter: Object([object Promise])
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: FAIL
</pre></li>
<li>ES2022: 81.9%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/at-method.Array.js">at-method.Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL: exception: [object Error]
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 67.3%<pre>
<a href="../../conformance/compat-table/es2024/Map.groupBy.js">Map.groupBy.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/es2024/Object.groupBy.js">Object.groupBy.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.shows-in-flags.js">regex.flags.v.shows-in-flags.js</a>: FAIL: exception: [object Error]
</pre></li>
<li>ES2025: 89.5%<pre>
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: FAIL: Interpreter: Object([object Promise])
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Duplicate capture group name 'year'
</pre></li>
<li>Next: 4%</li>
<li>Intl: 67.9%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.compare.js">Intl.Collator.prototype.compare.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.valid-tags.js">Intl.Collator.valid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.valid-tags.js">Intl.DateTimeFormat.valid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: FAIL: exception: [object Error]
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.valid-tags.js">Intl.NumberFormat.valid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: FAIL: exception: [object Error]
</pre></li>
</ul></details>

<details><summary>test262: 74.9%, main 75.9%, staging 41.5%, annexB 69.6%, Next 78.6%, Intl 73.4%</summary>
<ul>
<li>Tested version: <a href="https://github.com/Sharktheone/yavashark/commit/c684cdb1b4689e82e2311b02e58c280825442e7d">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/yavashark.json">json</a>)</li>
<li>Overall: 74.9% (39805/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 75.9% (31549/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 85.9% (7041/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 69.5% (7680/11054)<pre>
__proto__: 11.1% (2/18)
Array.prototype.values: 25% (1/4)
ArrayBuffer: 58.6% (157/268)
DataView: 57.4% (109/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 71.4% (5/7)
DataView.prototype.getInt32: 71.4% (5/7)
DataView.prototype.getInt8: 80% (4/5)
DataView.prototype.getUint16: 71.4% (5/7)
DataView.prototype.getUint32: 71.4% (5/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 28.6% (2/7)
Float64Array: 28.6% (2/7)
Int16Array: 100% (2/2)
Int32Array: 75% (3/4)
Int8Array: 82.9% (29/35)
Map: 47.5% (19/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 35.7% (167/468)
Reflect: 43.8% (205/468)
Reflect.construct: 90.9% (633/696)
Reflect.set: 63% (29/46)
Reflect.setPrototypeOf: 52.2% (12/23)
Set: 76.3% (29/38)
String.fromCodePoint: 81.8% (18/22)
String.prototype.endsWith: 70.4% (19/27)
String.prototype.includes: 69.2% (18/26)
Symbol: 68.7% (1026/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 85.3% (29/34)
Symbol.iterator: 46.6% (869/1865)
Symbol.match: 56.8% (50/88)
Symbol.replace: 76.5% (75/98)
Symbol.search: 59.5% (22/37)
Symbol.species: 14.5% (40/276)
Symbol.split: 46.6% (27/58)
Symbol.toPrimitive: 74.7% (174/233)
Symbol.toStringTag: 43.5% (57/131)
Symbol.unscopables: 13.6% (6/44)
TypedArray: 55.6% (1396/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 54.5% (6/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 86.1% (68/79)
WeakSet: 73.5% (25/34)
arrow-function: 78.1% (741/949)
class: 83.9% (4002/4768)
computed-property-names: 83.7% (400/478)
const: 0% (0/15)
cross-realm: 1% (2/201)
default-parameters: 77.6% (1761/2269)
destructuring-assignment: 80.9% (114/141)
destructuring-binding: 80.1% (5313/6637)
for-of: 20% (1/5)
generators: 82.7% (3377/4085)
let: 35.1% (27/77)
new.target: 45.9% (28/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 0% (0/96)
super: 78.9% (15/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 80% (104/130)<pre>
Array.prototype.includes: 49.3% (34/69)
exponentiation: 81.6% (84/103)
u180e: 84% (21/25)
</pre></li>
<li>ES2017: 49.5% (378/763)<pre>
__getter__: 66.7% (18/27)
__setter__: 51.9% (14/27)
Atomics: 20.9% (79/378)
Intl.DateTimeFormat-dayPeriod: 8.3% (1/12)
SharedArrayBuffer: 32.5% (151/464)
async-functions: 67.7% (477/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 78.8% (3828/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 34.5% (10/29)
Symbol.asyncIterator: 0.2% (1/538)
async-iteration: 74.8% (3718/4968)
object-rest: 94.1% (334/355)
object-spread: 65.2% (88/135)
regexp-dotall: 52.9% (9/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 86% (86/100)
regexp-unicode-property-escapes: 99.3% (676/681)
</pre></li>
<li>ES2019: 79.6% (109/137)<pre>
Array.prototype.flat: 73.3% (11/15)
Array.prototype.flatMap: 57.1% (12/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 91.7% (22/24)
String.prototype.trimStart: 91.3% (21/23)
Symbol.prototype.description: 50% (4/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 81.5% (44/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 52.9% (1141/2156)<pre>
BigInt: 61% (916/1501)
Intl.NumberFormat-unified: 11.9% (8/67)
Intl.RelativeTimeFormat: 50.6% (40/79)
Promise.allSettled: 37.3% (38/102)
String.prototype.matchAll: 81.2% (13/16)
Symbol.matchAll: 66.7% (42/63)
coalesce-expression: 69.2% (18/26)
dynamic-import: 56.9% (538/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 66.7% (6/9)
globalThis: 49.3% (73/148)
import.meta: 43.5% (10/23)
optional-chaining: 73.2% (41/56)
</pre></li>
<li>ES2021: 54.1% (498/920)<pre>
AggregateError: 58.1% (18/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 31.2% (5/16)
Intl.DateTimeFormat-formatRange: 64.9% (24/37)
Intl.DateTimeFormat-fractionalSecondDigits: 30% (3/10)
Intl.DisplayNames: 70.2% (33/47)
Intl.ListFormat: 45.7% (37/81)
Intl.Locale: 58.3% (91/156)
Promise.any: 30.4% (28/92)
String.prototype.replaceAll: 43.9% (18/41)
WeakRef: 86.5% (32/37)
align-detached-buffer-semantics-with-web-reality: 27.2% (43/158)
logical-assignment-operators: 61.1% (66/108)
numeric-separator-literal: 79.9% (127/159)
</pre></li>
<li>ES2022: 81.2% (4436/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 50% (6/12)
Intl.Segmenter: 53.2% (42/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 90.9% (10/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 93% (1055/1134)
class-fields-private-in: 57.9% (11/19)
class-fields-public: 93% (1914/2058)
class-methods-private: 79.3% (1355/1709)
class-static-block: 49.2% (32/65)
class-static-fields-private: 94.2% (325/345)
class-static-fields-public: 81.7% (174/213)
class-static-methods-private: 76.1% (1151/1513)
error-cause: 0% (0/5)
regexp-match-indices: 58.1% (18/31)
top-level-await: 61.6% (167/271)
</pre></li>
<li>ES2023: 77.1% (316/410)<pre>
Intl-enumeration: 48.6% (17/35)
Intl.NumberFormat-v3: 68.6% (70/102)
array-find-from-last: 78% (85/109)
change-array-by-copy: 82.6% (109/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 62.6% (526/840)<pre>
Atomics.waitAsync: 10.9% (11/101)
String.prototype.isWellFormed: 87.5% (7/8)
String.prototype.toWellFormed: 87.5% (7/8)
array-grouping: 46.4% (13/28)
arraybuffer-transfer: 50.8% (30/59)
promise-with-resolvers: 44.4% (4/9)
regexp-v-flag: 93.6% (175/187)
resizable-arraybuffer: 60.7% (281/463)
</pre></li>
<li>ES2025: 75.8% (960/1266)<pre>
Float16Array: 76.5% (39/51)
Intl.DurationFormat: 72.3% (81/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 56% (56/100)
iterator-helpers: 79.5% (451/567)
json-modules: 15.4% (2/13)
promise-try: 75% (9/12)
regexp-modifiers: 93.5% (215/230)
set-methods: 49% (94/192)
</pre></li>
<li>ES2026: 49% (177/361)<pre>
Array.fromAsync: 8.4% (8/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 91.1% (1406/1543)
Intl.Locale-info: 2.3% (1/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 93.8% (30/32)
json-parse-with-source: 63.6% (14/22)
uint8array-base64: 58% (40/69)
upsert: 87.5% (63/72)
</pre></li>
<li>Next: 78.6% (6208/7895)<pre>
Atomics.pause: 83.3% (5/6)
ShadowRealm: 0% (0/64)
Temporal: 86% (5735/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 73.7% (14/19)
decorators: 59.3% (16/27)
explicit-resource-management: 28.9% (138/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 49.8% (114/229)
import-text: 0% (0/6)
joint-iteration: 29.5% (23/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 5.3% (1/19)
source-phase-imports: 75% (171/228)
source-phase-imports-module-source: 88.1% (74/84)
</pre></li>
<li>N/A: 73.4% (6403/8718)</li>
</ul>
</details>
