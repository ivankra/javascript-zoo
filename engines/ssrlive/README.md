# ssrlive/javascript

JavaScript engine written in Rust.

* Repository:  [ssrlive/javascript](https://github.com/ssrlive/javascript.git) <span class="shields"><img src="https://img.shields.io/github/stars/ssrlive/javascript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ssrlive/javascript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [84773](# "cloc src")
* Language:    Rust
* License:     MIT
* Standard:    ES6+ (partial)
* Years:       2025-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 94%</summary><ul>
<li>ES1: 94%<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: Error: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/asi.js">asi.js</a>: Error: Cannot create property '0' on number '1'
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: ReferenceError: a is not defined
<a href="../../conformance/es1/with.js">with.js</a>: assignment failed
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: rounding failed
</pre></li>
<li>ES5: 80%<pre>
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read-only property
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property to non-extensible object
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property to non-extensible object
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: TypeError: Cannot assign to read only property 'Infinity'
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: TypeError: Cannot assign to read only property 'NaN'
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: TypeError: Cannot assign to read only property 'undefined'
<a href="../../conformance/es5/strict.js">strict.js</a>: failed
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: thread '&lt;unnamed&gt;' (4857) panicked at src/core/parser.rs:2312:16: Error: Custom { kind: Other, error: "js runtime thread panicked" }
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
<a href="../../conformance/es5/this.thrown-function.js">this.thrown-function.js</a>: Error: Right-hand side of 'in' must be an object
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 83%, ES2016+ 83%, Next 20%, Intl 25%</summary><ul>
<li>ES6: 83%, <b>2 crashes</b><pre>
<a href="../../conformance/kangax-es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Array.from.iterable.js">Array.from.iterable.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.deleteProperty.js">Proxy.handler.deleteProperty.js</a>: TypeError: Cannot delete property 'foo' of proxy target
<a href="../../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: failed
<a href="../../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: TypeError: Cannot assign to property
<a href="../../conformance/kangax-es6/Proxy.handler.set.js">Proxy.handler.set.js</a>: TypeError: Cannot assign to property on proxy
<a href="../../conformance/kangax-es6/Reflect.apply.js">Reflect.apply.js</a>: TypeError: Array.prototype method called on null or undefined
<a href="../../conformance/kangax-es6/Set.iterator-closing.js">Set.iterator-closing.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/WeakMap.iterator-closing.js">WeakMap.iterator-closing.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/WeakSet.iterator-closing.js">WeakSet.iterator-closing.js</a>: ReferenceError: global is not defined
<a href="../../conformance/kangax-es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: Not a function
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: Not a function
...
</pre></li>
<li>ES2016: 85%<pre>
<a href="../../conformance/kangax-es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 87%<pre>
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: foo is not a function
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: foo is not a function
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: foo is not a function
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: foo is not a function
<a href="../../conformance/kangax-es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Property descriptor getter must be a function or undefined
<a href="../../conformance/kangax-es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Property descriptor setter must be a function or undefined
<a href="../../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/kangax-es2017/async.methods-class.js">async.methods-class.js</a>: failed
<a href="../../conformance/kangax-es2017/async.methods-object.js">async.methods-object.js</a>: failed
<a href="../../conformance/kangax-es2017/async.must-await-value.js">async.must-await-value.js</a>: failed
</pre></li>
<li>ES2018: 99%<pre>
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid RegExp: Invalid property name
</pre></li>
<li>ES2019: 64%<pre>
<a href="../../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: Not a function
<a href="../../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: Not a function
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Legacy octal literals are not allowed in strict mode
<a href="../../conformance/kangax-es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Unterminated string literal (newline in string)
<a href="../../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Unterminated string literal (newline in string)
</pre></li>
<li>ES2020: 89%<pre>
<a href="../../conformance/kangax-es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: OptionalCall target is not a function
<a href="../../conformance/kangax-es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: TypeError: OptionalCall target is not a function
</pre></li>
<li>ES2021: 43%</li>
<li>ES2022: 86%<pre>
<a href="../../conformance/kangax-es2022/Error.cause.Error.js">Error.cause.Error.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: failed
<a href="../../conformance/kangax-es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: failed
<a href="../../conformance/kangax-es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: failed
<a href="../../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: ReferenceError: global is not defined
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 71%<pre>
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: Not a function
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: Not a function
<a href="../../conformance/kangax-es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: Not a function
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 20%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
