# Sobek

Grafana's fork of [goja](../goja/README.md) engine.

* Repository:       https://github.com/grafana/sobek.git <span class="shields"><img src="https://img.shields.io/github/stars/grafana/sobek?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/grafana/sobek?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              46789 (`cloc --fullpath --not_match_f="(?i)(test)" --exclude-lang=Markdown,YAML .`)
* Language:         Go
* License:          MIT
* Org:              Grafana
* Standard:         ES2023 (partial)
* Years:            2024-
* Ancestor:         [goja](../goja/README.md)
* Runtime platform: Go (cgo-free)
* Interpreter:      stack-based VM ([vm.go](https://github.com/grafana/sobek/blob/main/vm.go))

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 98%<pre>
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Object has no member 'getYear'
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Object has no member 'setYear'
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Object has no member 'toGMTString'
</pre></li>
<li>ES3: 100%</li>
<li>ES5: 99%<pre>
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 66%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 96%<pre>
<a href="../conformance/kangax-es6/Symbol.JSON.stringify.object.js">Symbol.JSON.stringify.object.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: Object has no member 'anchor'
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: Object has no member 'anchor'
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement. at annex-b.function.labeled.js:12:10
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: annex-b.html-comments.js: Line 9:5 Unexpected token &gt; (and 2 more errors)
<a href="../conformance/kangax-es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: failed
<a href="../conformance/kangax-es6/arrow.lexical-arguments.js">arrow.lexical-arguments.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: SyntaxError: Invalid flags supplied to RegExp constructor 'undefined'
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: Method RegExp.prototype.test called on incompatible receiver [object Object]
<a href="../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: failed
<a href="../conformance/kangax-es6/misc.Proxy.get.instanceof.js">misc.Proxy.get.instanceof.js</a>: TypeError: Expecting a function in instanceof check, but got function () { [native code] }
<a href="../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: timeout
<a href="../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: timeout
</pre></li>
<li>ES2016: 91%<pre>
<a href="../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 68%<pre>
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
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined or null
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined or null
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
...
</pre></li>
<li>ES2018: 63%<pre>
<a href="../conformance/kangax-es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: async-iterators.for-await-of.js: Line 60:9 Unexpected token await (and 4 more errors)
<a href="../conformance/kangax-es2018/async-iterators.generators.js">async-iterators.generators.js</a>: SyntaxError: Async generators are not supported yet at async-iterators.generators.js:44:3
<a href="../conformance/kangax-es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: TypeError: Cannot read property 'year' of undefined
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 43%</li>
<li>ES2022: 90%<pre>
<a href="../conformance/kangax-es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: Invalid flags supplied to RegExp constructor 'd'
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: failed
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 0%</li>
<li>ES2025: 5%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
