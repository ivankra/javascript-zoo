# Kiesel

JavaScript engine written in Zig.

* Homepage:    [kiesel.dev](https://kiesel.dev/)
* Repository:  [codeberg.org/kiesel-js/kiesel](https://codeberg.org/kiesel-js/kiesel.git) <span class="shields"><img src="https://img.shields.io/gitea/stars/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Stars" title="Stars"><img src="https://img.shields.io/gitea/last-commit/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Last commit" title="Last commit"></span>
* LOC:         [70969](# "cloc src")
* Language:    Zig
* License:     MIT
* Standard:    ESnext
* Years:       2023-
* Interpreter: register-based VM

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
</pre></li>
<li>ES5: 97%<pre>
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 92%, ES2016+ 94%, Next 5%, Intl 100%</summary><ul>
<li>ES6: 92%<pre>
<a href="../../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: 'g' is not defined
<a href="../../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: 'foo' is not defined
<a href="../../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token 'function' (annex-b.html-comments.js:1:1)
<a href="../../conformance/kangax-es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../../conformance/kangax-es6/const.for-loop.js">const.for-loop.js</a>: failed
<a href="../../conformance/kangax-es6/const.strict.for-loop.js">const.strict.for-loop.js</a>: failed
<a href="../../conformance/kangax-es6/destructuring-assign.nested-rest.js">destructuring-assign.nested-rest.js</a>: SyntaxError: Invalid left-hand side in assignment expression (destructuring-assign.nested-rest.js:11:27)
<a href="../../conformance/kangax-es6/destructuring-params.duplicate-identifier.js">destructuring-params.duplicate-identifier.js</a>: failed
<a href="../../conformance/kangax-es6/for-of.iterator-closing-throw.js">for-of.iterator-closing-throw.js</a>: failed
<a href="../../conformance/kangax-es6/generators.shorthand.no-constructor.js">generators.shorthand.no-constructor.js</a>: failed
<a href="../../conformance/kangax-es6/generators.throw.js">generators.throw.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.array.js">generators.yield-star.array.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.astral-string.js">generators.yield-star.astral-string.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.generator.js">generators.yield-star.generator.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.iterable-instance.js">generators.yield-star.iterable-instance.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.iterable.js">generators.yield-star.iterable.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.iterator-closing-throw.js">generators.yield-star.iterator-closing-throw.js</a>: undefined
<a href="../../conformance/kangax-es6/generators.yield-star.iterator-closing.js">generators.yield-star.iterator-closing.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.non-iterable-error.js">generators.yield-star.non-iterable-error.js</a>: failed
<a href="../../conformance/kangax-es6/generators.yield-star.sparse-array.js">generators.yield-star.sparse-array.js</a>: failed
...
</pre></li>
<li>ES2016: 85%<pre>
<a href="../../conformance/kangax-es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: undefined
</pre></li>
<li>ES2017: 92%<pre>
<a href="../../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token 'function' (annex-b.for-in-assignment-non-strict.js:1:1)
<a href="../../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
<a href="../../conformance/kangax-es2017/async.await.js">async.await.js</a>: failed
</pre></li>
<li>ES2018: 95%<pre>
<a href="../../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Unexpected token 'function' (misc.template-literal-revision.js:1:1)
</pre></li>
<li>ES2019: 74%, <b>5 crashes</b><pre>
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: crashed (signal 6); thread 761042 panic: Invalid UTF-8
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: crashed (signal 6); thread 761471 panic: Invalid UTF-8
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: crashed (signal 6); thread 761753 panic: Invalid UTF-8
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: crashed (signal 6); thread 762029 panic: Invalid UTF-8
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: crashed (signal 6); thread 762426 panic: Invalid UTF-8
<a href="../../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: undefined
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 5%</li>
<li>Intl: 100%</li>
</ul></details>

💥 **5 crashes during testing**
