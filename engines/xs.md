# XS

Lightweight engine for microcontrollers/IoT by Kinoma/Marvell.

* Homepage:    https://www.moddable.com/faq#what-is-xs
* Repository:  https://github.com/Moddable-OpenSource/moddable.git <span class="shields"><img src="https://img.shields.io/github/stars/Moddable-OpenSource/moddable?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Moddable-OpenSource/moddable?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         88837 (`cloc xs/sources xs/includes`)
* Language:    C
* License:     Apache-2.0, LGPL-3.0-or-later
* Org:         Kinoma
* Standard:    ESnext
* Years:       2002-
* Interpreter: stack-based VM

## History

Originally developed by [Kinoma](https://en.wikipedia.org/wiki/Kinoma). First open-sourced in 2015 as part of [KinomaJS](https://github.com/Kinoma/kinomajs.git) IoT framework (the repo has older XS6 version with ES6/ES2015 support). Now hosted in [Moddable SDK](https://github.com/Moddable-OpenSource/moddable) repo.

## Runtimes

* [KinomaJS](https://github.com/Kinoma/kinomajs) / [Moddable SDK](https://github.com/Moddable-OpenSource/moddable)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/xs.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 98%, Next 30%, Intl 25%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/Map.zero-key.js">Map.zero-key.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Set.zero-key.js">Set.zero-key.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: call: not a function (in testCode)
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: call: not a function (in testCode)
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: get g: undefined variable (in testCode)
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: no block (strict code)
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: labeled function
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: missing expression
<a href="../conformance/kangax-es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError
<a href="../conformance/kangax-es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError
<a href="../conformance/kangax-es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: SyntaxError
<a href="../conformance/kangax-es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 94%<pre>
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: missing
<a href="../conformance/kangax-es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: failed
</pre></li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError
</pre></li>
<li>ES2019: 89%<pre>
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 30%<br>
<li>Intl: 25%<br>
</ul></details>
