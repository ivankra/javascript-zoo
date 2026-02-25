# bramblex/jsjs

Toy metacircular JavaScript interpreter.

* Repository:       [bramblex/jsjs](https://github.com/bramblex/jsjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/bramblex/jsjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bramblex/jsjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [662](# "cloc src")
* Language:         TypeScript
* License:          Missing
* Years:            2018
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 87%</summary><ul>
<li>ES1: 92%<pre>
<a href="../../conformance/es1/Function.js">Function.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.eval.js">asi.eval.js</a>: [Error] [object Object], 'eval' 未定义
<a href="../../conformance/es1/asi.js">asi.js</a>: [Error] res 重复定义
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/conversions.ToBoolean.js">conversions.ToBoolean.js</a>: [Error] x 重复定义
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: [Error] isNaN 重复定义
<a href="../../conformance/es1/eval.js">eval.js</a>: [Error] [object Object], 'eval' 未定义
<a href="../../conformance/es1/for-in.js">for-in.js</a>: failed
<a href="../../conformance/es1/for.js">for.js</a>: [Error] [object Object], 's' 未定义
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: failed
<a href="../../conformance/es1/var.js">var.js</a>: [Error] n 重复定义
<a href="../../conformance/es1/with.js">with.js</a>: failed
</pre></li>
<li>ES3: 95%<pre>
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: wrong exception for undeclared variable; wrong exception for undeclared function; wrong exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: wrong exception type; wrong exception for unclosed string; wrong exception for invalid token
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: wrong exception for Function.prototype.toString on non-function; wrong exception for Function.prototype.apply on non-function
<a href="../../conformance/es3/labelled.break.js">labelled.break.js</a>: labelled break in while failed; labelled break to outer loop failed; labelled break from block failed
<a href="../../conformance/es3/labelled.continue.js">labelled.continue.js</a>: labelled continue in while failed; labelled continue to outer loop failed
<a href="../../conformance/es3/labelled.statements.js">labelled.statements.js</a>: basic label failed; labelled block failed; nested labelled blocks failed
<a href="../../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: [Error] [object Object], 'eval' 未定义
</pre></li>
<li>ES5: 61%<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Array.prototype.some.js">Array.prototype.some.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: [Error] [object Object], 'Function' 未定义
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: failed
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: failed
<a href="../../conformance/es5/strict.js">strict.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 15%, ES2016+ 20%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 15%</li>
<li>ES2016: 9%</li>
<li>ES2017: 26%</li>
<li>ES2018: 11%</li>
<li>ES2019: 35%</li>
<li>ES2020: 7%</li>
<li>ES2021: 7%</li>
<li>ES2022: 26%</li>
<li>ES2023: 63%<pre>
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: [Error] [object Object], 'Uint8Array' 未定义
<a href="../../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#' (1:0)
</pre></li>
<li>ES2024: 18%</li>
<li>ES2025: 16%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
