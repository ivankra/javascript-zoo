# fastschema/qjs

JavaScript in Go with QuickJS and Wazero.

* Repository:       https://github.com/fastschema/qjs.git <span class="shields"><img src="https://img.shields.io/github/stars/fastschema/qjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/fastschema/qjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              14447 (`cloc *.go`)
* Language:         Go
* License:          MIT
* Standard:         ES2023
* Years:            2025-
* Ancestor:         [QuickJS](quickjs.md)
* Runtime platform: WebAssembly (Wazero), Go (cgo-free)
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 93%, Intl 25%</summary><ul>
<li>ES6: 97%<pre>
<a href="../features/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../features/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../features/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../features/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../features/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../features/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../features/kangax-es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: failed
<a href="../features/kangax-es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: failed
<a href="../features/kangax-es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: failed
<a href="../features/kangax-es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: failed
<a href="../features/kangax-es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: failed
<a href="../features/kangax-es6/rest-params.no-setter.js">rest-params.no-setter.js</a>: failed
<a href="../features/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../features/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: panic: failed to call QJS_Eval: wasm error: invalid table access panic: failed to call QJS_Free: wasm error: out of bounds memory access panic({0x2654a0?, 0x4003537400?}) 	/usr/lib/go-1.24/src/runtime/panic.go:792 +0x124 panic: failed to free QJS runtime: failed to call QJS_Free: wasm error: out of
<a href="../features/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: panic: failed to call QJS_Eval: wasm error: out of bounds memory access panic: failed to call QJS_Free: wasm error: out of bounds memory access panic({0x2654a0?, 0x40000a7c40?}) 	/usr/lib/go-1.24/src/runtime/panic.go:792 +0x124 panic: failed to free QJS runtime: failed to call QJS_Free: wasm error:
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 85%<pre>
<a href="../features/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../features/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 99%<pre>
<a href="../features/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Error: execution error: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 80%<pre>
<a href="../features/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: failed
<a href="../features/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: Error: execution error: SyntaxError: invalid class range
<a href="../features/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: failed
<a href="../features/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: failed
<a href="../features/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 74%<pre>
<a href="../features/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: Error: execution error: SyntaxError: duplicate group name
<a href="../features/kangax-es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: Error: execution error: SyntaxError: invalid group
<a href="../features/kangax-es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: Error: execution error: SyntaxError: invalid group
<a href="../features/kangax-es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: Error: execution error: SyntaxError: invalid group
</pre></li>
<li>Intl: 25%<br>
</ul></details>
