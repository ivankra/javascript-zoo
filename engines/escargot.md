# Escargot

Lightweight JavaScript engine by Samsung for mid-range devices like phones/TVs.

* Repository:   https://github.com/Samsung/escargot.git <span class="shields"><img src="https://img.shields.io/github/stars/Samsung/escargot?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Samsung/escargot?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          116291 (`cloc src`)
* Language:     C++
* License:      LGPL-2.1
* Org:          Samsung
* Standard:     ESnext
* Years:        2016-
* Features:     WebAssembly engine, hidden classes
* Interpreter:  register-based VM
* Regex engine: YARR

## Runtimes

* [lwnode](https://github.com/Samsung/lwnode) <span class="shields"><img src="https://img.shields.io/github/stars/Samsung/lwnode?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Samsung/lwnode?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Samsung's lightweight Node.js implementation

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/escargot.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/Map.prototype-not-instance.js">Map.prototype-not-instance.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js">annex-b.__proto__.literals.not-shorthand-method.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-shorthand-property.js">annex-b.__proto__.literals.not-shorthand-property.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.Object.defineProperties.js">misc.Proxy.get.Object.defineProperties.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp.prototype.test: this value is not a RegExp object
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Script parsing error: SyntaxError: Line 10: Invalid regular expression: invalid property expression
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Intl: 100%</li>
</ul></details>
