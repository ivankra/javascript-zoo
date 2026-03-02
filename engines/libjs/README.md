# LibJS

JavaScript engine of Ladybird browser and SerenityOS.

* Homepage:    [ladybirdbrowser.github.io/libjs-website](https://ladybirdbrowser.github.io/libjs-website/)
* Repository:  [LadybirdBrowser/ladybird](https://github.com/LadybirdBrowser/ladybird.git) <span class="shields"><img src="https://img.shields.io/github/stars/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [Libraries/LibJS/](https://github.com/LadybirdBrowser/ladybird/tree/master/Libraries/LibJS))
* LOC:         [72562](# "cloc --not_match_d='(?i)(test)' Libraries/LibJS")
* Language:    C++
* License:     BSD-2-Clause
* Standard:    ESnext
* Years:       2020-
* Features:    WebAssembly engine (LibWasm)
* Interpreter: register-based VM

## Links

* [An introduction to the LibJS JavaScript engine - Linux Groh - November 2022 TC39 Meeting](https://docs.google.com/presentation/d/1-chE3GTNFnNRwZqk4Bf3GCPV_nINfKG-NUTM4IeEnVc/view)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 100%, Next 22%, Intl 100%</summary><ul>
<li>ES6: 97%<pre>
<a href="../../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../../conformance/kangax-es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: Uncaught exception: [SyntaxError] Not allowed to declare a function here (line: 12, column: 10)
<a href="../../conformance/kangax-es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../../conformance/kangax-es6/destructuring-assign.parenthesised-error.js">destructuring-assign.parenthesised-error.js</a>: failed
<a href="../../conformance/kangax-es6/destructuring-params.duplicate-identifier.js">destructuring-params.duplicate-identifier.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: TypeError: Cannot convert symbol to string
<a href="../../conformance/kangax-es6/misc.accessors-no-constructor.js">misc.accessors-no-constructor.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Function.prototype-chain.js">subclassing.Function.prototype-chain.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: Call stack size limit exceeded
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: Call stack size limit exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 22%</li>
<li>Intl: 100%</li>
</ul></details>
