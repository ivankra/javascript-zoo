# QuickJS-NG

Community-oriented fork of QuickJS.

* Homepage:    [quickjs-ng.github.io/quickjs](https://quickjs-ng.github.io/quickjs/)
* Repository:  [quickjs-ng/quickjs](https://github.com/quickjs-ng/quickjs.git) <span class="shields"><img src="https://img.shields.io/github/stars/quickjs-ng/quickjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/quickjs-ng/quickjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [74458](# "cloc *.c *.h")
* Language:    C
* License:     MIT
* Standard:    ES2023
* Years:       2023-
* Ancestor:    [QuickJS](../quickjs/README.md) (forked in 2023 due to QuickJS being unmaintained at that time)
* Features:    PIC
* Interpreter: stack-based VM
* GC:          reference counting

## Notes

Engine shell frequently misdetects script / ES module mode, causing various errors.
Pass `--script` argument to force classic sloppy script mode.

## Users

* [Projects using QuickJS-NG](https://github.com/quickjs-ng/quickjs/blob/master/docs/docs/projects.md)
* [fastschema/qjs](../fastschema-qjs/README.md): QuickJS-NG ported to Wasm
* Runtimes:
  * [txiki.js](https://github.com/saghul/txiki.js) <span class="shields"><img src="https://img.shields.io/github/stars/saghul/txiki.js?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/saghul/txiki.js?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - QuickJS-ng/libuv-based JavaScript runtime

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 97%, ES2016+ 95%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 96.6%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: null or undefined are forbidden
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: TypeError: not a function
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.match.js">misc.Proxy.get.String.match.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.String.search.js">misc.Proxy.get.String.search.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.arrow.js">misc.bound-function-prototype.arrow.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.class.js">misc.bound-function-prototype.class.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.function.js">misc.bound-function-prototype.function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.generator.js">misc.bound-function-prototype.generator.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.bound-function-prototype.subclass.js">misc.bound-function-prototype.subclass.js</a>: FAIL
<a href="../../conformance/compat-table/es6/rest-params.no-setter.js">rest-params.no-setter.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Function.prototype.bind.js">subclassing.Function.prototype.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: RangeError: Maximum call stack size exceeded
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 79.6%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: invalid class range
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: FAIL
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2025: 73.7%<pre>
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: duplicate group name
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: SyntaxError: invalid group
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: SyntaxError: invalid group
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: SyntaxError: invalid group
</pre></li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 82.5%, main 99.1%, staging 87.5%, annexB 96.9%, Next 7.7%, Intl 0.7%</summary>
<ul>
<li>Overall: 82.5% (43885/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.1% (40876/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.5% (8073/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.1% (10959/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 96.6% (259/268)
DataView: 98.9% (188/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 66.7% (4/6)
Float64Array: 66.7% (4/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 94.3% (33/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 97.6% (457/468)
Reflect: 91.9% (430/468)
Reflect.construct: 74.7% (520/696)
Reflect.set: 93.5% (43/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 70.3% (1051/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.9% (1863/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 99% (97/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 99.3% (274/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 87.6% (204/233)
Symbol.toStringTag: 76.3% (100/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 93.3% (2344/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 81.8% (9/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 73.9% (701/949)
class: 99.2% (4732/4768)
computed-property-names: 95.6% (457/478)
const: 100% (15/15)
cross-realm: 87.6% (176/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6631/6637)
for-of: 100% (5/5)
generators: 99.9% (4082/4085)
let: 98.7% (76/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 94.6% (123/130)<pre>
Array.prototype.includes: 63.8% (44/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 97.8% (744/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 71.8% (270/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 80.8% (374/463)
async-functions: 93.2% (657/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 99.8% (4846/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.6% (4950/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 89.3% (608/681)
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
<li>ES2020: 92.7% (1998/2156)<pre>
BigInt: 83.6% (1255/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 84.2% (797/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 68.5% (630/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 98.2% (5368/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.6% (1130/1134)
class-fields-private-in: 94.7% (18/19)
class-fields-public: 99.8% (2053/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 99.5% (212/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 90.3% (28/31)
top-level-await: 94.8% (257/271)
</pre></li>
<li>ES2023: 92.2% (284/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 75.7% (636/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 88.9% (8/9)
regexp-v-flag: 49.7% (93/187)
resizable-arraybuffer: 98.1% (454/463)
</pre></li>
<li>ES2025: 84.5% (1068/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 98% (98/100)
iterator-helpers: 96.3% (546/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 7.7% (643/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 100% (20/20)
import-bytes: 100% (5/5)
import-defer: 32.3% (74/229)
import-text: 66.7% (4/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 100% (78/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 11.6% (8/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 96.1% (8376/8720)</li>
</ul>
</details>
