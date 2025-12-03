# Kiesel

JavaScript engine written in Zig.

* Homepage:    https://kiesel.dev/
* Repository:  https://codeberg.org/kiesel-js/kiesel.git <span class="shields"><img src="https://img.shields.io/gitea/stars/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Stars" title="Stars"><img src="https://img.shields.io/gitea/last-commit/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Last commit" title="Last commit"></span>
* LOC:         59328 (`cloc src`)
* Language:    Zig
* License:     MIT
* Standard:    ESnext (partial)
* Years:       2023-
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 97%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/kiesel.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../conformance/es1/comments.js">comments.js</a>: fail SyntaxError: Unexpected token '*' (comments.js:10:5)
</pre></li>
<li>ES3: 97%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
<a href="../conformance/es3/labelled.break.js">labelled.break.js</a>: labelled break to outer loop failed
<a href="../conformance/es3/labelled.continue.js">labelled.continue.js</a>: labelled continue to outer loop failed
</pre></li>
<li>ES5: 91%<pre>
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 91%, ES2016+ 91%, Next 5%, Intl 82%</summary><ul>
<li>ES6: 91%<pre>
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.variable.js">Function.name.variable.js</a>: failed
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: 'g' is not defined
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: 'foo' is not defined
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token 'function' (annex-b.html-comments.js:1:1)
<a href="../conformance/kangax-es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.astral-string.js">destructuring-assign.astral-string.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.generator.js">destructuring-assign.generator.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.iterable-instance.js">destructuring-assign.iterable-instance.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.iterable.js">destructuring-assign.iterable.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.iterator-closing.js">destructuring-assign.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.nested-rest.js">destructuring-assign.nested-rest.js</a>: SyntaxError: Invalid left-hand side in assignment expression (destructuring-assign.nested-rest.js:11:27)
<a href="../conformance/kangax-es6/destructuring-decl.astral-string.js">destructuring-decl.astral-string.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-decl.generator.js">destructuring-decl.generator.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-decl.iterable-instance.js">destructuring-decl.iterable-instance.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-decl.iterable.js">destructuring-decl.iterable.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-decl.iterator-closing.js">destructuring-decl.iterator-closing.js</a>: failed
...
</pre></li>
<li>ES2016: 85%<pre>
<a href="../conformance/kangax-es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: undefined
</pre></li>
<li>ES2017: 90%<pre>
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token 'function' (annex-b.for-in-assignment-non-strict.js:1:1)
<a href="../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
<a href="../conformance/kangax-es2017/async.await.js">async.await.js</a>: failed
<a href="../conformance/kangax-es2017/async.must-await-value.js">async.must-await-value.js</a>: A promise was rejected without any handlers: Promise(state: &lt;rejected&gt;, result: ReferenceError: 'await' is not defined)
</pre></li>
<li>ES2018: 84%<pre>
<a href="../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Unexpected token 'function' (misc.template-literal-revision.js:1:1)
<a href="../conformance/kangax-es2018/object-rest.js">object-rest.js</a>: failed
</pre></li>
<li>ES2019: 83%<pre>
<a href="../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: undefined
</pre></li>
<li>ES2020: 89%<pre>
<a href="../conformance/kangax-es2020/optional-chaining.method-call.js">optional-chaining.method-call.js</a>: failed
<a href="../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: undefined is not an Object
</pre></li>
<li>ES2021: 100%</li>
<li>ES2022: 97%<pre>
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot convert undefined to Object
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 95%<pre>
<a href="../conformance/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Invalid RegExp pattern: duplicate group name (regex.duplicate-named-groups.js:9:10)
</pre></li>
<li>Next: 5%<br>
<li>Intl: 82%<pre>
<a href="../conformance/kangax-intl/Intl.NumberFormat.js">Intl.NumberFormat.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: TypeError: undefined is not a constructor
<a href="../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.valid-tags.js">Intl.NumberFormat.valid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: TypeError: undefined is not an Object
</pre></li>
</ul></details>
