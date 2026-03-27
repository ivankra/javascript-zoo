# Quanta

Experimental JavaScript engine written in C++.

* Repository:   [solarbrowser/quanta](https://github.com/solarbrowser/quanta.git) <span class="shields"><img src="https://img.shields.io/github/stars/solarbrowser/quanta?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/solarbrowser/quanta?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [42405](# "cloc --not_match_d='(?i)(test|third_party)' .")
* Language:     C++
* License:      MPL-2.0
* Standard:     ES6+ (partial)
* Years:        2025-
* Interpreter:  tree walker
* Regex engine: std::regex

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: charAt negative failed
<a href="../../conformance/es1/conversions.ToInteger.js">conversions.ToInteger.js</a>: -1.9 failed
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: TypeError: Cannot read property of null or undefined
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 57%, Next 0%, Intl 61%</summary><ul>
<li>ES6: 90%, <b>1 crash</b><pre>
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: SyntaxError: Unexpected token: 'new' (type: 30) at line 16
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: SyntaxError: Unexpected token: 'new' (type: 30) at line 12
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: failed
<a href="../../conformance/compat-table/es6/Reflect.construct.RegExp-subclassing.js">Reflect.construct.RegExp-subclassing.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: failed
<a href="../../conformance/compat-table/es6/Symbol.JSON.stringify.object.js">Symbol.JSON.stringify.object.js</a>: failed
<a href="../../conformance/compat-table/es6/default-params.separate-scope.js">default-params.separate-scope.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: SyntaxError: Unexpected token: '' (type: 95) at line 10
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-separate-scope.js">destructuring-params.defaults-separate-scope.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-params.duplicate-identifier.js">destructuring-params.duplicate-identifier.js</a>: failed
<a href="../../conformance/compat-table/es6/generators.no-new-this.js">generators.no-new-this.js</a>: crashed: SIGSEGV
<a href="../../conformance/compat-table/es6/generators.yield-star.astral-string.js">generators.yield-star.astral-string.js</a>: failed
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing-throw.js">generators.yield-star.iterator-closing-throw.js</a>: failed
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing.js">generators.yield-star.iterator-closing.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.getOwnPropertyDescriptor.Function.bind.js">misc.Proxy.getOwnPropertyDescriptor.Function.bind.js</a>: failed
<a href="../../conformance/compat-table/es6/misc.Proxy.get.CreateDynamicFunction.js">misc.Proxy.get.CreateDynamicFunction.js</a>: TypeError: 'get' proxy invariant violated: non-writable non-configurable property
<a href="../../conformance/compat-table/es6/misc.Proxy.get.HasBinding.js">misc.Proxy.get.HasBinding.js</a>: failed
...
</pre></li>
<li>ES2016: 94%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.assignment.js">exponentiation.assignment.js</a>: SyntaxError: Unexpected token: '' (type: 61) at line 10
</pre></li>
<li>ES2017: 94%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: Property is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: '__lookupSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: Property is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
</pre></li>
<li>ES2018: 89%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: failed
</pre></li>
<li>ES2019: 35%, <b>2 crashes</b></li>
<li>ES2020: 47%</li>
<li>ES2021: 43%</li>
<li>ES2022: 52%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.computed-static.js">class-fields.computed-static.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: SyntaxError: Expected property name after '?.'
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2022/class-fields.private-static.js">class-fields.private-static.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-fields.public-static.js">class-fields.public-static.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: failed
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: Expected method name or computed property
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: ReferenceError: '#x' is not defined
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: failed
</pre></li>
<li>ES2023: 57%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: failed
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: Property is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: Property is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: Property is not a function
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Expected identifier after '#'
</pre></li>
<li>ES2024: 39%</li>
<li>ES2025: 5%</li>
<li>Next: 0%</li>
<li>Intl: 61%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: Property is not a function
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
</pre></li>
</ul></details>

💥 **3 crashes during testing**
