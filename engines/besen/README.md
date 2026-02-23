# BESEN

JIT-enabled ES5 engine written in Object Pascal.

* Repository:  [BeRo1985/besen](https://github.com/BeRo1985/besen.git) <span class="shields"><img src="https://img.shields.io/github/stars/BeRo1985/besen?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/BeRo1985/besen?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [57192](# "cloc src")
* Language:    Pascal
* License:     LGPL-2.1 (with static linking exception)
* Standard:    ES5
* Years:       2009-2020
* Features:    PIC
* Interpreter: register-based VM
* JIT:         context-threaded JIT, x86/x64

## Conformance

<details><summary>ES1-ES5: 91%</summary><ul>
<li>ES1: 94%<pre>
<a href="../conformance/es1/Date.js">Date.js</a>: new Date(2000, 0, 1).getFullYear() != 2000; new Date(2000, 0, 1).getMonth() != 0; new Date(2000, 0, 1).getDate() != 1
<a href="../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: failed
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Bad number literal
<a href="../conformance/es1/asi.js">asi.js</a>: SyntaxError: Illegal line terminator before postfix increment
<a href="../conformance/es1/numbers.fmod.js">numbers.fmod.js</a>: -5.5 % 2.5 sign failed
</pre></li>
<li>ES3: 88%<pre>
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: No string
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: unshift single element failed; unshift multiple elements failed; unshift on empty array failed; unshift with no arguments failed
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: empty array unshift failed; multiple elements unshift failed; no arguments unshift failed
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: zero failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.2341235e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.213e+0')
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: toPrecision() undefined arg failed; small number exponential notation failed; zero failed
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: global match failed; multiple global matches failed
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: timeout
<a href="../conformance/es3/global.decodeURI.js">global.decodeURI.js</a>: decode plain URI failed; # not decoded failed; reserved URI characters preserved failed
<a href="../conformance/es3/global.encodeURIComponent.js">global.encodeURIComponent.js</a>: encode UTF-8 failed; encode reserved chars failed
<a href="../conformance/es3/global.encodeURI.js">global.encodeURI.js</a>: encode UTF-8 failed
<a href="../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: property name 1.5 failed; property name 3.14 failed
<a href="../conformance/es3/regex.flag.global.js">regex.flag.global.js</a>: global match failed; multiple matches failed
<a href="../conformance/es3/regex.flag.multiline.js">regex.flag.multiline.js</a>: $ before LF failed
</pre></li>
<li>ES5: 88%<pre>
<a href="../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: TypeError: Bad argument
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: timeout
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: failed to drop undefined/function values
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: timeout
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: timeout
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: timeout
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: timeout
</pre></li>
</ul></details>
