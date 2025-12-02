# LibJS

JavaScript engine of Ladybird browser and SerenityOS.

* Homepage:    https://ladybirdbrowser.github.io/libjs-website/
* Repository:  https://github.com/LadybirdBrowser/ladybird.git <span class="shields"><img src="https://img.shields.io/github/stars/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/LadybirdBrowser/ladybird?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         72562 (`cloc --not_match_d="(?i)(test)" Libraries/LibJS`)
* Language:    C++
* License:     BSD-2-Clause
* Standard:    ESnext
* Years:       2020-
* Features:    WebAssembly engine (LibWasm)
* Interpreter: register-based VM

## Links

* [An introduction to the LibJS JavaScript engine - Linux Groh - November 2022 TC39 Meeting](https://docs.google.com/presentation/d/1-chE3GTNFnNRwZqk4Bf3GCPV_nINfKG-NUTM4IeEnVc/view)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/libjs.txt">Full log</a>.</li>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 92%, ES2016+ 96%, Next 19%, Intl 100%</summary><ul>
<li>ES6: 92%<pre>
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es6/Promise.all.js">Promise.all.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es6/Promise.race.js">Promise.race.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: Uncaught exception: [SyntaxError] Not allowed to declare a function here (line: 12, column: 10)
<a href="../conformance/kangax-es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: failed
<a href="../conformance/kangax-es6/arrow.precedence.js">arrow.precedence.js</a>: failed
<a href="../conformance/kangax-es6/const.no-redefine.js">const.no-redefine.js</a>: failed
<a href="../conformance/kangax-es6/const.strict.no-redefine.js">const.strict.no-redefine.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-assign.parenthesised-error.js">destructuring-assign.parenthesised-error.js</a>: failed
<a href="../conformance/kangax-es6/for-of.iterator-closing-break.js">for-of.iterator-closing-break.js</a>: failed
<a href="../conformance/kangax-es6/for-of.iterator-closing-throw.js">for-of.iterator-closing-throw.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: TypeError: Cannot convert symbol to string
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: failed
<a href="../conformance/kangax-es6/misc.accessors-no-constructor.js">misc.accessors-no-constructor.js</a>: failed
<a href="../conformance/kangax-es6/subclassing.Function.prototype-chain.js">subclassing.Function.prototype-chain.js</a>: failed
<a href="../conformance/kangax-es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../conformance/kangax-es6/subclassing.Promise.all.js">subclassing.Promise.all.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es6/subclassing.Promise.race.js">subclassing.Promise.race.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 92%<pre>
<a href="../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es2017/async.await.js">async.await.js</a>: WARNING: A promise was rejected without any handlers (result: [InternalError] Call stack size limit exceeded)
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: RegExp compile error: Error during parsing of regular expression: ^---- Name of property is invalid. (line: 10, column: 10) Uncaught exception: [SyntaxError] RegExp compile error: Error during parsing of regular expression: ^---- Name of property is invalid. (line: 10, column: 10)
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 79%<pre>
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17) Uncaught exception: [SyntaxError] RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17)
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17) Uncaught exception: [SyntaxError] RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17)
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17) Uncaught exception: [SyntaxError] RegExp compile error: Error during parsing of regular expression: ^---- Content of capture group is invalid. (line: 9, column: 17)
</pre></li>
<li>Next: 19%<br>
<li>Intl: 100%</li>
</ul></details>
