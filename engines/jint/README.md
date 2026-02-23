# Jint

JavaScript interpreter for .NET.

* Repository:       [sebastienros/jint](https://github.com/sebastienros/jint.git) <span class="shields"><img src="https://img.shields.io/github/stars/sebastienros/jint?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sebastienros/jint?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              53487 (`cloc Jint`)
* Language:         C#
* License:          BSD-2-Clause
* Standard:         ESnext (partial)
* Years:            2013-
* Runtime platform: .NET
* Interpeter:       tree walker

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: Error: Property 'toGMTString' of object is not a function
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: trailing comma does not throw SyntaxError
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 92%, Next 30%, Intl 100%</summary><ul>
<li>ES6: 96%, <b>2 crashes</b><pre>
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: Property 'compile' of object is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: Property 'anchor' of object is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: Property 'anchor' of object is not a function
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/const.no-redefine.js">const.no-redefine.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp.Symbol.replace.js">misc.Proxy.get.RegExp.Symbol.replace.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.split.js">misc.Proxy.get.String.split.js</a>: failed
<a href="../conformance/kangax-es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: crashed (signal 6)
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crashed (signal 6)
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 88%<pre>
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: failed
<a href="../conformance/kangax-es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
<a href="../conformance/kangax-es2017/async.await.js">async.await.js</a>: failed
<a href="../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 91%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Greek}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.js:10:29)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Extended_Pictographic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-11.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Elymaic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-12.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Chorasmian}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-13.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Vithkuqi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-14.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Unified_Ideograph}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.1.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: Error: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Kawi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: Error: Invalid regular expression: /\p{Script=Todhri}/u: Invalid property name (regex.unicode-property-escapes.unicode-16.0.js:10:11)
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: Error: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name (regex.unicode-property-escapes.unicode-17.0.js:10:11)
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
<li>ES2022: 98%<pre>
<a href="../conformance/kangax-es2022/at-method.Array.js">at-method.Array.js</a>: failed
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 76%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.constructor.js">regex.flags.v.constructor.js</a>: SyntaxError: Invalid regular expression flags (1:1)
<a href="../conformance/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: Error: Invalid regular expression flags (regex.flags.v.properties-of-strings.js:9:39)
<a href="../conformance/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: Error: Invalid regular expression flags (regex.flags.v.set-notations.js:9:43)
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: Error: Invalid regular expression flags (regex.flags.v.unicode-15.1.js:9:27)
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: Error: Invalid regular expression flags (regex.flags.v.unicode-16.0.js:9:27)
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: Error: Invalid regular expression flags (regex.flags.v.unicode-17.0.js:9:27)
</pre></li>
<li>ES2025: 79%<pre>
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: Error: Invalid regular expression: /^[a-z](?-i:[a-z])$/i: Invalid group (regex.pattern-modifiers.i.js:9:24)
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: Error: Invalid regular expression: /^a|(?m:^b)/: Invalid group (regex.pattern-modifiers.m.js:9:21)
<a href="../conformance/kangax-es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: Error: Invalid regular expression: /.(?-s:.)/s: Invalid group (regex.pattern-modifiers.s.js:9:19)
</pre></li>
<li>Next: 30%</li>
<li>Intl: 100%</li>
</ul></details>

💥 **2 crashes during testing**
