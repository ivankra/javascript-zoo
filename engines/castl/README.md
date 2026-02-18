# castl

Self-hosting JavaScript to Lua compiler with a runtime library and eval().

* Repository:       https://github.com/PaulBernier/castl.git <span class="shields"><img src="https://img.shields.io/github/stars/PaulBernier/castl?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/PaulBernier/castl?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              6366 (`cloc --not_match_d="(test|jscompile)" lua *.js`)
* Language:         Lua, JavaScript
* License:          LGPL-3.0-or-later
* Standard:         ES5
* Years:            2014-2017
* Type:             compiler to Lua
* Parser:           [Esprima](../../parsers/esprima/README.md) / [Acorn](../../parsers/acorn/README.md)
* Runtime platform: Lua (Lua 5.2 / LuaJIT)
* JIT:              via LuaJIT
* Regex engine:     PCRE

## Features

* Targets unmodified Lua 5.2 / LuaJIT runtime, unlike [Tessel Colony](../tessel-colony/README.md).
* Supports eval() through Lua-transpiled own code + Esprima parser.
* Some ES6 by optionally invoking babel during compilation.

## Quirks

Problems with large functions/modules due to 200 local variables limit on Lua's end.

## Conformance

<details><summary>ES1-ES5: 78%</summary><ul>
<li>ES1: 86%<pre>
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: failed
<a href="../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed; function with 0 params length failed; function with 1 param length failed; function with 3 params length failed
<a href="../conformance/es1/Number.js">Number.js</a>: Number() failed
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: failed
<a href="../conformance/es1/String.prototype.charCodeAt.js">String.prototype.charCodeAt.js</a>: charCodeAt out of bounds NaN failed
<a href="../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: lastIndexOf at start failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: failed
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: failed
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: failed
<a href="../conformance/es1/conversions.ToInteger.js">conversions.ToInteger.js</a>: NaN failed
<a href="../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: NaN failed; Infinity failed; -Infinity failed; 1e-7 failed
...
</pre></li>
<li>ES3: 84%<pre>
<a href="../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: max() with 0 args failed; max() with 1 arg failed
<a href="../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: min() with 0 args failed; min() with 1 arg failed
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: NaN failed; Infinity failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: failed
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: NaN failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: NaN failed; Infinity failed; small number exponential notation failed; zero failed
<a href="../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: ToString conversion failed
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: inherited property should be false failed; Array.length DontEnum failed; ToString conversion failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $nn 10 captures failed; $nn reverse order failed
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $` failed; $' failed; combined replacements failed
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0; 'tesst'.split(/(s)*/)[1] === 't'; 'test'.split(/(?:)/, -1).length !== 4; ''.split(/.?/).length !== 0; '.'.split(/()()/).length !== 1
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: split by empty regex failed
<a href="../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: no exception for new Array with negative length; no exception for new Array with non-integer length; no exception for new Array with length &gt;= 2^32; no exception for negative array length; no exception for array length exceeding 2^32-1
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: wrong exception type; wrong exception for unclosed string; wrong exception for invalid token
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: luajit: /zoo/conformance/es3/.global.TypeError.thrown.js.lua:123: syntax error near ';'
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for decodeURI incomplete escape; no exception for decodeURI invalid hex; no exception for decodeURI invalid UTF-8; no exception for decodeURIComponent incomplete escape; no exception for decodeURIComponent invalid hex; no exception for encodeURI lone low surrogate; no exception for enco
...
</pre></li>
<li>ES5: 45%</li>
</ul></details>

<details><summary>compat-table: ES6 9%, ES2016+ 5%, Next 0%, Intl 21%</summary><ul>
<li>ES6: 9%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 5%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 14%</li>
<li>Next: 0%</li>
<li>Intl: 21%</li>
</ul></details>
