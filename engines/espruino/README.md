# Espruino

Interpreter for a subset of JavaScript for Espruino microcontrollers.

* Homepage:    [espruino.com](https://www.espruino.com/)
* Repository:  [espruino/Espruino](https://github.com/espruino/Espruino.git) <span class="shields"><img src="https://img.shields.io/github/stars/espruino/Espruino?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/espruino/Espruino?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [28365](# "cloc src")
* Language:    C
* License:     MPL-2.0
* Standard:    no (can't run ES1)
* Years:       2013-
* Type:        JavaScript-like language
* Interpreter: interprets from source

## Conformance

<details><summary>ES1-ES5: 56%</summary><ul>
<li>ES1: 74%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../../conformance/es1/Array.length.assignment.js">Array.length.assignment.js</a>: TypeError: Assignment to a constant
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: TypeError: Assignment to a constant
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: Function "join" not found!
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: Function "reverse" not found!
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: Function "sort" not found!
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: Function "UTC" not found!
<a href="../../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: Function "UTC" not found!
...
</pre></li>
<li>ES3: 45%</li>
<li>ES5: 30%</li>
</ul></details>
