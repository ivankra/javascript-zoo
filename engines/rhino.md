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
<li>ES3: 100%</li>
<li>ES5: 85%<pre>
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: strict.this-primitive-not-coerced-in-accessors.js", line 19: uncaught JavaScript runtime TypeError: Cannot set property "test" of  to "42
<a href="../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: failed: string 'this' was coerced to object
<a href="../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: failed: outer 'this' is not undefined
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 72%, ES2016+ 54%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 72%<pre>
<a href="../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: "Function.name.class-expression.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: "Function.name.class-object-method.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: "Function.name.class-prototype.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: "Function.name.class-statement.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-static.js">Function.name.class-static.js</a>: "Function.name.class-static.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: "Function.name.class-variable.js", line 1: Compilation produced 3 syntax errors.
<a href="../conformance/kangax-es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: java.lang.IllegalStateException: FAILED ASSERTION Exception in thread "main" java.lang.IllegalStateException: FAILED ASSERTION
<a href="../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.invariants.js">Proxy.handler.getOwnPropertyDescriptor.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.get.invariants.js">Proxy.handler.get.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.setPrototypeOf.invariants.js">Proxy.handler.setPrototypeOf.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Array-subclassing.js">Reflect.construct.Array-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: TypeError: The constructor for Promise may not be invoked as a function
...
</pre></li>
<li>ES2016: 73%<pre>
<a href="../conformance/kangax-es2016/misc.nested-rest-destructuring-decl.js">misc.nested-rest-destructuring-decl.js</a>: "misc.nested-rest-destructuring-decl.js", line 10: Invalid assignment left-hand side. "misc.nested-rest-destructuring-decl.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es2016/misc.nested-rest-destructuring-params.js">misc.nested-rest-destructuring-params.js</a>: "misc.nested-rest-destructuring-params.js", line 9: Invalid assignment left-hand side. "misc.nested-rest-destructuring-params.js", line 12: syntax error "misc.nested-rest-destructuring-params.js", line 20: syntax error "misc.nested-rest-destructuring-params.js", line 21: syntax error   console.log("
<a href="../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 42%<br>
<li>ES2018: 60%<pre>
<a href="../conformance/kangax-es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: "async-iterators.for-await-of.js", line 62: syntax error "async-iterators.for-await-of.js", line 63: syntax error "async-iterators.for-await-of.js", line 68: syntax error "async-iterators.for-await-of.js", line 69: syntax error   console.log("kangax-es2018/async-iterators.for-await-of.js: " + e); "a
<a href="../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: "async-iterators.generators.js", line 52: syntax error "async-iterators.generators.js", line 57: syntax error "async-iterators.generators.js", line 58: syntax error   console.log("kangax-es2018/async-iterators.generators.js: " + e); "async-iterators.generators.js", line 59: syntax error "async-itera
<a href="../conformance/kangax-es2018/object-rest.js">object-rest.js</a>: java.lang.IllegalStateException: FAILED ASSERTION Exception in thread "main" java.lang.IllegalStateException: FAILED ASSERTION
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: uncaught JavaScript runtime SyntaxError: invalid Unicode escape sequence
</pre></li>
<li>ES2019: 89%<pre>
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: missing ) after formal parameters
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: "misc.optional-catch-binding.await.js", line 48: syntax error "misc.optional-catch-binding.await.js", line 49: syntax error "misc.optional-catch-binding.await.js", line 51: syntax error "misc.optional-catch-binding.await.js", line 52: syntax error "misc.optional-catch-binding.await.js", line 57: syn
</pre></li>
<li>ES2020: 80%<pre>
<a href="../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: Cannot find function setBigInt64.
<a href="../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: Cannot find function setBigUint64.
<a href="../conformance/kangax-es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
<a href="../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: "optional-chaining.spread-params.js", line 14: syntax error "optional-chaining.spread-params.js", line 1: Compilation produced 1 syntax errors.
</pre></li>
<li>ES2021: 38%<br>
<li>ES2022: 24%<br>
<li>ES2023: 100%</li>
<li>ES2024: 71%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.constructor.js">regex.flags.v.constructor.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../conformance/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: "regex.flags.v.properties-of-strings.js", line 9: invalid flag 'v' after regular expression "regex.flags.v.properties-of-strings.js", line 10: invalid flag 'v' after regular expression "regex.flags.v.properties-of-strings.js", line 1: Compilation produced 2 syntax errors.
<a href="../conformance/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: "regex.flags.v.set-notations.js", line 9: invalid flag 'v' after regular expression "regex.flags.v.set-notations.js", line 10: invalid flag 'v' after regular expression "regex.flags.v.set-notations.js", line 1: Compilation produced 3 syntax errors.
<a href="../conformance/kangax-es2024/regex.flags.v.shows-in-flags.js">regex.flags.v.shows-in-flags.js</a>: TypeError: Cannot call method "call" of undefined
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: "regex.flags.v.unicode-15.1.js", line 9: invalid flag 'v' after regular expression "regex.flags.v.unicode-15.1.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: "regex.flags.v.unicode-16.0.js", line 9: invalid flag 'v' after regular expression "regex.flags.v.unicode-16.0.js", line 1: Compilation produced 1 syntax errors.
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: "regex.flags.v.unicode-17.0.js", line 9: invalid flag 'v' after regular expression "regex.flags.v.unicode-17.0.js", line 1: Compilation produced 1 syntax errors.
</pre></li>
<li>ES2025: 32%<br>
<li>Next: 6%<br>
<li>Intl: 25%<br>
</ul></details>
