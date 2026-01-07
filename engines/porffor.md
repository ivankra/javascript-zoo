# Porffor

Optimizing AOT compiler for JavaScript/TypeScript targetting WebAssembly and native binaries.

* Homepage:         https://porffor.dev/
* Repository:       https://github.com/CanadaHonk/porffor.git <span class="shields"><img src="https://img.shields.io/github/stars/CanadaHonk/porffor?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/CanadaHonk/porffor?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              27848 (`cloc compiler`)
* Language:         JavaScript, TypeScript
* License:          MIT
* Years:            2023-
* Parser:           [Acorn](../parsers/acorn.md)
* Runtime platform: WebAssembly, native
* JIT:              via WebAssembly engine

## Conformance

<details><summary>ES1-ES5: 76%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/porffor.txt">Full log</a>.</li>
<li>ES1: 88%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array() + array index length update failed; sparse array length failed
<a href="../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: array index length update failed
<a href="../conformance/es1/Array.length.js">Array.length.js</a>: length auto-update failed; length &gt; max index failed
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: reverse even length failed; reverse single element failed
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../conformance/es1/Math.cos.js">Math.cos.js</a>: failed
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: indexOf failed
<a href="../conformance/es1/String.prototype.split.js">String.prototype.split.js</a>: split('') failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/arguments.js">arguments.js</a>: arguments[i] not available; arguments.length not available
<a href="../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: -12345 &gt;&gt;&gt; 0 != 4294954951 (got: -12345)
<a href="../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: +Infinity failed; -Infinity failed
<a href="../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: '' failed; '0xff' failed; '-10' failed
<a href="../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^31 failed; -1 failed; -2^31 failed
<a href="../conformance/es1/conversions.js">conversions.js</a>: 123 != '0123'; 0 != ''; 123.0 != '0123'; 0 == null; 0 == undefined; false != ''; 123 &gt; '123'; 123 - '123' != 0; '5' - 1 != 4; 123 - '' != 123; '5' - true != 4; '5' * '6' != 30; 123 * '' != 0; true * '5' != 5; '6' / '5' != 1.2; '5' % '6' != 5
<a href="../conformance/es1/eval.js">eval.js</a>: SyntaxError: Dynamic code evaluation is not supported
...
</pre></li>
<li>ES3: 61%<pre>
<a href="../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: concat two arrays failed; concat non-array items failed; concat with no arguments failed; concat mixed array and non-array failed
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: pop from object failed; pop single element from object failed
<a href="../conformance/es3/Array.prototype.pop.js">Array.prototype.pop.js</a>: pop from array failed; pop single element failed; remaining elements after pop failed
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: push to object failed; push multiple to empty object failed
<a href="../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: push single element failed; push with no arguments failed; push to non-empty array failed
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: shift from object failed; shift single element from object failed
<a href="../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: shift from array failed; shift single element failed; multiple shifts failed; shift sparse array failed
<a href="../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: slice with start and end failed; slice with start only failed; slice with negative start failed; slice with negative end failed; slice entire array failed
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: delete on object failed; insert on object failed; negative start on object failed
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: delete elements failed; delete and insert failed; insert without delete failed; negative start failed
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: basic toLocaleString failed; multiple elements content failed
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift single element failed; unshift multiple elements failed; unshift with no arguments failed; element order after unshift failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: TypeError: Accessor called without object
<a href="../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: apply with arguments object failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed; rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RuntimeError: memory access out of bounds
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: prototype chain failed; Object.prototype failed
...
</pre></li>
<li>ES5: 70%<pre>
<a href="../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: thisArg binding failed; argument binding failed; length property incorrect; bound constructor failed
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: exponent failed
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: cyclic structure does not throw TypeError; didn't call user-provided toJSON() method
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer function failed; replacer array failed
<a href="../conformance/es5/String.indexing.js">String.indexing.js</a>: 'test'[10] !== undefined
<a href="../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: ReferenceError: passed is not defined
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 45%, ES2016+ 56%, Next 2%, Intl 25%</summary><ul>
<li>ES6: 45%</li>
<li>ES2016: 64%<pre>
<a href="../conformance/kangax-es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: failed
<a href="../conformance/kangax-es2016/Array.prototype.includes.js">Array.prototype.includes.js</a>: failed
<a href="../conformance/kangax-es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: ReferenceError: Proxy is not defined
<a href="../conformance/kangax-es2016/misc.Proxy-enumerate-removed.js">misc.Proxy-enumerate-removed.js</a>: ReferenceError: Proxy is not defined
<a href="../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2017: 67%<pre>
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: ReferenceError: Proxy is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: defineGetter.. is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: defineSetter.. is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: lookupGetter.. is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: lookupSetter.. is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: ReferenceError: Proxy is not defined
...
</pre></li>
<li>ES2018: 26%</li>
<li>ES2019: 66%<pre>
<a href="../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property of undefined
<a href="../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Unexpected token (1:60)
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../conformance/kangax-es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: undefined
</pre></li>
<li>ES2020: 64%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: failed
<a href="../conformance/kangax-es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: failed
<a href="../conformance/kangax-es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: failed
<a href="../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: RuntimeError: memory access out of bounds
<a href="../conformance/kangax-es2020/optional-chaining.method-call.js">optional-chaining.method-call.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2021: 57%<pre>
<a href="../conformance/kangax-es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: FinalizationRegistry is not defined
<a href="../conformance/kangax-es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2021/String.prototype.replaceAll.js">String.prototype.replaceAll.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2022: 78%<pre>
<a href="../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: ReferenceError: a is not defined
<a href="../conformance/kangax-es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: ReferenceError: y is not defined
<a href="../conformance/kangax-es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: ReferenceError: y is not defined
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: ReferenceError: Proxy is not defined
</pre></li>
<li>ES2023: 89%<pre>
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: failed
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: failed
</pre></li>
<li>ES2024: 47%</li>
<li>ES2025: 21%</li>
<li>Next: 2%</li>
<li>Intl: 25%</li>
</ul></details>
