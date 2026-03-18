# Boa

Embeddable JavaScript engine written in Rust.

* Homepage:     [boajs.dev](https://boajs.dev/)
* Repository:   [boa-dev/boa](https://github.com/boa-dev/boa.git) <span class="shields"><img src="https://img.shields.io/github/stars/boa-dev/boa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/boa-dev/boa?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [141335](# "cloc --not_match_d='(?i)(tests|docs|examples|github)' --exclude-lang=Markdown .")
* Language:     Rust
* License:      MIT OR Unlicense
* Standard:     ESnext
* Years:        2018-
* Features:     hidden classes
* Interpreter:  stack-based VM
* Regex engine: [regress](https://github.com/ridiculousfish/regress)

## Users

* Runtimes:
  * [JetCrab](https://github.com/JetCrabCollab/JetCrab) <span class="shields"><img src="https://img.shields.io/github/stars/JetCrabCollab/JetCrab?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/JetCrabCollab/JetCrab?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Boa's [temporal\_rs](https://crates.io/crates/temporal_rs) implementation got adopted by [V8](../v8/README.md) and some other engines

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Function Unimplemented
</pre></li>
<li>ES3: 97%<pre>
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Function Unimplemented
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Function Unimplemented
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Function Unimplemented
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
</pre></li>
<li>ES5: 99%<pre>
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 92%, Next 0%, Intl 100%</summary><ul>
<li>ES6: 98%<pre>
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Invalid regular expression literal: Unbalanced bracket at line 10, col 8
<a href="../../conformance/compat-table/es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-new-function.js">destructuring-params.defaults-new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-separate-scope.js">destructuring-params.defaults-separate-scope.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-params.new-function.js">destructuring-params.new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RuntimeLimitError: reached the maximum number of recursive calls on this execution
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RuntimeLimitError: reached the maximum number of recursive calls on this execution
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 98%<pre>
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: failed
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 95%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 71%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: FinalizationRegistry is not defined
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 68%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.instanceof.js">Iterator.instanceof.js</a>: failed
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: not a callable function
<a href="../../conformance/compat-table/es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: TypeError: not a callable function
</pre></li>
<li>Next: 0%</li>
<li>Intl: 100%</li>
</ul></details>
