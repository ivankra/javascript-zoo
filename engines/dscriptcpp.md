# DscriptCPP

[DMDScript](dmdscript.md) version implemented in C++.

* Homepage:    https://www.digitalmars.com/dscript/cppscript.html
* Repository:  https://github.com/DigitalMars/DscriptCPP.git <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DscriptCPP?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         43988 (`cloc src`)
* Language:    C++
* License:     BSL-1.0
* Org:         Digital Mars
* Standard:    ES3
* Years:       2000
* Interpreter: register-based VM ([opcodes.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/opcodes.c))

## Notes

Hacky non-portable x86-only C++ implementation (inline assembly in gccbitops.h, Gcx::fullcollectshell(), GC that wants to scan stack, compiler-dependent vtable hack etc). Non-trivial effort needed to port it even to x64.

## Links

* https://news.ycombinator.com/item?id=45509636

## Conformance

<details><summary>ES1-ES5: 74%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/dscriptcpp.txt">Full log</a>.</li>
<li>ES1: 97%<pre>
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: numeric sort failed; string sort failed; sort with comparefn failed; reverse comparefn failed
<a href="../conformance/es1/Object.prototype.toString.js">Object.prototype.toString.js</a>: failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: non-compliant, expected to return 100 instead of 2000
<a href="../conformance/es1/asi.js">asi.js</a>: Exception: can't Put(0, 1) to a primitive N
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 78%, <b>3 crashes</b><pre>
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; zero failed; small number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6e-10'); (12345).toExponential(3) != '1.235e+4' (got: '1e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1e+0'); (1.255).toExponential(2) != '1.25e+0', got '1e+0'
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: small number exponential notation failed; large number exponential notation failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: basic toLocaleString failed; toLocaleString should equal toString failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: spec example failed
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $$ failed; combined replacements failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: Exception: Error compiling regular expression
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: Exception: Error compiling regular expression
<a href="../conformance/es3/function-expressions.IIFE.js">function-expressions.IIFE.js</a>: Exception: (8) : Error: cannot assign to f
<a href="../conformance/es3/function-expressions.js">function-expressions.js</a>: crashed (signal 11); assert fail: src/dscript/value.c(176)
<a href="../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: wrong exception for negative array length; wrong exception for array length exceeding 2^32-1
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: no exception for undeclared variable; wrong exception for undeclared function; no exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: Exception: (91) : Error: cannot assign to 1
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: Exception: identifiers.unicode.js(8) : Error: unsupported char 0xd0
<a href="../conformance/es3/in.js">in.js</a>: crashed (signal 11)
<a href="../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: array with only elision failed
<a href="../conformance/es3/literals.array.trailing-comma.js">literals.array.trailing-comma.js</a>: [1,].length failed; trailing comma failed; multiple elements with trailing comma failed
<a href="../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: Exception: literals.object.decimal.js(9) : Error: identifier expected
<a href="../conformance/es3/literals.object.hex.js">literals.object.hex.js</a>: Exception: literals.object.hex.js(9) : Error: identifier expected
<a href="../conformance/es3/literals.object.int.js">literals.object.int.js</a>: Exception: literals.object.int.js(9) : Error: identifier expected
...
</pre></li>
<li>ES5: 5%</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 1%, Next 3%, Intl 25%</summary><ul>
<li>ES6: 1%, <b>6 crashes</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 0%, <b>1 crash</b></li>
<li>ES2018: 0%</li>
<li>ES2019: 12%</li>
<li>ES2020: 0%, <b>1 crash</b></li>
<li>ES2021: 0%</li>
<li>ES2022: 0%, <b>9 crashes</b></li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 3%, <b>1 crash</b></li>
<li>Intl: 25%</li>
</ul></details>

💥 **23 crashes during testing**
