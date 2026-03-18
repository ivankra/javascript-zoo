# Nova

Experimental JavaScript engine written in Rust with a cache-friendly data-oriented design.

* Homepage:    [trynova.dev](https://trynova.dev/)
* Repository:  [trynova/nova](https://github.com/trynova/nova.git) <span class="shields"><img src="https://img.shields.io/github/stars/trynova/nova?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/trynova/nova?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [102297](# "cloc --not_match_d='(?i)(test)' nova_vm")
* Language:    Rust
* License:     MPL-2.0
* Standard:    ES6+ (partial)
* Years:       2022-
* Parser:      [oxc](../../parsers/oxc/README.md)
* Interpreter: stack-based VM

## Runtimes

* [andromeda](https://github.com/tryandromeda/andromeda) <span class="shields"><img src="https://img.shields.io/github/stars/tryandromeda/andromeda?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/tryandromeda/andromeda?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Conformance

<details><summary>ES1-ES5: 95%</summary><ul>
<li>ES1: 96%, <b>1 crash</b><pre>
<a href="../../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Date.prototype.toLocaleString not implemented
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: crashed: thread 'main' panicked at /root/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/wtf8-0.1.0/src/not_quite_std.rs:167:5:
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/with.js">with.js</a>: ReferenceError: Cannot access undeclared variable 'x'.
</pre></li>
<li>ES3: 91%<pre>
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Date.prototype.toLocaleDateString not implemented
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Date.prototype.toLocaleString not implemented
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Date.prototype.toLocaleTimeString not implemented
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2.5e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: format failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $1 failed; undefined capture failed; spec example failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $` failed; $' failed; combined replacements failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: regex with capture failed
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.escape.nul.js">regex.escape.nul.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.flag.multiline.js">regex.flag.multiline.js</a>: ^ after LF failed; $ before LF failed
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: regex parse error
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 85%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 94%, <b>2 crashes</b><pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.js">Proxy.handler.apply.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: '[object Object]' is not a constructor.
<a href="../../conformance/compat-table/es6/Proxy.revocable.js">Proxy.revocable.js</a>: Proxy.revocable not implemented
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: Promise subclassing is not supported
<a href="../../conformance/compat-table/es6/RegExp.prototype.flags.js">RegExp.prototype.flags.js</a>: failed
<a href="../../conformance/compat-table/es6/Set.constructor-invokes-add.js">Set.constructor-invokes-add.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: Cannot access undeclared variable 'g'.
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: Cannot access undeclared variable 'foo'.
<a href="../../conformance/compat-table/es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.incomplete-patterns.js">annex-b.regex.incomplete-patterns.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.__proto__.Object.prototype.descriptor.js">annex-b.__proto__.Object.prototype.descriptor.js</a>: failed
...
</pre></li>
<li>ES2016: 94%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.basic.js">exponentiation.basic.js</a>: failed
</pre></li>
<li>ES2017: 88%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineGetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineSetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupGetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupSetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: failed
</pre></li>
<li>ES2018: 67%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: failed
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: failed
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>ES2019: 95%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 97%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: ReferenceError: Cannot access undeclared variable 'a'.
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 55%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: ArrayBuffer.prototype.transfer not implemented
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: ArrayBuffer.prototype.transferToFixedLength not implemented
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: ArrayBuffer.prototype.transfer not implemented
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>ES2025: 55%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.difference.js">Set.prototype.difference.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.intersection.js">Set.prototype.intersection.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isDisjointFrom.js">Set.prototype.isDisjointFrom.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isSubsetOf.js">Set.prototype.isSubsetOf.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isSupersetOf.js">Set.prototype.isSupersetOf.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.symmetricDifference.js">Set.prototype.symmetricDifference.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.union.js">Set.prototype.union.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>Next: 0%, <b>3 crashes</b></li>
<li>Intl: 25%</li>
</ul></details>

💥 **6 crashes during testing**
