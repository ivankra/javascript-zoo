# jsish

Buggy unfinished interpreter.

* Repository:   [pcmacdon/jsish](https://github.com/pcmacdon/jsish.git) <span class="shields"><img src="https://img.shields.io/github/stars/pcmacdon/jsish?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/pcmacdon/jsish?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [50896](# "cloc src")
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

<details><summary>ES1-ES5: 41%</summary><ul>
<li>ES1: 56%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed; array instance constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: expected array object
<a href="../../conformance/es1/Array.prototype.join.js">Array.prototype.join.js</a>: join() without separator failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: expected array
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: expected array object
<a href="../../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: numeric array toString failed; string array toString failed; empty array toString failed
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.js">Date.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: converting a undefined/null value to object
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: can not execute expression: 'Date' not a function
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: can not execute expression: 'Date' not a function
...
</pre></li>
<li>ES3: 33%</li>
<li>ES5: 19%</li>
</ul></details>

<details><summary>compat-table: ES6 6%, ES2016+ 3%, Next 0%, Intl 11%</summary><ul>
<li>ES6: 6%</li>
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
