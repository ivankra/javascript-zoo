# MuJS

Embeddable JavaScript engine from MuPDF.

* Homepage:    [mujs.com](https://mujs.com/)
* Repository:  [mujs](https://codeberg.org/ccxvii/mujs.git) <span class="shields"><img src="https://img.shields.io/gitea/stars/ccxvii/mujs?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Stars" title="Stars"><img src="https://img.shields.io/gitea/last-commit/ccxvii/mujs?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Last commit" title="Last commit"></span>
* GitHub:      https://github.com/ccxvii/mujs.git <span class="shields"><img src="https://img.shields.io/github/stars/ccxvii/mujs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ccxvii/mujs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         18490 (`cloc *.c *.h`)
* Language:    C
* License:     ISC
* Standard:    ES5
* Years:       2013-
* Interpreter: stack-based VM

## Users

* [MuPDF](https://github.com/ArtifexSoftware/mupdf)
* [SumatraPDF](https://github.com/sumatrapdfreader/sumatrapdf)
* [mpv](https://github.com/mpv-player/mpv/blob/master/DOCS/man/javascript.rst) - for scripting with JS, as alternative to Lua
* [Elinks](https://github.com/rkd77/elinks) browser - can be configured to use SpiderMonkey, QuickJS or MuJS
* [jSH](https://github.com/SuperIlu/jSH) - JavaScript engine for MS-DOS

## Conformance

<details><summary>ES1-ES5: 91%</summary><ul>
<li>ES1: 96%<pre>
<a href="../conformance/es1/Array.js">Array.js</a>: Array.length failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not callable
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not callable
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not callable
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: 'escape' is not defined
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: 'unescape' is not defined
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: annex-b.literals.octal.js:14: number with leading zeroundefined
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
</pre></li>
<li>ES3: 88%<pre>
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: empty array toLocaleString failed; multiple elements content failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RangeError: precision 0 out of range
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: Array index should be enumerable failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: index failed
<a href="../conformance/es3/String.prototype.concat.js">String.prototype.concat.js</a>: concat with no arguments failed
<a href="../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: non-global match failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: undefined is not callable
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for decodeURI invalid UTF-8; no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../conformance/es3/regex.disjunction.js">regex.disjunction.js</a>: complex disjunction failed
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: spec example failed
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: source.whitespace.unicode.js:8: unexpected character: \u2000undefined
</pre></li>
<li>ES5: 86%<pre>
<a href="../conformance/es5/Object.getOwnPropertyDescriptor.js">Object.getOwnPropertyDescriptor.js</a>: inherited property failed
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: source.zero-width-chars.js:11: unexpected character: \u200Cundefined
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 2%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 1%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 6%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
