# eval5

ES5 interpreter written in TypeScript.

* Repository:       [bplok20010/eval5](https://github.com/bplok20010/eval5.git) <span class="shields"><img src="https://img.shields.io/github/stars/bplok20010/eval5?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bplok20010/eval5?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [1745](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Standard:         ES5
* Years:            2019-2024
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript

## Notes

Just a thin library on top of Acorn, doesn't implement much of ECMAScript
standard library - passes through most of it from the host environment.

## Conformance

<details><summary>ES1-ES5: 94%</summary><ul>
<li>ES1: 98%<pre>
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: function instance constructor failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: Cannot create property '0' on number '1'
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: constructor failed; ReferenceError: EvalError is not defined [14:4] at new ThrowReferenceError (/home/ivan/src/zoo/dist/arm64/eval5-dist/eval5.js:5262:43) at main.Interpreter.Interpreter.createError (/home/ivan/src/zoo/dist/arm64/eval5-dist/eval5.js:5719:17) at main.Interpreter.Interpreter.createInt
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: wrong exception for calling number; no exception for Function.prototype.toString on non-function
</pre></li>
<li>ES5: 72%<pre>
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: Function.prototype.bind not a function
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: undefined is not undefined after assignment
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.js">strict.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
<a href="../../conformance/es5/this.thrown-function.js">this.thrown-function.js</a>: TypeError: Cannot use 'in' operator to search for 'a' in undefined
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 41%, ES2016+ 31%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 41%</li>
<li>ES2016: 32%</li>
<li>ES2017: 36%</li>
<li>ES2018: 21%</li>
<li>ES2019: 62%<pre>
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Unexpected token (3:18)
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: Unexpected token (1:4)
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: The keyword 'class' is reserved (1:13)
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: The keyword 'class' is reserved (1:1)
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: Unexpected token (1:15)
<a href="../../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: SyntaxError: The keyword 'const' is reserved (10:2)
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Unexpected token (1:29)
<a href="../../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Unterminated string constant (1:0)
<a href="../../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Unterminated string constant (1:0)
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: SyntaxError: Unexpected token (44:9)
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: SyntaxError: Unexpected token (12:8)
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: Unexpected token (9:11)
</pre></li>
<li>ES2020: 14%</li>
<li>ES2021: 7%</li>
<li>ES2022: 29%</li>
<li>ES2023: 63%<pre>
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: Uint8Array is not defined [10:16]
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: Uint8Array is not defined [10:16]
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: Uint8Array is not defined [10:16]
<a href="../../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#' (1:0)
</pre></li>
<li>ES2024: 22%</li>
<li>ES2025: 37%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
