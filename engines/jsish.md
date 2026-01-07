# jsish

Buggy unfinished interpreter.

* Repository:   https://github.com/pcmacdon/jsish.git <span class="shields"><img src="https://img.shields.io/github/stars/pcmacdon/jsish?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/pcmacdon/jsish?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          50896 (`cloc src`)
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2020-2022
* Parser:       YACC
* Interpreter:  stack-based VM
* Regex engine: POSIX (vendored from musl)

## Quirks

Bugs in == (anything equals null/undefined), new (returns null sometimes), no ASI, no Date class.

## Conformance

<details><summary>ES1-ES5: 42%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/jsish.txt">Full log</a>.</li>
<li>ES1: 56%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array.js:12: "es1/Array.js: Array.length failed", Array.js:83:  "es1/Array.js: failed",
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor.js:11: "es1/Array.prototype.constructor.js: Array.prototype.constructor failed", Array.prototype.constructor.js:18:  "es1/Array.prototype.constructor.js: array instance constructor failed", Array.prototype.constructor.js:24:  "es1/Array.prototype.constructor.js: failed",
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: Array.prototype.join.generic.js:13: error: expected array object ERROR:
<a href="../conformance/es1/Array.prototype.join.js">Array.prototype.join.js</a>: Array.prototype.join.js:13: "es1/Array.prototype.join.js: join() without separator failed", Array.prototype.join.js:51:  "es1/Array.prototype.join.js: failed",
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: Array.prototype.reverse.generic.js:13: error: expected array ERROR:
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: Array.prototype.sort.generic.js:14: error: expected array object ERROR:
<a href="../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: Array.prototype.toString.js:13: "es1/Array.prototype.toString.js: numeric array toString failed", Array.prototype.toString.js:21:  "es1/Array.prototype.toString.js: string array toString failed", Array.prototype.toString.js:29:  "es1/Array.prototype.toString.js: empty array toString failed", Array.p
<a href="../conformance/es1/Boolean.js">Boolean.js</a>: Boolean.js:39: "es1/Boolean.js: new Boolean(true) failed", Boolean.js:47:  "es1/Boolean.js: new Boolean() failed", Boolean.js:60:  "es1/Boolean.js: failed",
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor.js:11: "es1/Boolean.prototype.constructor.js: Boolean.prototype.constructor failed", Boolean.prototype.constructor.js:18:  "es1/Boolean.prototype.constructor.js: boolean instance constructor failed", Boolean.prototype.constructor.js:24:  "es1/Boolean.prototype.construct
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: Date.diff.js:13: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.js">Date.js</a>: Date.js:9: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: Date.prototype.constructor.js:6: error: converting a undefined/null value to object ERROR:
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: Date.prototype.getDate.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: Date.prototype.getDay.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: Date.prototype.getFullYear.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: Date.prototype.getHours.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: Date.prototype.getMilliseconds.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: Date.prototype.getMinutes.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: Date.prototype.getMonth.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: Date.prototype.getSeconds.js:6: error: can not execute expression: 'Date' not a function ERROR:
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: Date.prototype.getTimezoneOffset.js:6: error: can not execute expression: 'Date' not a function ERROR:
...
</pre></li>
<li>ES3: 34%</li>
<li>ES5: 19%</li>
</ul></details>

<details><summary>compat-table: ES6 7%, ES2016+ 3%, Next 0%, Intl 11%</summary><ul>
<li>ES6: 7%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 5%</li>
<li>ES2019: 25%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 0%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 11%</li>
</ul></details>
