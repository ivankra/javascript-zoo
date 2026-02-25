# LebJS

Unfinished JavaScript engine written in Java.

* Repository:       [LebsterFace/LebJS](https://github.com/LebsterFace/LebJS) <span class="shields"><img src="https://img.shields.io/github/stars/LebsterFace/LebJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/LebsterFace/LebJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [13761](# "cloc src")
* Language:         Java
* License:          Apache-2.0
* Standard:         no (can't run ES1)
* Years:            2021-
* Runtime platform: Java
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 51%</summary><ul>
<li>ES1: 60%<pre>
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: Uncaught TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: Uncaught TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.toString.js">Boolean.prototype.toString.js</a>: Uncaught TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Boolean.prototype.valueOf.js">Boolean.prototype.valueOf.js</a>: Uncaught TypeError: Boolean is not a constructor
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.js">Date.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: Uncaught ReferenceError: Date is not defined
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: Uncaught ReferenceError: Date is not defined
...
</pre></li>
<li>ES3: 40%</li>
<li>ES5: 47%</li>
</ul></details>

<details><summary>compat-table: ES6 37%, ES2016+ 32%, Next 0%, Intl 14%</summary><ul>
<li>ES6: 37%</li>
<li>ES2016: 44%</li>
<li>ES2017: 24%</li>
<li>ES2018: 21%</li>
<li>ES2019: 56%<pre>
<a href="../../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of xyz.lebster.core.value.globals.Undefined@0
<a href="../../conformance/kangax-es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Object.fromEntries call with non-array
<a href="../../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: NullPointerException: Cannot invoke "xyz.lebster.core.value.Value.isStrictlyEqual(xyz.lebster.core.value.Value)" because "&lt;local2&gt;" is null
<a href="../../conformance/kangax-es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: ' \t \n abc   \t\n'.trimLeft is not a function
<a href="../../conformance/kangax-es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: ' \t \n abc   \t\n'.trimRight is not a function
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: Unexpected token '\', expected '(' (1:23)
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: failed
</pre></li>
<li>ES2020: 7%</li>
<li>ES2021: 25%</li>
<li>ES2022: 20%</li>
<li>ES2023: 83%<pre>
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: Uint8Array is not defined
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: Uint8Array is not defined
</pre></li>
<li>ES2024: 33%</li>
<li>ES2025: 50%<pre>
<a href="../../conformance/kangax-es2025/Iterator.extends.js">Iterator.extends.js</a>: failed
<a href="../../conformance/kangax-es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Iterator.from is not a function
<a href="../../conformance/kangax-es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: TypeError: Iterator.from is not a function
<a href="../../conformance/kangax-es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: failed
<a href="../../conformance/kangax-es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: failed
<a href="../../conformance/kangax-es2025/Promise.try.js">Promise.try.js</a>: ReferenceError: Promise is not defined
<a href="../../conformance/kangax-es2025/RegExp.escape.js">RegExp.escape.js</a>: TypeError: RegExp.escape is not a function
<a href="../../conformance/kangax-es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Invalid regular expression '(?&lt;year&gt;[0-9]{4})-[0-9]{2}|[0-9]{2}-(?&lt;year&gt;[0-9]{4})': Named capturing group &lt;year&gt; is already defined
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: failed
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: failed
<a href="../../conformance/kangax-es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: failed
</pre></li>
<li>Next: 0%</li>
<li>Intl: 14%</li>
</ul></details>
