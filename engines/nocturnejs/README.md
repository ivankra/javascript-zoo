# Lampese/NocturneJS

JavaScript engine written in MoonBit.

* Repository:  [Lampese/NocturneJS](https://github.com/Lampese/NocturneJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/Lampese/NocturneJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Lampese/NocturneJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [103096](# "cloc .")
* Language:    MoonBit
* License:     Unknown
* Standard:    ESnext
* Years:       2026-
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 95%, ES2016+ 100%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 95%, <b>2 crashes</b><pre>
<a href="../../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../../conformance/kangax-es6/Promise.all.js">Promise.all.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: cannot convert to object
<a href="../../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/kangax-es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: error: SyntaxError: invalid regular expression
<a href="../../conformance/kangax-es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: error: SyntaxError: invalid regular expression
<a href="../../conformance/kangax-es6/misc.Proxy.get.HasBinding.js">misc.Proxy.get.HasBinding.js</a>: ReferenceError: undefined variable
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: failed
<a href="../../conformance/kangax-es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: failed
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: crashed (signal 11); qemu: uncaught target signal 11 (Segmentation fault) - core dumped
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crashed (signal 11); qemu: uncaught target signal 11 (Segmentation fault) - core dumped
...
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
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
