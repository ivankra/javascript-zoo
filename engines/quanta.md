# Quanta

Experimental JavaScript engine written in C++.

* Repository:   https://github.com/solarbrowser/quanta.git <span class="shields"><img src="https://img.shields.io/github/stars/solarbrowser/quanta?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/solarbrowser/quanta?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          42405 (`cloc --not_match_d="(?i)(test|third_party)" .`)
* Language:     C++
* License:      MPL-2.0
* Standard:     ES6+ (partial)
* Years:        2025-
* Interpreter:  tree walker
* Regex engine: std::regex

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/quanta.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: charAt negative failed
<a href="../conformance/es1/conversions.ToInteger.js">conversions.ToInteger.js</a>: -1.9 failed
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: TypeError: Cannot read property of null or undefined
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 52%, ES2016+ 31%, Next 0%, Intl 61%</summary><ul>
<li>ES6: 52%, <b>8 crashes</b><pre>
<a href="../conformance/kangax-es6/Array.from.generator.js">Array.from.generator.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.iterable-instance.js">Array.from.iterable-instance.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.iterable.js">Array.from.iterable.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.iterable-instance.js">Array.from.map.iterable-instance.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.iterable.js">Array.from.map.iterable.js</a>: failed
<a href="../conformance/kangax-es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../conformance/kangax-es6/Array.prototype.Symbol.iterator.js">Array.prototype.Symbol.iterator.js</a>: failed
<a href="../conformance/kangax-es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: failed
<a href="../conformance/kangax-es6/Date.prototype.Symbol.toPrimitive.js">Date.prototype.Symbol.toPrimitive.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: TypeError: Cannot read property of null or undefined
<a href="../conformance/kangax-es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: Cannot use 'in' operator to search for 'get' in undefined
<a href="../conformance/kangax-es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: failed
<a href="../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../conformance/kangax-es6/Map.prototype.Symbol.iterator.js">Map.prototype.Symbol.iterator.js</a>: failed
<a href="../conformance/kangax-es6/Object.getOwnPropertySymbols.js">Object.getOwnPropertySymbols.js</a>: Error: Property is not a function
<a href="../conformance/kangax-es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: Cannot use 'in' operator to search for 'get' in undefined
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: Error: Promise.all expects an array
<a href="../conformance/kangax-es6/Promise.all.js">Promise.all.js</a>: crashed (signal 11)
...
</pre></li>
<li>ES2016: 35%</li>
<li>ES2017: 30%, <b>10 crashes</b></li>
<li>ES2018: 21%, <b>3 crashes</b></li>
<li>ES2019: 27%, <b>3 crashes</b></li>
<li>ES2020: 47%, <b>1 crash</b></li>
<li>ES2021: 43%, <b>2 crashes</b></li>
<li>ES2022: 50%<pre>
<a href="../conformance/kangax-es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: Int8Array is not a constructor
<a href="../conformance/kangax-es2022/class-fields.computed-static.js">class-fields.computed-static.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: SyntaxError: Expected property name after '?.'
<a href="../conformance/kangax-es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.private-static.js">class-fields.private-static.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.public-static.js">class-fields.public-static.js</a>: failed
<a href="../conformance/kangax-es2022/class-fields.static.define.js">class-fields.static.define.js</a>: failed
<a href="../conformance/kangax-es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: failed
<a href="../conformance/kangax-es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: failed
<a href="../conformance/kangax-es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: Expected method name or computed property
<a href="../conformance/kangax-es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: ReferenceError: '#x' is not defined
<a href="../conformance/kangax-es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: TypeError: Proxy is not a constructor
</pre></li>
<li>ES2023: 57%<pre>
<a href="../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: failed
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Uint8Array is not a constructor
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Uint8Array is not a constructor
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: Uint8Array is not a constructor
<a href="../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: SyntaxError: Expected identifier after '#'
</pre></li>
<li>ES2024: 24%</li>
<li>ES2025: 0%, <b>1 crash</b></li>
<li>Next: 0%, <b>1 crash</b></li>
<li>Intl: 61%<pre>
<a href="../conformance/kangax-intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: Error: Property is not a function
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
<a href="../conformance/kangax-intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: failed
</pre></li>
</ul></details>

💥 **29 crashes during testing**
