# Hermes V1

Next generation of [Hermes](../hermes/README.md) engine (formerly "Static Hermes"),
designed to utilize optional typing annotations for more efficient AOT
codegen.

* Homepage:    [hermesengine.dev](https://hermesengine.dev/)
* Repository:  [facebook/hermes](https://github.com/facebook/hermes.git) <span class="shields"><img src="https://img.shields.io/github/stars/facebook/hermes?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/facebook/hermes?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Branch:      [static_h](https://github.com/facebook/hermes/tree/static_h)
* LOC:         [219313](# "cloc include lib tools/hermes")
* Language:    C++
* License:     MIT
* Org:         Facebook
* Standard:    ES2023 (partial)
* Years:       2022-
* Features:    optimizing LLVM-based AOT compiler to bytecode + native code; FFI; optional TypeScript/Flow typing annotations with modified semantics for sound typing
* Interpreter: register-based VM
* GC:          generational GC

## Links

* [Static Hermes (React Native EU 2023 Announcement)](https://speakerdeck.com/tmikov2023/static-hermes-react-native-eu-2023-announcement)
* [From Static Hermes to Hermes V1: The Road to Default](https://www.callstack.com/podcasts/from-static-hermes-to-hermes-v1-the-road-to-default)
* [React Native 0.82 - A New Era](https://reactnative.dev/blog/2025/10/08/react-native-0.82)

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/with.js">with.js</a>: with.js:15:1: error: with statement is not supported with.js:38:1: error: with statement is not supported Emitted 2 errors. exiting.
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/String.prototype.toLocaleLowerCase.js">String.prototype.toLocaleLowerCase.js</a>: 'HELLO'.toLocaleLowerCase() != 'hello' (got: 'lowered')
<a href="../../conformance/es3/String.prototype.toLocaleUpperCase.js">String.prototype.toLocaleUpperCase.js</a>: 'hello'.toLocaleUpperCase() != 'HELLO' (got: 'uppered')
</pre></li>
<li>ES5: 92%<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: strict.eval-cannot-create-bindings.js:18:5: warning: Direct call to eval(), but lexical scope is not supported. strict.eval-cannot-create-bindings.js:19:5: warning: the variable "myTestVar" was not declared in anonymous function
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: strict.no-assignment-to-non-writable.js:35:21: error: invalid assignment left-hand side Emitted 1 errors. exiting.
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: console.log("es5/strict.this-primitive-not-coerced-in-accessors.js: failed: string 'this' was coerced in accessor"); OK
<a href="../../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: console.log("es5/strict.this-primitive-not-coerced.js: failed: string 'this' was coerced to object"); OK
<a href="../../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: console.log("es5/strict.this-undefined-in-function.js: failed: outer 'this' is not undefined"); OK
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 74%, Next 6%, Intl 96%</summary><ul>
<li>ES6: 90%<pre>
<a href="../../conformance/kangax-es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/kangax-es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: failed
<a href="../../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../../conformance/kangax-es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/kangax-es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/kangax-es6/Promise.prototype-not-instance.js">Promise.prototype-not-instance.js</a>: failed
<a href="../../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: failed
<a href="../../conformance/kangax-es6/RegExp.Symbol.species.js">RegExp.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/kangax-es6/Set.Symbol.species.js">Set.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: annex-b.function.labeled.js:12:10: error: Function declaration not allowed as body of labeled statement Emitted 1 errors. exiting.
<a href="../../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: annex-b.html-comments.js:9:5: error: invalid expression Emitted 1 errors. exiting.
<a href="../../conformance/kangax-es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: failed
<a href="../../conformance/kangax-es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: failed
<a href="../../conformance/kangax-es6/const.for-in.js">const.for-in.js</a>: failed
<a href="../../conformance/kangax-es6/const.for-of.js">const.for-of.js</a>: failed
<a href="../../conformance/kangax-es6/const.strict.for-in.js">const.strict.for-in.js</a>: failed
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 76%<pre>
<a href="../../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/kangax-es2017/misc.arguments-caller-removed.js">misc.arguments-caller-removed.js</a>: failed
<a href="../../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 87%<pre>
<a href="../../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: async-iterators.generators.js:44:3: error: async generators are unsupported Emitted 1 errors. exiting.
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: regex.unicode-property-escapes.unicode-16.0.js:10:10: error: Invalid regular expression: Invalid property name Emitted 1 errors. exiting.
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: regex.unicode-property-escapes.unicode-17.0.js:10:10: error: Invalid regular expression: Invalid property name Emitted 1 errors. exiting.
</pre></li>
<li>ES2019: 77%<pre>
<a href="../../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of undefined
<a href="../../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 2:1:')' expected at end of function parameter list
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 71%<pre>
<a href="../../conformance/kangax-es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: Property 'FinalizationRegistry' doesn't exist
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 77%<pre>
<a href="../../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 21%</li>
<li>Next: 6%</li>
<li>Intl: 96%<pre>
<a href="../../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
</pre></li>
</ul></details>
