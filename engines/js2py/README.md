# Js2Py

JavaScript interpreter written in Python.

* Repository:       [PiotrDabkowski/Js2Py](https://github.com/PiotrDabkowski/Js2Py.git) <span class="shields"><img src="https://img.shields.io/github/stars/PiotrDabkowski/Js2Py?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/PiotrDabkowski/Js2Py?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              69402 (`cloc js2py`)
* Language:         Python
* License:          MIT
* Standard:         ES5
* Years:            2014-2022
* Runtime platform: Python
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 88%</summary><ul>
<li>ES1: 96%<pre>
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: raise MakeError('TypeError', js2py.internals.simplex.JsException: TypeError: 'undefined' is not a function (tried calling property 'getYear' of 'Date')
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: raise MakeError('TypeError', js2py.internals.simplex.JsException: TypeError: 'undefined' is not a function (tried calling property 'setYear' of 'Date')
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: raise MakeError('TypeError', js2py.internals.simplex.JsException: TypeError: 'undefined' is not a function (tried calling property 'toGMTString' of 'Date')
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/numbers.fmod.js">numbers.fmod.js</a>: failed
<a href="../conformance/es1/with.js">with.js</a>: KeyError: b'\x8b"\x1e\x9bg\x1d\x00\xf3\xba|/\xdd\xcf?\xef\x0f' During handling of the above exception, another exception occurred: raise NotImplementedError('With statement not implemented!') NotImplementedError: With statement not implemented!
</pre></li>
<li>ES3: 91%<pre>
<a href="../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: NameError: name 'to' is not defined
<a href="../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: TypeError: 'float' object is not iterable
<a href="../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: TypeError: 'float' object is not iterable
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; zero failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0', got '1.25e+00'
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed; large number exponential notation failed
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for instanceof number; no exception for instanceof non-callable; raise TypeError('toString is not generic!') TypeError: toString is not generic!
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for decodeURI incomplete escape; no exception for decodeURI invalid hex; no exception for decodeURI invalid UTF-8; no exception for decodeURIComponent incomplete escape; no exception for decodeURIComponent invalid hex; string = string.encode(encoding, errors) UnicodeEncodeError: 'utf-8'
<a href="../conformance/es3/global.decodeURI.js">global.decodeURI.js</a>: # not decoded failed
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: raise MakeError('TypeError', js2py.internals.simplex.JsException: TypeError: Undefined and null dont have properties (tried getting property '0')
</pre></li>
<li>ES5: 62%<pre>
<a href="../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Date.now.js">Date.now.js</a>: Date.now() does not return a number
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: epoch date format incorrect; invalid date does not throw RangeError
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: invalid date does not return null; valid date format incorrect
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: raise MakeError('TypeError', js2py.internals.simplex.JsException: TypeError: Undefined and null don't have properties (tried setting property 'value')
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: parse object failed; parse null failed
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: NaN and Infinity not converted null
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: AttributeError: 'list' object has no attribute 'is_undefined'
<a href="../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: basic property names failed; non-enumerable property failed; only own properties failed
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: SyntaxError: duplicate argument 'x' in function definition
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 7%, ES2016+ 6%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 7%</li>
<li>ES2016: 0%</li>
<li>ES2017: 12%</li>
<li>ES2018: 5%</li>
<li>ES2019: 6%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 14%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
