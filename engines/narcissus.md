# Narcissus

Metacircular JavaScript interpreter, was used for prototyping new language features in ES6.

* Repository:       https://github.com/mozilla/narcissus.git <span class="shields"><img src="https://img.shields.io/github/stars/mozilla/narcissus?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla/narcissus?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              6308 (`cloc lib`)
* Language:         JavaScript
* License:          MPL-1.1-or-later OR GPL-2.0-or-later OR LGPL-2.1-or-later
* Org:              Mozilla
* Standard:         ES5
* Years:            2007-2012
* Runtime platform: JavaScript (SpiderMonkey)
  * Parser is portable, but interpreter relies on SpiderMonkey's old non-standard extensions (pre-ES6 Proxy, `catch (e if ...)`).

## Description

> Narcissus is a meta-circular JavaScript interpreter with a very
> direct representation of values: primitives are self-representing,
> objects are represented as objects (with their properties accessible via
> usual property access), and functions are represented as functions. The
> interpreter is designed this way to allow existing JavaScript functions
> and objects (such as the standard libraries) to interface directly
> with Narcissus code without following any special protocol or requiring
> wrapping and unwrapping.

## Conformance

<details><summary>ES1-ES5: 90%</summary><ul>
<li>ES1: 97%<pre>
<a href="../features/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: array instance constructor failed
<a href="../features/es1/Function.prototype.js">Function.prototype.js</a>: prototype property failed
<a href="../features/es1/String.length.js">String.length.js</a>: string length failed; String object length failed; single char length failed
<a href="../features/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../features/es1/literals.string.escapes.js">literals.string.escapes.js</a>: failed
<a href="../features/es1/with.js">with.js</a>: /dist/narcissus:1839:39 TypeError: this.x.pushTarget(...).next is not a function
</pre></li>
<li>ES3: 92%<pre>
<a href="../features/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: basic toLocaleString failed
<a href="../features/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: failed
<a href="../features/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: failed
<a href="../features/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: failed
<a href="../features/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: failed
<a href="../features/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: failed
<a href="../features/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: failed
<a href="../features/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: direct prototype failed; prototype chain failed
<a href="../features/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../features/es3/do-while.js">do-while.js</a>: /dist/narcissus:1756:39 TypeError: this.x.pushTarget(...).next is not a function
<a href="../features/es3/instanceof.js">instanceof.js</a>: array instanceof Array failed; custom constructor instanceof failed
<a href="../features/es3/source.line-terminators.js">source.line-terminators.js</a>: :13:1 SyntaxError: 13: Illegal token newSyntaxError@/dist/narcissus:1147:17
</pre></li>
<li>ES5: 70%<pre>
<a href="../features/es5/Array.isArray.js">Array.isArray.js</a>: Array.isArray not a function; :16:1 TypeError: Array.isArray is not callable
<a href="../features/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: /dist/narcissus:454:11 TypeError: can't access property "configurable", desc is undefined
<a href="../features/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: /dist/narcissus:454:11 TypeError: can't access property "configurable", desc is undefined
<a href="../features/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: Array.prototype failed
<a href="../features/es5/String.indexing.js">String.indexing.js</a>: 'foobar'[3] !== 'b'; test with variable failed
<a href="../features/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../features/es5/debugger.js">debugger.js</a>: /dist/narcissus:6061:27 uncaught NYI: debugger
<a href="../features/es5/strict.js">strict.js</a>: failed
<a href="../features/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../features/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../features/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: failed
<a href="../features/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../features/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../features/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../features/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../features/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../features/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../features/es5/strict.no-with.js">strict.no-with.js</a>: failed
<a href="../features/es5/strict.reserved-words.js">strict.reserved-words.js</a>: 'var implements' did not throw in strict mode
<a href="../features/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
<a href="../features/es5/strict.this-primitive-not-coerced.js">strict.this-primitive-not-coerced.js</a>: failed: string 'this' was coerced to object
...
</pre></li>
<li><a href="../features/results/narcissus.txt">Full results</a></li>
</ul></details>

