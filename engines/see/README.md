# SEE

Simple ECMAScript Engine.

* Homepage:    [adaptive-enterprises.com.au/~d/software/see](https://web.archive.org/web/20100328145240/http://www.adaptive-enterprises.com.au/~d/software/see/)
* GitHub:      [yujiabe/SEE](https://github.com/yujiabe/SEE) <span class="shields"><img src="https://img.shields.io/github/stars/yujiabe/SEE?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/yujiabe/SEE?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Sources:     [see-3.1.1424.tar.gz](https://web.archive.org/web/20090922234137/http://www.adaptive-enterprises.com.au/~d/software/see/see-3.1.1424.tar.gz)
* LOC:         [34022](# "cloc libsee include/see")
* Language:    C
* License:     BSD-3-Clause
* Standard:    ES3
* Years:       2003-2009
* Interpreter: stack-based VM
* GC:          Boehm GC

## Users

* [HV3](https://packages.debian.org/bullseye/hv3) browser

## Conformance

<details><summary>ES1-ES5: 80%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
</pre></li>
<li>ES3: 89%, <b>1 crash</b><pre>
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2.5e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.230e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.0e+0'); (1.255).toExponential(2) != '1.25e+0', got '1.30e+0'
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: exception: TypeError: Number.prototype.toExponential.throws-infinity.js:13: Object does not support the 'instanceof' operator
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed
<a href="../../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: Array index should be enumerable failed
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: crashed (signal 11)
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: no exception for negative array length; no exception for array length exceeding 2^32-1
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: exception: TypeError: :0: Value following 'in' is not an object
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: exception: SyntaxError: line 8: malformed unicode input
<a href="../../conformance/es3/instanceof.js">instanceof.js</a>: exception: TypeError: instanceof.js:9: Object does not support the 'instanceof' operator
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: exception: SyntaxError: line 9: malformed unicode input
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: exception: SyntaxError: line 13: malformed unicode input
<a href="../../conformance/es3/source.whitespace.js">source.whitespace.js</a>: exception: SyntaxError: line 12: malformed unicode input
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: exception: SyntaxError: line 8: malformed unicode input
</pre></li>
<li>ES5: 12%</li>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 2%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 0%, <b>2 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 8%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%, <b>3 crashes</b></li>
</ul></details>

💥 **6 crashes during testing**
