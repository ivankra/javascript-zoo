# Boa

Embeddable JavaScript engine written in Rust.

* Homepage:     [boajs.dev](https://boajs.dev/)
* Repository:   [boa-dev/boa](https://github.com/boa-dev/boa.git) <span class="shields"><img src="https://img.shields.io/github/stars/boa-dev/boa?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/boa-dev/boa?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [141335](# "cloc --not_match_d='(?i)(tests|docs|examples|github)' --exclude-lang=Markdown .")
* Language:     Rust
* License:      MIT OR Unlicense
* Standard:     ESnext
* Years:        2018-
* Features:     hidden classes
* Interpreter:  stack-based VM
* Regex engine: [regress](https://github.com/ridiculousfish/regress)

## Users

* Runtimes:
  * [JetCrab](https://github.com/JetCrabCollab/JetCrab) <span class="shields"><img src="https://img.shields.io/github/stars/JetCrabCollab/JetCrab?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/JetCrabCollab/JetCrab?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Boa's [temporal\_rs](https://crates.io/crates/temporal_rs) implementation got adopted by [V8](../v8/README.md) and some other engines

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
</pre></li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 99%, Next 0%, Intl 100%</summary><ul>
<li>ES5: 97.6%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
</pre></li>
<li>ES6: 97.7%<pre>
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Invalid regular expression literal: Unbalanced bracket at line 10, col 8
<a href="../../conformance/compat-table/es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-new-function.js">destructuring-params.defaults-new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-separate-scope.js">destructuring-params.defaults-separate-scope.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-params.new-function.js">destructuring-params.new-function.js</a>: SyntaxError: failed to parse function parameters: abrupt end
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: FAIL: RuntimeLimitError: reached the maximum number of recursive calls on this execution
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: FAIL: RuntimeLimitError: reached the maximum number of recursive calls on this execution
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 98%<pre>
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
</pre></li>
<li>ES2018: 100%</li>
<li>ES2019: 94.6%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 0%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 96.8%, main 99.7%, staging 89.1%, annexB 95.9%, Next 87.6%, Intl 78.9%</summary>
<ul>
<li>Overall: 96.8% (51449/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.7% (41130/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.5% (8155/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 99.6% (11010/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 94.2% (179/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 98.7% (462/468)
Reflect: 94.4% (442/468)
Reflect.construct: 94.8% (660/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 96.3% (1439/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.9% (1864/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 98% (96/98)
Symbol.search: 97.3% (36/37)
Symbol.species: 100% (276/276)
Symbol.split: 98.3% (57/58)
Symbol.toPrimitive: 98.3% (229/233)
Symbol.toStringTag: 94.7% (124/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 97.5% (2449/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 78.5% (62/79)
WeakSet: 79.4% (27/34)
arrow-function: 98.6% (936/949)
class: 99.3% (4737/4768)
computed-property-names: 99.6% (476/478)
const: 100% (15/15)
cross-realm: 92.5% (186/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6636/6637)
for-of: 100% (5/5)
generators: 99.9% (4084/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 98.5% (128/130)<pre>
Array.prototype.includes: 72.5% (50/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 98.9% (753/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 99.2% (373/376)
Intl.DateTimeFormat-dayPeriod: 33.3% (4/12)
SharedArrayBuffer: 99.4% (460/463)
async-functions: 100% (705/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 99.8% (4847/4855)<pre>
IsHTMLDDA: 85.7% (36/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 100% (4968/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 99% (99/100)
regexp-unicode-property-escapes: 99.6% (678/681)
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
<li>ES2020: 93.5% (2016/2156)<pre>
BigInt: 99.1% (1488/1501)
Intl.NumberFormat-unified: 17.9% (12/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 99.8% (944/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 90.7% (834/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 95.9% (47/49)
Intl.DateTimeFormat-datetimestyle: 37.5% (6/16)
Intl.DateTimeFormat-formatRange: 16.2% (6/37)
Intl.DateTimeFormat-fractionalSecondDigits: 40% (4/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 67.3% (105/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 94.6% (35/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.8% (5453/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 50% (1/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 100% (1134/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 100% (2058/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 96.3% (261/271)
</pre></li>
<li>ES2023: 85.4% (263/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 99.6% (837/840)<pre>
Atomics.waitAsync: 97% (98/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 99.8% (462/463)
</pre></li>
<li>ES2025: 91.1% (1152/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 0.9% (1/112)
RegExp.escape: 100% (21/21)
import-attributes: 89% (89/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 96.5% (222/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 87.6% (7320/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 99.1% (1529/1543)
Intl.Locale-info: 2.3% (1/43)
Intl.NumberFormat-v3: 58.8% (60/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 97.5% (6501/6670)
await-dictionary: 100% (37/37)
canonical-tz: 68.4% (13/19)
decorators: 11.1% (3/27)
explicit-resource-management: 19.5% (93/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 58.1% (133/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 75% (3/4)
regexp-duplicate-named-groups: 73.7% (14/19)
source-phase-imports: 96.5% (220/228)
source-phase-imports-module-source: 100% (84/84)
uint8array-base64: 11.6% (8/69)
upsert: 88.9% (64/72)
</pre></li>
<li>N/A: 98% (8544/8720)</li>
</ul>
</details>
