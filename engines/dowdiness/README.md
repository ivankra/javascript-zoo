# dowdiness/js_engine

Vibe-coded JavaScript engine written in MoonBit.

* Repository:  [dowdiness/js_engine](https://github.com/dowdiness/js_engine) <span class="shields"><img src="https://img.shields.io/github/stars/dowdiness/js_engine?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/dowdiness/js_engine?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [62588](# "cloc --exclude-ext=md .")
* Language:    MoonBit
* License:     Apache-2.0
* Years:       2026-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>ES1: 98.5% (195/198)<pre>
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/numbers.inf.js">numbers.inf.js</a>: FAIL: value out of range
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
</pre></li>
<li>ES3: 89.9% (133/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Unexpected character 'ж' at line 8, col 5
<a href="../../conformance/es3/in.js">in.js</a>: FAIL: missing array index failed
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Unexpected character 'ж' at line 9, col 11
<a href="../../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: FAIL
<a href="../../conformance/es3/regex.class.esc-d.js">regex.class.esc-d.js</a>: FAIL: \D in bracket failed
<a href="../../conformance/es3/regex.class.esc-s.js">regex.class.esc-s.js</a>: FAIL: \S in bracket failed
<a href="../../conformance/es3/regex.class.esc-w.js">regex.class.esc-w.js</a>: FAIL: \W in bracket failed
<a href="../../conformance/es3/regex.escape.hex.js">regex.escape.hex.js</a>: TypeError: Cannot read properties of null (reading '0')
<a href="../../conformance/es3/regex.escape.unicode.js">regex.escape.unicode.js</a>: TypeError: Cannot read properties of null (reading '0')
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: FAIL: spec example failed
</pre></li>
<li>ES5: 83.8% (62/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: escape sequences failed
<a href="../../conformance/es5/debugger.js">debugger.js</a>: ReferenceError: debugger is not defined
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: TypeError: Cannot set property 'test' of string
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 76%, ES2016+ 51%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 96.3%<pre>
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Cannot set property 'test' of string
</pre></li>
<li>ES6: 76%<pre>
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.new-Function.js">Function.name.new-Function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.no-lexical.js">Function.name.shorthand.no-lexical.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/Proxy.handler.defineProperty.invariants.js">Proxy.handler.defineProperty.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.defineProperty.js">Proxy.handler.defineProperty.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.invariants.js">Proxy.handler.getOwnPropertyDescriptor.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: TypeError: Cannot read properties of undefined (reading 'value')
<a href="../../conformance/compat-table/es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: FAIL
...
</pre></li>
<li>ES2016: 77.3%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-no-new.js">misc.generator-no-new.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 57.5%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot convert a Symbol value to a string
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
...
</pre></li>
<li>ES2018: 68.4%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: Expected LParen, got Ident("await") at line 60, col 9
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Invalid escape sequence at line 16, col 15
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Invalid regular expression: /(?&lt;=a)b/: Invalid regex: lookbehind assertions are not supported
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2019: 51.8%<pre>
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Object.fromEntries requires an iterable argument
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Expected RParen, got Semicolon at line 2, col 9
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Unterminated string at line 1, col 2
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Unterminated string at line 1, col 2
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL
</pre></li>
<li>ES2020: 67.9%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: BigInt64Array is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: BigUint64Array is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: FAIL
</pre></li>
<li>ES2021: 42.9%</li>
<li>ES2022: 46.3%</li>
<li>ES2023: 80%<pre>
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#' at line 1, col 1
</pre></li>
<li>ES2024: 42.9%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
