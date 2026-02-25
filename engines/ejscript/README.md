# Ejscript

Embeddable JavaScript engine.

* Homepage:     [embedthis.com/ejscript/doc](https://www.embedthis.com/ejscript/doc/)
* Repository:   [embedthis/ejscript](https://github.com/embedthis/ejscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/embedthis/ejscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/embedthis/ejscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [106690](# "cloc --not_match_d='(?i)(test|pcre|zlib|ejs.web)' src")
* Language:     C
* License:      GPL-2.0-only
* Standard:     ES4 (ES3 + some ES4 draft features)
* Years:        2003-2014
* Regex engine: PCRE2

## Users

* [Samba](https://www.samba.org/~jelmer/samba4-status-xp08.pdf): used until ~2008 for scripting, replaced by Python.

## References

* https://web.archive.org/web/20080224023359/http://www.mbedthis.com/products/appWeb/doc/common/ejs/overview.html
* https://web.archive.org/web/20140919061757/http://ejscript.org/index.html

## Conformance

<details><summary>ES1-ES5: 59%</summary><ul>
<li>ES1: 75%, <b>4 crashes</b><pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: Array.prototype.constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es1/Array.prototype.join.js">Array.prototype.join.js</a>: join() without separator failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: sort with comparefn failed; reverse comparefn failed
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Boolean.prototype.constructor failed
<a href="../../conformance/es1/Date.js">Date.js</a>: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: failed
<a href="../../conformance/es1/Function.js">Function.js</a>: crashed (signal 11)
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: Function.prototype.constructor failed
<a href="../../conformance/es1/Number.js">Number.js</a>: new Number(value) failed; new Number() failed
<a href="../../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: Number.prototype.constructor failed
<a href="../../conformance/es1/Object.prototype.valueOf.js">Object.prototype.valueOf.js</a>: valueOf property access failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: charAt failed; charCodeAt failed; indexOf failed; lastIndexOf failed; split failed; substring failed; toLowerCase failed; toUpperCase failed
<a href="../../conformance/es1/String.js">String.js</a>: 15.5.2.1 new String(value) failed; 15.5.2.2 new String() failed
<a href="../../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: String.prototype.constructor failed
<a href="../../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: lastIndexOf with position failed
...
</pre></li>
<li>ES3: 52%, <b>8 crashes</b><pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: crashed (signal 11)
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: crashed (signal 11); Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed at src/core/src/ejsArray.c:1084 push to object failed; Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed at src/core/src/ejsArray.c:1084 push multiple to empty object failed; Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed a
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: crashed (signal 11)
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: splice on empty array failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed at src/core/src/ejsArray.c:1516 unshift on object failed; Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed at src/core/src/ejsArray.c:1516 unshift multiple on object failed; Assertion argc == 1 &amp;&amp; ejsIs(ejs, argv[0], Array), failed a
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift single element failed; unshift multiple elements failed; unshift on empty array failed; unshift with no arguments failed
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed; multiple elements unshift failed; no arguments unshift failed
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: failed
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: ejs: ArgError: Insufficient actual parameters 1. Call requires 2 parameter(s).
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: ejs: ArgError: Insufficient actual parameters 0. Call requires 2 parameter(s).
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: ejs: ArgError: Insufficient actual parameters 0. Call requires 2 parameter(s).
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: zero failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-11'); (25).toExponential(0) != '3e+1' (got: '2.5e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed; zero failed; large number exponential notation failed
...
</pre></li>
<li>ES5: 32%, <b>1 crash</b></li>
</ul></details>

💥 **13 crashes during testing**
