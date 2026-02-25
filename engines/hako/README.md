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
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 95%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 97%, <b>2 crashes</b><pre>
<a href="../../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
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
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: crashed (signal 6); error while executing at wasm backtrace: Assertion failed: list_empty(&amp;rt-&gt;gc_obj_list) (quickjs.c: JS_FreeRuntime: 2044) Unhandled exception. Wasmtime.TrapException: error while executing at wasm backtrace:
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crashed (signal 6); error while executing at wasm backtrace: Assertion failed: list_empty(&amp;rt-&gt;gc_obj_list) (quickjs.c: JS_FreeRuntime: 2044) Unhandled exception. Wasmtime.TrapException: error while executing at wasm backtrace:
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 43%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
