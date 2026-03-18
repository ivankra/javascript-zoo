# Stator

JavaScript engine written in Rust.

* Repository: [telecos/stator](https://github.com/telecos/stator)
* LOC:        [115276](# "cloc crates")
* Language:   Rust
* License:    MIT
* Standard:   ES2023 (partial)
* Years:      2026-

## Conformance

<details><summary>ES1-ES5: 80%</summary><ul>
<li>ES1: 89%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../../conformance/es1/Number.js">Number.js</a>: new Number(value) failed; new Number() failed
<a href="../../conformance/es1/Object.js">Object.js</a>: Object(number) failed; new Object(string) failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/es1/String.js">String.js</a>: 15.5.1.2 String() failed; 15.5.2.1 new String(value) failed; 15.5.2.2 new String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es1/arguments.js">arguments.js</a>: arguments[i] not available; arguments.length not available
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: x=225
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: new Boolean(false) failed - expected it to be truthy
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed; -2^31-1 failed
<a href="../../conformance/es1/conversions.ToObject.js">conversions.ToObject.js</a>: true failed; false failed; 123 failed; 'hello' failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^32 failed; 2^31 failed
<a href="../../conformance/es1/new.typeof.js">new.typeof.js</a>: typeof new String('x') != 'object'
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: failed
</pre></li>
<li>ES3: 78%<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: apply with arguments object failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; zero failed; Infinity failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e0'); (1.255).toExponential(2) != '1.25e+0', got '...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision(5) fixed notation failed; Infinity failed; small number exponential notation failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: Object.prototype failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: failed
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: non-global match failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: regex with capture failed
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: failed
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4; 'test'.split(/(?:)/, -1).length !== 4; ''.split(/.?/).length !== 0; '.'.split(/()()/).length !== 1
...
</pre></li>
<li>ES5: 61%<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.indexOf.js">Array.prototype.indexOf.js</a>: fromIndex failed; negative fromIndex failed; fromIndex &gt;= length failed
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: arr.sort(undefined) failed
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: TypeError: Cannot read properties of undefined (reading 'value')
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: stringify array failed; undefined/function values in array not converted to null; NaN and Infinity not converted null
<a href="../../conformance/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: Array.prototype failed; Object.prototype failed
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: undefined is not undefined after assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: failed
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 46%, ES2016+ 54%, Next 6%, Intl 79%</summary><ul>
<li>ES6: 46%</li>
<li>ES2016: 59%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: failed
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: failed
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.typed-array.js">Array.prototype.includes.typed-array.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: TypeError: CallProperty: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: internal error: jump target byte offset 24 is not at an instruction boundary
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: exception: undefined
</pre></li>
<li>ES2017: 54%<pre>
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: failed
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: TypeError: Cannot read properties of undefined (reading '')
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: TypeError: Cannot use 'in' operator to search for 'byteLength' in undefined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: TypeError: Cannot read properties of undefined (reading 'slice')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'get')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'get')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'set')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'set')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: failed
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: failed
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: CallAnyReceiver: callee is not a function (got Undefined)
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: failed
...
</pre></li>
<li>ES2018: 51%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: TypeError: Cannot read properties of undefined (reading 'catch')
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: failed
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: TypeError: Cannot read properties of undefined (reading 'then')
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: failed
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: failed
<a href="../../conformance/compat-table/es2018/misc.Proxy-ownKeys-duplicate-keys.js">misc.Proxy-ownKeys-duplicate-keys.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Todhri}/: Invalid property name
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/: Invalid property name
</pre></li>
<li>ES2019: 60%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat.js">Array.prototype.flat.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: unterminated string literal
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: unterminated string literal
</pre></li>
<li>ES2020: 71%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: failed
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: failed
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: failed
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: failed
</pre></li>
<li>ES2021: 52%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: failed
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: failed
</pre></li>
<li>ES2022: 58%<pre>
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
<a href="../../conformance/compat-table/es2022/class-fields.private-static.js">class-fields.private-static.js</a>: TypeError: Cannot read properties of undefined (reading '#x')
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: TypeError: Cannot set properties of undefined (setting '#x')
<a href="../../conformance/compat-table/es2022/class-methods.private-static.js">class-methods.private-static.js</a>: TypeError: Cannot read properties of undefined (reading '#x')
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: ReferenceError: ok is not defined
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: RegExp.prototype.flags requires that 'this' be an Object
</pre></li>
<li>ES2023: 83%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: RangeError: Invalid array/buffer length
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: RangeError: Invalid array/buffer length
</pre></li>
<li>ES2024: 4%</li>
<li>ES2025: 42%</li>
<li>Next: 6%</li>
<li>Intl: 79%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
</pre></li>
</ul></details>
