# Epimetheus

Netscape's experimental "JavaScript 2.0" implementation towards ES4 proposal.

* Homepage:   [mozilla.org/js/language/Epimetheus.html](http://www.mozilla.org/js/language/Epimetheus.html)
* Repository: [jrmuizel/mozilla-cvs-history](https://github.com/jrmuizel/mozilla-cvs-history.git) <span class="shields"><img src="https://img.shields.io/github/stars/jrmuizel/mozilla-cvs-history?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/jrmuizel/mozilla-cvs-history?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * Source code in [js2/](https://github.com/jrmuizel/mozilla-cvs-history/tree/master/js2/) tree.
* LOC:        41895 (`cloc js2/src`)
* Language:   C++
* License:    MPL-1.1 OR GPL-2.0-or-later OR LGPL-2.1-or-later
* Org:        Mozilla
* Standard:   ES4 (draft)
* Years:      2000-2006

## Conformance

<details><summary>ES1-ES5: 62%</summary><ul>
<li>ES1: 81%<pre>
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: timeout
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: timeout
<a href="../conformance/es1/Function.length.js">Function.length.js</a>: timeout
<a href="../conformance/es1/Function.prototype.js">Function.prototype.js</a>: timeout
<a href="../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: timeout
<a href="../conformance/es1/Math.acos.js">Math.acos.js</a>: failed
<a href="../conformance/es1/Math.log.js">Math.log.js</a>: failed
<a href="../conformance/es1/Math.pow.js">Math.pow.js</a>: failed
<a href="../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: failed
<a href="../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: timeout
<a href="../conformance/es1/Number.NEGATIVE_INFINITY.js">Number.NEGATIVE_INFINITY.js</a>: failed
<a href="../conformance/es1/Number.POSITIVE_INFINITY.js">Number.POSITIVE_INFINITY.js</a>: failed
<a href="../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: Object.prototype.constructor failed; object instance constructor failed
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: timeout
<a href="../conformance/es1/String.prototype.indexOf.js">String.prototype.indexOf.js</a>: indexOf not found failed
<a href="../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: lastIndexOf not found failed
<a href="../conformance/es1/String.prototype.split.js">String.prototype.split.js</a>: timeout
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: timeout
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: timeout
<a href="../conformance/es1/arguments.js">arguments.js</a>: timeout
...
</pre></li>
<li>ES3: 64%, <b>2 crashes</b><pre>
<a href="../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: timeout
<a href="../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: timeout
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: shift from object failed
<a href="../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: timeout
<a href="../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: timeout
<a href="../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: timeout
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: timeout
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: timeout
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: timeout
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: timeout
<a href="../conformance/es3/Function.prototype.call.js">Function.prototype.call.js</a>: timeout
<a href="../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: max() with 0 args failed
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: ';.7959e+304')
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: timeout
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: toFixed(2) failed; toFixed(0) failed; toFixed() undefined arg failed; negative number failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision(5) fixed notation failed; toPrecision() undefined arg failed; small number exponential notation failed
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: [ERROR]if (Child.prototype.isPrototypeOf(child)) { Bad Value error: undefined is not a function
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: [ERROR]var s1 = o1.toLocaleString(); Bad Value error: undefined is not a function
...
</pre></li>
<li>ES5: 11%, <b>3 crashes</b></li>
</ul></details>

💥 **5 crashes during testing**
