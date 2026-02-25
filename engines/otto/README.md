# otto

JavaScript engine in pure Go.

* Repository:       [robertkrimen/otto](https://github.com/robertkrimen/otto.git) <span class="shields"><img src="https://img.shields.io/github/stars/robertkrimen/otto?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/robertkrimen/otto?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [26462](# "cloc --fullpath --not_match_f='(?i)(test)' .")
* Language:         Go
* License:          MIT
* Standard:         ES5 (partial)
* Years:            2012-
* Runtime platform: Go (cgo-free)
* Interpreter:      tree walker
* Regex engine:     RE2 (not ECMAScript-compliant)

## Forks

Mostly obsoleted by newer, faster and full-featured [goja](../goja/README.md) engine,
which started out by forking otto's parser.

## Conformance

<details><summary>ES1-ES5: 91%</summary><ul>
<li>ES1: 99%, <b>1 crash</b><pre>
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: panic: runtime error: invalid memory address or nil pointer dereference [recovered, repanicked] github.com/robertkrimen/otto.catchPanic.func1() /src/error.go:247 +0x358 panic({0x260700?, 0x4aef60?}) /usr/local/go/src/runtime/panic.go:783 +0x120 github.com/robertkrimen/otto.catchPanic(0x400022bdd8?)
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
</pre></li>
<li>ES3: 91%<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential(2) failed; negative number failed; zero failed; Infinity failed; small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+01'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+04'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+00'); (1.255).toExponential(2) != '1.25e+0', got '1.25e+00'
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: Infinity failed; small number exponential notation failed; zero failed; large number exponential notation failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: ''.split(/.?/).length !== 0
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: property name 1e2 failed; property name 2.5e1 failed
<a href="../../conformance/es3/literals.object.hex.js">literals.object.hex.js</a>: property name 0xff failed; property name 0x10 failed; property name 0xABC failed
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: (anonymous): Line 9:10 Invalid regular expression: re2: Invalid \1 &lt;backreference&gt; (and 2 more errors)
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: (anonymous): Line 9:10 Invalid regular expression: re2: Invalid (?=) &lt;lookahead&gt; (and 2 more errors)
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: (anonymous): Line 9:10 Invalid regular expression: re2: Invalid (?!) &lt;lookahead&gt; (and 2 more errors)
</pre></li>
<li>ES5: 72%<pre>
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: (anonymous): Line 11:5 Unexpected token ILLEGAL (and 5 more errors)
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../../conformance/es5/strict.js">strict.js</a>: failed
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
<a href="../../conformance/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: failed: string 'this' was coerced to object
<a href="../../conformance/es5/strict.this-undefined-in-function.js">strict.this-undefined-in-function.js</a>: failed: outer 'this' is not undefined
<a href="../../conformance/es5/strict.unmapped-arguments.js">strict.unmapped-arguments.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 5%, ES2016+ 6%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 5%</li>
<li>ES2016: 0%</li>
<li>ES2017: 16%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4%</li>
<li>ES2025: 5%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **1 crash during testing**
