# JerryScript

Lightweight JavaScript engine for microcontrollers.

* Homepage:    [jerryscript.net](https://jerryscript.net/)
* Repository:  [jerryscript-project/jerryscript](https://github.com/jerryscript-project/jerryscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/jerryscript-project/jerryscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jerryscript-project/jerryscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [108762](# "cloc jerry-*")
* Language:    C
* License:     Apache-2.0
* Org:         Samsung
* Standard:    ES2022 (partial, missing ES2018 regex and a few other features)
* Years:       2014-2024
* Interpreter: stack-based VM

## Notes

Very slow memory manager/GC: Splay benchmark score <1 with extremely slow SplaySetup().

## Runtimes

* [IoT.js](https://github.com/jerryscript-project/iotjs) <span class="shields"><img src="https://img.shields.io/github/stars/jerryscript-project/iotjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jerryscript-project/iotjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [Microlattice.js](https://github.com/iamblue/microlattice) <span class="shields"><img src="https://img.shields.io/github/stars/iamblue/microlattice?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/iamblue/microlattice?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* [Kaluma](https://github.com/kaluma-project/kaluma) <span class="shields"><img src="https://img.shields.io/github/stars/kaluma-project/kaluma?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/kaluma-project/kaluma?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 98%<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: Unhandled SyntaxError
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 70%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 96%, <b>2 crashes</b><pre>
<a href="../../conformance/kangax-es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError
<a href="../../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: crashed (signal 11)
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crashed (signal 11)
<a href="../../conformance/kangax-es6/template.escape-sequences.js">template.escape-sequences.js</a>: Unhandled SyntaxError
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: failed
</pre></li>
<li>ES2018: 74%<pre>
<a href="../../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.lookbehind.js">regex.lookbehind.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: Unhandled SyntaxError
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Unhandled SyntaxError
</pre></li>
<li>ES2019: 88%<pre>
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 71%<pre>
<a href="../../conformance/kangax-es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError
</pre></li>
<li>ES2022: 86%<pre>
<a href="../../conformance/kangax-es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../../conformance/kangax-es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError
<a href="../../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: failed
</pre></li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
