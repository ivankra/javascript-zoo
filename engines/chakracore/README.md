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

Used in Microsoft Edge browser (now Microsoft Edge Legacy), which
launched in 2015 and was discontinued in 2020 in favor of Chromium
(Blink). Subsequently, Microsoft discontinued maintenance of
ChakraCore and stopped providing security patches in March 2021
([ref](https://github.com/chakra-core/ChakraCore/issues/6384)),
then passed it to a rather inactive community of external maintainers.
Continued production use (especially with JIT) is thus risky from
a security perspective. It has partial ES2020 support, with
BigInt behind a compile flag.

## Runtimes

* [Node-Chakracore](https://github.com/nodejs/node-chakracore) <span class="shields"><img src="https://img.shields.io/github/stars/nodejs/node-chakracore?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nodejs/node-chakracore?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - Node.js on ChakraCore

## Links

* [ChakraCore resources: blog posts and talks](https://github.com/chakra-core/ChakraCore/wiki/Resources)
* [ChakraCore shell built-ins (WScriptJsrt.cpp)](https://github.com/chakra-core/ChakraCore/blob/master/bin/ch/WScriptJsrt.cpp#L1088)

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>ES1: 97% (192/198)<pre>
<a href="../../conformance/es1/bitwise.unsigned-shift.js">bitwise.unsigned-shift.js</a>: FAIL: -12345 &gt;&gt;&gt; 0 != 4294954951 (got: 4294954951)
<a href="../../conformance/es1/conversions.ToInt32.js">conversions.ToInt32.js</a>: FAIL: 2^32-1 failed; 2^32 failed; -2^31-1 failed
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: FAIL: 1e21 failed
<a href="../../conformance/es1/conversions.ToUint32.js">conversions.ToUint32.js</a>: FAIL: 2^32-1 failed; 2^32 failed; 2^31 failed; -1 failed; -2^31 failed
<a href="../../conformance/es1/numbers.double.js">numbers.double.js</a>: FAIL: converting max safe integer + 1 to string
<a href="../../conformance/es1/numbers.inf.js">numbers.inf.js</a>: FAIL: 1/0 != 1e10000; -1/0 != -1e10000; Infinity == -Infinity; +Infinity magnitude failed; -Infinity magnitude failed; Infinity + Infinity != Infinity; Infinity * Infinity != Infinity; Infinity - Infinity i...
</pre></li>
<li>ES3: 98% (145/148)<pre>
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: FAIL: max() with 0 args failed
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: small number failed
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
</pre></li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: NaN and Infinity not converted null
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 48%, Next 6%, Intl 89%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 95.7%<pre>
<a href="../../conformance/compat-table/es6/RegExp.prototype.Symbol.match.js">RegExp.prototype.Symbol.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.prototype.Symbol.replace.js">RegExp.prototype.Symbol.replace.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.prototype.Symbol.search.js">RegExp.prototype.Symbol.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.prototype.Symbol.split.js">RegExp.prototype.Symbol.split.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.prototype.flags.js">RegExp.prototype.flags.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.CreateDynamicFunction.js">misc.Proxy.get.CreateDynamicFunction.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.match.js">misc.Proxy.get.RegExp.Symbol.match.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.replace.js">misc.Proxy.get.RegExp.Symbol.replace.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.search.js">misc.Proxy.get.RegExp.Symbol.search.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.Symbol.split.js">misc.Proxy.get.RegExp.Symbol.split.js</a>: TypeError: Unable to get property 'call' of undefined or null reference
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: TypeError: Unable to get property 'get' of undefined or null reference
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: RegExp.prototype.test: 'this' is not a RegExp object
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.toString.js">misc.Proxy.get.RegExp.toString.js</a>: TypeError: RegExp.prototype.toString: 'this' is not a RegExp object
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.replace.js">misc.Proxy.get.String.replace.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.split.js">misc.Proxy.get.String.split.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.RegExp-prototype-toString-generic.js">misc.RegExp-prototype-toString-generic.js</a>: TypeError: RegExp.prototype.toString: 'this' is not a RegExp object
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: FAIL: Out of stack space
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 79.5%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: 'Atomics' is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: 'SharedArrayBuffer' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 73.7%<pre>
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Octal numeric literals and escape characters not allowed in strict mode
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: SyntaxError: Unexpected quantifier
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid escape in unicode pattern
</pre></li>
<li>ES2019: 77.4%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flatMap.js">Array.prototype.flatMap.js</a>: TypeError: Length property would exceed maximum value in output from 'Array.prototype.flatMap'
<a href="../../conformance/compat-table/es2019/Array.prototype.flat.js">Array.prototype.flat.js</a>: TypeError: Length property would exceed maximum value in output from 'Array.prototype.flat'
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
</pre></li>
<li>ES2020: 28.6%</li>
<li>ES2021: 21.4%</li>
<li>ES2022: 23.8%</li>
<li>ES2023: 60%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toReversed.js">Array.prototype.toReversed.js</a>: TypeError: Object doesn't support property or method 'toReversed'
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: Object doesn't support property or method 'toSorted'
<a href="../../conformance/compat-table/es2023/Array.prototype.toSpliced.js">Array.prototype.toSpliced.js</a>: TypeError: Object doesn't support property or method 'toSpliced'
<a href="../../conformance/compat-table/es2023/Array.prototype.with.js">Array.prototype.with.js</a>: TypeError: Object doesn't support property or method 'with'
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: Object doesn't support property or method 'toReversed'
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: Object doesn't support property or method 'toSorted'
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: Object doesn't support property or method 'with'
</pre></li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 89.3%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 62.3%, main 75.1%, staging 61.1%, annexB 65.4%, Next 3.8%, Intl 7%</summary>
<ul>
<li>Overall: 62.3% (33117/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 75.1% (30964/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96.7% (7929/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 92.6% (10234/11054)<pre>
__proto__: 88.9% (16/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 14.9% (40/268)
DataView: 24.7% (47/190)
DataView.prototype.getFloat32: 71.4% (5/7)
DataView.prototype.getFloat64: 80% (4/5)
DataView.prototype.getInt16: 57.1% (4/7)
DataView.prototype.getInt32: 57.1% (4/7)
DataView.prototype.getInt8: 60% (3/5)
DataView.prototype.getUint16: 57.1% (4/7)
DataView.prototype.getUint32: 57.1% (4/7)
DataView.prototype.setUint8: 35.7% (20/56)
Float32Array: 33.3% (2/6)
Float64Array: 33.3% (2/6)
Int16Array: 100% (2/2)
Int32Array: 50% (2/4)
Int8Array: 77.1% (27/35)
Map: 62.5% (25/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 82.1% (384/468)
Reflect: 57.5% (269/468)
Reflect.construct: 63.2% (440/696)
Reflect.set: 73.9% (34/46)
Reflect.setPrototypeOf: 78.3% (18/23)
Set: 97.4% (37/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 96.3% (26/27)
String.prototype.includes: 96.2% (25/26)
Symbol: 44.1% (659/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 80.9% (1508/1865)
Symbol.match: 15.9% (14/88)
Symbol.replace: 8.2% (8/98)
Symbol.search: 18.9% (7/37)
Symbol.species: 59.1% (163/276)
Symbol.split: 12.1% (7/58)
Symbol.toPrimitive: 45.5% (106/233)
Symbol.toStringTag: 50.4% (66/131)
Symbol.unscopables: 90.9% (40/44)
TypedArray: 44.1% (1109/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 45.5% (5/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 57% (45/79)
WeakSet: 70.6% (24/34)
arrow-function: 57.4% (545/949)
class: 23.4% (1118/4768)
computed-property-names: 35.6% (170/478)
const: 100% (15/15)
cross-realm: 32.3% (65/201)
default-parameters: 77.7% (1764/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 84.7% (5624/6637)
for-of: 80% (4/5)
generators: 72.6% (2967/4085)
let: 76.6% (59/77)
new.target: 54.1% (33/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 73.7% (14/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 73.8% (96/130)<pre>
Array.prototype.includes: 52.2% (36/69)
exponentiation: 41.7% (43/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 45.2% (344/761)<pre>
__getter__: 92.6% (25/27)
__setter__: 92.6% (25/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 54.5% (384/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 86.9% (4217/4855)<pre>
IsHTMLDDA: 21.4% (9/42)
Promise.prototype.finally: 86.2% (25/29)
Symbol.asyncIterator: 67.1% (361/538)
async-iteration: 78.6% (3903/4968)
object-rest: 79.7% (283/355)
object-spread: 94.1% (127/135)
regexp-dotall: 17.6% (3/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 59% (59/100)
regexp-unicode-property-escapes: 22.2% (151/681)
</pre></li>
<li>ES2019: 83.9% (115/137)<pre>
Array.prototype.flat: 40% (6/15)
Array.prototype.flatMap: 47.6% (10/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 62.5% (5/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 25% (540/2156)<pre>
BigInt: 4.1% (61/1501)
Intl.NumberFormat-unified: 3% (2/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 94.1% (96/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 9.5% (6/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 47.7% (451/946)
export-star-as-namespace-from-module: 78.9% (15/19)
for-in-order: 44.4% (4/9)
globalThis: 44.6% (66/148)
import.meta: 95.7% (22/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 34.2% (315/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 6.2% (1/16)
Intl.DateTimeFormat-formatRange: 16.2% (6/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 6.4% (3/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 95.7% (88/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 29.1% (46/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 83.6% (133/159)
</pre></li>
<li>ES2022: 22.7% (1243/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 50% (1/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 1.3% (1/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34.3% (389/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 100% (5/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 92.3% (250/271)
</pre></li>
<li>ES2023: 36.4% (112/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 70.6% (77/109)
change-array-by-copy: 4.5% (6/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 8.7% (73/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 3.5% (16/463)
</pre></li>
<li>ES2025: 18% (228/1264)<pre>
Float16Array: 22.4% (11/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.1% (12/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>Next: 3.8% (320/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0.1% (1/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 6.9% (7/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 30.6% (22/72)
</pre></li>
<li>N/A: 84.3% (7351/8720)</li>
</ul>
</details>
