# rust-js

JavaScript engine written in Rust.

* Repository:  [rust-js/rjs](https://github.com/rust-js/rjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/rust-js/rjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/rust-js/rjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [19008](# "cloc src")
* Language:    Rust
* License:     Apache-2.0
* Standard:    ES5
* Years:       2015
* Interpreter: stack-based VM

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: annex-b.global.escape.js: ReferenceError
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: annex-b.global.unescape.js: ReferenceError
</pre></li>
<li>ES3: 89%<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: empty array toLocaleString failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential() undefined arg failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (1.25).toExponential(1) != '1.26e+0' (got: '1.3e0'); (1.255).toExponential(2) != '1.25e+0', got '1.25e0'
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: String.prototype.replace.regex.js: TypeError: Invalid operation on null
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: String.prototype.split.bugs.js: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: String.prototype.split.regex.js: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: annex-b.String.prototype.substr.js: TypeError: Value is not a function
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: no exception for unclosed string
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../../conformance/es3/literals.regex.empty.js">literals.regex.empty.js</a>: literals.regex.empty.js: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: backref failed; multiple backrefs failed; backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.escape.js">regex.escape.js</a>: regex.escape.js: SyntaxError: 39:2: Cannot parse '\'
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: regex.lookahead.js: SyntaxError: Invalid regular expression
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: regex.negative-lookahead.js: SyntaxError: Invalid regular expression
</pre></li>
<li>ES5: 86%<pre>
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: Date.prototype.toJSON.js: TypeError: Target must be callable
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: array-like object not accepted
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: stringify object failed
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer function failed; thread '&lt;main&gt;' panicked at 'assertion failed: `(left == right)` (left: `Undefined`, right: `Number`)', src/rt/value.rs:291
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: space parameter failed
<a href="../../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: basic property names failed
<a href="../../conformance/es5/Object.keys.js">Object.keys.js</a>: basic keys failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: thread '&lt;main&gt;' panicked at 'index out of bounds: the len is 5 but the index is 6', /buildslave/rust-buildbot/slave/nightly-dist-rustc-cross-host-linux/build/src/libcollections/vec.rs:1167
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 2%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
