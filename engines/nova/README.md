# Nova

Experimental JavaScript engine written in Rust with a cache-friendly data-oriented design.

* Homepage:    [trynova.dev](https://trynova.dev/)
* Repository:  [trynova/nova](https://github.com/trynova/nova.git) <span class="shields"><img src="https://img.shields.io/github/stars/trynova/nova?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/trynova/nova?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         102297 (`cloc --not_match_d="(?i)(test)" nova_vm`)
* Language:    Rust
* License:     MPL-2.0
* Standard:    ES6+ (partial)
* Years:       2022-
* Parser:      [oxc](../../parsers/oxc/README.md)
* Interpreter: stack-based VM

## Runtimes

* [andromeda](https://github.com/tryandromeda/andromeda) <span class="shields"><img src="https://img.shields.io/github/stars/tryandromeda/andromeda?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/tryandromeda/andromeda?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Conformance

<details><summary>ES1-ES5: 92%</summary><ul>
<li>ES1: 95%<pre>
<a href="../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Error: Date.prototype.toLocaleString not implemented
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Not a callable object
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Not a callable object
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Not a callable object
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: thread 'main' (1713622) panicked at /root/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/wtf8-0.1.0/src/not_quite_std.rs:167:5: assertion failed: begin &lt;= end
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError:
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../conformance/es1/asi.js">asi.js</a>: TypeError: Could not set property '0' of [object Object].
<a href="../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError:
<a href="../conformance/es1/with.js">with.js</a>: SyntaxError:
</pre></li>
<li>ES3: 91%<pre>
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Error: Date.prototype.toLocaleDateString not implemented
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Error: Date.prototype.toLocaleString not implemented
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Error: Date.prototype.toLocaleTimeString not implemented
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2.5e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: format failed
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $1 failed; undefined capture failed; spec example failed; $nn reverse order failed
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $` failed; $' failed; combined replacements failed
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: regex with capture failed
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: SyntaxError: regex parse error: error: backreferences are not supported
<a href="../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: SyntaxError: regex parse error: error: invalid escape sequence found in character class
<a href="../conformance/es3/regex.escape.nul.js">regex.escape.nul.js</a>: SyntaxError: regex parse error: error: backreferences are not supported
<a href="../conformance/es3/regex.flag.multiline.js">regex.flag.multiline.js</a>: ^ after LF failed; $ before LF failed
<a href="../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: SyntaxError: regex parse error: error: look-around, including look-ahead and look-behind, is not supported
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: regex parse error: error: look-around, including look-ahead and look-behind, is not supported
</pre></li>
<li>ES5: 86%<pre>
<a href="../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Could not set property 'a' of [object Object].
<a href="../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Could not set property 'y' of [object Object].
<a href="../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Could not set property 'x' of [object Object].
<a href="../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Could not set property 'y' of [object Object].
<a href="../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Could not set property 'y' of [object Object].
<a href="../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: TypeError: Could not set property 'Infinity'.
<a href="../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: TypeError: Could not set property 'NaN'.
<a href="../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: TypeError: Could not set property 'undefined'.
<a href="../conformance/es5/strict.js">strict.js</a>: failed
<a href="../conformance/es5/this.thrown-function.js">this.thrown-function.js</a>: TypeError: right-hand side of 'in' should be an object, got undefined.
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 88%, ES2016+ 84%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 88%, <b>2 crashes</b><pre>
<a href="../conformance/kangax-es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Array.from.iterable.js">Array.from.iterable.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es6/Proxy.handler.apply.js">Proxy.handler.apply.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: '[object Object]' is not a constructor.
<a href="../conformance/kangax-es6/Proxy.handler.deleteProperty.js">Proxy.handler.deleteProperty.js</a>: TypeError: Cannot delete property
<a href="../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: TypeError: Could not set property 'foo' of [object Object].
<a href="../conformance/kangax-es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: TypeError: Could not set property 'foo' of [object Object].
<a href="../conformance/kangax-es6/Proxy.revocable.js">Proxy.revocable.js</a>: Error: Proxy.revocable not implemented
<a href="../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: Error: Promise subclassing is not supported
<a href="../conformance/kangax-es6/RegExp.prototype.flags.js">RegExp.prototype.flags.js</a>: failed
<a href="../conformance/kangax-es6/Set.constructor-invokes-add.js">Set.constructor-invokes-add.js</a>: failed
<a href="../conformance/kangax-es6/Set.iterator-closing.js">Set.iterator-closing.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
<a href="../conformance/kangax-es6/WeakMap.iterator-closing.js">WeakMap.iterator-closing.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
...
</pre></li>
<li>ES2016: 94%<pre>
<a href="../conformance/kangax-es2016/exponentiation.basic.js">exponentiation.basic.js</a>: failed
</pre></li>
<li>ES2017: 88%<pre>
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineGetter__'.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineSetter__'.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupGetter__'.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupSetter__'.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError:
</pre></li>
<li>ES2018: 67%<pre>
<a href="../conformance/kangax-es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: failed
<a href="../conformance/kangax-es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: failed
<a href="../conformance/kangax-es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: failed
<a href="../conformance/kangax-es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: regex parse error:; error: look-around, including look-ahead and look-behind, is not supported
<a href="../conformance/kangax-es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: failed
<a href="../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: regex parse error:; error: Unicode property value not found
</pre></li>
<li>ES2019: 95%<pre>
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 93%<pre>
<a href="../conformance/kangax-es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: ReferenceError: Cannot access undeclared variable 'a'.
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: ReferenceError: Cannot assign to undeclared variable 'global'.
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 55%<pre>
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: Error: ArrayBuffer.prototype.transfer not implemented
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: Error: ArrayBuffer.prototype.transferToFixedLength not implemented
<a href="../conformance/kangax-es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: Error: ArrayBuffer.prototype.transfer not implemented
<a href="../conformance/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: regex parse error:; error: Unicode property not found
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: regex parse error:; error: Unicode property not found
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: regex parse error:; error: Unicode property not found
<a href="../conformance/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: regex parse error:; error: Unicode property not found
</pre></li>
<li>ES2025: 55%<pre>
<a href="../conformance/kangax-es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.difference.js">Set.prototype.difference.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.intersection.js">Set.prototype.intersection.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.isDisjointFrom.js">Set.prototype.isDisjointFrom.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.isSubsetOf.js">Set.prototype.isSubsetOf.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.isSupersetOf.js">Set.prototype.isSupersetOf.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.symmetricDifference.js">Set.prototype.symmetricDifference.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/Set.prototype.union.js">Set.prototype.union.js</a>: TypeError: Not a callable object
<a href="../conformance/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: regex parse error:; error: duplicate capture group name
</pre></li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
