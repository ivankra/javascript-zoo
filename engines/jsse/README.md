# pmatos/jsse

Agent-coded JavaScript engine in Rust passing nearly 100% of test262.

* Repository: [pmatos/jsse](https://github.com/pmatos/jsse)
* LOC:        [158373](# "cloc src")
* Language:   Rust
* License:    MIT
* Standard:   ESnext
* Years:      2026-

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: failed: rounding failed
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Next 38%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: object (class=Object, callable=false, id=1068, keys=[]) is not a function
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: failed
<a href="../../conformance/compat-table/es6/Set.iterator-prototype-chain.js">Set.iterator-prototype-chain.js</a>: failed
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: SyntaxError: Invalid regular expression flags 'undefined'
<a href="../../conformance/compat-table/es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/subclassing.Promise.race.js">subclassing.Promise.race.js</a>: MissingOK
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: timeout: &gt;3s
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 97%<pre>
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: MissingOK
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: MissingOK
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 38%</li>
<li>Intl: 100%</li>
</ul></details>
