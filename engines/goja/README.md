# goja

JavaScript engine in pure Go. ES5 and mostly ES2023 compliant.

* Repository:       [dop251/goja](https://github.com/dop251/goja.git) <span class="shields"><img src="https://img.shields.io/github/stars/dop251/goja?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/dop251/goja?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [46141](# "cloc --fullpath --not_match_f='(?i)(test)' --exclude-lang=Markdown,YAML .")
* Language:         Go
* License:          MIT
* Standard:         ES2023
* Years:            2016-
* Ancestor:         [otto](../otto/README.md) (borrowed otto's parser)
* Forks:            [Sobek](../sobek/README.md) (adds ES modules support)
* Parser:           recursive descent ([parser/](https://github.com/dop251/goja/tree/master/parser/), LOC: 4.3k)
* Runtime platform: Go (cgo-free)
* Interpreter:      stack-based VM

## Users

* [Geth](https://github.com/ethereum/go-ethereum) - Ethereum's Go implementation

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 98.5% (195/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Object has no member 'getYear'
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Object has no member 'setYear'
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Object has no member 'toGMTString'
</pre></li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 66%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 99.1%<pre>
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
</pre></li>
<li>ES6: 96%<pre>
<a href="../../conformance/compat-table/es6/Symbol.JSON.stringify.object.js">Symbol.JSON.stringify.object.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: Object has no member 'anchor'
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: Object has no member 'anchor'
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: g is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: In non-strict mode code, functions can only be declared at top level, inside a block, or as the body of an if statement. at annex-b.function.labeled.js:12:10
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token &gt; (and 2 more errors)
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.not-computed.js">annex-b.__proto__.literals.not-computed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.lexical-arguments.js">arrow.lexical-arguments.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp-constructor.js">misc.Proxy.get.RegExp-constructor.js</a>: SyntaxError: Invalid flags supplied to RegExp constructor 'undefined'
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.flags.js">misc.Proxy.get.RegExp.flags.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.RegExp.test.js">misc.Proxy.get.RegExp.test.js</a>: TypeError: Method RegExp.prototype.test called on incompatible receiver [object Object]
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.instanceof.js">misc.Proxy.get.instanceof.js</a>: TypeError: Expecting a function in instanceof check, but got function () { [native code] }
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: TIMEOUT: &gt;60s
</pre></li>
<li>ES2016: 90.9%<pre>
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 68%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined or null
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined or null
...
</pre></li>
<li>ES2018: 63.2%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: Unexpected token await (and 4 more errors)
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: SyntaxError: Async generators are not supported yet at async-iterators.generators.js:44:3
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: TypeError: Cannot read property 'year' of undefined
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 42.9%</li>
<li>ES2022: 90.5%<pre>
<a href="../../conformance/compat-table/es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: Invalid flags supplied to RegExp constructor 'd'
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 0%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 65.5%, main 79.8%, staging 66.3%, annexB 56.4%, Next 3.7%, Intl 0.7%</summary>
<ul>
<li>Overall: 65.5% (34840/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 79.8% (32915/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.5% (8072/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 96.5% (10671/11054)<pre>
__proto__: 94.4% (17/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 32.8% (88/268)
DataView: 50.5% (96/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 33.3% (2/6)
Float64Array: 33.3% (2/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 77.1% (27/35)
Map: 62.5% (25/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 86.1% (403/468)
Reflect: 72.9% (341/468)
Reflect.construct: 62.8% (437/696)
Reflect.set: 93.5% (43/46)
Reflect.setPrototypeOf: 91.3% (21/23)
Set: 97.4% (37/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 56.2% (839/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 50.6% (944/1865)
Symbol.match: 96.6% (85/88)
Symbol.replace: 85.7% (84/98)
Symbol.search: 89.2% (33/37)
Symbol.species: 88% (243/276)
Symbol.split: 93.1% (54/58)
Symbol.toPrimitive: 82% (191/233)
Symbol.toStringTag: 45.8% (60/131)
Symbol.unscopables: 81.8% (36/44)
TypedArray: 76.2% (1914/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 57% (45/79)
WeakSet: 70.6% (24/34)
arrow-function: 61.2% (581/949)
class: 81.6% (3891/4768)
computed-property-names: 92.1% (440/478)
const: 86.7% (13/15)
cross-realm: 0% (0/201)
default-parameters: 97.7% (2216/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 82.8% (5495/6637)
for-of: 80% (4/5)
generators: 87% (3553/4085)
let: 89.6% (69/77)
new.target: 98.4% (60/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 94.3% (33/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 50.7% (35/69)
exponentiation: 96.1% (99/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 45.6% (347/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 86.2% (608/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 17% (827/4855)<pre>
IsHTMLDDA: 23.8% (10/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (593/4968)
object-rest: 63.4% (225/355)
object-spread: 88.1% (119/135)
regexp-dotall: 64.7% (11/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 52% (52/100)
regexp-unicode-property-escapes: 2.5% (17/681)
</pre></li>
<li>ES2019: 99.3% (136/137)<pre>
Array.prototype.flat: 93.3% (14/15)
Array.prototype.flatMap: 100% (21/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 65.8% (1418/2156)<pre>
BigInt: 73.4% (1102/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 95.2% (60/63)
coalesce-expression: 96.2% (25/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 51.4% (76/148)
import.meta: 69.6% (16/23)
optional-chaining: 96.4% (54/56)
</pre></li>
<li>ES2021: 57.6% (530/920)<pre>
AggregateError: 93.5% (29/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 95.1% (39/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 89.2% (141/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 74.3% (4063/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 94.1% (1067/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 88.9% (1829/2058)
class-methods-private: 74.8% (1279/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 89.3% (308/345)
class-static-fields-public: 97.2% (207/213)
class-static-methods-private: 67.5% (1022/1513)
error-cause: 100% (5/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 84.7% (261/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 96.3% (105/109)
change-array-by-copy: 97.7% (129/132)
hashbang: 96.6% (28/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 8.3% (70/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 23.5% (44/187)
resizable-arraybuffer: 4.3% (20/463)
</pre></li>
<li>ES2025: 18.7% (236/1264)<pre>
Float16Array: 22.4% (11/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>Next: 3.7% (313/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.3% (73/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 15.8% (3/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 89.1% (7773/8720)</li>
</ul>
</details>
