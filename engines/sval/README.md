# sval

Metacircular JavaScript interpreter.

* Repository:       https://github.com/Siubaak/sval.git <span class="shields"><img src="https://img.shields.io/github/stars/Siubaak/sval?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Siubaak/sval?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              2124 (`cloc src`)
* Language:         TypeScript
* License:          MIT
* Years:            2018-
* Parser:           [Acorn](../../parsers/acorn/README.md)
* Runtime platform: JavaScript

## Notes

Just a thin library on top of Acorn, doesn't implement much of ECMAScript
standard library - passes through most of it from the host environment.

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>ES1: 98%<pre>
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../conformance/es1/asi.js">asi.js</a>: TypeError: Cannot create property '0' on number '1'
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Delete of an unqualified identifier in strict mode
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/labelled.statements.js">labelled.statements.js</a>: SyntaxError: ExpressionStatement cannot be labeled
<a href="../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: TypeError: Cannot read properties of null (reading 'type')
</pre></li>
<li>ES5: 70%<pre>
<a href="../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../conformance/es5/Array.prototype.some.js">Array.prototype.some.js</a>: TypeError: Cannot read properties of null (reading 'type')
<a href="../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read only property 'a' of object '#&lt;Object&gt;'
<a href="../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read only property 'y' of object '#&lt;Object&gt;'
<a href="../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read only property 'x' of object '#&lt;Object&gt;'
<a href="../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property y, object is not extensible
<a href="../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 86%, ES2016+ 93%, Next 19%, Intl 100%</summary><ul>
<li>ES6: 86%<pre>
<a href="../conformance/kangax-es6/Function.name.accessor.js">Function.name.accessor.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-static.js">Function.name.class-static.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.deleteProperty.js">Proxy.handler.deleteProperty.js</a>: TypeError: 'deleteProperty' on proxy: trap returned falsish for property 'foo'
<a href="../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: TypeError: 'set' on proxy: trap returned falsish for property 'foo'
<a href="../conformance/kangax-es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: TypeError: 'set' on proxy: trap returned falsish for property 'foo'
<a href="../conformance/kangax-es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: TypeError: r.apply is not a function
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: FunctionDeclaration cannot be labeled
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js">annex-b.__proto__.literals.not-shorthand-method.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-shorthand-property.js">annex-b.__proto__.literals.not-shorthand-property.js</a>: failed
<a href="../conformance/kangax-es6/arrow.no-prototype.js">arrow.no-prototype.js</a>: failed
<a href="../conformance/kangax-es6/class.extends-null.js">class.extends-null.js</a>: failed
...
</pre></li>
<li>ES2016: 95%<pre>
<a href="../conformance/kangax-es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: TypeError: Cannot read properties of null (reading 'type')
</pre></li>
<li>ES2017: 88%<pre>
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: failed
<a href="../conformance/kangax-es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: failed
<a href="../conformance/kangax-es2017/async.constructor.js">async.constructor.js</a>: failed
<a href="../conformance/kangax-es2017/async.no-prototype.js">async.no-prototype.js</a>: failed
<a href="../conformance/kangax-es2017/async.prototype-chain.js">async.prototype-chain.js</a>: failed
</pre></li>
<li>ES2018: 83%<pre>
<a href="../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: if (typeof r != "function") throw new TypeError(`${s} is not a function`); TypeError: Cannot convert a Symbol value to a string
<a href="../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/: Invalid property value (10:10)
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 93%<pre>
<a href="../conformance/kangax-es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: failed
</pre></li>
<li>ES2021: 90%<pre>
<a href="../conformance/kangax-es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: failed
<a href="../conformance/kangax-es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: failed
</pre></li>
<li>ES2022: 90%<pre>
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: TypeError: Cannot read properties of null (reading 'privateh5xsr1wjdsi')
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot read properties of undefined (reading 'privatee9mdjothzdg')
<a href="../conformance/kangax-es2022/class-fields.static.define.js">class-fields.static.define.js</a>: TypeError: Cannot assign to read only property 'name' of function 'function() {
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 19%</li>
<li>Intl: 100%</li>
</ul></details>
