# QV4 / QJSEngine

JavaScript engine of Qt's QML framework (QJSEngine).

* Homepage:     [wiki.qt.io/V4](https://wiki.qt.io/V4)
* Repository:   [qt/qtdeclarative](https://github.com/qt/qtdeclarative.git) <span class="shields"><img src="https://img.shields.io/github/stars/qt/qtdeclarative?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/qt/qtdeclarative?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [src/qml/](https://github.com/qt/qtdeclarative/tree/dev/src/qml))
* LOC:          [50221](# "cloc qtdeclarative/src/{qml/{jsruntime,jsapi,jit}")
* Language:     C++
* License:      Qt, GPL, LGPL
* Org:          Qt
* Standard:     ES2016
* Years:        2012-
* Predecessors: [QtScript](../qtscript/README.md), [V8](../v8/README.md)
* Interpreter:  register-based VM with accumulator ("Moth", [qv4vme_moth.cpp](https://github.com/qt/qtdeclarative/blob/dev/src/qml/jsruntime/qv4vme_moth.cpp))
* JIT:          x86/x64, arm/arm64
* Regex engine: YARR, JIT-enabled

## Notes

Top-level repository is [qt5.git](https://github.com/qt/qt5.git) (even for Qt6).
Engine code in [qtdeclarative](https://github.com/qt/qtdeclarative.git) submodule:
[src/qml/](https://github.com/qt/qtdeclarative/tree/dev/src/qml) +
macroassembler and YARR in [src/3rdparty](https://github.com/qt/qtdeclarative/tree/dev/src/3rdparty).

First appeared in Qt 5.0 (2012) as a V8 wrapper, then switched to a home-grown engine in Qt 5.3 (2013).

## Users

* Qt applications
* [KDE Plasma](https://develop.kde.org/docs/plasma/scripting/)
* [Okular](https://github.com/KDE/okular) - for evaluation of JavaScript code in .pdf

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>Tested version: <a href="https://github.com/qt/qt5/commit/3687dbd3e25cf9293717c3fc0555414e2813ab17">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/qv4.json">json</a>)</li>
<li>ES1: 99% (196/198)<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Unexpected token `'
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Unexpected token `'
</pre></li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4; 'test'.split(/(?:)/, -1).length !== 4; ''.split(/.?/).length !== 0; '.'.split(/()()/).length !== 1
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: FAIL: split by empty regex failed
</pre></li>
<li>ES5: 94.6% (70/74)<pre>
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer array failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: TypeError: Type error
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 87%, ES2016+ 21%, Next 6%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/qt/qt5/commit/3687dbd3e25cf9293717c3fc0555414e2813ab17">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/qv4.json">json</a>)</li>
<li>ES5: 97.1%<pre>
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Type error
</pre></li>
<li>ES6: 87.2%<pre>
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.js">Promise.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.JSON.stringify.js">Proxy.JSON.stringify.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: TypeError: Type error
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: FunctionDeclarations are not allowed after a label.
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token `&gt;'
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.js">annex-b.__proto__.literals.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.multiple-error.js">annex-b.__proto__.literals.multiple-error.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: FAIL
...
</pre></li>
<li>ES2016: 86.4%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.sparse.js">Array.prototype.includes.sparse.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 53.6%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot convert a symbol to a string.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot convert a symbol to a string.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: __lookupGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Property '__lookupGetter__' of object [object Object] is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: __lookupSetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Property '__lookupSetter__' of object [object Object] is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot call method 'call' of undefined
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Expected token `;'
<a href="../../conformance/compat-table/es2017/async.Symbol.toStringTag.js">async.Symbol.toStringTag.js</a>: SyntaxError: Expected token `)'
...
</pre></li>
<li>ES2018: 0%</li>
<li>ES2019: 1.8%</li>
<li>ES2020: 35.7%</li>
<li>ES2021: 7.1%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 20%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 49.8%, main 60.7%, staging 47.3%, annexB 24.4%, Next 3.4%, Intl 0.6%</summary>
<ul>
<li>Tested version: <a href="https://github.com/qt/qt5/commit/3687dbd3e25cf9293717c3fc0555414e2813ab17">2026-04-22</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/qv4.json">json</a>)</li>
<li>Overall: 49.8% (26483/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 60.7% (25235/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96.8% (7934/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 85.6% (9459/11054)<pre>
__proto__: 72.2% (13/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 22% (59/268)
DataView: 27.9% (53/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 64.3% (36/56)
Float32Array: 57.1% (4/7)
Float64Array: 57.1% (4/7)
Int16Array: 100% (2/2)
Int32Array: 50% (2/4)
Int8Array: 85.7% (30/35)
Map: 62.5% (25/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 66.7% (312/468)
Reflect: 57.5% (269/468)
Reflect.construct: 57.2% (398/696)
Reflect.set: 58.7% (27/46)
Reflect.setPrototypeOf: 95.7% (22/23)
Set: 97.4% (37/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 96.3% (26/27)
String.prototype.includes: 96.2% (25/26)
Symbol: 39.3% (587/1494)
Symbol.hasInstance: 88.2% (15/17)
Symbol.isConcatSpreadable: 64.7% (22/34)
Symbol.iterator: 37.1% (692/1865)
Symbol.match: 71.6% (63/88)
Symbol.replace: 64.3% (63/98)
Symbol.search: 70.3% (26/37)
Symbol.species: 45.7% (126/276)
Symbol.split: 84.5% (49/58)
Symbol.toPrimitive: 32.2% (75/233)
Symbol.toStringTag: 41.2% (54/131)
Symbol.unscopables: 29.5% (13/44)
TypedArray: 34.9% (877/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 57% (45/79)
WeakSet: 70.6% (24/34)
arrow-function: 41.8% (397/949)
class: 21.6% (1032/4768)
computed-property-names: 31% (148/478)
const: 80% (12/15)
cross-realm: 0% (0/201)
default-parameters: 69.9% (1585/2269)
destructuring-assignment: 36.2% (51/141)
destructuring-binding: 64.4% (4272/6637)
for-of: 60% (3/5)
generators: 59% (2411/4085)
let: 64.9% (50/77)
new.target: 31.1% (19/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 53.1% (51/96)
super: 21.1% (4/19)
tail-call-optimization: 94.3% (33/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 76.9% (100/130)<pre>
Array.prototype.includes: 44.9% (31/69)
exponentiation: 51.5% (53/103)
u180e: 84% (21/25)
</pre></li>
<li>ES2017: 47.6% (363/763)<pre>
__getter__: 37% (10/27)
__setter__: 37% (10/27)
Atomics: 27.2% (103/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 28% (130/464)
async-functions: 28.9% (204/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 9.3% (453/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 6.9% (2/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (590/4968)
object-rest: 0.8% (3/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 10.5% (2/19)
regexp-named-groups: 7% (7/100)
regexp-unicode-property-escapes: 2.2% (15/681)
</pre></li>
<li>ES2019: 3.6% (5/137)<pre>
Array.prototype.flat: 6.7% (1/15)
Array.prototype.flatMap: 4.8% (1/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 10.6% (228/2156)<pre>
BigInt: 3.7% (56/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 0% (0/19)
for-in-order: 22.2% (2/9)
globalThis: 0% (0/148)
import.meta: 17.4% (4/23)
optional-chaining: 67.9% (38/56)
</pre></li>
<li>ES2021: 18.3% (168/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 14.6% (23/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 83% (132/159)
</pre></li>
<li>ES2022: 16% (875/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 0% (0/16)
class-fields-private: 33.2% (377/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14% (289/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.6% (16/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 0.4% (1/271)
</pre></li>
<li>ES2023: 10.2% (42/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 11% (12/109)
change-array-by-copy: 4.5% (6/132)
hashbang: 82.8% (24/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 8% (67/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 3.4% (2/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 23.5% (44/187)
resizable-arraybuffer: 3.2% (15/463)
</pre></li>
<li>ES2025: 10.3% (131/1266)<pre>
Float16Array: 13.7% (7/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 1% (1/100)
iterator-helpers: 2.1% (12/567)
json-modules: 0% (0/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 35.2% (81/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>ES2026: 8.6% (31/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 13.6% (3/22)
uint8array-base64: 8.7% (6/69)
upsert: 30.6% (22/72)
</pre></li>
<li>Next: 3.4% (267/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.2% (63/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 30.6% (70/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 19.2% (5/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 55.3% (126/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 73% (6360/8718)</li>
</ul>
</details>
