# Wine JScript

Wine's open-source reimplementation of Microsoft's classic [JScript](jscript.md) engine.

* Repository: https://gitlab.winehq.org/wine/wine (source code in [dlls/jscript](https://gitlab.winehq.org/wine/wine/-/tree/master/dlls/jscript))
* GitHub:     https://github.com/wine-mirror/wine.git <span class="shields"><img src="https://img.shields.io/github/stars/wine-mirror/wine?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/wine-mirror/wine?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:        32084 (`cloc --not_match_d="(?i)(tests)" dlls/jscript`)
* Language:   C
* License:    LGPL-2.1-or-later
* Standard:   ES3
* Years:      2008-
* DLL:        jscript.dll

## Runtimes

* [cscript](https://github.com/wine-mirror/wine/tree/master/programs/cscript), [wscript](https://github.com/wine-mirror/wine/tree/master/programs/wscript)

## Conformance

<details><summary>ES1-ES5: 76%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/wine.txt">Full log</a>.</li>
<li>ES1: 95%<pre>
<a href="../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: failed
<a href="../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: failed
<a href="../conformance/es1/Number.NEGATIVE_INFINITY.js">Number.NEGATIVE_INFINITY.js</a>: failed
<a href="../conformance/es1/Number.NaN.js">Number.NaN.js</a>: failed
<a href="../conformance/es1/Number.POSITIVE_INFINITY.js">Number.POSITIVE_INFINITY.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: non-compliant, expected to return 100 instead of 2000
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: max safe integer failed ; failed
<a href="../conformance/es1/asi.js">asi.js</a>: error:71:5: Syntax error
<a href="../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: 1e21 failed ; 1e-7 failed ; failed
<a href="../conformance/es1/numbers.double.js">numbers.double.js</a>: failed: converting max safe integer + 1 to string ; failed
</pre></li>
<li>ES3: 84%<pre>
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed ; unshift multiple on object failed ; unshift on empty object failed ; failed
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift single element failed ; unshift multiple elements failed ; unshift on empty array failed ; unshift with no arguments failed ; failed
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed ; multiple elements unshift failed ; no arguments unshift failed ; failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2.5e+1') ; (1.255).toExponential(2) != '1.25e+0', got '1.26e+0' ; failed
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError ; toExponential(-Infinity) does not throw RangeError ; failed
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed ; rounding failed ; failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed ; failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: error:9:1:
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: Can't attach process 0614: error 5
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2 ; '.'.split(/(.?)(.?)/).length !== 4 ; failed
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: split with regex failed ; split with capturing group failed ; failed
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: negative start failed ; negative start with length failed ; failed
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: wrong exception for undeclared variable ; wrong exception for undeclared function ; no exception for undeclared in expression ; wrong exception for property access on undeclared ; failed
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: wrong exception for decodeURIComponent incomplete escape ; wrong exception for decodeURIComponent invalid hex ; failed
<a href="../conformance/es3/global.decodeURI.js">global.decodeURI.js</a>: # not decoded failed ; failed
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: error:17:5: Syntax error
<a href="../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: array with only elision failed ; failed
<a href="../conformance/es3/literals.array.trailing-comma.js">literals.array.trailing-comma.js</a>: [1,].length failed ; trailing comma failed ; multiple elements with trailing comma failed ; failed
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: error:16:11: Syntax error
<a href="../conformance/es3/literals.string.esc-v.js">literals.string.esc-v.js</a>: failed
...
</pre></li>
<li>ES5: 9%</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 3%, Intl 25%</summary><ul>
<li>ES6: 1%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Intl: 25%</li>
</ul></details>
