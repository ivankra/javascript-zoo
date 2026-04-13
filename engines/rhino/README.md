# Rhino

JavaScript engine from Mozilla for the Java platform, bundled with JDK 6-7.

* Homepage:         [rhino.github.io](https://rhino.github.io/)
* Repository:       [mozilla/rhino](https://github.com/mozilla/rhino.git) <span class="shields"><img src="https://img.shields.io/github/stars/mozilla/rhino?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla/rhino?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [83848](# "cloc --not_match_d='(?i)(test)' rhino")
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

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 86.5% (64/74)<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: TypeError: Cannot set property "test" of  to "42"
<a href="../../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: FAIL: string 'this' was coerced to object
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 73%, ES2016+ 59%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 91.6%<pre>
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Cannot set property "test" of  to "42"
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-methods.js">strict.this-not-coerced-methods.js</a>: FAIL
</pre></li>
<li>ES6: 73.2%<pre>
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Function.name.class-static.js">Function.name.class-static.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.invariants.js">Proxy.handler.getOwnPropertyDescriptor.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.get.invariants.js">Proxy.handler.get.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.setPrototypeOf.invariants.js">Proxy.handler.setPrototypeOf.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Array-subclassing.js">Reflect.construct.Array-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: TypeError: The constructor for Promise may not be invoked as a function
<a href="../../conformance/compat-table/es6/Reflect.construct.RegExp-subclassing.js">Reflect.construct.RegExp-subclassing.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 46.5%</li>
<li>ES2018: 70.5%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: missing ) in parenthetical
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: SyntaxError: missing ; before statement
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: invalid Unicode escape sequence
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: invalid Unicode escape sequence
</pre></li>
<li>ES2019: 88.7%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: missing ) after formal parameters
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: identifier is a reserved word: class
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: SyntaxError: missing ) in parenthetical
</pre></li>
<li>ES2020: 87.1%<pre>
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: CRASH: Exception in thread "main" java.lang.RuntimeException: Unexpected node type 186
</pre></li>
<li>ES2021: 38.1%</li>
<li>ES2022: 23.8%</li>
<li>ES2023: 100%</li>
<li>ES2024: 71.4%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.constructor.js">regex.flags.v.constructor.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.shows-in-flags.js">regex.flags.v.shows-in-flags.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: invalid flag 'v' after regular expression
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: invalid flag 'v' after regular expression
</pre></li>
<li>ES2025: 31.6%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>
