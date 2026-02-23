# SpiderMonkey 1.5

First ES3-compliant version. Shipped in Netscape Navigator 6.0 (2000) and Firefox 1.0 (2004).

* Homepage:    [archive.org](https://web.archive.org/web/20210420113930/https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/1.5)
* Sources:     https://archive.mozilla.org/pub/js/older-packages/js-1.5.tar.gz
* LOC:         77008 (`cloc js/src`)
* Language:    C
* License:     MPL-2.0
* Org:         Mozilla
* Standard:    ES3, JS1.5
* Years:       2000
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 82%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 92%, <b>1 crash</b><pre>
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: new RegExp failed; RegExp as function failed
<a href="../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: crashed (signal 11)
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4; '.'.split(/()()/).length !== 1
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for instanceof non-callable
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: identifiers.unicode.js:8: SyntaxError: illegal character:
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: literals.object.unicode.js:9: SyntaxError: illegal character:
<a href="../conformance/es3/literals.regex.js">literals.regex.js</a>: failed
<a href="../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: source.line-terminators.js:13: SyntaxError: illegal character:
<a href="../conformance/es3/source.whitespace.js">source.whitespace.js</a>: source.whitespace.js:12: SyntaxError: missing ; before statement:
<a href="../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: source.whitespace.unicode.js:8: SyntaxError: illegal character:
</pre></li>
<li>ES5: 14%</li>
</ul></details>

<details><summary>compat-table: ES6 3%, ES2016+ 2%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **1 crash during testing**
