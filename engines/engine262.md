# engine262

An implementation of ECMA-262 in JavaScript aiming for 100% spec compliance, fast prototyping, validating new spec versions and test262.

* Homepage:         https://engine262.js.org/
* Repository:       https://github.com/engine262/engine262.git <span class="shields"><img src="https://img.shields.io/github/stars/engine262/engine262?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/engine262/engine262?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              39329 (`cloc src`)
* Language:         TypeScript
* License:          MIT
* Standard:         ESnext
* Years:            2018-
* Parser:           recursive descent
* Runtime platform: JavaScript (Node)
* Interpreter:      tree walker

## Features

Extensive standard library implementation, unlike most JavaScript-in-JavaScript interpreters.
But, very slow.

## Links

* https://docs.google.com/presentation/d/1lxX20voV2RuZE6QtlawShfznXtq8-yEMvXRucE_oyYk/view

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/engine262.txt">Full log</a>.</li>
<li>ES1: 97%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not a function
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: 'escape' is not defined
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: 'unescape' is not defined
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 94%, Next 9%, Intl 25%</summary><ul>
<li>ES6: 96%<pre>
<a href="../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: 'g' is not defined
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Unexpected token
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Unexpected token
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token
<a href="../conformance/kangax-es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: There is no 41 capture groups
<a href="../conformance/kangax-es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: Invalid class range
<a href="../conformance/kangax-es6/annex-b.regex.incomplete-patterns.js">annex-b.regex.incomplete-patterns.js</a>: SyntaxError: Expected } but got
<a href="../conformance/kangax-es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: annex-b.regex.invalid-char-escapes.js:9:12 SyntaxError: Invalid identity escape
<a href="../conformance/kangax-es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError: Invalid identity escape
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
</pre></li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid unicode property value
</pre></li>
<li>ES2019: 94%<pre>
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 67%<pre>
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 9%<br>
<li>Intl: 25%<br>
</ul></details>
