# Boa

Embeddable Javascript engine written in Rust.

* Homepage:     https://boajs.dev/
* Repository:   https://github.com/boa-dev/boa.git <span class="shields"><img src="https://img.shields.io/github/stars/boa-dev/boa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/boa-dev/boa?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          141335 (`cloc --not_match_d="(?i)(tests|docs|examples|github)" --exclude-lang=Markdown .`)
* Language:     Rust
* License:      MIT, Unlicense
* Standard:     ESnext
* Years:        2018-
* Features:     hidden classes
* Interpreter:  stack-based VM
* Regex engine: [regress](https://github.com/ridiculousfish/regress)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/boa.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Uncaught: "Function Unimplemented]"
</pre></li>
<li>ES3: 97%<pre>
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Uncaught: "Function Unimplemented"
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Uncaught: "Function Unimplemented]"
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Uncaught: "Function Unimplemented]"
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 87%, Intl 89%</summary><ul>
<li>ES6: 98%<pre>
<a href="../conformance/kangax-es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: Uncaught: SyntaxError: Invalid regular expression literal: Unbalanced bracket at line 10, col 8 (native at /src/core/engine/src/script.rs:94:34)
<a href="../conformance/kangax-es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-params.defaults-new-function.js">destructuring-params.defaults-new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../conformance/kangax-es6/destructuring-params.defaults-separate-scope.js">destructuring-params.defaults-separate-scope.js</a>: failed
<a href="../conformance/kangax-es6/destructuring-params.new-function.js">destructuring-params.new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: Uncaught: RuntimeLimit: exceeded maximum number of recursive calls (native at core/engine/src/vm/mod.rs:861:24)
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: Uncaught: RuntimeLimit: exceeded maximum number of recursive calls (native at core/engine/src/vm/mod.rs:861:24)
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 94%<pre>
<a href="../conformance/kangax-es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: failed
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 98%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: Uncaught: SyntaxError: Invalid regular expression literal: Invalid property name at line 10, col 10 (native at /src/core/engine/src/script.rs:94:34)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Uncaught: SyntaxError: Invalid regular expression literal: Invalid property name at line 10, col 10 (native at /src/core/engine/src/script.rs:94:34)
</pre></li>
<li>ES2019: 95%<pre>
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 71%<pre>
<a href="../conformance/kangax-es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: FinalizationRegistry is not defined
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 92%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: failed
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 32%<br>
<li>Intl: 89%<pre>
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.iana-timezones.js">Intl.DateTimeFormat.iana-timezones.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: TypeError: not a callable function
</pre></li>
</ul></details>
