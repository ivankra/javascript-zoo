# cesanta/v7

JavaScript engine for microcontrollers.

* Repository:  [cesanta/v7](https://github.com/cesanta/v7.git) <span class="shields"><img src="https://img.shields.io/github/stars/cesanta/v7?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/cesanta/v7?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [24811](# "cloc v7.c v7.h")
* Language:    C
* License:     GPL-2.0-only
* Standard:    ES5 (subset)
* Years:       2013-2017
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 70%</summary><ul>
<li>ES1: 82%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: new Array(len) failed; Array(len) failed
<a href="../../conformance/es1/Array.length.js">Array.length.js</a>: new Array(len) length failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: failed
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: Exec error [Date.prototype.getUTCDate.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Exec error [Date.prototype.getUTCDay.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: Exec error [Date.prototype.getUTCFullYear.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: Exec error [Date.prototype.getUTCHours.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: Exec error [Date.prototype.getUTCMilliseconds.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: Exec error [Date.prototype.getUTCMinutes.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: Exec error [Date.prototype.getUTCMonth.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: Exec error [Date.prototype.getUTCSeconds.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: Exec error [Date.prototype.setUTCDate.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: Exec error [Date.prototype.setUTCFullYear.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: Exec error [Date.prototype.setUTCHours.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: Exec error [Date.prototype.setUTCMilliseconds.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: Exec error [Date.prototype.setUTCMinutes.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: Exec error [Date.prototype.setUTCMonth.js]: "Date.now() called on object"
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: Exec error [Date.prototype.setUTCSeconds.js]: "Date.now() called on object"
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: Function.prototype.constructor failed; function instance constructor failed
<a href="../../conformance/es1/Object.js">Object.js</a>: Exec error [Object.js]: "cannot read property 'a' of undefined"
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: Exec error [annex-b.Date.prototype.getYear.js]: "d.getYear is not a function"
...
</pre></li>
<li>ES3: 66%, <b>1 crash</b><pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: Exec error [Array.prototype.pop.generic.js]: "splice is not a function"
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: push to object failed; push multiple to empty object failed; push no args to object failed
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: push with no arguments failed; push to non-empty array failed
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: Exec error [Array.prototype.shift.generic.js]: "splice is not a function"
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: delete on object failed; insert on object failed; negative start on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: Exec error [Array.prototype.toLocaleString.js]: "a1.toLocaleString is not a function"
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: Exec error [Array.prototype.unshift.generic.js]: "cannot read property 'call' of undefined"
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: Exec error [Array.prototype.unshift.js]: "a1.unshift is not a function"
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: Exec error [Array.prototype.unshift.returns-new-length.js]: "unshift is not a function"
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: max() with 0 args failed; max() with NaN failed
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: min() with 0 args failed; min() with NaN failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; NaN failed; zero failed; Infinity failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0', got '1.26e+00'
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: NaN failed; large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: Exec error [Number.prototype.toLocaleString.js]: "n1.toLocaleString is not a function"
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision(5) fixed notation failed; toPrecision() undefined arg failed; NaN failed; Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: Exec error [Object.prototype.toLocaleString.js]: "o1.toLocaleString is not a function"
<a href="../../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: input failed
...
</pre></li>
<li>ES5: 46%</li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 4%, Next 0%, Intl 14%</summary><ul>
<li>ES6: 2%</li>
<li>ES2016: 9%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 8%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 14%</li>
</ul></details>

💥 **1 crash during testing**
