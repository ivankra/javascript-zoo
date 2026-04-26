# Kiesel

JavaScript engine written in Zig.

* Homepage:    [kiesel.dev](https://kiesel.dev/)
* Repository:  [codeberg.org/kiesel-js/kiesel](https://codeberg.org/kiesel-js/kiesel.git) <span class="shields"><img src="https://img.shields.io/gitea/stars/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Stars" title="Stars"><img src="https://img.shields.io/gitea/last-commit/kiesel-js/kiesel?label=&style=flat-square&gitea_url=https://codeberg.org" alt="Last commit" title="Last commit"></span>
* LOC:         [70969](# "cloc src")
* Language:    Zig
* License:     MIT
* Standard:    ESnext
* Years:       2023-
* Interpreter: register-based VM

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>Tested version: 0.1.0-dev+dccb0db93 (<a href="https://codeberg.org/kiesel-js/kiesel/commit/dccb0db932fea715a6652b8e8fdd4d1a0c9d0bc5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/kiesel.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
</pre></li>
<li>ES5: 97.3% (72/74)<pre>
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 95%, Next 5%, Intl 100%</summary><ul>
<li>Tested version: 0.1.0-dev+dccb0db93 (<a href="https://codeberg.org/kiesel-js/kiesel/commit/dccb0db932fea715a6652b8e8fdd4d1a0c9d0bc5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/kiesel.json">json</a>)</li>
<li>ES5: 96.7%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
</pre></li>
<li>ES6: 93.8%<pre>
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: 'g' is not defined
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: 'foo' is not defined
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token 'function'
<a href="../../conformance/compat-table/es6/arrow.precedence.js">arrow.precedence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/const.for-loop.js">const.for-loop.js</a>: FAIL
<a href="../../conformance/compat-table/es6/const.strict.for-loop.js">const.strict.for-loop.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-assign.nested-rest.js">destructuring-assign.nested-rest.js</a>: SyntaxError: Invalid left-hand side in assignment expression
<a href="../../conformance/compat-table/es6/for-of.iterator-closing-throw.js">for-of.iterator-closing-throw.js</a>: FAIL
<a href="../../conformance/compat-table/es6/generators.shorthand.no-constructor.js">generators.shorthand.no-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/generators.throw.js">generators.throw.js</a>: FAIL: exception: foo
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing-throw.js">generators.yield-star.iterator-closing-throw.js</a>: FAIL: exception: undefined
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing.js">generators.yield-star.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/let.for-iteration.js">let.for-iteration.js</a>: FAIL
<a href="../../conformance/compat-table/es6/let.for-loop.js">let.for-loop.js</a>: FAIL
<a href="../../conformance/compat-table/es6/let.strict.for-iteration.js">let.strict.for-iteration.js</a>: FAIL
<a href="../../conformance/compat-table/es6/let.strict.for-loop.js">let.strict.for-loop.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.accessors-no-constructor.js">misc.accessors-no-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es6/rest-params.no-setter.js">rest-params.no-setter.js</a>: FAIL
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: FAIL: Stack overflow
...
</pre></li>
<li>ES2016: 84.8%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: FAIL: exception: undefined
</pre></li>
<li>ES2017: 92%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.for-in-assignment-non-strict.js">annex-b.for-in-assignment-non-strict.js</a>: SyntaxError: Unexpected token 'function'
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: FAIL
</pre></li>
<li>ES2018: 94.7%<pre>
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Unexpected token 'function'
</pre></li>
<li>ES2019: 83.3%<pre>
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Invalid character ''' (eval:1:1)
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL: exception: undefined
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 5.1%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 93.7%, main 96.8%, staging 87.2%, annexB 58.7%, Next 87.6%, Intl 80.6%</summary>
<ul>
<li>Tested version: 0.1.0-dev+dccb0db93 (<a href="https://codeberg.org/kiesel-js/kiesel/commit/dccb0db932fea715a6652b8e8fdd4d1a0c9d0bc5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/kiesel.json">json</a>)</li>
<li>Overall: 93.7% (49813/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 96.8% (40230/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 97.6% (8002/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 95.9% (10598/11054)<pre>
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
Float32Array: 100% (7/7)
Float64Array: 100% (7/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.1% (464/468)
Reflect: 96.2% (450/468)
Reflect.construct: 95.4% (664/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 97.1% (1450/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 94.5% (1762/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 99% (97/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 93.1% (217/233)
Symbol.toStringTag: 97.7% (128/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 95% (2388/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 87.2% (828/949)
class: 94.6% (4509/4768)
computed-property-names: 97.7% (467/478)
const: 100% (15/15)
cross-realm: 92.5% (186/201)
default-parameters: 99.9% (2266/2269)
destructuring-assignment: 35.5% (50/141)
destructuring-binding: 97.6% (6475/6637)
for-of: 60% (3/5)
generators: 96.8% (3955/4085)
let: 89.6% (69/77)
new.target: 98.4% (60/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 92.3% (120/130)<pre>
Array.prototype.includes: 78.3% (54/69)
exponentiation: 93.2% (96/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 92.3% (704/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 68.8% (260/378)
Intl.DateTimeFormat-dayPeriod: 33.3% (4/12)
SharedArrayBuffer: 75.2% (349/464)
async-functions: 91.3% (644/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 96.8% (4699/4855)<pre>
IsHTMLDDA: 83.3% (35/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 92.8% (499/538)
async-iteration: 96.6% (4801/4968)
object-rest: 93.5% (332/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 99.7% (679/681)
</pre></li>
<li>ES2019: 96.4% (132/137)<pre>
Array.prototype.flat: 100% (15/15)
Array.prototype.flatMap: 100% (21/21)
Object.fromEntries: 100% (25/25)
String.prototype.trimEnd: 100% (24/24)
String.prototype.trimStart: 100% (23/23)
Symbol.prototype.description: 100% (8/8)
json-superset: 0% (0/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 100% (1/1)
string-trimming: 100% (54/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 93% (2005/2156)<pre>
BigInt: 95.1% (1427/1501)
Intl.NumberFormat-unified: 17.9% (12/67)
Intl.RelativeTimeFormat: 51.9% (41/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 73.1% (19/26)
dynamic-import: 83.7% (792/946)
export-star-as-namespace-from-module: 89.5% (17/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 100% (23/23)
optional-chaining: 85.7% (48/56)
</pre></li>
<li>ES2021: 91.8% (845/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 43.8% (7/16)
Intl.DateTimeFormat-formatRange: 43.2% (16/37)
Intl.DateTimeFormat-fractionalSecondDigits: 40% (4/10)
Intl.DisplayNames: 95.7% (45/47)
Intl.ListFormat: 63% (51/81)
Intl.Locale: 71.8% (112/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 90.7% (98/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 95% (5192/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 50% (1/2)
Intl.DisplayNames-v2: 50% (6/12)
Intl.Segmenter: 82.3% (65/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 81.2% (13/16)
class-fields-private: 90.1% (1022/1134)
class-fields-private-in: 73.7% (14/19)
class-fields-public: 94.2% (1938/2058)
class-methods-private: 97.5% (1667/1709)
class-static-block: 86.2% (56/65)
class-static-fields-private: 98% (338/345)
class-static-fields-public: 92.5% (197/213)
class-static-methods-private: 98.2% (1486/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 93% (252/271)
</pre></li>
<li>ES2023: 83.2% (341/410)<pre>
Intl-enumeration: 62.9% (22/35)
Intl.NumberFormat-v3: 39.2% (40/102)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 92.1% (774/840)<pre>
Atomics.waitAsync: 43.6% (44/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 96.8% (181/187)
resizable-arraybuffer: 99.8% (462/463)
</pre></li>
<li>ES2025: 94.8% (1200/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 34.8% (39/112)
RegExp.escape: 100% (21/21)
import-attributes: 95% (95/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 84.8% (306/361)<pre>
Array.fromAsync: 94.7% (90/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 99.5% (1536/1543)
Intl.Locale-info: 16.3% (7/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 100% (22/22)
uint8array-base64: 87% (60/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 87.6% (6917/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 0% (0/64)
Temporal: 97.8% (6521/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 94.7% (18/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.9% (76/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 32.3% (74/229)
import-text: 100% (6/6)
joint-iteration: 100% (78/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 94.7% (18/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 91.5% (7978/8718)</li>
</ul>
</details>
