# zuqe

JavaScript engine written in Rust.

* Repository:       [nupha/zuqe](https://github.com/nupha/zuqe.git)
* LOC:              [50141](# "cloc src")
* Language:         Rust
* License:          Apache-2.0
* Standard:         ES2023
* Years:            2025-
* Runtime platform: Rust

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 98%<pre>
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: ReferenceError: 'escape' is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: ReferenceError: 'unescape' is not defined
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: failed: +Infinity failed
</pre></li>
<li>ES3: 97%<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: failed
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: failed: rounding failed
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: failed: wrong exception for encodeURI lone low surrogate
<a href="../../conformance/es3/global.encodeURIComponent.js">global.encodeURIComponent.js</a>: ReferenceError: ReferenceError: 'encodeURIComponent' is not defined
<a href="../../conformance/es3/global.encodeURI.js">global.encodeURI.js</a>: ReferenceError: ReferenceError: 'encodeURI' is not defined
</pre></li>
<li>ES5: 98%<pre>
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: failed
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 71%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 97%<pre>
<a href="../../conformance/compat-table/es6/Promise.constructor-requires-new.js">Promise.constructor-requires-new.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.split.js">misc.Proxy.get.RegExp.Symbol.split.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp object expected
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: failed
<a href="../../conformance/compat-table/es6/rest-params.no-setter.js">rest-params.no-setter.js</a>: failed
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: failed
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: crash: SIGABRT
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: crash: SIGABRT
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 50%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: '__defineGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: '__defineSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: cannot read property 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: cannot read property 'call' of undefined
...
</pre></li>
<li>ES2018: 95%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: SyntaxError: regex compilation error: unknown unicode script
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 58%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: TypeError: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: 'BigInt' is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: TypeError: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigInt.js">BigInt.js</a>: TypeError: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: TypeError: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: TypeError: big int is not supported
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: TypeError: big int is not supported
</pre></li>
<li>ES2021: 87%<pre>
<a href="../../conformance/compat-table/es2021/FinalizationRegistry.js">FinalizationRegistry.js</a>: ReferenceError: 'FinalizationRegistry' is not defined
<a href="../../conformance/compat-table/es2021/WeakRef.js">WeakRef.js</a>: ReferenceError: 'WeakRef' is not defined
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 69%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2025: 10%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
