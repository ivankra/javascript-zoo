# Yavashark

JavaScript/TypeScript engine written in Rust.

* Repository:  [Sharktheone/yavashark](https://github.com/Sharktheone/yavashark.git) <span class="shields"><img src="https://img.shields.io/github/stars/Sharktheone/yavashark?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Sharktheone/yavashark?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         177309 (`cloc --not_match_d="(?i)(test)" crates src`)
* Language:    Rust
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2024-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 88%</summary><ul>
<li>ES1: 91%<pre>
<a href="../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed
<a href="../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: charAt out of bounds failed; charAt negative failed
<a href="../conformance/es1/String.prototype.charCodeAt.js">String.prototype.charCodeAt.js</a>: charCodeAt out of bounds NaN failed
<a href="../conformance/es1/String.prototype.substring.js">String.prototype.substring.js</a>: substring swap failed
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: failed
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: Error: TypeError: yavashark_env::object::MutObject is not callable
<a href="../conformance/es1/asi.js">asi.js</a>: Error: TypeError: Invalid left-hand side in assignment: undefined
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/assignment.unsigned-shift.js">assignment.unsigned-shift.js</a>: &gt;&gt;&gt;= failed
<a href="../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: -12345 &gt;&gt;&gt; 2 != 1073738737 (got: 0); -12345 &gt;&gt;&gt; 0 != 4294954951 (got: 0)
<a href="../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -2^31-1 failed
<a href="../conformance/es1/conversions.ToInteger.js">conversions.ToInteger.js</a>: -1.9 failed
<a href="../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: +Infinity failed; 2^32 failed; -1 failed; -2^31 failed
<a href="../conformance/es1/conversions.js">conversions.js</a>: 123 != '0123'; 123.0 != '0123'; false != ''
<a href="../conformance/es1/global.parseInt.hex.js">global.parseInt.hex.js</a>: failed
<a href="../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: failed
<a href="../conformance/es1/with.js">with.js</a>: assignment failed
</pre></li>
<li>ES3: 92%<pre>
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: Error: TypeError: expected object
<a href="../conformance/es3/Error.js">Error.js</a>: Error: TypeError: ErrorObjConstructor is not callable at ErrorObjConstructor (Error.js:23)
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: inherited property should be false failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: Error: RuntimeError: Not implemented
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: Error: TypeError: undefined is not a function
<a href="../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: no exception for negative array length; no exception for array length exceeding 2^32-1
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: no exception for unclosed string
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: Nothing to repeat at position 3
</pre></li>
<li>ES5: 69%<pre>
<a href="../conformance/es5/Array.isArray.js">Array.isArray.js</a>: Error: TypeError: expected object
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: named function prototype is enumerable; prototype appears in for-in
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: length property incorrect; bound constructor failed
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: stringify object failed; stringify array failed; stringify number failed; failed to drop undefined/function values; undefined/function values in array not converted to null; NaN and Infinity not converted null; didn't call user-provided toJSON() method
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer function failed; replacer array failed
<a href="../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: space parameter failed
<a href="../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: sealed object failed; frozen object is sealed failed
<a href="../conformance/es5/Object.seal.js">Object.seal.js</a>: prevented property addition failed; prevented property deletion failed
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 64%, ES2016+ 72%, Next 4%, Intl 64%</summary><ul>
<li>ES6: 64%, <b>6 crashes</b><pre>
<a href="../conformance/kangax-es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: [object Error]
<a href="../conformance/kangax-es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: [object Error]
<a href="../conformance/kangax-es6/Array.from.iterable.js">Array.from.iterable.js</a>: [object Error]
<a href="../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.array-like.js">Array.from.map.array-like.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: [object Error]
<a href="../conformance/kangax-es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: [object Error]
<a href="../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/Array.of.js">Array.of.js</a>: failed
<a href="../conformance/kangax-es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: failed
<a href="../conformance/kangax-es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: [object Error]
<a href="../conformance/kangax-es6/Function.name.accessor.js">Function.name.accessor.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: [object Error]
<a href="../conformance/kangax-es6/Map.constructor-accepts-null.js">Map.constructor-accepts-null.js</a>: [object Error]
<a href="../conformance/kangax-es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: failed
<a href="../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: failed
...
</pre></li>
<li>ES2016: 82%<pre>
<a href="../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: [object Error]
<a href="../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 58%, <b>2 crashes</b><pre>
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: failed
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: [object Error]
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: failed
<a href="../conformance/kangax-es2017/String.prototype.padEnd.js">String.prototype.padEnd.js</a>: failed
<a href="../conformance/kangax-es2017/String.prototype.padStart.js">String.prototype.padStart.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: [object Error]
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Error { error: (513..514, Expected(";", ")")) }
<a href="../conformance/kangax-es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: failed
<a href="../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: crashed (signal 6); fatal runtime error: stack overflow, aborting
<a href="../conformance/kangax-es2017/async.await.js">async.await.js</a>: crashed (signal 6); fatal runtime error: stack overflow, aborting
...
</pre></li>
<li>ES2018: 63%<pre>
<a href="../conformance/kangax-es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: thread 'main' (2889976) panicked at crates/yavashark_env/src/builtins/promise.rs:33:1:
<a href="../conformance/kangax-es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: failed
<a href="../conformance/kangax-es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: failed
<a href="../conformance/kangax-es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: failed
<a href="../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Invalid escape sequence in template literal
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: [object Error]
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: [object Error]
</pre></li>
<li>ES2019: 56%<pre>
<a href="../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: [object Error]
<a href="../conformance/kangax-es2019/Object.fromEntries.js">Object.fromEntries.js</a>: [object Error]
<a href="../conformance/kangax-es2019/Symbol.prototype.description.empty.js">Symbol.prototype.description.empty.js</a>: failed
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: [object Error]
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: [object Error]
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: [object Error]
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
<a href="../conformance/kangax-es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
</pre></li>
<li>ES2020: 87%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: [object Error]
<a href="../conformance/kangax-es2020/BigUint64Array.js">BigUint64Array.js</a>: [object Error]
<a href="../conformance/kangax-es2020/optional-chaining.method-call.js">optional-chaining.method-call.js</a>: failed
</pre></li>
<li>ES2021: 60%<pre>
<a href="../conformance/kangax-es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: [object Error]
<a href="../conformance/kangax-es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: failed
</pre></li>
<li>ES2022: 82%<pre>
<a href="../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../conformance/kangax-es2022/at-method.Array.js">at-method.Array.js</a>: failed
<a href="../conformance/kangax-es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: [object Error]
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: [object Error]
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: [object Error]
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 59%<pre>
<a href="../conformance/kangax-es2024/Map.groupBy.js">Map.groupBy.js</a>: [object Error]
<a href="../conformance/kangax-es2024/Object.groupBy.js">Object.groupBy.js</a>: failed
<a href="../conformance/kangax-es2024/regex.flags.v.shows-in-flags.js">regex.flags.v.shows-in-flags.js</a>: [object Error]
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: failed
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 89%<pre>
<a href="../conformance/kangax-es2025/Promise.try.js">Promise.try.js</a>: failed
<a href="../conformance/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Duplicate capture group name 'year'
</pre></li>
<li>Next: 4%</li>
<li>Intl: 64%<pre>
<a href="../conformance/kangax-intl/Intl.Collator.prototype.compare.js">Intl.Collator.prototype.compare.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.valid-tags.js">Intl.Collator.valid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: [object Error]
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: [object Error]
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.valid-tags.js">Intl.DateTimeFormat.valid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: [object Error]
<a href="../conformance/kangax-intl/Intl.NumberFormat.valid-tags.js">Intl.NumberFormat.valid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: [object Error]
<a href="../conformance/kangax-intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: failed
</pre></li>
</ul></details>

💥 **8 crashes during testing**
