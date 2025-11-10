# Quanta

Buggy unfinished interpreter.

* Repository:   https://github.com/solarbrowser/quanta.git <span class="shields"><img src="https://img.shields.io/github/stars/solarbrowser/quanta?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/solarbrowser/quanta?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          42129 (`cloc .`)
* Language:     C++
* License:      MPL-2.0
* Standard:     no (can't run ES1)
* Years:        2025-
* Interpreter:  tree walker
* Regex engine: std::regex

## Conformance

<details><summary>ES1-ES5: 46%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/quanta.txt">Full log</a>.</li>
<li>ES1: 52%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed; array instance constructor failed
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: SyntaxError: Unexpected token:
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: failed
<a href="../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: failed
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'; new Date(2000, 0, 1).getFullYear() != 2000; new Date(2000, 0, 1).getMonth() != 0; new Date(2000, 0, 1).getDate() != 1; new Date(0).getTime() != 0
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: failed
...
</pre></li>
<li>ES3: 50%<pre>
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: failed
<a href="../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; NaN failed; zero failed; Infinity failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0', got '1.25e+00'
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: NaN failed; rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: NaN failed; Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: failed
...
</pre></li>
<li>ES5: 23%, <b>1 crash</b><br>
</ul></details>

<details><summary>compat-table: ES6 23%, ES2016+ 16%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 23%, <b>4 crashes</b><br>
<li>ES2016: 21%<br>
<li>ES2017: 22%<br>
<li>ES2018: 21%<br>
<li>ES2019: 12%<br>
<li>ES2020: 26%<br>
<li>ES2021: 14%<br>
<li>ES2022: 3%<br>
<li>ES2023: 0%<br>
<li>ES2024: 0%<br>
<li>ES2025: 18%<br>
<li>Next: 0%<br>
<li>Intl: 0%<br>
</ul></details>

💥 **5 crashes during testing**
