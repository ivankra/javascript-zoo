# Asynkron

Vibe-coded JavaScript interpreter for .NET.

* Repository:       [asynkron/Asynkron.JsEngine](https://github.com/asynkron/Asynkron.JsEngine.git) <span class="shields"><img src="https://img.shields.io/github/stars/asynkron/Asynkron.JsEngine?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/asynkron/Asynkron.JsEngine?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [137782](# "cloc src")
* Language:         C#
* License:          MIT
* Standard:         ESnext
* Runtime platform: .NET

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99%<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Legacy octal literals are not allowed. Use 0o prefix for octal literals on line 14 column 10.
</pre></li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: TypeError: Cannot read properties of null or undefined
</pre></li>
<li>ES5: 96%<pre>
<a href="../../conformance/es5/debugger.js">debugger.js</a>: ReferenceError: debugger is not defined
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 92%, Next 16%, Intl 100%</summary><ul>
<li>ES6: 90%, <b>2 crashes</b><pre>
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: failed
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: failed
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: failed
<a href="../../conformance/compat-table/es6/Reflect.getPrototypeOf.js">Reflect.getPrototypeOf.js</a>: failed
<a href="../../conformance/compat-table/es6/Set.zero-key.js">Set.zero-key.js</a>: failed
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: TypeError: Attempted to call a non-callable value 'g' of type 'Undefined'.
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: Attempted to call a non-callable value 'foo' of type 'Undefined'.
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: SyntaxError: Invalid pattern '[\z]' at offset 3. Unrecognized escape sequence \z.
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Invalid pattern '[\x1]' at offset 5. Insufficient or invalid hexadecimal digits.
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: Invalid pattern '[\u1]' at offset 3. Insufficient or invalid hexadecimal digits.
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.multiple-error.js">annex-b.__proto__.literals.multiple-error.js</a>: failed
<a href="../../conformance/compat-table/es6/arrow.lexical-arguments.js">arrow.lexical-arguments.js</a>: failed
<a href="../../conformance/compat-table/es6/arrow.lexical-super.constructor.js">arrow.lexical-super.constructor.js</a>: failed
<a href="../../conformance/compat-table/es6/arrow.no-line-break.js">arrow.no-line-break.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-assign.parenthesised-error.js">destructuring-assign.parenthesised-error.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-decl.computed-properties.js">destructuring-decl.computed-properties.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-decl.defaults.js">destructuring-decl.defaults.js</a>: failed
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: failed
...
</pre></li>
<li>ES2016: 76%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: failed
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: exception: undefined
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 84%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Attempted to call a non-callable value 'a.__defineGetter__' of type 'Undefined'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Attempted to call a non-callable value 'a.__defineSetter__' of type 'Undefined'.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Cannot read properties of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: failed
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: failed
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: failed
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: failed
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: failed
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 88%<pre>
<a href="../../conformance/compat-table/es2018/object-rest.js">object-rest.js</a>: failed
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{Script=Sidetic}.
</pre></li>
<li>ES2019: 98%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: failed
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 98%<pre>
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError: Unexpected token '}'. at line 10, column 32
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 80%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{Emoji_Keycap_Sequence}.
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: Invalid pattern '(?:[\u0000-\uFFFF\--[]|\uD800[\uDC00-\uDFFF]|[\uD801-\uDBFE][\uDC00-\uDFFF]|\uDBFF[\uDC00-\uDFFF]|\uD7C0[\uDC01-\uDFFF]|[\uD7C1-\uDBFE][\uDC00-\uDFFF]|\uDBFF[\uDC00-\uDFFF])]' at offs...
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{RGI_Emoji}.
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{RGI_Emoji}.
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{RGI_Emoji}.
</pre></li>
<li>ES2025: 89%<pre>
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: Promise.try is not yet implemented
<a href="../../conformance/compat-table/es2025/RegExp.escape.js">RegExp.escape.js</a>: RegExp.escape is not yet implemented
</pre></li>
<li>Next: 16%</li>
<li>Intl: 100%</li>
</ul></details>

💥 **2 crashes during testing**
