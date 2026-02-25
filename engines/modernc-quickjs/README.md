# ModerncQuickJS

[QuickJS](../quickjs/README.md) transpiled to pure Go.

* Homepage:         [modernc.org/quickjs](https://modernc.org/quickjs)
* Repository:       [quickjs](https://gitlab.com/cznic/quickjs.git) <span class="shields"><img src="https://img.shields.io/gitlab/stars/cznic/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/gitlab/last-commit/cznic/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [167235](# "cloc lib*.go ccgo_linux_amd64.go")
* Language:         Go
* License:          BSD-3-Clause, MIT
* Standard:         ES2023
* Years:            2024-
* Ancestor:         [QuickJS](../quickjs/README.md)
* Runtime platform: Go (cgo-free)
* Interpreter:      stack-based VM

## Links

* [Show HN: Pure Go QuickJS JavaScript engine (Golang)](https://news.ycombinator.com/item?id=43962304)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 78%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 94%<pre>
<a href="../../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../../conformance/kangax-es6/Promise.all.js">Promise.all.js</a>: failed
<a href="../../conformance/kangax-es6/Promise.js">Promise.js</a>: failed
<a href="../../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: failed
<a href="../../conformance/kangax-es6/Promise.race.js">Promise.race.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Promise.js">subclassing.Promise.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Promise.race.js">subclassing.Promise.race.js</a>: failed
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../../conformance/kangax-es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: failed
<a href="../../conformance/kangax-es2017/async.arrow.js">async.arrow.js</a>: failed
<a href="../../conformance/kangax-es2017/async.await-non-promise.js">async.await-non-promise.js</a>: failed
<a href="../../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
<a href="../../conformance/kangax-es2017/async.await.js">async.await.js</a>: failed
<a href="../../conformance/kangax-es2017/async.constructor.js">async.constructor.js</a>: failed
<a href="../../conformance/kangax-es2017/async.methods-class.js">async.methods-class.js</a>: failed
<a href="../../conformance/kangax-es2017/async.methods-object.js">async.methods-object.js</a>: failed
<a href="../../conformance/kangax-es2017/async.return.js">async.return.js</a>: failed
<a href="../../conformance/kangax-es2017/async.throw.js">async.throw.js</a>: failed
</pre></li>
<li>ES2018: 57%<pre>
<a href="../../conformance/kangax-es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: failed
<a href="../../conformance/kangax-es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: failed
<a href="../../conformance/kangax-es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: failed
<a href="../../conformance/kangax-es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: failed
<a href="../../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: failed
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Error: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 96%<pre>
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: failed
</pre></li>
<li>ES2020: 93%<pre>
<a href="../../conformance/kangax-es2020/Promise.allSettled.js">Promise.allSettled.js</a>: failed
</pre></li>
<li>ES2021: 86%<pre>
<a href="../../conformance/kangax-es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: failed
<a href="../../conformance/kangax-es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: failed
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 67%<pre>
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 26%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
