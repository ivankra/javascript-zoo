# Jint

JavaScript interpreter for .NET.

* Repository:       [sebastienros/jint](https://github.com/sebastienros/jint.git) <span class="shields"><img src="https://img.shields.io/github/stars/sebastienros/jint?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sebastienros/jint?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [53487](# "cloc Jint")
* Language:         C#
* License:          BSD-2-Clause
* Standard:         ESnext (partial)
* Years:            2013-
* Runtime platform: .NET
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 100%</li>
<li>ES5: 99%<pre>
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: trailing comma does not throw SyntaxError
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 96%, Next 64%, Intl 100%</summary><ul>
<li>ES6: 98%, <b>2 crashes</b><pre>
<a href="../../conformance/compat-table/es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: crashed: SIGABRT
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crashed: SIGABRT
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 91%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Greek}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.js:10:29)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Extended_Pictographic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-11....
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Elymaic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-12.js:10:1...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Chorasmian}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-13.js:1...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Vithkuqi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-14.js:10:...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Unified_Ideograph}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.1.js...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Kawi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.js:10:11)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Todhri}/u: Invalid property name (regex.unicode-property-escapes.unicode-16.0.js:10:11)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name (regex.unicode-property-escapes.unicode-17.0.js:10:11)
</pre></li>
<li>ES2019: 89%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 76%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.constructor.js">regex.flags.v.constructor.js</a>: SyntaxError: Invalid regular expression flags (1:1)
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.properties-of-strings.js:9:39)
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.set-notations.js:9:43)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-15.1.js:9:27)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-16.0.js:9:27)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-17.0.js:9:27)
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 64%<pre>
<a href="../../conformance/compat-table/next/Array.isTemplateObject.js">Array.isTemplateObject.js</a>: TypeError: Property 'isTemplateObject' of object is not a function
<a href="../../conformance/compat-table/next/Map.prototype.upsert.js">Map.prototype.upsert.js</a>: TypeError: Property 'upsert' of object is not a function
<a href="../../conformance/compat-table/next/WeakMap.prototype.upsert.js">WeakMap.prototype.upsert.js</a>: TypeError: Property 'upsert' of object is not a function
<a href="../../conformance/compat-table/next/class-decorators.js">class-decorators.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/compat-table/next/function.sent.js">function.sent.js</a>: SyntaxError: Unexpected token '.' (function.sent.js:11:22)
<a href="../../conformance/compat-table/next/throw-expr.arrow.js">throw-expr.arrow.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.arrow.js:9:18)
<a href="../../conformance/compat-table/next/throw-expr.conditional.js">throw-expr.conditional.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.conditional.js:9:15)
<a href="../../conformance/compat-table/next/throw-expr.logical.js">throw-expr.logical.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.logical.js:11:15)
<a href="../../conformance/compat-table/next/throw-expr.param-init.js">throw-expr.param-init.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.param-init.js:9:22)
</pre></li>
<li>Intl: 100%</li>
</ul></details>

💥 **2 crashes during testing**
