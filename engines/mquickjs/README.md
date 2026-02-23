# MicroQuickJS

JavaScript engine targetted at embedded systems.

* Homepage:   [bellard.org/mquickjs](https://bellard.org/mquickjs/)
* Repository: [bellard/mquickjs](https://github.com/bellard/mquickjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/bellard/mquickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/bellard/mquickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        23653 (`cloc *.c *.h`)
* Language:   C
* License:    MIT
* Standard:   ES5 (subset)
* Years:      2025-
* GC:         tracing GC

## Conformance

<details><summary>ES1-ES5: 56%</summary><ul>
<li>ES1: 63%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: TypeError: invalid array subscript
<a href="../conformance/es1/Array.length.js">Array.length.js</a>: TypeError: invalid array subscript
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: not an array
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: not an array
<a href="../conformance/es1/Boolean.js">Boolean.js</a>: TypeError: Boolean constructor not supported
<a href="../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: TypeError: Boolean constructor not supported
<a href="../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: TypeError: Boolean constructor not supported
<a href="../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: TypeError: Boolean constructor not supported
<a href="../conformance/es1/Date.diff.js">Date.diff.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.js">Date.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: TypeError: not a function
...
</pre></li>
<li>ES3: 61%<pre>
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: TypeError: invalid array subscript
<a href="../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: not a function
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: not an array
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: TypeError: only Date.now() is supported
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: TypeError: not an Error object at &lt;eval&gt; (Error.prototype.message.js:6:27)
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: TypeError: not an array
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: SyntaxError: catch variable already exists
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: SyntaxError: catch variable already exists
<a href="../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: TypeError: not a function
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: TypeError: not a function
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: TypeError: not a function
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: not a function
...
</pre></li>
<li>ES5: 30%</li>
</ul></details>
