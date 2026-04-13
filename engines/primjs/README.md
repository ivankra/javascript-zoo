# PrimJS

[QuickJS](../quickjs/README.md)-based engine from ByteDance for their cross-platform mobile apps framework Lynx.

* Repository:  [lynx-family/primjs](https://github.com/lynx-family/primjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/lynx-family/primjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/lynx-family/primjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [292098](# "cloc src")
* Language:    C++
* License:     Apache-2.0
* Org:         ByteDance
* Standard:    ES2019
* Years:       2024-
* Ancestor:    [QuickJS](../quickjs/README.md)
* Interpreter: stack-based VM
* GC:          mark-and-sweep GC / reference counting

## Tech

Based on a really old version of QuickJS, stuck at ca. ES2019 (nullish coalescing is broken).

Couple improvements, both only on arm64:

* [Tracing GC](https://github.com/lynx-family/primjs/blob/develop/docs/gc.md): compile-time option replacing QuickJS's reference counting with a mark-and-sweep GC, touting +10-20% performance.
* ["Template interpreter"](https://github.com/lynx-family/primjs/blob/develop/docs/template_interpreter.md): replaces QuickJS VM interpreter with a closed-source binary blob (`embedded.S`), improving it with computed goto and pinned registers for interpreter state and top-of-stack caching.

Other features: WebAssembly support (via wasm3), inspector/debugger, N-API compatibility layer.

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 68%, Next 3%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97.7%<pre>
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: qux is not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.ToPropertyDescriptor.js">misc.Proxy.get.ToPropertyDescriptor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: stack overflow
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: stack overflow
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 84.7%<pre>
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
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 93.7%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: unknown unicode script
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: unknown unicode script
</pre></li>
<li>ES2019: 100%</li>
<li>ES2020: 85.7%<pre>
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/nullish-coalescing.js">nullish-coalescing.js</a>: FAIL
</pre></li>
<li>ES2021: 78.6%<pre>
<a href="../../conformance/compat-table/es2021/String.prototype.replaceAll.js">String.prototype.replaceAll.js</a>: TypeError: 'q=query+string+parameters'.replaceAll is not a function
<a href="../../conformance/compat-table/es2021/logical-assignment.and.js">logical-assignment.and.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.js">logical-assignment.nullish.js</a>: SyntaxError: expecting ';'
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: SyntaxError: expecting ';'
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: SyntaxError: expecting ';'
<a href="../../conformance/compat-table/es2021/logical-assignment.or.js">logical-assignment.or.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../../conformance/compat-table/es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: SyntaxError: unexpected token in expression: '='
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: SyntaxError: unexpected token in expression: '='
</pre></li>
<li>ES2022: 61.9%<pre>
<a href="../../conformance/compat-table/es2022/Error.cause.AggregateError.js">Error.cause.AggregateError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.Error.js">Error.cause.Error.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.EvalError.js">Error.cause.EvalError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.RangeError.js">Error.cause.RangeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.ReferenceError.js">Error.cause.ReferenceError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.SyntaxError.js">Error.cause.SyntaxError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.TypeError.js">Error.cause.TypeError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Error.cause.URIError.js">Error.cause.URIError.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Object.hasOwn.ToObject-first.js">Object.hasOwn.ToObject-first.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/Object.hasOwn.js">Object.hasOwn.js</a>: TypeError: Object.hasOwn is not a function
<a href="../../conformance/compat-table/es2022/at-method.Array.js">at-method.Array.js</a>: TypeError: arr.at is not a function
<a href="../../conformance/compat-table/es2022/at-method.String.js">at-method.String.js</a>: TypeError: str.at is not a function
<a href="../../conformance/compat-table/es2022/at-method.TypedArray.js">at-method.TypedArray.js</a>: TypeError: arr.at is not a function
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: invalid property name
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: SyntaxError: unexpected token in expression: '#x'
<a href="../../conformance/compat-table/es2022/regex.flags.d.constructor.js">regex.flags.d.constructor.js</a>: SyntaxError: invalid regular expression flags
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL
</pre></li>
<li>ES2023: 20%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 75.5%, main 91.6%, staging 68.8%, annexB 94.1%, Next 3.7%, Intl 0.7%</summary>
<ul>
<li>Overall: 75.5% (40161/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 91.6% (37790/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.6% (8086/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 97% (10726/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 33.2% (89/268)
DataView: 51.6% (98/190)
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
Int8Array: 80% (28/35)
Map: 62.5% (25/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 85.9% (402/468)
Reflect: 71.8% (336/468)
Reflect.construct: 67% (466/696)
Reflect.set: 91.3% (42/46)
Reflect.setPrototypeOf: 91.3% (21/23)
Set: 97.4% (37/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 58.4% (872/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 98.8% (1842/1865)
Symbol.match: 80.7% (71/88)
Symbol.replace: 70.4% (69/98)
Symbol.search: 78.4% (29/37)
Symbol.species: 90.9% (251/276)
Symbol.split: 86.2% (50/58)
Symbol.toPrimitive: 80.3% (187/233)
Symbol.toStringTag: 64.1% (84/131)
Symbol.unscopables: 93.2% (41/44)
TypedArray: 76.3% (1918/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 60.8% (48/79)
WeakSet: 79.4% (27/34)
arrow-function: 67% (636/949)
class: 97.4% (4645/4768)
computed-property-names: 88.1% (421/478)
const: 100% (15/15)
cross-realm: 0% (0/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.8% (6624/6637)
for-of: 100% (5/5)
generators: 99.4% (4060/4085)
let: 89.6% (69/77)
new.target: 100% (61/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 50.7% (35/69)
exponentiation: 90.3% (93/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 69.8% (531/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 36.3% (168/463)
async-functions: 92.8% (654/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 94.4% (4585/4855)<pre>
IsHTMLDDA: 21.4% (9/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 99.8% (537/538)
async-iteration: 98.9% (4913/4968)
object-rest: 99.4% (353/355)
object-spread: 99.3% (134/135)
regexp-dotall: 64.7% (11/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 90% (90/100)
regexp-unicode-property-escapes: 57.3% (390/681)
</pre></li>
<li>ES2019: 100% (137/137)<pre>
Array.prototype.flat: 100% (15/15)
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
<li>ES2020: 84.7% (1826/2156)<pre>
BigInt: 74.7% (1121/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 87.3% (55/63)
coalesce-expression: 23.1% (6/26)
dynamic-import: 70.5% (667/946)
export-star-as-namespace-from-module: 42.1% (8/19)
for-in-order: 100% (9/9)
globalThis: 87.8% (130/148)
import.meta: 69.6% (16/23)
optional-chaining: 98.2% (55/56)
</pre></li>
<li>ES2021: 54.6% (502/920)<pre>
AggregateError: 93.5% (29/31)
FinalizationRegistry: 89.8% (44/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 91.9% (34/37)
align-detached-buffer-semantics-with-web-reality: 88% (139/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 88.8% (4854/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 93.9% (1065/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 99% (2037/2058)
class-methods-private: 99.1% (1693/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 99.7% (344/345)
class-static-fields-public: 90.1% (192/213)
class-static-methods-private: 99.4% (1504/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 3.3% (9/271)
</pre></li>
<li>ES2023: 36% (111/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 65.1% (71/109)
change-array-by-copy: 8.3% (11/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 9.6% (81/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 3.4% (2/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 4.8% (22/463)
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
<li>Next: 3.7% (311/8357)<pre>
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
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 92.3% (8052/8720)</li>
</ul>
</details>
