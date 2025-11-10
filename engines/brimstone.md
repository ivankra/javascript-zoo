# Brimstone

Javascript engine written in Rust, with nearly complete ES2025 support.

* Repository:   https://github.com/Hans-Halverson/brimstone.git <span class="shields"><img src="https://img.shields.io/github/stars/Hans-Halverson/brimstone?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Hans-Halverson/brimstone?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          74381 (`cloc src`)
* Language:     Rust
* License:      no
* Standard:     ESnext
* Years:        2022-
* Interpreter:  register-based VM ([vm.rs](https://github.com/Hans-Halverson/brimstone/blob/master/src/js/runtime/bytecode/vm.rs), Ignition-inspired)
* Regex engine: own ([regexp/](https://github.com/Hans-Halverson/brimstone/tree/master/src/js/runtime/regexp/))

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/brimstone.txt">Full log</a>.</li>
<li>ES1: 97%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: value is not a function
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: value is not a function
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: value is not a function
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
<a href="../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: value is not a function
</pre></li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: trailing comma does not throw SyntaxError
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 96%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 94%, <b>5 crashes</b><pre>
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: value is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: value is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: value is not a function
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Unexpected token function
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Functions cannot be labeled
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token &gt;
<a href="../conformance/kangax-es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: No capture group with index found
<a href="../conformance/kangax-es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: Character class cannot be a bound in a character range
<a href="../conformance/kangax-es6/annex-b.regex.incomplete-patterns.js">annex-b.regex.incomplete-patterns.js</a>: SyntaxError: Unexpected token
<a href="../conformance/kangax-es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Malformed escape sequence ┌ kangax-es6/annex-b.regex.invalid-hex-escapes.js:9:11
<a href="../conformance/kangax-es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: Malformed escape sequence ┌ kangax-es6/annex-b.regex.invalid-unicode-escapes.js:9:11
<a href="../conformance/kangax-es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: TypeError: null has no properties
<a href="../conformance/kangax-es6/class.computed-accessor-properties.js">class.computed-accessor-properties.js</a>: crashed (signal 11)
<a href="../conformance/kangax-es6/class.computed-prototype-methods.js">class.computed-prototype-methods.js</a>: crashed (signal 11)
<a href="../conformance/kangax-es6/class.computed-static-accessor-properties.js">class.computed-static-accessor-properties.js</a>: crashed (signal 11)
<a href="../conformance/kangax-es6/class.computed-static-methods.js">class.computed-static-methods.js</a>: crashed (signal 11)
<a href="../conformance/kangax-es6/generators.shorthand.computed.class.js">generators.shorthand.computed.class.js</a>: crashed (signal 11)
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Variable declarations in the left hand side of a for each loop must contain a single declaration with no initializer
</pre></li>
<li>ES2018: 99%<pre>
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid unicode property in regular expression
</pre></li>
<li>ES2019: 94%<pre>
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: value is not a function
<a href="../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: value is not a function
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 96%<pre>
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 0%<br>
<li>Intl: 25%<br>
</ul></details>

💥 **5 crashes during testing**
