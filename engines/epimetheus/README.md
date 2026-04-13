# Epimetheus

Netscape's experimental "JavaScript 2.0" implementation towards ES4 proposal.

* Homepage:   [mozilla.org/js/language/Epimetheus.html](http://www.mozilla.org/js/language/Epimetheus.html)
* Repository: [jrmuizel/mozilla-cvs-history](https://github.com/jrmuizel/mozilla-cvs-history.git) <span class="shields"><img src="https://img.shields.io/github/stars/jrmuizel/mozilla-cvs-history?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jrmuizel/mozilla-cvs-history?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [js2/](https://github.com/jrmuizel/mozilla-cvs-history/tree/master/js2/))
* LOC:        [41895](# "cloc js2/src")
* Language:   C++
* License:    MPL-1.1 OR GPL-2.0-or-later OR LGPL-2.1-or-later
* Org:        Mozilla
* Standard:   ES4 (draft)
* Years:      2000-2006

## Conformance

<details><summary>ES1-ES5: 63%</summary><ul>
<li>ES1: 81.8% (162/198)<pre>
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Function.prototype.js">Function.prototype.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: FAIL
<a href="../../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Number.NEGATIVE_INFINITY.js">Number.NEGATIVE_INFINITY.js</a>: FAIL
<a href="../../conformance/es1/Number.POSITIVE_INFINITY.js">Number.POSITIVE_INFINITY.js</a>: FAIL
<a href="../../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: FAIL: Object.prototype.constructor failed; object instance constructor failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/String.prototype.indexOf.js">String.prototype.indexOf.js</a>: FAIL: indexOf not found failed
<a href="../../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: FAIL: lastIndexOf not found failed
<a href="../../conformance/es1/String.prototype.split.js">String.prototype.split.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/arguments.js">arguments.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/asi.js">asi.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: TIMEOUT: &gt;10s
...
</pre></li>
<li>ES3: 63.5% (94/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: shift from object failed
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Function.prototype.call.js">Function.prototype.call.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: FAIL: max() with 0 args failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; negative number failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: FAIL: In Object.prototype.isPrototypeOf.js, line 14:; if (Child.prototype.isPrototypeOf(child)) {; [ERROR]if (Child.prototype.isPrototypeOf(child)) {; Bad Value error: undefined is not a function
...
</pre></li>
<li>ES5: 10.8% (8/74)</li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 1%, Next 3%, Intl 21%</summary><ul>
<li>ES5: 6.4%</li>
<li>ES6: 2.3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 21.4%</li>
</ul></details>
