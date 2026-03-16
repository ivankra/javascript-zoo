# Stator

JavaScript engine written in Rust.

* Repository: [telecos/stator](https://github.com/telecos/stator)
* LOC:        [115276](# "cloc crates")
* Language:   Rust
* License:    MIT
* Standard:   ES2023 (partial)
* Years:      2026-

## Conformance

<details><summary>ES1-ES5: 75%</summary><ul>
<li>ES1: 85%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: failed: Array.length failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: failed: new Boolean(true) failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../../conformance/es1/Date.js">Date.js</a>: failed
<a href="../../conformance/es1/Number.js">Number.js</a>: failed: new Number(value) failed
<a href="../../conformance/es1/Object.js">Object.js</a>: failed: Object(number) failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TypeError: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/String.js">String.js</a>: failed: 15.5.1.2 String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: failed: 0755 failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/arguments.js">arguments.js</a>: failed
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: TypeError: Cannot set properties of undefined (setting '0')
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: x=225
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: failed: new Boolean(false) failed - expected it to be truthy
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: failed: +Infinity failed
<a href="../../conformance/es1/conversions.ToObject.js">conversions.ToObject.js</a>: failed: true failed
...
</pre></li>
<li>ES3: 71%<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: failed: apply with arguments object failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: failed: toExponential(2) failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: failed: toExponential(Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: failed: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: failed: toPrecision(5) fixed notation failed
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: failed: Object.prototype failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: failed: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: failed: RegExp passthrough failed
<a href="../../conformance/es3/RegExp.lastIndex.js">RegExp.lastIndex.js</a>: failed: after first match failed
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: failed
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: failed: non-global match failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: failed: regex with capture failed
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: failed
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: failed: string with \d+ pattern failed
...
</pre></li>
<li>ES5: 52%<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: failed: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: failed: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: failed: forEach execution failed
<a href="../../conformance/es5/Array.prototype.indexOf.js">Array.prototype.indexOf.js</a>: failed: fromIndex failed
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: failed: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: failed: arr.sort(undefined) failed
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: TypeError: TypeError: Cannot set properties of null (setting 'value')
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: failed: escape sequences failed
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: failed: stringify array failed
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: failed: replacer function failed
<a href="../../conformance/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: failed: Array.prototype failed
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: failed
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: failed
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: failed
<a href="../../conformance/es5/literals.object.getters.js">literals.object.getters.js</a>: failed: getter with side effects failed
<a href="../../conformance/es5/literals.object.setters.js">literals.object.setters.js</a>: TypeError: TypeError: Cannot set properties of undefined (setting '_value')
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: failed
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 37%, ES2016+ 41%, Next 5%, Intl 79%</summary><ul>
<li>ES6: 37%</li>
<li>ES2016: 57%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: failed
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: failed
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.typed-array.js">Array.prototype.includes.typed-array.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: failed: internal error: jump target byte offset 24 is not at an instruction boundary
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: failed: exception: undefined
</pre></li>
<li>ES2017: 38%</li>
<li>ES2018: 23%</li>
<li>ES2019: 54%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat.js">Array.prototype.flat.js</a>: failed
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: at 1:23 — expected binding pattern
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: unexpected character '\\' at line 1, column 27
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: at 1:22 — expected RightBrace, got LeftBracket
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: at 1:29 — expected RightParen, got Identifier
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: failed: internal error: internal error: release_temporary: expected r8, got r7
</pre></li>
<li>ES2020: 47%</li>
<li>ES2021: 60%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: TypeError: FinalizationRegistry requires a callable cleanup callback
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed: internal error: internal error: release_temporary: expected r8, got r7
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: failed: internal error: internal error: release_temporary: expected r8, got r7
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: failed
</pre></li>
<li>ES2022: 52%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.js">class-fields.private-instance.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot read properties of undefined (reading '#x')
<a href="../../conformance/compat-table/es2022/class-fields.private-static.js">class-fields.private-static.js</a>: TypeError: Cannot read properties of undefined (reading '#x')
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: TypeError: Cannot set properties of undefined (setting '#x')
<a href="../../conformance/compat-table/es2022/class-methods.private-static.js">class-methods.private-static.js</a>: TypeError: Cannot read properties of undefined (reading '#x')
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: failed
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: RegExp.prototype.flags requires that 'this' be an Object
</pre></li>
<li>ES2023: 70%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: RangeError: Invalid array/buffer length
</pre></li>
<li>ES2024: 8%</li>
<li>ES2025: 21%</li>
<li>Next: 5%</li>
<li>Intl: 79%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
</pre></li>
</ul></details>
