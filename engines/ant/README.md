# Ant

Ant-sized JavaScript runtime, notable for async/await, ffi, http servers, crypto, while being under 4mb.

* Repository:   https://github.com/theMackabu/ant.git <span class="shields"><img src="https://img.shields.io/github/stars/theMackabu/ant?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/theMackabu/ant?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          34461 (`cloc src`)
* Language:     C
* License:      MIT
* Standard:     ES5 (ES6 Partial)
* Years:        2025-
* Interpreter:  tree-walking
* Regex engine: PCRE2

## Links

- https://s.tail.so/js-in-one-month

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../../conformance/results/ant.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 50%, ES2016+ 58%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 50%, <b>1 crash</b><pre>
<a href="../conformance/kangax-es6/Array.from.generator.js">Array.from.generator.js</a>: SyntaxError: Parenthesized expression cannot be empty
<a href="../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.array-like.js">Array.from.map.array-like.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: SyntaxError: Parenthesized expression cannot be empty
<a href="../conformance/kangax-es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: failed
<a href="../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: TypeError: Cannot read properties of null (reading 'hasOwnProperty')
<a href="../conformance/kangax-es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: failed
<a href="../conformance/kangax-es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.accessor.js">Function.name.accessor.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-prototype.js">Function.name.class-prototype.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-static.js">Function.name.class-static.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.configurable.js">Function.name.configurable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.new-Function.js">Function.name.new-Function.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.variable.js">Function.name.variable.js</a>: failed
<a href="../conformance/kangax-es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: Cannot use 'in' operator to search for 'get' in non-object
<a href="../conformance/kangax-es6/Map.constructor-arguments.js">Map.constructor-arguments.js</a>: failed
...
</pre></li>
<li>ES2016: 26%</li>
<li>ES2017: 68%<pre>
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.js">Object.getOwnPropertyDescriptors.js</a>: TypeError: calling non-function
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: TypeError: calling non-function
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: '__defineGetter__' is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: '__defineSetter__' is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: calling non-function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: '__lookupSetter__' is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: calling non-function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read properties of undefined (reading 'call')
...
</pre></li>
<li>ES2018: 44%</li>
<li>ES2019: 48%</li>
<li>ES2020: 46%</li>
<li>ES2021: 100%</li>
<li>ES2022: 79%<pre>
<a href="../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../conformance/kangax-es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../conformance/kangax-es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: calling non-function
<a href="../conformance/kangax-es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: SyntaxError: Unexpected token '#'
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: Cannot read properties of undefined (reading 'get')
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 33%</li>
<li>ES2025: 40%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **1 crash during testing**
