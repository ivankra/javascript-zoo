# Reeva

JavaScript interpreter for JVM written in Kotlin.

* Repository:       https://github.com/ReevaJS/reeva.git <span class="shields"><img src="https://img.shields.io/github/stars/ReevaJS/reeva?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ReevaJS/reeva?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              25566 (`cloc --not_match_d="(?i)(test)" src`)
* Language:         Kotlin
* License:          BSD-2-Clause
* Years:            2020-2024
* Runtime platform: Java
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 77%</summary><ul>
<li>ES1: 82%<pre>
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: reverse order failed; reverse single element failed
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es1/Date.js">Date.js</a>: new Date(2000, 0, 1).getMonth() != 0
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.setDate.js">Date.prototype.setDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.setMinutes.js">Date.prototype.setMinutes.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es1/Date.prototype.setTime.js">Date.prototype.setTime.js</a>: Exception in FunctionInfo Date.prototype.setTime.js, block @0 opcode 10 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: Exception in FunctionInfo Date.prototype.setUTCDate.js, block @0 opcode 18 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: Exception in FunctionInfo Date.prototype.setUTCFullYear.js, block @0 opcode 18 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: Exception in FunctionInfo Date.prototype.setUTCHours.js, block @0 opcode 22 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: Exception in FunctionInfo Date.prototype.setUTCMilliseconds.js, block @0 opcode 22 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: Exception in FunctionInfo Date.prototype.setUTCMinutes.js, block @0 opcode 22 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: Exception in FunctionInfo Date.prototype.setUTCMonth.js, block @0 opcode 18 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: Exception in FunctionInfo Date.prototype.setUTCSeconds.js, block @0 opcode 22 com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: cannot call value undefined
...
</pre></li>
<li>ES3: 71%<pre>
<a href="../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: slice object with start and end failed; slice object with start only failed; slice object with negative start failed
<a href="../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: slice with start and end failed; slice with start only failed; slice with negative start failed; slice with negative end failed; slice entire array failed
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: Exception in FunctionInfo Number.prototype.toLocaleString.js, block @0 opcode 7 kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: Exception in FunctionInfo RegExp.js, block @15 opcode 3 com.reevajs.reeva.utils.ECMAError: ECMA assertion failed
<a href="../conformance/es3/RegExp.lastIndex.js">RegExp.lastIndex.js</a>: after first match failed; after second match failed
<a href="../conformance/es3/RegExp.prototype.constructor.js">RegExp.prototype.constructor.js</a>: failed
<a href="../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: match failed; TypeError: cannot convert null to Object
<a href="../conformance/es3/RegExp.prototype.test.js">RegExp.prototype.test.js</a>: match failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: TypeError: cannot convert undefined to Object
<a href="../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: Exception in FunctionInfo String.prototype.replace.capture.js, block @0 opcode 11 kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: Exception in FunctionInfo String.prototype.replace.extra.js, block @0 opcode 11 kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: Exception in FunctionInfo String.prototype.replace.generic.js, block @12 opcode 18 kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: Exception in FunctionInfo String.prototype.replace.regex.js, block @0 opcode 11 kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: TypeError: cannot convert undefined to Object
<a href="../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: Exception in FunctionInfo String.prototype.split.bugs.js, block @27 opcode 5 kotlin.NotImplementedError: An operation is not implemented.
...
</pre></li>
<li>ES5: 74%<pre>
<a href="../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: TypeError: cannot call value undefined
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: invalid date does not return null
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: frozen object is sealed failed
<a href="../conformance/es5/debugger.js">debugger.js</a>: kotlin.NotImplementedError: An operation is not implemented.
<a href="../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: com.reevajs.reeva.utils.ExpectationError: Expectation failed
<a href="../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: SyntaxError: invalid token "\ufeff"
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: ReferenceError: TODO: message (DeclarativeEnvRecord::setMutableBinding 1)
<a href="../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: Exception in FunctionInfo &lt;anonymous&gt;:10, block @2 opcode 4 Exception in FunctionInfo strict.this-undefined-in-function.js, block @0 opcode 3 java.lang.IllegalArgumentException: fromIndex(1) &gt; toIndex(0)
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 60%, ES2016+ 38%, Next 0%, Intl 14%</summary><ul>
<li>ES6: 60%<pre>
<a href="../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.expression.js">Function.name.expression.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.shorthand.js">Function.name.shorthand.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.statement.js">Function.name.statement.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.variable.js">Function.name.variable.js</a>: failed
<a href="../conformance/kangax-es6/Map.zero-key.js">Map.zero-key.js</a>: failed
<a href="../conformance/kangax-es6/Number.parseFloat.js">Number.parseFloat.js</a>: failed
<a href="../conformance/kangax-es6/Number.parseInt.js">Number.parseInt.js</a>: failed
<a href="../conformance/kangax-es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right-hand side of "in" operator must be an object
<a href="../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: TypeError: cannot call value undefined
<a href="../conformance/kangax-es6/Promise.race.js">Promise.race.js</a>: TypeError: cannot call value undefined
<a href="../conformance/kangax-es6/Proxy.handler.has.invariants.js">Proxy.handler.has.invariants.js</a>: SyntaxError: expected }, but found in
<a href="../conformance/kangax-es6/Proxy.handler.ownKeys.invariants.js">Proxy.handler.ownKeys.invariants.js</a>: Exception in FunctionInfo testCode, block @2 opcode 12 Exception in FunctionInfo Proxy.handler.ownKeys.invariants.js, block @2 opcode 2 java.lang.IllegalStateException: Encountered unreachable() call
<a href="../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: failed
...
</pre></li>
<li>ES2016: 67%<pre>
<a href="../conformance/kangax-es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../conformance/kangax-es2016/misc.Proxy-Array-includes.js">misc.Proxy-Array-includes.js</a>: failed
<a href="../conformance/kangax-es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: failed
<a href="../conformance/kangax-es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: undefined
</pre></li>
<li>ES2017: 48%</li>
<li>ES2018: 49%</li>
<li>ES2019: 65%<pre>
<a href="../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: Symbol.prototype.description called on incompatible object
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: cannot call value undefined
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: cannot call value undefined
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: unicode codepoint escape sequence missing closing curly brace
<a href="../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: failed
<a href="../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: failed
</pre></li>
<li>ES2020: 76%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: failed
<a href="../conformance/kangax-es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: cannot call value undefined
<a href="../conformance/kangax-es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: SyntaxError: expected }, but found .
<a href="../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: com.reevajs.reeva.utils.ExpectationError: Expected block 10 to have initial stack height of 2, but found 1
</pre></li>
<li>ES2021: 10%</li>
<li>ES2022: 27%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 14%</li>
</ul></details>
