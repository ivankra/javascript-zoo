# QuickJS-NG

Community-oriented fork of QuickJS.

* Homepage:    [quickjs-ng.github.io/quickjs](https://quickjs-ng.github.io/quickjs/)
* Repository:  [quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/quickjs-ng/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/quickjs-ng/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [74458](# "cloc *.c *.h")
* Language:    C
* License:     MIT
* Standard:    ES2023
* Years:       2023-
* Ancestor:    [QuickJS](../quickjs/README.md) (forked in 2023 due to QuickJS being unmaintained at that time)
* Features:    PIC
* Interpreter: stack-based VM
* GC:          reference counting

## Notes

Engine shell frequently misdetects script / ES module mode, causing various errors.
Pass `--script` argument to force classic sloppy script mode.

## Users

* [Projects using QuickJS-NG](https://github.com/quickjs-ng/quickjs/blob/master/docs/docs/projects.md)
* [fastschema/qjs](../fastschema-qjs/README.md): QuickJS-NG ported to Wasm
* Runtimes:
  * [txiki.js](https://github.com/saghul/txiki.js) <span class="shields"><img src="https://img.shields.io/github/stars/saghul/txiki.js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/saghul/txiki.js?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - QuickJS-ng/libuv-based JavaScript runtime

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 95%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 97%<pre>
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
<a href="../../conformance/kangax-es6/rest-params.no-setter.js">rest-params.no-setter.js</a>: failed
<a href="../../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 80%<pre>
<a href="../../conformance/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: failed
<a href="../../conformance/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: invalid class range
<a href="../../conformance/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: failed
<a href="../../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: failed
<a href="../../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 74%<pre>
<a href="../../conformance/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: duplicate group name
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: SyntaxError: invalid group
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: SyntaxError: invalid group
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: SyntaxError: invalid group
</pre></li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
