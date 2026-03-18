# topchetoeu

Unfinished ES5 interpreter written in Java.

* Repository:       [git.topcheto.eu/topchetoeu/j2s](https://git.topcheto.eu/topchetoeu/j2s)
* GitHub:           [TopchetoEU/jscript](https://github.com/TopchetoEU/jscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/TopchetoEU/jscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/TopchetoEU/jscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [15692](# "cloc --not_match_d='(test)' */src")
* Language:         Java
* License:          MIT
* Standard:         ES5 (partial)
* Years:            2023-2025
* Runtime platform: Java

## Conformance

<details><summary>ES1-ES5: 52%</summary><ul>
<li>ES1: 53%<pre>
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: java.lang.ClassCastException: class me.topchetoeu.j2s.runtime.values.objects.ObjectValue cannot be cast to class me.topchetoeu.j2s.runtime.values.objects.ArrayValue (me.topchetoeu.j2s.runtime.values.o...
<a href="../../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: numeric array toString failed; string array toString failed; empty array toString failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: failed
<a href="../../conformance/es1/Date.js">Date.js</a>: Function cannot be applied
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: Value is not a function
...
</pre></li>
<li>ES3: 55%<pre>
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: push to object failed; push multiple to empty object failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: insert on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: Value is not a function
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Value is not a function
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: Value is not a function
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: java.lang.ClassCastException: class me.topchetoeu.j2s.runtime.values.primitives.VoidValue cannot be cast to class me.topchetoeu.j2s.runtime.values.objects.ArrayLikeValue (me.topchetoeu.j2s.runtime.val...
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: isNaN is not defined
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: isNaN is not defined
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: Value is not a function
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: Value is not a function
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: Value is not a function
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: Value is not a function
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: Value is not a function
<a href="../../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: Value is not a function
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: Value is not a function
...
</pre></li>
<li>ES5: 46%</li>
</ul></details>

<details><summary>compat-table: ES6 17%, ES2016+ 6%, Next 0%, Intl 0%</summary><ul>
<li>ES6: 17%</li>
<li>ES2016: 0%</li>
<li>ES2017: 12%</li>
<li>ES2018: 5%</li>
<li>ES2019: 17%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 7%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>
