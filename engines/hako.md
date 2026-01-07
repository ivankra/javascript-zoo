# Hako

Embeddable WebAssembly-sandboxed [PrimJS](primjs.md) fork.

* Repository:       https://github.com/andrewmd5/hako.git <span class="shields"><img src="https://img.shields.io/github/stars/andrewmd5/hako?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/andrewmd5/hako?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              18306 (`cloc --not_match_d="(?i)(examples)" .`)
* Language:         Go, C++, TypeScript
* License:          Apache-2.0
* Standard:         ES2019
* Years:            2025-
* Ancestor:         [PrimJS](primjs.md)
* Runtime platform: WebAssembly
* Interpreter:      stack-based VM
* JIT:              via WebAssembly engine

## Quirks

* Buggy nullish coalescing operator (ES2020): `null ?? 42` => `null`

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/hako.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/debugger.js">debugger.js</a>: "message": "unsupported keyword: debugger", "name": "SyntaxError",
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 95%, ES2016+ 69%, Next 5%, Intl 25%</summary><ul>
<li>ES6: 95%<pre>
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: "message": "invalid opcode (op=0, pc=21)", name": "InternalError
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: name": "InternalError
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../conformance/kangax-es6/class.anonymous.js">class.anonymous.js</a>: name": "InternalError
<a href="../conformance/kangax-es6/class.extends-expressions.js">class.extends-expressions.js</a>: name": "InternalError
<a href="../conformance/kangax-es6/destructuring-assign.array.js">destructuring-assign.array.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.astral-string.js">destructuring-assign.astral-string.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.chained-iterable.js">destructuring-assign.chained-iterable.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.chained-object.js">destructuring-assign.chained-object.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.computed-properties.js">destructuring-assign.computed-properties.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.defaults.js">destructuring-assign.defaults.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.empty-patterns.js">destructuring-assign.empty-patterns.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.generator.js">destructuring-assign.generator.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.iterable-expression.js">destructuring-assign.iterable-expression.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.iterable-instance.js">destructuring-assign.iterable-instance.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.iterable.js">destructuring-assign.iterable.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.iterator-closing.js">destructuring-assign.iterator-closing.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.nested-rest.js">destructuring-assign.nested-rest.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.nested.js">destructuring-assign.nested.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
<a href="../conformance/kangax-es6/destructuring-assign.object-expression.js">destructuring-assign.object-expression.js</a>: "message": "invalid assignment left-hand side", "name": "SyntaxError",
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 85%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 94%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: "name": "SyntaxError",
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 46%</li>
<li>ES2021: 79%<pre>
<a href="../conformance/kangax-es2021/String.prototype.replaceAll.js">String.prototype.replaceAll.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2021/logical-assignment.and.js">logical-assignment.and.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.nullish.js">logical-assignment.nullish.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.or.js">logical-assignment.or.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: "name": "SyntaxError",
</pre></li>
<li>ES2022: 62%<pre>
<a href="../conformance/kangax-es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../conformance/kangax-es2022/Object.hasOwn.js">Object.hasOwn.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2022/at-method.Array.js">at-method.Array.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2022/at-method.String.js">at-method.String.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: TypeError: not an object
<a href="../conformance/kangax-es2022/class-methods.private-instance.js">class-methods.private-instance.js</a>: TypeError: not an object
<a href="../conformance/kangax-es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: "name": "SyntaxError",
<a href="../conformance/kangax-es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: invalid regular expression flags
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: failed
</pre></li>
<li>ES2023: 60%<pre>
<a href="../conformance/kangax-es2023/Array.prototype.toReversed.js">Array.prototype.toReversed.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/Array.prototype.toSpliced.js">Array.prototype.toSpliced.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/Array.prototype.with.js">Array.prototype.with.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: not a function
</pre></li>
<li>ES2024: 43%</li>
<li>ES2025: 11%</li>
<li>Next: 5%</li>
<li>Intl: 25%</li>
</ul></details>
