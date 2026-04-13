# Yantra

JavaScript engine for .NET. Tree-walking interpreter + expression compiler to .NET IL.

* Repository:       [yantrajs/yantra](https://github.com/yantrajs/yantra.git) <span class="shields"><img src="https://img.shields.io/github/stars/yantrajs/yantra?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/yantrajs/yantra?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [54959](# "cloc --not_match_d='(?i)(test)' YantraJS*")
* Language:         C#
* License:          Apache-2.0
* Standard:         ES6
* Years:            2020-
* Runtime platform: .NET
* Interpreter:      tree walker
* JIT:              via CLR

## Conformance

<details><summary>ES1-ES5: 78%</summary><ul>
<li>ES1: 87.9% (174/198)<pre>
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: FAIL: Boolean(true) failed; Boolean(false) failed
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: typeof Date() != 'string'
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: FAIL: Function.length failed
<a href="../../conformance/es1/Math.LOG2E.js">Math.LOG2E.js</a>: FAIL
<a href="../../conformance/es1/String.js">String.js</a>: FAIL: 15.5.1.1 String(value) failed; 15.5.1.2 String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Method 427 not found in Sat Jan 01 2000 00:00:00 GMT+0000 (Coordinated Universal Time)
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Method 427 not found in Sat Jan 01 2000 00:00:00 GMT+0000 (Coordinated Universal Time)
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Method 427 not found in Thu Apr 09 2026 07:56:53 GMT+0000 (Coordinated Universal Time)
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: FAIL: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: Cannot access callee in strict mode
<a href="../../conformance/es1/assignment.unsigned-shift.js">assignment.unsigned-shift.js</a>: FAIL: &gt;&gt;&gt;= failed
<a href="../../conformance/es1/comments.js">comments.js</a>: SyntaxError: Unexpected token BracketEnd: ) at 29, 0
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: FAIL: new Boolean(false) failed - expected it to be truthy
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: FAIL: +Infinity failed
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: FAIL: -0 failed; 1e-7 failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: FAIL: +Infinity failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: FAIL: 0 == null
...
</pre></li>
<li>ES3: 77% (114/148)<pre>
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: unshift on empty object failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: FAIL: unshift on empty array failed
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: FAIL: empty array unshift failed
<a href="../../conformance/es3/Error.js">Error.js</a>: TypeError: Error cannot be invoked directly
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: rounding failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: FAIL: Array index should be enumerable failed; ToString conversion failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: Method toLocaleString not found in [object Object]
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: TypeError: RegExp cannot be invoked directly
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: FAIL: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: ''.split(/.?/).length !== 0
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL: positive start failed; negative start failed; negative start with length failed
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: FAIL: name failed
<a href="../../conformance/es3/global.RangeError.js">global.RangeError.js</a>: FAIL: name failed
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: FAIL: wrong exception for new Array with negative length; wrong exception for new Array with non-integer length; wrong exception for new Array with length &gt;= 2^32; wrong exception for negative array length;...
<a href="../../conformance/es3/global.ReferenceError.js">global.ReferenceError.js</a>: TypeError: Cannot get property prototype of undefined
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
...
</pre></li>
<li>ES5: 55.4% (41/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: invalid date does not throw RangeError
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: FAIL: array-like object not accepted
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: Cannot set property value of null; at Item in /src/YantraJS.Core/Core/Primitive/JSNull.cs:line 69; Ctor: Cannot set property value of null; at Ctor:/zoo...
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: invalid JSON does not throw SyntaxError; trailing comma does not throw SyntaxError
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: Stack overflow.; at YantraJS.Core.Core.Storage.VirtualMemory`1[[YantraJS.Core.SAUint32Map`1+Node[[System.ValueTuple`2[[YantraJS.Core.JSProperty, YantraJS.Core, Version=1.2.0.0, Culture=neutral, Public...
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: FAIL: null prototype failed; Properties argument failed
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot modify property 430 of [object Object]
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot modify property 430 of [object Object]
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: The method or operation is not implemented.; at ErrorFrom in /src/YantraJS.Core/Core/JSException.cs:line 182
<a href="../../conformance/es5/Object.isExtensible.js">Object.isExtensible.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: The method or operation is not implemented.; at ErrorFrom in /src/YantraJS.Core/Core/JSException.cs:line 182
<a href="../../conformance/es5/Object.isFrozen.js">Object.isFrozen.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: The method or operation is not implemented.; at ErrorFrom in /src/YantraJS.Core/Core/JSException.cs:line 182
<a href="../../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: The method or operation is not implemented.; at ErrorFrom in /src/YantraJS.Core/Core/JSException.cs:line 182
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property 430 to [object Object]
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot delete property 432 of [object Object]
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: Infinity is not a number; at ToJSNumber in /src/YantraJS.Core/Utils/ArgumentsExtension.cs:line 32; at native in /zoo/conformance/es5/./global.Infinity.i...
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: NaN is not a number; at ToJSNumber in /src/YantraJS.Core/Utils/ArgumentsExtension.cs:line 32; at native in /zoo/conformance/es5/./global.NaN.immutable.j...
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: FAIL: Unhandled exception. YantraJS.Core.JSException: Common Language Runtime detected an invalid program.; at ErrorFrom in /src/YantraJS.Core/Core/JSException.cs:line 182
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 49%, ES2016+ 29%, Next 6%, Intl 36%</summary><ul>
<li>ES5: 78.5%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL: Infinity is not a number
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL: NaN is not a number
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: System.InvalidProgramException: Common Language Runtime detected an invalid program.
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: TypeError: Cannot use 'in' operator to search for 'a' in undefined
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
</pre></li>
<li>ES6: 48.9%</li>
<li>ES2016: 30.3%</li>
<li>ES2017: 22.9%</li>
<li>ES2018: 15.8%</li>
<li>ES2019: 28.9%</li>
<li>ES2020: 38.6%</li>
<li>ES2021: 81%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: TypeError: Method 431 not found in function Promise() { [native code] }
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: TypeError: Method 431 not found in function Promise() { [native code] }
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: FAIL
<a href="../../conformance/compat-table/es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: FAIL
</pre></li>
<li>ES2022: 30.8%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 19.3%</li>
<li>Next: 6.1%</li>
<li>Intl: 35.7%</li>
</ul></details>
