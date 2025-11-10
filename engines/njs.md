# njs

Lightweight embeddable JavaScript engine for use in nginx.

* Homepage:     https://nginx.org/en/docs/njs/index.html
* Repository:   https://github.com/nginx/njs.git <span class="shields"><img src="https://img.shields.io/github/stars/nginx/njs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nginx/njs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          58962 (`cloc --not_match_d="(?i)(test)" src`)
* Language:     C
* License:      BSD-2-Clause
* Org:          Nginx
* Standard:     ES6 (partial)
* Years:        2015-
* Interpreter:  register-based VM
* Regex engine: PCRE2

## Quirks

Always runs in strict mode, seemingly no option to disable.

## Conformance

<details><summary>ES1-ES5: 88%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/njs.txt">Full log</a>.</li>
<li>ES1: 93%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: (intermediate value)["getYear"] is not a function
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: (intermediate value)["setYear"] is not a function
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: (intermediate value)["toGMTString"] is not a function
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: "escape" is not defined
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: "unescape" is not defined
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Unexpected token "07" in annex-b.literals.octal.js:14
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Octal escape sequences can't be used in untagged template literals or in strict mode code in annex-b.literals.string.octal.js:12
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: "caller", "callee", "arguments" properties may not be accessed
<a href="../conformance/es1/asi.eval.js">asi.eval.js</a>: InternalError: Not implemented
<a href="../conformance/es1/asi.js">asi.js</a>: TypeError: property set on primitive number type
<a href="../conformance/es1/eval.js">eval.js</a>: InternalError: Not implemented
<a href="../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Delete of an unqualified identifier in unary.delete.var.js:7
<a href="../conformance/es1/with.js">with.js</a>: SyntaxError: Token "(" not supported in this version in with.js:15
</pre></li>
<li>ES3: 90%<pre>
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: (intermediate value)["toLocaleString"] is not a function
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: TypeError: (intermediate value)["toLocaleString"] is not a function
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: (intermediate value)["toLocaleString"] is not a function
<a href="../conformance/es3/RegExp.js">RegExp.js</a>: RegExp passthrough failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: (intermediate value)["localeCompare"] is not a function
<a href="../conformance/es3/String.prototype.toLocaleLowerCase.js">String.prototype.toLocaleLowerCase.js</a>: TypeError: (intermediate value)["toLocaleLowerCase"] is not a function
<a href="../conformance/es3/String.prototype.toLocaleUpperCase.js">String.prototype.toLocaleUpperCase.js</a>: TypeError: (intermediate value)["toLocaleUpperCase"] is not a function
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: wrong exception type; wrong exception for unclosed string; wrong exception for invalid token
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for Function.prototype.toString on non-function
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high surrogate
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Unexpected token "�" in identifiers.unicode.js:8
<a href="../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Unexpected token "�" in literals.object.unicode.js:9
<a href="../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: InternalError: Not implemented
<a href="../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: failed
</pre></li>
<li>ES5: 69%<pre>
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: RangeError: Invalid time value
<a href="../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read-only property "a" of object
<a href="../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read-only property "y" of object
<a href="../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read-only property "x" of object
<a href="../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property "y", object is not extensible
<a href="../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property "y", object is not extensible
<a href="../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: TypeError: Cannot assign to read-only property "Infinity" of object
<a href="../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: TypeError: Cannot assign to read-only property "NaN" of object
<a href="../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: TypeError: Cannot assign to read-only property "undefined" of object
<a href="../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: Unexpected token "\" in source.zero-width-chars.js:11
<a href="../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: failed
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' throws but not-SyntaxError
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 39%, ES2016+ 27%, Next 0%, Intl 11%</summary><ul>
<li>ES6: 39%<br>
<li>ES2016: 36%<br>
<li>ES2017: 60%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: "Atomics" is not defined
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: ReferenceError: "Proxy" is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: "__defineGetter__" is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: cannot get property "call" of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: cannot get property "call" of undefined
...
</pre></li>
<li>ES2018: 32%<br>
<li>ES2019: 19%<br>
<li>ES2020: 29%<br>
<li>ES2021: 29%<br>
<li>ES2022: 5%<br>
<li>ES2023: 29%<br>
<li>ES2024: 0%<br>
<li>ES2025: 14%<br>
<li>Next: 0%<br>
<li>Intl: 11%<br>
</ul></details>
