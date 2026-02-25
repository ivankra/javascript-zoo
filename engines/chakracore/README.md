# ChakraCore / Chakra Edge

JavaScript engine of the original Microsoft Edge browser (now Microsoft Edge Legacy), later open-sourced as ChakraCore.

* Repository:  [chakra-core/ChakraCore](https://github.com/chakra-core/ChakraCore.git) <span class="shields"><img src="https://img.shields.io/github/stars/chakra-core/ChakraCore?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/chakra-core/ChakraCore?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [779986](# "cloc --fullpath --not_match_f='(?i)(test)' lib pal")
* Language:    C++
* License:     MIT
* Org:         Microsoft
* Standard:    ES2019
* Years:       2015-2021
* Ancestor:    [JScript9 / Chakra](../jscript9/README.md)
* Features:    WebAssembly engine, deferred parsing
* Interpreter: register-based VM
* JIT:         2-tier JIT, arm/arm64, x86/x64
* DLL:         chakra.dll, chakracore.dll

## History

Originally kept the same name as the predecessor - IE9-11's [Jscript9](../jscript9/README.md)
aka "Chakra" engine (jscript9.dll, or the *legacy engine*). Sometimes
called the *new Chakra* engine, *Edge engine* or chakra.dll to distinguish
from it. The APIs have a breakage in a couple of key functions between them:
[Edge vs. Legacy JsRT APIs](https://learn.microsoft.com/en-us/archive/microsoft-edge/legacy/developer/hosting/chakra-hosting/targeting-edge-vs-legacy-engines-in-jsrt-apis).

Open-sourced in 2016 under the name ChakraCore, except for minor
components like COM/browser bindings that stay in the closed-source
chakra.dll.

Used in Microsoft Edge browser (now Microsoft Edge Legacy) which
launched in 2015 and was discontinued in 2020 in favor of forking
Chromium. Subsequently, Microsoft discontinued maintenance of
ChakraCore and stopped providing security patches in March 2021
([ref](https://github.com/chakra-core/ChakraCore/issues/6384)),
passed it to a rather inactive community of external maintainers.
Continued production use (especially with JIT) is thus risky from
security perspective. Has a partial ES2020 implementation,
BigInt behind a compile flag.

## Runtimes

* [Node-Chakracore](https://github.com/nodejs/node-chakracore) <span class="shields"><img src="https://img.shields.io/github/stars/nodejs/node-chakracore?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nodejs/node-chakracore?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Node.js on ChakraCore

## Links

* [ChakraCore resources: blog posts and talks](https://github.com/chakra-core/ChakraCore/wiki/Resources)
* [ChakraCore shell built-ins (WScriptJsrt.cpp)](https://github.com/chakra-core/ChakraCore/blob/master/bin/ch/WScriptJsrt.cpp#L1088)

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100%</li>
<li>ES3: 99%<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: small number failed
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: large number precision failed
</pre></li>
<li>ES5: 100%</li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 50%, Next 6%, Intl 89%</summary><ul>
<li>ES6: 96%<pre>
<a href="../../conformance/kangax-es6/RegExp.prototype.Symbol.match.js">RegExp.prototype.Symbol.match.js</a>: failed
<a href="../../conformance/kangax-es6/RegExp.prototype.Symbol.replace.js">RegExp.prototype.Symbol.replace.js</a>: failed
<a href="../../conformance/kangax-es6/RegExp.prototype.Symbol.search.js">RegExp.prototype.Symbol.search.js</a>: failed
<a href="../../conformance/kangax-es6/RegExp.prototype.Symbol.split.js">RegExp.prototype.Symbol.split.js</a>: failed
<a href="../../conformance/kangax-es6/RegExp.prototype.flags.js">RegExp.prototype.flags.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.CreateDynamicFunction.js">misc.Proxy.get.CreateDynamicFunction.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.Symbol.match.js">misc.Proxy.get.RegExp.Symbol.match.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.Symbol.replace.js">misc.Proxy.get.RegExp.Symbol.replace.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.Symbol.search.js">misc.Proxy.get.RegExp.Symbol.search.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.Symbol.split.js">misc.Proxy.get.RegExp.Symbol.split.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: TypeError: Unable to get property 'get' of undefined or null reference
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp.prototype.test: 'this' is not a RegExp object
<a href="../../conformance/kangax-es6/misc.Proxy.get.RegExp.toString.js">misc.Proxy.get.RegExp.toString.js</a>: TypeError: RegExp.prototype.toString: 'this' is not a RegExp object
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.replace.js">misc.Proxy.get.String.replace.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: failed
<a href="../../conformance/kangax-es6/misc.Proxy.get.String.split.js">misc.Proxy.get.String.split.js</a>: failed
<a href="../../conformance/kangax-es6/misc.RegExp-prototype-toString-generic.js">misc.RegExp-prototype-toString-generic.js</a>: TypeError: RegExp.prototype.toString: 'this' is not a RegExp object
<a href="../../conformance/kangax-es6/tail-calls.direct.js">tail-calls.direct.js</a>: Error: Out of stack space
<a href="../../conformance/kangax-es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: Error: Out of stack space
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../../conformance/kangax-es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: failed
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/kangax-es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: failed
<a href="../../conformance/kangax-es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: failed
<a href="../../conformance/kangax-es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: failed
</pre></li>
<li>ES2018: 74%<pre>
<a href="../../conformance/kangax-es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Octal numeric literals and escape characters not allowed in strict mode
<a href="../../conformance/kangax-es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/kangax-es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/kangax-es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
</pre></li>
<li>ES2019: 94%<pre>
<a href="../../conformance/kangax-es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: failed
<a href="../../conformance/kangax-es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: failed
</pre></li>
<li>ES2020: 29%</li>
<li>ES2021: 21%</li>
<li>ES2022: 24%</li>
<li>ES2023: 60%<pre>
<a href="../../conformance/kangax-es2023/Array.prototype.toReversed.js">Array.prototype.toReversed.js</a>: TypeError: Object doesn't support property or method 'toReversed'
<a href="../../conformance/kangax-es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: Object doesn't support property or method 'toSorted'
<a href="../../conformance/kangax-es2023/Array.prototype.toSpliced.js">Array.prototype.toSpliced.js</a>: TypeError: Object doesn't support property or method 'toSpliced'
<a href="../../conformance/kangax-es2023/Array.prototype.with.js">Array.prototype.with.js</a>: TypeError: Object doesn't support property or method 'with'
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Object doesn't support property or method 'toReversed'
<a href="../../conformance/kangax-es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Object doesn't support property or method 'toSorted'
<a href="../../conformance/kangax-es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: Object doesn't support property or method 'with'
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6%</li>
<li>Intl: 89%<pre>
<a href="../../conformance/kangax-intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: failed
<a href="../../conformance/kangax-intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: failed
</pre></li>
</ul></details>
