# Porffor

Optimizing AOT compiler for JavaScript/TypeScript targeting WebAssembly and native binaries.

* Homepage:         [porffor.dev](https://porffor.dev/)
* Repository:       [CanadaHonk/porffor](https://github.com/CanadaHonk/porffor.git) <span class="shields"><img src="https://img.shields.io/github/stars/CanadaHonk/porffor?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/CanadaHonk/porffor?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [27848](# "cloc compiler")
* Language:         JavaScript
* License:          MIT
* Years:            2023-
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: Wasm

## Conformance

<details><summary>ES1-ES5: 77%</summary><ul>
<li>Tested version: <a href="https://github.com/CanadaHonk/porffor/commit/84fdcda4741ed2ee1383ae65e15743869cd6c017">2026-03-06</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/porffor.json">json</a>)</li>
<li>ES1: 89.9% (178/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array() + array index length update failed; sparse array length failed
<a href="../../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: FAIL: array index length update failed
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: FAIL: length auto-update failed; length &gt; max index failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: FAIL: reverse single element failed
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: FAIL
<a href="../../conformance/es1/String.prototype.split.js">String.prototype.split.js</a>: FAIL: split('') failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: FAIL: -12345 &gt;&gt;&gt; 0 != 4294954951 (got: -12345)
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: FAIL: +Infinity failed; -Infinity failed
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: FAIL: '' failed; '0xff' failed; '-10' failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: FAIL: +Infinity failed; -Infinity failed; 2^32-1 failed; 2^31 failed; -1 failed; -2^31 failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: FAIL: 123 != '0123'; 0 != ''; 123.0 != '0123'; 0 == null; 0 == undefined; false != ''; 123 &gt; '123'; 123 - '123' != 0; '5' - 1 != 4; 123 - '' != 123; '5' - true != 4; '5' * '6' != 30; 123 * '' != 0; true * '...
<a href="../../conformance/es1/eval.js">eval.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
<a href="../../conformance/es1/with.js">with.js</a>: FAIL: property lookup failed; second property lookup failed; assignment failed
</pre></li>
<li>ES3: 62.2% (92/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: FAIL: concat two arrays failed; concat non-array items failed; concat with no arguments failed; concat mixed array and non-array failed
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: FAIL: pop from object failed; pop single element from object failed
<a href="../../conformance/es3/Array.prototype.pop.js">Array.prototype.pop.js</a>: FAIL: pop from array failed; pop single element failed; remaining elements after pop failed
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: FAIL: push to object failed; push multiple to empty object failed
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: FAIL: push single element failed; push with no arguments failed; push to non-empty array failed
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: shift from object failed; shift single element from object failed
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: FAIL: shift from array failed; shift single element failed; multiple shifts failed; shift sparse array failed
<a href="../../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: FAIL: slice with start and end failed; slice with start only failed; slice with negative start failed; slice with negative end failed; slice entire array failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: delete on object failed; insert on object failed; negative start on object failed
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL: delete elements failed; delete and insert failed; insert without delete failed; negative start failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: basic toLocaleString failed; multiple elements content failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: FAIL: unshift single element failed; unshift multiple elements failed; unshift with no arguments failed; element order after unshift failed
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: TypeError: Accessor called without object
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+1'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: RuntimeError: memory access out of bounds
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: FAIL: prototype chain failed; Object.prototype failed
...
</pre></li>
<li>ES5: 71.6% (53/74)<pre>
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: thisArg binding failed; argument binding failed; length property incorrect; bound constructor failed
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: cyclic structure does not throw TypeError; didn't call user-provided toJSON() method
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer function failed; replacer array failed
<a href="../../conformance/es5/String.indexing.js">String.indexing.js</a>: FAIL: 'test'[10] !== undefined
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: ReferenceError: passed is not defined
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 46%, ES2016+ 56%, Next 2%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/CanadaHonk/porffor/commit/84fdcda4741ed2ee1383ae65e15743869cd6c017">2026-03-06</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/porffor.json">json</a>)</li>
<li>ES5: 81%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-unmapped.js">strict.arguments-unmapped.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: ReferenceError: passed is not defined
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 45.6%</li>
<li>ES2016: 68.2%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: ReferenceError: Proxy is not defined
<a href="../../conformance/compat-table/es2016/misc.Proxy-enumerate-removed.js">misc.Proxy-enumerate-removed.js</a>: ReferenceError: Proxy is not defined
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2017: 67.2%<pre>
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: ReferenceError: Proxy is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: defineGetter.. is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: defineSetter.. is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: lookupGetter.. is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: lookupSetter.. is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: undefined is not a function
...
</pre></li>
<li>ES2018: 26.3%</li>
<li>ES2019: 66.4%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property of undefined
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Unexpected token (1:60)
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Dynamic code evaluation is not supported
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL: exception: undefined
</pre></li>
<li>ES2020: 63.6%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: FAIL: RuntimeError: memory access out of bounds
<a href="../../conformance/compat-table/es2020/optional-chaining.method-call.js">optional-chaining.method-call.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2021: 57.1%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: FinalizationRegistry is not defined
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/String.prototype.replaceAll.js">String.prototype.replaceAll.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2022: 78.2%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: ReferenceError: a is not defined
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: ReferenceError: y is not defined
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: ReferenceError: y is not defined
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: ReferenceError: Proxy is not defined
</pre></li>
<li>ES2023: 88.6%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL
</pre></li>
<li>ES2024: 46.9%</li>
<li>ES2025: 21.1%</li>
<li>Next: 2%</li>
<li>Intl: 25%</li>
</ul></details>
