# Rhino

JavaScript engine from Mozilla for the Java platform, bundled with JDK 6-7.

* Homepage:         https://rhino.github.io/
* Repository:       https://github.com/mozilla/rhino.git <span class="shields"><img src="https://img.shields.io/github/stars/mozilla/rhino?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla/rhino?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              83848 (`cloc --not_match_d="(?i)(test)" rhino`)
* Language:         Java
* License:          MPL-2.0
* Org:              Mozilla
* Standard:         ES2023 (partial)
* Years:            1997-
* Runtime platform: Java
* Interpreter:      tree walker
* JIT:              via JVM (can compile to JVM bytecode)

## Runtimes

* [RingoJS](https://github.com/ringo/ringojs) <span class="shields"><img src="https://img.shields.io/github/stars/ringo/ringojs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ringo/ringojs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Links

* https://github.com/mozilla/rhino/milestones

## Conformance

<details><summary>ES1-ES5: 97%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/rhino.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4; '.'.split(/()()/).length !== 1
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for instanceof non-callable
</pre></li>
<li>ES5: 85%<pre>
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
<a href="../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: failed: string 'this' was coerced to object
<a href="../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: failed: outer 'this' is not undefined
<a href="../conformance/es5/strict.unmapped-arguments.js">strict.unmapped-arguments.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 65%, ES2016+ 43%, Intl 25%</summary><ul>
<li>ES6: 65%<pre>
<a href="../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.accessor.js">Function.name.accessor.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: "kangax-es6/Function.name.class-expression.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: "kangax-es6/Function.name.class-object-method.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: "kangax-es6/Function.name.class-prototype.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: "kangax-es6/Function.name.class-statement.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-static.js">Function.name.class-static.js</a>: "kangax-es6/Function.name.class-static.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: "kangax-es6/Function.name.class-variable.js", line 1: Compilation produced 3 syntax errors.
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.variable.js">Function.name.variable.js</a>: failed
<a href="../conformance/kangax-es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.invariants.js">Proxy.handler.getOwnPropertyDescriptor.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.get.invariants.js">Proxy.handler.get.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.setPrototypeOf.invariants.js">Proxy.handler.setPrototypeOf.invariants.js</a>: failed
...
</pre></li>
<li>ES2016: 64%<pre>
<a href="../conformance/kangax-es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: failed
<a href="../conformance/kangax-es2016/misc.nested-rest-destructuring-decl.js">misc.nested-rest-destructuring-decl.js</a>: "kangax-es2016/misc.nested-rest-destructuring-decl.js", line 10: syntax error "kangax-es2016/misc.nested-rest-destructuring-decl.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es2016/misc.nested-rest-destructuring-params.js">misc.nested-rest-destructuring-params.js</a>: "kangax-es2016/misc.nested-rest-destructuring-params.js", line 9: syntax error "kangax-es2016/misc.nested-rest-destructuring-params.js", line 12: syntax error "kangax-es2016/misc.nested-rest-destructuring-params.js", line 20: syntax error "kangax-es2016/misc.nested-rest-destructuring-params.js", lin
<a href="../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 38%<br>
<li>ES2018: 37%<br>
<li>ES2019: 89%<pre>
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: missing ) after formal parameters
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: "kangax-es2019/misc.optional-catch-binding.await.js", line 48: syntax error "kangax-es2019/misc.optional-catch-binding.await.js", line 49: syntax error "kangax-es2019/misc.optional-catch-binding.await.js", line 51: syntax error "kangax-es2019/misc.optional-catch-binding.await.js", line 52: syntax er
</pre></li>
<li>ES2020: 73%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: "BigInt64Array" is not defined.
<a href="../conformance/kangax-es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: "BigUint64Array" is not defined.
<a href="../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: Cannot find function setBigInt64 in object [object DataView].
<a href="../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: Cannot find function setBigUint64 in object [object DataView].
<a href="../conformance/kangax-es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
<a href="../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: "kangax-es2020/optional-chaining.spread-params.js", line 14: syntax error "kangax-es2020/optional-chaining.spread-params.js", line 1: Compilation produced 1 syntax errors.
</pre></li>
<li>ES2021: 38%<br>
<li>ES2022: 24%<br>
<li>ES2023: 100%</li>
<li>ES2024: 29%<br>
<li>ES2025: 0%<br>
<li>Intl: 25%<br>
</ul></details>
