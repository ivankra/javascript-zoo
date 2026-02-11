# NiL.JS

JavaScript interpreter for .NET.

* Repository:       https://github.com/nilproject/NiL.JS.git <span class="shields"><img src="https://img.shields.io/github/stars/nilproject/NiL.JS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nilproject/NiL.JS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              42214 (`cloc NiL.JS`)
* Language:         C#
* License:          BSD-3-Clause
* Standard:         ES6
* Years:            2013-
* Runtime platform: .NET
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 96%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/niljs.txt">Full log</a>.</li>
<li>ES1: 98%<pre>
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/comments.js">comments.js</a>: NiL.JS.Core.JSException: SyntaxError: Invalid pattern '(*' at offset 2. Quantifier '*' following nothing.
<a href="../conformance/es1/conversions.js">conversions.js</a>: 123 != '0123'; 123.0 != '0123'
</pre></li>
<li>ES3: 94%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; zero failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-011'); (25).toExponential(0) != '3e+1' (got: '2.5e+001'); (12345).toExponential(3) != '1.235e+4' (got: '1.2e+004'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+000'); (1.255).toExponential(2) != '1.25e+0', got '1.3e+000'
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed; rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision(5) fixed notation failed; NiL.JS.Core.JSException: RangeError: toPrecision() argument must be between 1 and 100
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: NiL.JS.Core.JSException: TypeError: Cannot get prototype of null or undefined
<a href="../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: string with \d+ pattern failed; string with \w+ pattern failed; string with [0-9]+ pattern failed; string with \s pattern failed; string with \. pattern failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0; 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: NiL.JS.Core.JSException: SyntaxError: Unknown identifier "var" at (9:1) at NiL.JS.Core.Parser.Parse(ParseInfo state, Int32&amp; index, CodeFragmentType ruleSet, Boolean throwError) in /src/NiL.JS/Core/Parser.cs:line 983
</pre></li>
<li>ES5: 95%<pre>
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: NiL.JS.Core.JSException: RangeError: Invalid time value
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: NiL.JS.Core.JSException: SyntaxError: Invalid variable definition at (11:5) at NiL.JS.Core.Parser.Parse(ParseInfo state, Int32&amp; index, CodeFragmentType ruleSet, Boolean throwError) in /src/NiL.JS/Core/Parser.cs:line 976
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 44%, ES2016+ 19%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 44%, <b>1 crash</b></li>
<li>ES2016: 39%</li>
<li>ES2017: 18%</li>
<li>ES2018: 26%</li>
<li>ES2019: 18%</li>
<li>ES2020: 36%</li>
<li>ES2021: 0%</li>
<li>ES2022: 14%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 19%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **1 crash during testing**
