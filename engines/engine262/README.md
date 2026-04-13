# engine262

An implementation of ECMA-262 in JavaScript aiming for 100% spec compliance, fast prototyping, validating new spec versions and test262.

* Homepage:         [engine262.js.org](https://engine262.js.org/)
* Repository:       [engine262/engine262](https://github.com/engine262/engine262.git) <span class="shields"><img src="https://img.shields.io/github/stars/engine262/engine262?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/engine262/engine262?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [39329](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Standard:         ESnext
* Years:            2018-
* Parser:           recursive descent
* Runtime platform: JavaScript (Node)
* Interpreter:      tree walker

## Features

Extensive standard library implementation, unlike most JavaScript-in-JavaScript interpreters.
But, very slow.

## Links

* https://docs.google.com/presentation/d/1lxX20voV2RuZE6QtlawShfznXtq8-yEMvXRucE_oyYk/view

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 97.5% (193/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: d.getYear is not a function. (In "d.getYear()", it is undefined)
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: d.setYear is not a function. (In "d.setYear(99)", it is undefined)
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: d.toGMTString is not a function. (In "d.toGMTString()", it is undefined)
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: "escape" is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: "unescape" is not defined
</pre></li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: s.substr is not a function. (In "s.substr(2, 3)", it is undefined)
</pre></li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 96%, ES2016+ 94%, Next 9%, Intl 25%</summary><ul>
<li>ES5: 98.9%<pre>
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: TypeError: '0b'.substr is not a function. (In "'0b'.substr(-1)", it is undefined)
</pre></li>
<li>ES6: 95.7%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.getOwnPropertyDescriptor.js">Proxy.handler.getOwnPropertyDescriptor.js</a>: FAIL: failed'
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL: failed'
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: rx.compile is not a function. (In "rx.compile('b')", it is undefined)
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL: failed'
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: \"\"[names[i]] is not a function. (In \"\""[names[i]]()", it is undefined)
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: \"\"[names[i]] is not a function. (In \"\"\"[names[i]]('"')", it is undefined)
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: "g" is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token
<a href="../../conformance/compat-table/es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: There is no 41 capture groups
<a href="../../conformance/compat-table/es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: Invalid class range
<a href="../../conformance/compat-table/es6/annex-b.regex.incomplete-patterns.js">annex-b.regex.incomplete-patterns.js</a>: SyntaxError: Expected } but got
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: SyntaxError: Invalid identity escape
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: FAIL: failed'
<a href="../../conformance/compat-table/es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError: Invalid identity escape
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 80%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL: failed'
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token
</pre></li>
<li>ES2018: 98.9%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid unicode property value
</pre></li>
<li>ES2019: 93.8%<pre>
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimLeft.js">annex-b.String.prototype.trimLeft.js</a>: TypeError: ' \\t \\n abc   \\t\\n'.trimLeft is not a function. (In "' \\t \\n abc   \\t\\n'.trimLeft()", it is undefined)
<a href="../../conformance/compat-table/es2019/annex-b.String.prototype.trimRight.js">annex-b.String.prototype.trimRight.js</a>: TypeError: ' \\t \\n abc   \\t\\n'.trimRight is not a function. (In "' \\t \\n abc   \\t\\n'.trimRight()", it is undefined)
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 67.3%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: TypeError: buffer1.transfer is not a function. (In "buffer1.transfer()", it is undefined)
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: TypeError: buffer1.transferToFixedLength is not a function. (In "buffer1.transferToFixedLength()", it is undefined)
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: TypeError: buffer1.transfer is not a function. (In "buffer1.transfer()", it is undefined)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: FAIL: failed'
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 9.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 87.9%, main 96.1%, staging 90%, annexB 15.7%, Next 66.9%, Intl 2.2%</summary>
<ul>
<li>Overall: 87.9% (46742/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 96.1% (39635/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.2% (8052/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 97.5% (10783/11054)<pre>
__proto__: 100% (18/18)
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
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.4% (465/468)
Reflect: 90.8% (425/468)
Reflect.construct: 87.1% (606/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 72.7% (16/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 88.4% (1320/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.8% (1862/1865)
Symbol.match: 97.7% (86/88)
Symbol.replace: 98% (96/98)
Symbol.search: 97.3% (36/37)
Symbol.species: 92.4% (255/276)
Symbol.split: 94.8% (55/58)
Symbol.toPrimitive: 80.3% (187/233)
Symbol.toStringTag: 78.6% (103/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 80% (2010/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 84.1% (798/949)
class: 99.8% (4757/4768)
computed-property-names: 95.6% (457/478)
const: 100% (15/15)
cross-realm: 87.1% (175/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.8% (6627/6637)
for-of: 100% (5/5)
generators: 99.8% (4078/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 93.8% (122/130)<pre>
Array.prototype.includes: 53.6% (37/69)
exponentiation: 99% (102/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 52.8% (402/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 93.2% (657/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 90.4% (4388/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.8% (4958/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 94.1% (16/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 98% (98/100)
regexp-unicode-property-escapes: 35.2% (240/681)
</pre></li>
<li>ES2019: 94.2% (129/137)<pre>
Array.prototype.flat: 100% (15/15)
Array.prototype.flatMap: 100% (21/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 95.8% (23/24)
String.prototype.trimStart: 95.7% (22/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 100% (4/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 85.2% (46/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 88.2% (1902/2156)<pre>
BigInt: 86.7% (1301/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 89.7% (849/946)
export-star-as-namespace-from-module: 94.7% (18/19)
for-in-order: 100% (9/9)
globalThis: 97.3% (144/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 67.7% (623/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 96.8% (153/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 98.3% (5371/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 100% (1134/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 100% (2058/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 98.9% (268/271)
</pre></li>
<li>ES2023: 92.2% (284/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 96.3% (105/109)
change-array-by-copy: 97.7% (129/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 30.8% (259/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 4.1% (19/463)
</pre></li>
<li>ES2025: 88.8% (1123/1264)<pre>
Float16Array: 32.7% (16/49)
Intl.DurationFormat: 0.9% (1/112)
RegExp.escape: 100% (21/21)
import-attributes: 92% (92/100)
iterator-helpers: 100% (567/567)
json-modules: 92.3% (12/13)
promise-try: 100% (12/12)
regexp-modifiers: 99.6% (229/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 66.9% (5595/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 0% (0/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 2.8% (43/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 98.4% (63/64)
Temporal: 69.3% (4624/6670)
await-dictionary: 100% (37/37)
canonical-tz: 0% (0/19)
decorators: 100% (27/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 97.4% (223/229)
import-text: 100% (6/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 96.2% (75/78)
json-parse-with-source: 100% (22/22)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 100% (4/4)
regexp-duplicate-named-groups: 94.7% (18/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 88.4% (7709/8720)</li>
</ul>
</details>
