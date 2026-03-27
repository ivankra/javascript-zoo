# ssrlive/javascript

JavaScript engine written in Rust.

* Repository:  [ssrlive/javascript](https://github.com/ssrlive/javascript.git) <span class="shields"><img src="https://img.shields.io/github/stars/ssrlive/javascript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ssrlive/javascript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [84773](# "cloc src")
* Language:    Rust
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2025-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 97%</summary><ul>
<li>ES1: 98%<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Delete of an unqualified identifier 'a' in strict mode
<a href="../../conformance/es1/with.js">with.js</a>: assignment failed
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
</pre></li>
<li>ES5: 89%, <b>1 crash</b><pre>
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: crashed: thread '&lt;unnamed&gt;' panicked at src/core/parser.rs:2389:16:
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 91%, ES2016+ 94%, Next 33%, Intl 25%</summary><ul>
<li>ES6: 91%, <b>3 crashes</b><pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: failed
<a href="../../conformance/compat-table/es6/Reflect.apply.js">Reflect.apply.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: foo is not defined
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.__proto__.Object.prototype.absent-from-null.js">annex-b.__proto__.Object.prototype.absent-from-null.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.__proto__.Object.prototype.getOwnPropertyNames.js">annex-b.__proto__.Object.prototype.getOwnPropertyNames.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.multiple-error.js">annex-b.__proto__.literals.multiple-error.js</a>: failed
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../../conformance/compat-table/es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: failed
<a href="../../conformance/compat-table/es6/class.new-target.js">class.new-target.js</a>: failed
<a href="../../conformance/compat-table/es6/const.no-statement.js">const.no-statement.js</a>: failed
<a href="../../conformance/compat-table/es6/const.strict.no-statement.js">const.strict.no-statement.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-assign.parenthesised-error.js">destructuring-assign.parenthesised-error.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es6/destructuring-decl.object-primitives.js">destructuring-decl.object-primitives.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-params.duplicate-identifier.js">destructuring-params.duplicate-identifier.js</a>: failed
<a href="../../conformance/compat-table/es6/function.block-level-decl.js">function.block-level-decl.js</a>: failed
<a href="../../conformance/compat-table/es6/generators.prototype-chain.js">generators.prototype-chain.js</a>: failed
<a href="../../conformance/compat-table/es6/generators.shorthand.no-constructor.js">generators.shorthand.no-constructor.js</a>: failed
...
</pre></li>
<li>ES2016: 85%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 87%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: foo is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: foo is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: foo is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: foo is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Property descriptor getter must be a function or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Property descriptor setter must be a function or undefined
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es2017/async.methods-class.js">async.methods-class.js</a>: failed
<a href="../../conformance/compat-table/es2017/async.methods-object.js">async.methods-object.js</a>: failed
<a href="../../conformance/compat-table/es2017/async.must-await-value.js">async.must-await-value.js</a>: failed
</pre></li>
<li>ES2018: 99%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid RegExp: Invalid property name
</pre></li>
<li>ES2019: 89%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 89%<pre>
<a href="../../conformance/compat-table/es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: OptionalCall target is not a function
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: OptionalCall target is not a function
</pre></li>
<li>ES2021: 100%</li>
<li>ES2022: 95%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: TypeError: accessed private field from an ordinary object
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: accessed private field from an ordinary object
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 33%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **5 crashes during testing**
