# SpiderMonkey 1.8.5

First ES5-compliant version. Shipped in Firefox 4.0 (2011).

* Homepage:     [archive.org](https://web.archive.org/web/20210420113930/https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/1.8.5)
* Sources:      [js185-1.0.0.tar.gz](https://archive.mozilla.org/pub/js/js185-1.0.0.tar.gz)
* LOC:          [219941](# "cloc --fullpath --not_match_f='(test|/(v8|t|ctypes|metrics)/|configure)' js-1.8.5/js/src")
* Language:     C++
* License:      MPL-2.0
* Org:          Mozilla
* Standard:     ES5
* Years:        2011
* Features:     PIC
* Interpreter:  stack-based VM
* JIT:          TraceMonkey tracing JIT, JägerMonkey method JIT, x86/x64, arm, sparc
* Regex engine: YARR, JIT-enabled

## Conformance

<details><summary>ES1-ES5: 96%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 95%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: identifiers.unicode.js:8: SyntaxError: illegal character:
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: literals.object.unicode.js:9: SyntaxError: missing : after property id:
<a href="../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: source.line-terminators.js:13: SyntaxError: illegal character:
<a href="../conformance/es3/source.whitespace.js">source.whitespace.js</a>: source.whitespace.js:12: SyntaxError: missing ; before statement:
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: source.whitespace.unicode.js:8: SyntaxError: illegal character:
</pre></li>
<li>ES5: 89%<pre>
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: escape sequences failed
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer function failed
<a href="../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: source.whitespace.bom.js:1: SyntaxError: illegal character:
<a href="../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: source.zero-width-chars.js:11: SyntaxError: illegal character:
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 9%, ES2016+ 3%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 9%</li>
<li>ES2016: 0%</li>
<li>ES2017: 6%</li>
<li>ES2018: 0%</li>
<li>ES2019: 8%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
