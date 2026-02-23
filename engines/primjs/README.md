# PrimJS

[QuickJS](../quickjs/README.md)-based engine from ByteDance for their cross-platform mobile apps framework Lynx.

* Repository:  [lynx-family/primjs](https://github.com/lynx-family/primjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/lynx-family/primjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/lynx-family/primjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         292098 (`cloc src`)
* Language:    C++
* License:     Apache-2.0
* Org:         ByteDance
* Standard:    ES2019
* Years:       2024-
* Ancestor:    [QuickJS](../quickjs/README.md)
* Interpreter: stack-based VM
* GC:          mark-and-sweep / reference counting
  * One of key features - compile-time option to replace QuickJS's reference counting with a mark-and-sweep GC, touting +10-20% performance ([doc](https://github.com/lynx-family/primjs/blob/develop/docs/gc.md)).

## Quirks

* Buggy nullish coalescing operator (ES2020): `null ?? 42` => `null`

## Forks

* [Hako](../hako/README.md): PrimJS ported to WASM

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/debugger.js">debugger.js</a>: SyntaxError: unsupported keyword: debugger
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 68%, Next 3%, Intl 25%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: qux is not a function
<a href="../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: failed
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: stack overflow
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: stack overflow
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 85%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 94%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: unknown unicode script
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: unknown unicode script
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: unknown unicode script
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: unknown unicode script
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 86%<pre>
<a href="../conformance/kangax-es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: failed
<a href="../conformance/kangax-es2020/nullish-coalescing.js">nullish-coalescing.js</a>: failed
</pre></li>
<li>ES2021: 79%<pre>
<a href="../conformance/kangax-es2021/String.prototype.replaceAll.js">String.prototype.replaceAll.js</a>: TypeError: 'q=query+string+parameters'.replaceAll is not a function
<a href="../conformance/kangax-es2021/logical-assignment.and.js">logical-assignment.and.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../conformance/kangax-es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../conformance/kangax-es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../conformance/kangax-es2021/logical-assignment.nullish.js">logical-assignment.nullish.js</a>: SyntaxError: expecting ';'
<a href="../conformance/kangax-es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: SyntaxError: expecting ';'
<a href="../conformance/kangax-es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: SyntaxError: expecting ';'
<a href="../conformance/kangax-es2021/logical-assignment.or.js">logical-assignment.or.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../conformance/kangax-es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../conformance/kangax-es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: SyntaxError: unexpected token in expression: '='
</pre></li>
<li>ES2022: 62%<pre>
<a href="../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../conformance/kangax-es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: failed
<a href="../conformance/kangax-es2022/Object.hasOwn.js">Object.hasOwn.js</a>: TypeError: Object.hasOwn is not a function
<a href="../conformance/kangax-es2022/at-method.Array.js">at-method.Array.js</a>: TypeError: arr.at is not a function
<a href="../conformance/kangax-es2022/at-method.String.js">at-method.String.js</a>: TypeError: str.at is not a function
<a href="../conformance/kangax-es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: arr.at is not a function
<a href="../conformance/kangax-es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: invalid property name
<a href="../conformance/kangax-es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: SyntaxError: unexpected token in expression: '#x'
<a href="../conformance/kangax-es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: invalid regular expression flags
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: failed
</pre></li>
<li>ES2023: 20%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 25%</li>
</ul></details>
