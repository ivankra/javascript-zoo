# Jurassic

JavaScript engine for .NET, a compiler to .NET IL.

* Repository:       https://github.com/paulbartrum/jurassic.git <span class="shields"><img src="https://img.shields.io/github/stars/paulbartrum/jurassic?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/paulbartrum/jurassic?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              34639 (`cloc Jurassic`)
* Language:         C#
* License:          MIT
* Standard:         ES5, ES6 (partial)
* Years:            2010-
* Runtime platform: .NET
* JIT:              via CLR

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/jurassic.txt">Full log</a>.</li>
<li>ES1: 99%<pre>
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: max safe integer failed
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0; ''.split(/.?/).length !== 0
</pre></li>
<li>ES5: 95%<pre>
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: bound constructor failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: failed: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 65%, ES2016+ 15%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 65%, <b>2 crashes</b><pre>
<a href="../conformance/kangax-es6/Array.from.generator.js">Array.from.generator.js</a>: SyntaxError: Expected '(' but found '*'
<a href="../conformance/kangax-es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: SyntaxError: Expected '(' but found '*'
<a href="../conformance/kangax-es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.object-method.js">Function.name.object-method.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.shorthand.no-lexical.js">Function.name.shorthand.no-lexical.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: failed
<a href="../conformance/kangax-es6/Function.name.variable.js">Function.name.variable.js</a>: failed
<a href="../conformance/kangax-es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/Set.iterator-closing.js">Set.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/WeakMap.iterator-closing.js">WeakMap.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/WeakSet.iterator-closing.js">WeakSet.iterator-closing.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token '&gt;' in expression.
<a href="../conformance/kangax-es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: failed
...
</pre></li>
<li>ES2016: 44%</li>
<li>ES2017: 0%</li>
<li>ES2018: 25%</li>
<li>ES2019: 50%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 19%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **2 crashes during testing**