<details><summary>compat-table: ES6 33%, ES2016+ 44%, Intl 25%</summary><ul>
<li>ES6: 33%<br>
<li>ES2016: 32%<br>
<li>ES2017: 42%<br>
<li>ES2018: 37%<br>
<li>ES2019: 54%<pre>
<a href="../features/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Array.prototype[Symbol.unscopables] (type undefined) has no properties
<a href="../features/kangax-es2019/Symbol.prototype.description.empty.js">Symbol.prototype.description.empty.js</a>: TypeError: can't convert symbol to string
<a href="../features/kangax-es2019/Symbol.prototype.description.js">Symbol.prototype.description.js</a>: TypeError: can't convert symbol to string
<a href="../features/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: can't convert symbol to string
<a href="../features/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../features/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: 1: missing operand; found &gt;
<a href="../features/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../features/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../features/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: 1: Invalid property name
<a href="../features/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../features/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: 1: missing formal parameter
<a href="../features/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: :44:1 SyntaxError: 44: Missing ) newSyntaxError@/dist/narcissus:1147:17
<a href="../features/kangax-es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: :12:1 SyntaxError: 12: Missing ( newSyntaxError@/dist/narcissus:1147:17
<a href="../features/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: :13:1 SyntaxError: 13: Missing ( newSyntaxError@/dist/narcissus:1147:17
</pre></li>
<li>ES2020: 14%<br>
<li>ES2021: 64%<pre>
<a href="../features/kangax-es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: :49:1 SyntaxError: 49: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: :49:1 SyntaxError: 49: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.and.js">logical-assignment.and.js</a>: :10:1 SyntaxError: 10: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.nullish.js">logical-assignment.nullish.js</a>: :10:1 SyntaxError: 10: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.or.js">logical-assignment.or.js</a>: :10:1 SyntaxError: 10: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2021/numeric-separators.js">numeric-separators.js</a>: :9:1 SyntaxError: 9: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
</pre></li>
<li>ES2022: 33%<br>
<li>ES2023: 80%<pre>
<a href="../features/kangax-es2023/hashbang.js">hashbang.js</a>: :1:1 SyntaxError: 1: Illegal token newSyntaxError@/dist/narcissus:1147:17
</pre></li>
<li>ES2024: 51%<pre>
<a href="../features/kangax-es2024/Map.groupBy.js">Map.groupBy.js</a>: :13:1 SyntaxError: 13: Bad left-hand side of assignment newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2024/Object.groupBy.js">Object.groupBy.js</a>: :11:1 SyntaxError: 11: Bad left-hand side of assignment newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: /dist/narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../features/kangax-es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: /dist/narcissus:1:4 SyntaxError: invalid class property name in regular expression:
<a href="../features/kangax-es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: /dist/narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../features/kangax-es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: /dist/narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../features/kangax-es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: /dist/narcissus:1:4 SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2025: 55%<pre>
<a href="../features/kangax-es2025/Iterator.extends.js">Iterator.extends.js</a>: :10:1 SyntaxError: 10: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Array.from is not callable
<a href="../features/kangax-es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: :12:1 SyntaxError: 12: missing : after property newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: failed
<a href="../features/kangax-es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: Array.from is not callable
<a href="../features/kangax-es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: :10:1 SyntaxError: 10: missing ; before statement newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: :10:1 SyntaxError: 10: Bad left-hand side of assignment newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: :10:1 SyntaxError: 10: missing operand; found &gt; newSyntaxError@/dist/narcissus:1147:17 fail@/dist/narcissus:1291:20
<a href="../features/kangax-es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: Array.from is not callable
<a href="../features/kangax-es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: TypeError: Array.isArray is not callable
<a href="../features/kangax-es2025/Promise.try.js">Promise.try.js</a>: failed
</pre></li>
<li>Intl: 25%<br>
</ul></details>
