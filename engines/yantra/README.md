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
<li>ES1: 88%, <b>9 crashes</b><pre>
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: Boolean(true) failed; Boolean(false) failed
<a href="../../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed
<a href="../../conformance/es1/Math.LOG2E.js">Math.LOG2E.js</a>: failed
<a href="../../conformance/es1/String.js">String.js</a>: 15.5.1.1 String(value) failed; 15.5.1.2 String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/assignment.unsigned-shift.js">assignment.unsigned-shift.js</a>: &gt;&gt;&gt;= failed
<a href="../../conformance/es1/comments.js">comments.js</a>: crashed: SIGABRT
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: new Boolean(false) failed - expected it to be truthy
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: +Infinity failed
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: -0 failed; 1e-7 failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: +Infinity failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: 0 == null
<a href="../../conformance/es1/literals.string.hex.js">literals.string.hex.js</a>: failed
...
</pre></li>
<li>ES3: 77%, <b>5 crashes</b><pre>
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on empty object failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift on empty array failed
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed
<a href="../../conformance/es3/Error.js">Error.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: Array index should be enumerable failed; ToString conversion failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: ''.split(/.?/).length !== 0
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: positive start failed; negative start failed; negative start with length failed
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: name failed
<a href="../../conformance/es3/global.RangeError.js">global.RangeError.js</a>: name failed
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: wrong exception for new Array with negative length; wrong exception for new Array with non-integer length; wrong exception for new Array with length &gt;= 2^32; wrong exception for negative array length;...
<a href="../../conformance/es3/global.ReferenceError.js">global.ReferenceError.js</a>: crashed: SIGABRT
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../../conformance/es3/global.SyntaxError.js">global.SyntaxError.js</a>: name failed
...
</pre></li>
<li>ES5: 55%, <b>15 crashes</b><pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: array-like object not accepted
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: invalid JSON does not throw SyntaxError; trailing comma does not throw SyntaxError
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: null prototype failed; Properties argument failed
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.isExtensible.js">Object.isExtensible.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.isFrozen.js">Object.isFrozen.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: crashed: SIGABRT
<a href="../../conformance/es5/literals.object.setters.js">literals.object.setters.js</a>: crashed: SIGSEGV
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 49%, ES2016+ 29%, Next 6%, Intl 36%</summary><ul>
<li>ES6: 49%, <b>24 crashes</b></li>
<li>ES2016: 30%, <b>2 crashes</b></li>
<li>ES2017: 23%, <b>4 crashes</b></li>
<li>ES2018: 16%, <b>14 crashes</b></li>
<li>ES2019: 29%, <b>3 crashes</b></li>
<li>ES2020: 39%</li>
<li>ES2021: 81%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: TypeError: Method reject not found in function Promise() { [native code] }
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: TypeError: Method reject not found in function Promise() { [native code] }
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: failed
<a href="../../conformance/compat-table/es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: failed
</pre></li>
<li>ES2022: 31%, <b>11 crashes</b></li>
<li>ES2023: 0%, <b>1 crash</b></li>
<li>ES2024: 4%, <b>5 crashes</b></li>
<li>ES2025: 19%, <b>1 crash</b></li>
<li>Next: 6%, <b>12 crashes</b></li>
<li>Intl: 36%</li>
</ul></details>

💥 **106 crashes during testing**
