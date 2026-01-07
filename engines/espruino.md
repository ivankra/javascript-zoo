# Espruino

Interpreter for a subset of JavaScript for Espruino microcontrollers.

* Homepage:    https://www.espruino.com/
* Repository:  https://github.com/espruino/Espruino.git <span class="shields"><img src="https://img.shields.io/github/stars/espruino/Espruino?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/espruino/Espruino?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         28365 (`cloc src`)
* Language:    C
* License:     MPL-2.0
* Standard:    no (can't run ES1)
* Years:       2013-
* Type:        JavaScript-like language
* Interpreter: interprets from source

## Conformance

<details><summary>ES1-ES5: 56%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/espruino.txt">Full log</a>.</li>
<li>ES1: 74%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array.length failed ; failed
<a href="../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: Uncaught TypeError: Assignment to a constant  Uncaught undefined
<a href="../conformance/es1/Array.length.js">Array.length.js</a>: Uncaught TypeError: Assignment to a constant  Uncaught undefined
<a href="../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed ; failed
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: Uncaught Error: Function "join" not found!  Uncaught undefined
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: Uncaught Error: Function "reverse" not found!  Uncaught undefined
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: Uncaught Error: Function "sort" not found!  Uncaught undefined
<a href="../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed ; new Boolean() failed ; failed
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed ; boolean instance constructor failed ; failed
<a href="../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string' ; failed
<a href="../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
<a href="../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: Uncaught Error: Function "UTC" not found!  Uncaught undefined
...
</pre></li>
<li>ES3: 45%</li>
<li>ES5: 30%</li>
</ul></details>
