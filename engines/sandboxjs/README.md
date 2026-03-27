# SandboxJS

Interpreter for a limited subset of ES6 for sandboxing untrusted code, preventing access to non-whitelisted functions/prototypes.

* Repository:       [nyariv/SandboxJS](https://github.com/nyariv/SandboxJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/nyariv/SandboxJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nyariv/SandboxJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [4212](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Standard:         ES6 (subset)
* Years:            2019-
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Features

Parses code and runs it through its own tree-walking runtime, preventing it from accessing
host engine's functions/prototypes outside of a user-specified whitelist.

Can't run moderately complex code using classes/prototype-based inheritance -
those cases just trip the whitelist.

## Conformance

<details><summary>ES1-ES5: 70%</summary><ul>
<li>ES1: 84%<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: Array.prototype failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: Boolean.prototype failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Function.js">Function.js</a>: SandboxAccessError: Object construction not allowed: Function
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed; function with 1 param length failed; function with 3 params length failed
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: SandboxAccessError: Object construction not allowed: Function
<a href="../../conformance/es1/Number.js">Number.js</a>: Number.prototype failed
<a href="../../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: SandboxAccessError: Static method or property access not permitted: Object.prototype
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es1/String.js">String.js</a>: 15.5.3.1 String.prototype failed
<a href="../../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Octal Deprecation: 101
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: ReferenceError: arguments is not defined
...
</pre></li>
<li>ES3: 73%<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: ReferenceError: arguments is not defined
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: SandboxAccessError: Static method or property access not permitted: Object.prototype
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es3/RegExp.prototype.constructor.js">RegExp.prototype.constructor.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.slice.generic.js">String.prototype.slice.generic.js</a>: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: SandboxAccessError: Static method or property access not permitted: EvalError.prototype
<a href="../../conformance/es3/global.RangeError.js">global.RangeError.js</a>: SandboxAccessError: Static method or property access not permitted: RangeError.prototype
<a href="../../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: SandboxAccessError: Method or property access not permitted: RangeError.name
...
</pre></li>
<li>ES5: 28%</li>
</ul></details>

<details><summary>compat-table: ES6 27%, ES2016+ 38%, Next 8%, Intl 50%</summary><ul>
<li>ES6: 27%</li>
<li>ES2016: 17%</li>
<li>ES2017: 30%</li>
<li>ES2018: 46%</li>
<li>ES2019: 71%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: Unexpected token 'class': class  A  extends  function B() {}  {  c
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: Unexpected token 'class': class A {}
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: Unexpected token after call: {: { [  "0"  ]  (  )  {  } }.f
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: Unexpected token 'function': function \u0061(\u{62}, \u0063) { \u0062
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: Unexpected token 'function': function *foo() {
</pre></li>
<li>ES2020: 51%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: Method or property access not permitted: Iterator.Symbol(Symbol.iterator)
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: Static method or property access not permitted: Object.prototype
<a href="../../conformance/compat-table/es2020/globalThis.js">globalThis.js</a>: TypeError: Cannot read properties of null (reading 'lacksGlobalThis')
<a href="../../conformance/compat-table/es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: n is not a function
</pre></li>
<li>ES2021: 23%</li>
<li>ES2022: 12%</li>
<li>ES2023: 63%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: Method or property access not permitted: TypedArray.toReversed
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: Method or property access not permitted: TypedArray.toSorted
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: Method or property access not permitted: TypedArray.with
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected token after dot: #: #!/0/r/env node
</pre></li>
<li>ES2024: 20%</li>
<li>ES2025: 53%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.extends.js">Iterator.extends.js</a>: SyntaxError: Unexpected token 'class': class Class extends Iterator { }
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.instanceof.js">Iterator.instanceof.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: Method or property access not permitted: Iterator.drop
<a href="../../conformance/compat-table/es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: Method or property access not permitted: Iterator.every
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: Method or property access not permitted: Iterator.filter
<a href="../../conformance/compat-table/es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: Method or property access not permitted: Iterator.find
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: Method or property access not permitted: Iterator.flatMap
<a href="../../conformance/compat-table/es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: Method or property access not permitted: Iterator.forEach
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: Method or property access not permitted: Iterator.map
<a href="../../conformance/compat-table/es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: Method or property access not permitted: Iterator.reduce
<a href="../../conformance/compat-table/es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: Method or property access not permitted: Iterator.some
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: Method or property access not permitted: Iterator.take
<a href="../../conformance/compat-table/es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: Method or property access not permitted: Iterator.toArray
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: ReferenceError: arguments is not defined
</pre></li>
<li>Next: 8%</li>
<li>Intl: 50%<pre>
<a href="../../conformance/compat-table/intl/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.compare.js">Intl.Collator.prototype.compare.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.iana-timezones.js">Intl.DateTimeFormat.iana-timezones.js</a>: failed
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: Method or property access not permitted: DateTimeFormat.resolvedOptions
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: Static method or property access not permitted: Object.prototype
<a href="../../conformance/compat-table/intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: Access to prototype of global object is not permitted
</pre></li>
</ul></details>
