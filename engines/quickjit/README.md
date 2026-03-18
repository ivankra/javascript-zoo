# QuickJIT

QuickJS fork that JIT-translates bytecode using TCC.

* Repository:  [bnoordhuis/quickjit](https://github.com/bnoordhuis/quickjit.git) <span class="shields"><img src="https://img.shields.io/github/stars/bnoordhuis/quickjit?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bnoordhuis/quickjit?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [87238](# "cloc *.c *.h")
* Language:    C
* License:     MIT AND LGPL-2.1-or-later
* Standard:    ES2019
* Years:       2023
* Ancestor:    [QuickJS](../quickjs/README.md)
* Features:    PIC
* Interpreter: stack-based VM
* JIT:         x64

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99%, <b>1 crash</b><pre>
<a href="../../conformance/es1/asi.js">asi.js</a>: crashed: SIGSEGV
</pre></li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 93%, ES2016+ 55%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 93%, <b>3 crashes</b><pre>
<a href="../../conformance/compat-table/es6/Number.parseFloat.js">Number.parseFloat.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/Number.parseInt.js">Number.parseInt.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=139
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es6/Promise.js">Promise.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=139
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: jit: bailing out, op=6c idx=14; jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=a7 idx=71; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/arrow.5-param.js">arrow.5-param.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: jit: bailing out, op=6c idx=74; jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: jit: bailing out, op=87 idx=0; jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: jit: bailing out, op=6c idx=16
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 76%<pre>
<a href="../../conformance/compat-table/es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=1; jit: bailing out, op=54 idx=23; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.arrow.js">async.arrow.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=18; jit: bailing out, op=a7 idx=15; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.await-non-promise.js">async.await-non-promise.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=13; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=13; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=13; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.constructor.js">async.constructor.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=2e idx=1; jit: bailing out, op=a7 idx=23; jit: bailing out, op=6c idx=78; jit: bailing out, op=2e idx=5
<a href="../../conformance/compat-table/es2017/async.methods-class.js">async.methods-class.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=18; jit: bailing out, op=54 idx=20; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.methods-object.js">async.methods-object.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=8b idx=18; jit: bailing out, op=54 idx=3; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.return.js">async.return.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=2e idx=5; jit: bailing out, op=a7 idx=10; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/async.throw.js">async.throw.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=a7 idx=10; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: jit: bailing out, op=6c idx=16
</pre></li>
<li>ES2018: 54%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=7e idx=3; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=87 idx=0; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Exception in regex.unicode-property-escapes.unicode-15.js: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Exception in regex.unicode-property-escapes.unicode-16.0.js: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Exception in regex.unicode-property-escapes.unicode-17.0.js: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 96%<pre>
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=0; jit: bailing out, op=6c idx=78
</pre></li>
<li>ES2020: 50%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: SyntaxError: Exception in BigInt64Array.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: SyntaxError: Exception in BigInt.constructor.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/BigInt.js">BigInt.js</a>: SyntaxError: Exception in BigInt.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: SyntaxError: Exception in BigUint64Array.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: SyntaxError: Exception in DataView.prototype.getBigInt64.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: SyntaxError: Exception in DataView.prototype.getBigUint64.js: SyntaxError: invalid number literal
<a href="../../conformance/compat-table/es2020/Promise.allSettled.js">Promise.allSettled.js</a>: jit: bailing out, op=98 idx=46; jit: bailing out, op=6c idx=78
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: TypeError: invalid 'in' operand
<a href="../../conformance/compat-table/es2020/globalThis.js">globalThis.js</a>: jit: bailing out, op=6c idx=50
</pre></li>
<li>ES2021: 29%</li>
<li>ES2022: 71%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: jit: bailing out, op=6c idx=16
<a href="../../conformance/compat-table/es2022/at-method.Array.js">at-method.Array.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2022/at-method.String.js">at-method.String.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: Exception in class-static-init-blocks.js: SyntaxError: invalid property name
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: SyntaxError: Exception in ergonomic-brand-checks.js: SyntaxError: unexpected token in expression: '#x'
<a href="../../conformance/compat-table/es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: invalid regular expression flags
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: jit: bailing out, op=a8 idx=24; jit: bailing out, op=6c idx=36
</pre></li>
<li>ES2023: 20%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **4 crashes during testing**
