# syoyo/lightjs

Vibe-coded JavaScript engine written in C++.

* Repository:  [syoyo/lightjs](https://github.com/syoyo/lightjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/syoyo/lightjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/syoyo/lightjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [28756](# "cloc src")
* Language:    C++
* License:     MIT
* Standard:    ES2020
* Years:       2025-
* Interpreter: tree-walker

## Conformance

<details><summary>ES1-ES5: 56%</summary><ul>
<li>ES1: 60%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: length truncation failed
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: length assignment failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: array instance constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: failed
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: Boolean.prototype failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: failed
<a href="../../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
...
</pre></li>
<li>ES3: 55%<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: failed
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: failed
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: failed
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: failed
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: failed
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; NaN failed; zero failed; Infinity failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0',...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: NaN failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision() undefined arg failed; NaN failed; Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: failed
...
</pre></li>
<li>ES5: 49%, <b>1 crash</b></li>
</ul></details>

<details><summary>compat-table: ES6 43%, ES2016+ 37%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 43%, <b>1 crash</b></li>
<li>ES2016: 44%</li>
<li>ES2017: 36%</li>
<li>ES2018: 32%</li>
<li>ES2019: 44%</li>
<li>ES2020: 71%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: TypeError: Function is not a constructor
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: TypeError: Function is not a constructor
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: Function is not a constructor
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: Function is not a constructor
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2021: 20%</li>
<li>ES2022: 57%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError-prototype-lacks.js">Error.cause.AggregateError-prototype-lacks.js</a>: TypeError: Cannot read properties of undefined (reading 'prototype')
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: TypeError: Value is not a constructor
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: SyntaxError: class-fields.private-instance.optional-access.js
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: class-static-init-blocks.js
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: SyntaxError: ergonomic-brand-checks.js
<a href="../../conformance/compat-table/es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: TypeError: Function is not a constructor
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
</pre></li>
<li>ES2023: 63%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Cannot read properties of undefined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Cannot read properties of undefined
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: Cannot read properties of undefined
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Error in file 'hashbang.js': SyntaxError: Invalid private field at line 1, column 1
</pre></li>
<li>ES2024: 14%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

💥 **2 crashes during testing**
