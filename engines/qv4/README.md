# QV4 / QJSEngine

JavaScript engine of Qt's QML framework (QJSEngine).

* Homepage:     https://wiki.qt.io/V4
* Repository:   https://github.com/qt/qtdeclarative.git <span class="shields"><img src="https://img.shields.io/github/stars/qt/qtdeclarative?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/qt/qtdeclarative?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * Top-level repository - https://code.qt.io/qt/qt5.git
  * Engine code in [qtdeclarative/src/qml](https://github.com/qt/qtdeclarative/tree/dev/src/qml) + JSC's macroassembler and YARR in [qtdeclarative/src/3rdparty](https://github.com/qt/qtdeclarative/tree/dev/src/3rdparty)
* LOC:          50221 (`cloc qtdeclarative/src/{qml/{jsruntime,jsapi,jit}`)
* Language:     C++
* License:      Qt, GPL, LGPL
* Org:          Qt
* Standard:     ES2016
* Years:        2012-
* Predecessors: [QtScript](../qtscript/README.md), [V8](../v8/README.md)
* Interpreter:  register-based VM with accumulator ("Moth", [qv4vme_moth.cpp](https://github.com/qt/qtdeclarative/blob/dev/src/qml/jsruntime/qv4vme_moth.cpp))
* JIT:          x86/x64, arm/arm64
* Regex engine: YARR, JIT-enabled

## History

First appeared in Qt 5.0 (2012) as a V8 wrapper, then switched to a home-grown engine in Qt 5.3 (2013).

## Users

* Qt applications
* [KDE Plasma](https://develop.kde.org/docs/plasma/scripting/)
* [Okular](https://github.com/KDE/okular) - for evaluation of JavaScript code in .pdf

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 99%<pre>
<a href="../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Unexpected token `'
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Unexpected token `'
</pre></li>
<li>ES3: 99%<pre>
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4; 'test'.split(/(?:)/, -1).length !== 4; ''.split(/.?/).length !== 0; '.'.split(/()()/).length !== 1
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: split by empty regex failed
</pre></li>
<li>ES5: 95%<pre>
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer array failed
<a href="../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: TypeError: Type error
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 87%, ES2016+ 21%, Next 6%, Intl 25%</summary><ul>
<li>ES6: 87%<pre>
<a href="../conformance/kangax-es6/Function.name.bound.js">Function.name.bound.js</a>: failed
<a href="../conformance/kangax-es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: failed
<a href="../conformance/kangax-es6/Promise.all.js">Promise.all.js</a>: failed
<a href="../conformance/kangax-es6/Promise.js">Promise.js</a>: failed
<a href="../conformance/kangax-es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: failed
<a href="../conformance/kangax-es6/Promise.race.js">Promise.race.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: failed
<a href="../conformance/kangax-es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: TypeError: Type error
<a href="../conformance/kangax-es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
<a href="../conformance/kangax-es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../conformance/kangax-es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Syntax error
<a href="../conformance/kangax-es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: FunctionDeclarations are not allowed after a label.
<a href="../conformance/kangax-es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token `&gt;'
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.js">annex-b.__proto__.literals.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.multiple-error.js">annex-b.__proto__.literals.multiple-error.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: failed
<a href="../conformance/kangax-es6/annex-b.__proto__.literals.not-shorthand-method.js">annex-b.__proto__.literals.not-shorthand-method.js</a>: failed
...
</pre></li>
<li>ES2016: 86%<pre>
<a href="../conformance/kangax-es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: failed
<a href="../conformance/kangax-es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: failed
</pre></li>
<li>ES2017: 54%<pre>
<a href="../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: failed
<a href="../conformance/kangax-es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot convert a symbol to a string.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: failed
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot convert a symbol to a string.
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: __lookupGetter__ is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Property '__lookupGetter__' of object [object Object] is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: __lookupSetter__ is not defined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Property '__lookupSetter__' of object [object Object] is not a function
<a href="../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../conformance/kangax-es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Expected token `;'
<a href="../conformance/kangax-es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: SyntaxError: Expected token `)'
<a href="../conformance/kangax-es2017/async.arrow-in-class.js">async.arrow-in-class.js</a>: SyntaxError: Expected token `)'
...
</pre></li>
<li>ES2018: 0%</li>
<li>ES2019: 2%</li>
<li>ES2020: 36%</li>
<li>ES2021: 7%</li>
<li>ES2022: 4%</li>
<li>ES2023: 20%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 25%</li>
</ul></details>
