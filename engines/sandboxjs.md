# SandboxJS

Interpreter for a limited subset of ES6 for sandboxing untrusted code, preventing access to non-whitelisted functions/prototypes.

* Repository:       https://github.com/nyariv/SandboxJS.git <span class="shields"><img src="https://img.shields.io/github/stars/nyariv/SandboxJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nyariv/SandboxJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              4212 (`cloc src`)
* Language:         TypeScript
* License:          MIT
* Standard:         ES6 (subset)
* Years:            2019-
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Features

Parses code and runs it through own tree-walking runtime, preventing it from accessing
host engine's functions/prototypes outside of a user-specified whitelist.

Can't run any moderately complex code using classes/prototype-based inheritance -
those will just trip against the whitelist.

## Conformance

<details><summary>ES1-ES5: 75%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/sandboxjs.txt">Full log</a>.</li>
<li>ES1: 86%<pre>
<a href="../conformance/es1/Function.js">Function.js</a>: SandboxError: Object construction not allowed: Function
<a href="../conformance/es1/Function.length.js">Function.length.js</a>: Function.length failed; function with 1 param length failed; function with 3 params length failed
<a href="../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: SandboxError: Static method or property access not permitted: SandboxFunction.prototype
<a href="../conformance/es1/Function.prototype.js">Function.prototype.js</a>: SandboxError: Static method or property access not permitted: sandboxedObject.prototype
<a href="../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: SandboxError: Object construction not allowed: Function
<a href="../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: SandboxError: Static method or property access not permitted: Object.prototype
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: SandboxError: Override prototype property 'toString' not allowed
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: 0755 failed; max safe integer failed
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: throw new SyntaxError("Octal Deprecation: " + octal); SyntaxError: Octal Deprecation: 101
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: ReferenceError: arguments is not defined
<a href="../conformance/es1/arguments.js">arguments.js</a>: ReferenceError: arguments is not defined
<a href="../conformance/es1/asi.eval.js">asi.eval.js</a>: ReferenceError: eval is not defined
<a href="../conformance/es1/asi.js">asi.js</a>: ParseError: Unexpected end of expression: ++
<a href="../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: failed: C++ like evaluation order in 'x += f()'
<a href="../conformance/es1/assignment.unsigned-shift.js">assignment.unsigned-shift.js</a>: &gt;&gt;&gt;= failed
<a href="../conformance/es1/break.js">break.js</a>: SandboxError: Illegal break statement
<a href="../conformance/es1/comments.js">comments.js</a>: throw new ParseError(e.message, str); ParseError: Unexpected end of expression: console.log fail code: 'console.log\n/\nfail\n**/\n/\n/\n"0"+\n"1"\n\n\n)'
<a href="../conformance/es1/continue.js">continue.js</a>: SandboxError: Illegal continue statement
<a href="../conformance/es1/conversions.js">conversions.js</a>: null != undefined; 0 == undefined
<a href="../conformance/es1/eval.js">eval.js</a>: ReferenceError: eval is not defined
<a href="../conformance/es1/for.js">for.js</a>: SandboxError: Illegal break statement
...
</pre></li>
<li>ES3: 78%<pre>
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: ReferenceError: arguments is not defined
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: failed
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: SandboxError: Static method or property access not permitted: sandboxedObject.prototype
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: SandboxError: Static method or property access not permitted: sandboxedObject.prototype
<a href="../conformance/es3/Object.prototype.propertyIsEnumerable.js">Object.prototype.propertyIsEnumerable.js</a>: SandboxError: Static method or property access not permitted: sandboxedObject.prototype
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: SandboxError: Static method or property access not permitted: sandboxedObject.prototype
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: SandboxError: Override prototype property 'toString' not allowed
<a href="../conformance/es3/global.EvalError.js">global.EvalError.js</a>: SandboxError: Static method or property access not permitted: EvalError.prototype
<a href="../conformance/es3/global.RangeError.js">global.RangeError.js</a>: SandboxError: Static method or property access not permitted: RangeError.prototype
<a href="../conformance/es3/global.RangeError.thrown.js">global.RangeError.thrown.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/global.ReferenceError.js">global.ReferenceError.js</a>: SandboxError: Static method or property access not permitted: ReferenceError.prototype
<a href="../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/global.SyntaxError.js">global.SyntaxError.js</a>: SandboxError: Static method or property access not permitted: SyntaxError.prototype
<a href="../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/global.TypeError.js">global.TypeError.js</a>: SandboxError: Static method or property access not permitted: TypeError.prototype
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/global.URIError.js">global.URIError.js</a>: SandboxError: Static method or property access not permitted: URIError.prototype
<a href="../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: ReferenceError: e is not defined
<a href="../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: throw new ParseError(e.message, str); ParseError: Unexpected token after prop: ж: var ж = 1
<a href="../conformance/es3/labelled.break.js">labelled.break.js</a>: throw new ParseError(e.message, str); ParseError: Unexpected token after prop: :: block: {
...
</pre></li>
<li>ES5: 35%</li>
</ul></details>

<details><summary>compat-table: ES6 34%, ES2016+ 35%, Next 8%, Intl 71%</summary><ul>
<li>ES6: 34%</li>
<li>ES2016: 11%</li>
<li>ES2017: 32%</li>
<li>ES2018: 39%</li>
<li>ES2019: 58%<pre>
<a href="../conformance/kangax-es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
<a href="../conformance/kangax-es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: failed
<a href="../conformance/kangax-es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: ParseError: Unexpected token after call: {: function *foo() {
</pre></li>
<li>ES2020: 51%<pre>
<a href="../conformance/kangax-es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: ReferenceError: globalThis is not defined
<a href="../conformance/kangax-es2020/globalThis.js">globalThis.js</a>: TypeError: Cannot get property lacksGlobalThis of null
<a href="../conformance/kangax-es2020/nullish-coalescing.js">nullish-coalescing.js</a>: ParseError: Unexpected token after inlineIf: ?: ? 42
<a href="../conformance/kangax-es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: ReferenceError: e is not defined
</pre></li>
<li>ES2021: 14%</li>
<li>ES2022: 13%</li>
<li>ES2023: 63%<pre>
<a href="../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2023/hashbang.js">hashbang.js</a>: throw new ParseError(`Unexpected token after ${lastType}: ${part.char(0)}`, str); ParseError: Unexpected token after dot: #: #!/0/r/env node
</pre></li>
<li>ES2024: 16%</li>
<li>ES2025: 53%<pre>
<a href="../conformance/kangax-es2025/Iterator.extends.js">Iterator.extends.js</a>: ParseError: Unexpected token after prop: C: class Class extends Iterator { }
<a href="../conformance/kangax-es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.instanceof.js">Iterator.instanceof.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-es2025/Promise.try.js">Promise.try.js</a>: throw new ReferenceError(`${this.prop} is not defined`); ReferenceError: arguments is not defined
</pre></li>
<li>Next: 8%</li>
<li>Intl: 71%<pre>
<a href="../conformance/kangax-intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-intl/Intl.Collator.prototype.compare.js">Intl.Collator.prototype.compare.js</a>: failed
<a href="../conformance/kangax-intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.iana-timezones.js">Intl.DateTimeFormat.iana-timezones.js</a>: failed
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: ReferenceError: e is not defined
<a href="../conformance/kangax-intl/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: failed
</pre></li>
</ul></details>
