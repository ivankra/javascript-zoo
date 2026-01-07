# Hermes

JavaScript engine from Facebook optimized for running React Native mobile apps.

* Homepage:    https://hermesengine.dev/
* Repository:  https://github.com/facebook/hermes.git <span class="shields"><img src="https://img.shields.io/github/stars/facebook/hermes?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/facebook/hermes?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Branch:      [main](https://github.com/facebook/hermes/tree/main)
* LOC:         170021 (`cloc include lib tools/hermes`)
* Language:    C++
* License:     MIT
* Org:         Facebook
* Standard:    ES2023 (partial)
* Years:       2019-
* Features:    optimizing LLVM-based AOT compiler to bytecode
* Interpreter: register-based VM
* GC:          generational GC

## Note

Only `static_h` branch is being actively developed now - [Hermes V1](hermes-v1.md) (formerly "Static Hermes").

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/hermes.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/with.js">with.js</a>: with.js:15:1: error: invalid statement encountered. with.js:38:1: error: invalid statement encountered. Emitted 2 errors. exiting.
</pre></li>
<li>ES3: 100%</li>
<li>ES5: 97%<pre>
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 78%, ES2016+ 57%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 78%<pre>
<a href="../conformance/kangax-es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../conformance/kangax-es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: Function.name.class-expression.js:10:10: error: Invalid expression encountered Function.name.class-expression.js:11:12: error: Invalid expression encountered Emitted 2 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: Function.name.class-object-method.js:10:18: error: Invalid expression encountered Function.name.class-object-method.js:10:33: error: Invalid expression encountered Function.name.class-object-method.js:11:11: error: Invalid expression encountered Emitted 3 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: Function.name.class-prototype.js:10:3: error: invalid statement encountered. Emitted 1 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: Function.name.class-statement.js:10:3: error: invalid statement encountered. Function.name.class-statement.js:11:3: error: invalid statement encountered. Emitted 2 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.class-static.js">Function.name.class-static.js</a>: Function.name.class-static.js:10:3: error: invalid statement encountered. Emitted 1 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: Function.name.class-variable.js:10:13: error: Invalid expression encountered Function.name.class-variable.js:11:13: error: Invalid expression encountered Function.name.class-variable.js:12:13: error: Invalid expression encountered Emitted 3 errors. exiting.
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../conformance/kangax-es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../conformance/kangax-es6/Promise.prototype-not-instance.js">Promise.prototype-not-instance.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.RegExp-subclassing.js">Reflect.construct.RegExp-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/RegExp.Symbol.species.js">RegExp.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../conformance/kangax-es6/Set.Symbol.species.js">Set.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 68%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../conformance/kangax-es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: async.arrow-in-class.js:48:3: error: invalid statement encountered. Emitted 1 errors. exiting.
<a href="../conformance/kangax-es2017/async.arrow.js">async.arrow.js</a>: async.arrow.js:45:11: error: async functions are unsupported Emitted 1 errors. exiting.
<a href="../conformance/kangax-es2017/async.methods-class.js">async.methods-class.js</a>: async.methods-class.js:45:3: error: invalid statement encountered. Emitted 1 errors. exiting.
<a href="../conformance/kangax-es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: failed
...
</pre></li>
<li>ES2018: 77%<pre>
<a href="../conformance/kangax-es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: async-iterators.for-await-of.js:60:5: error: for await..of loops are currently unsupported
<a href="../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: async-iterators.generators.js:44:3: error: async generators are unsupported
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: regex.unicode-property-escapes.unicode-16.0.js:10:10: error: Invalid regular expression: Invalid property name
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: regex.unicode-property-escapes.unicode-17.0.js:10:10: error: Invalid regular expression: Invalid property name
</pre></li>
<li>ES2019: 77%<pre>
<a href="../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of undefined
<a href="../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 2:1:')' expected at end of function parameter list
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: 1:14:Invalid expression encountered
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: 1:2:Invalid expression encountered
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 43%</li>
<li>ES2022: 33%</li>
<li>ES2023: 77%<pre>
<a href="../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
