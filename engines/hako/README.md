# Hako

QuickJS ported to WebAssembly with C#/Go bindings.

* Repository:       [6over3/hako](https://github.com/6over3/hako.git) <span class="shields"><img src="https://img.shields.io/github/stars/6over3/hako?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/6over3/hako?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [30474](# "cloc --not_match_d='(?i)(examples)' hosts/")
* Language:         C#, Go
* License:          Apache-2.0
* Standard:         ESnext
* Years:            2025-
* Ancestor:         [QuickJS](../quickjs/README.md)
* Runtime platform: Wasm, .NET, Go
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 95%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: CRASH: SIGABRT
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 42.9%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>
