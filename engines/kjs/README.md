# KJS

Original JavaScript engine of KDE's Konqueror browser.

* Homepage:     https://invent.kde.org/frameworks/kjs
* Repository:   https://github.com/KDE/kjs.git <span class="shields"><img src="https://img.shields.io/github/stars/KDE/kjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/KDE/kjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          42352 (`cloc src`)
* Language:     C++
* License:      LGPL-2.1-only (most source files are LGPL 2.0+)
* Org:          KDE
* Standard:     ES5
* Years:        1998-2023
* Interpreter:  tree walker, register-based VM (2008)
* Regex engine: PCRE2

## History

* 2001: KHTML/KJS forked by Apple as WebCore/[JavaScriptCore](../jsc/README.md) for their WebKit browser engine.
* 2008: implemented a bytecode interpreter "FrostByte" (https://blogs.kde.org/2008/05/22/news-land-konquerors/)
* Most dead by KDE 5 (2014)
* Dropped from KDE 6 (2024)

## Conformance

<details><summary>ES1-ES5: 86%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 78%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
<a href="../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: non-global match failed; global match failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: spec example failed; $nn 10 captures failed; $nn reverse order failed
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: regex with capture failed
<a href="../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: non-global regex replace failed; global regex replace failed
<a href="../conformance/es3/String.prototype.search.js">String.prototype.search.js</a>: search for digits failed
<a href="../conformance/es3/String.prototype.search.str.js">String.prototype.search.str.js</a>: string with \d+ pattern failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: KJS: regcomp failed with 'Invalid preceding regular expression' String.prototype.split.bugs.js (line 1): SyntaxError: Invalid regular expression
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: split with regex failed; split with capturing group failed; KJS: regcomp failed with 'Invalid preceding regular expression' String.prototype.split.regex.js (line 1): SyntaxError: Invalid regular expression
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for instanceof non-callable
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: identifiers.unicode.js (line 7): SyntaxError: Parse error
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: literals.object.unicode.js (line 8): SyntaxError: Parse error
<a href="../conformance/es3/literals.regex.empty.js">literals.regex.empty.js</a>: KJS: regcomp failed with 'Invalid preceding regular expression' literals.regex.empty.js (line 1): SyntaxError: Invalid regular expression
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: failed
<a href="../conformance/es3/regex.bracket.ranges.js">regex.bracket.ranges.js</a>: KJS: regcomp failed with 'Invalid range end' regex.bracket.ranges.js (line 1): SyntaxError: Invalid regular expression
<a href="../conformance/es3/regex.class.esc-d.js">regex.class.esc-d.js</a>: \d failed; \d+ failed; \D failed; \d in bracket failed; range with \d failed; \D in bracket failed
<a href="../conformance/es3/regex.class.esc-s.js">regex.class.esc-s.js</a>: \s in bracket failed; range with \s failed; \S in bracket failed
<a href="../conformance/es3/regex.class.esc-w.js">regex.class.esc-w.js</a>: \w in bracket failed; range with \w failed; \W in bracket failed
...
</pre></li>
<li>ES5: 65%<pre>
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: array-like object not accepted
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: trailing comma does not throw SyntaxError
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: failed to drop undefined/function values; undefined/function values in array not converted to null
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: source.whitespace.bom.js (line 0): SyntaxError: Parse error
<a href="../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: source.zero-width-chars.js (line 10): SyntaxError: Parse error
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 6%, ES2016+ 4%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 6%</li>
<li>ES2016: 18%</li>
<li>ES2017: 10%</li>
<li>ES2018: 0%</li>
<li>ES2019: 6%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
