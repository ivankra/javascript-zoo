# Asynkron

Vibe-coded JavaScript interpreter for .NET.

* Repository:       [asynkron/Asynkron.JsEngine](https://github.com/asynkron/Asynkron.JsEngine.git) <span class="shields"><img src="https://img.shields.io/github/stars/asynkron/Asynkron.JsEngine?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/asynkron/Asynkron.JsEngine?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [137782](# "cloc src")
* Language:         C#
* License:          MIT
* Standard:         ESnext
* Runtime platform: .NET

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99.5% (197/198)<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Legacy octal literals are not allowed. Use 0o prefix for octal literals on line 14 column 10.
</pre></li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: FAIL: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: TypeError: Cannot read properties of null or undefined
</pre></li>
<li>ES5: 95.9% (71/74)<pre>
<a href="../../conformance/es5/debugger.js">debugger.js</a>: ReferenceError: debugger is not defined
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 95%, Next 36%, Intl 100%</summary><ul>
<li>ES5: 99.1%<pre>
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
</pre></li>
<li>ES6: 89.8%<pre>
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Object.is.js">Object.is.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL: [JsEngine] setTimeout firing timerId=2 delay=1000; [JsEngine] setTimeout firing timerId=4 delay=1000; [JsEngine] setTimeout firing timerId=1 delay=2000; [JsEngine] setTimeout firing timerId=3 delay=20...
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL: [JsEngine] setTimeout firing timerId=2 delay=1000; [JsEngine] setTimeout firing timerId=4 delay=1000; [JsEngine] setTimeout firing timerId=1 delay=2000; [JsEngine] setTimeout firing timerId=3 delay=20...
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: FAIL: [JsEngine] setTimeout firing timerId=1 delay=1000; [JsEngine] setTimeout firing timerId=3 delay=1000; [JsEngine] setTimeout firing timerId=2 delay=2000; [JsEngine] setTimeout firing timerId=4 delay=20...
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL: [JsEngine] setTimeout firing timerId=1 delay=1000; [JsEngine] setTimeout firing timerId=3 delay=1000; [JsEngine] setTimeout firing timerId=2 delay=2000; [JsEngine] setTimeout firing timerId=4 delay=20...
<a href="../../conformance/compat-table/es6/Reflect.getPrototypeOf.js">Reflect.getPrototypeOf.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Set.zero-key.js">Set.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: SyntaxError: Invalid pattern '[\z]' at offset 3. Unrecognized escape sequence \z.
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: Invalid pattern '[\x1]' at offset 5. Insufficient or invalid hexadecimal digits.
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: Invalid pattern '[\u1]' at offset 3. Insufficient or invalid hexadecimal digits.
<a href="../../conformance/compat-table/es6/annex-b.__proto__.literals.multiple-error.js">annex-b.__proto__.literals.multiple-error.js</a>: FAIL
<a href="../../conformance/compat-table/es6/arrow.no-line-break.js">arrow.no-line-break.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-assign.parenthesised-error.js">destructuring-assign.parenthesised-error.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.computed-properties.js">destructuring-decl.computed-properties.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.defaults.js">destructuring-decl.defaults.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.nested.js">destructuring-decl.nested.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.object-primitives.js">destructuring-decl.object-primitives.js</a>: FAIL
...
</pre></li>
<li>ES2016: 75.8%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.unary-negation-error.js">exponentiation.unary-negation-error.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.generator-throw-inner.js">misc.generator-throw-inner.js</a>: FAIL: exception: undefined
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 94%<pre>
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: FAIL: [AsyncFunctionInvoker] DriveToCompletion mode=Next argKind=Undefined; [AsyncFunctionInvoker] ResumeCallback isRejection=False argKind=Undefined; [AsyncFunctionInvoker] DriveToCompletion mode=Next argK...
<a href="../../conformance/compat-table/es2017/async.await.js">async.await.js</a>: FAIL: [AsyncFunctionInvoker] DriveToCompletion mode=Next argKind=Undefined; [AsyncFunctionInvoker] ResumeCallback isRejection=False argKind=Undefined; [AsyncFunctionInvoker] DriveToCompletion mode=Next argK...
<a href="../../conformance/compat-table/es2017/async.no-await-in-params.js">async.no-await-in-params.js</a>: FAIL
</pre></li>
<li>ES2018: 88.4%<pre>
<a href="../../conformance/compat-table/es2018/object-rest.js">object-rest.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: invalid unicode property escape \p{Script=Sidetic}.
</pre></li>
<li>ES2019: 98.2%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 98.4%<pre>
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError: Unexpected token '}'. at line 10, column 32
</pre></li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 36.4%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 89%, main 91.7%, staging 74.8%, annexB 97.9%, Next 76%, Intl 55.1%</summary>
<ul>
<li>Overall: 89% (47321/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 91.7% (37813/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 98.4% (8062/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 94.2% (10418/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 98.9% (265/268)
DataView: 94.2% (179/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 85.7% (6/7)
DataView.prototype.getInt32: 85.7% (6/7)
DataView.prototype.getInt8: 80% (4/5)
DataView.prototype.getUint16: 85.7% (6/7)
DataView.prototype.getUint32: 85.7% (6/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 97.5% (39/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 98.7% (462/468)
Reflect: 98.5% (461/468)
Reflect.construct: 98.3% (684/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 97.3% (1453/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 94.8% (1768/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 97% (226/233)
Symbol.toStringTag: 84.7% (111/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 97.7% (2454/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 90.9% (10/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 98.7% (78/79)
WeakSet: 100% (34/34)
arrow-function: 89.4% (848/949)
class: 87.8% (4187/4768)
computed-property-names: 96.9% (463/478)
const: 86.7% (13/15)
cross-realm: 99.5% (200/201)
default-parameters: 98% (2223/2269)
destructuring-assignment: 37.6% (53/141)
destructuring-binding: 97% (6435/6637)
for-of: 100% (5/5)
generators: 94.5% (3861/4085)
let: 94.8% (73/77)
new.target: 77% (47/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 0% (0/96)
super: 57.9% (11/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 93.8% (122/130)<pre>
Array.prototype.includes: 95.7% (66/69)
exponentiation: 92.2% (95/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 84.6% (644/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 91% (342/376)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 91.4% (423/463)
async-functions: 71.6% (505/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 83.7% (4064/4855)<pre>
IsHTMLDDA: 97.6% (41/42)
Promise.prototype.finally: 93.1% (27/29)
Symbol.asyncIterator: 84.2% (453/538)
async-iteration: 86.3% (4289/4968)
object-rest: 99.2% (352/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 89.5% (17/19)
regexp-named-groups: 46% (46/100)
regexp-unicode-property-escapes: 63.9% (435/681)
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
<li>ES2020: 84.2% (1815/2156)<pre>
BigInt: 96.7% (1451/1501)
Intl.NumberFormat-unified: 83.6% (56/67)
Intl.RelativeTimeFormat: 94.9% (75/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 76.9% (20/26)
dynamic-import: 47.3% (447/946)
export-star-as-namespace-from-module: 57.9% (11/19)
for-in-order: 100% (9/9)
globalThis: 98.6% (146/148)
import.meta: 65.2% (15/23)
optional-chaining: 83.9% (47/56)
</pre></li>
<li>ES2021: 94.8% (872/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 87.5% (14/16)
Intl.DateTimeFormat-formatRange: 94.6% (35/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 95.5% (149/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 99.4% (157/158)
logical-assignment-operators: 80.6% (87/108)
numeric-separator-literal: 87.4% (139/159)
</pre></li>
<li>ES2022: 86.8% (4746/5465)<pre>
Array.prototype.at: 90.9% (10/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 92.3% (12/13)
arbitrary-module-namespace-names: 75% (12/16)
class-fields-private: 67.5% (765/1134)
class-fields-private-in: 78.9% (15/19)
class-fields-public: 86.2% (1773/2058)
class-methods-private: 85% (1453/1709)
class-static-block: 64.6% (42/65)
class-static-fields-private: 96.2% (332/345)
class-static-fields-public: 86.9% (185/213)
class-static-methods-private: 95.1% (1439/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 78.6% (213/271)
</pre></li>
<li>ES2023: 99% (305/308)<pre>
Intl-enumeration: 85.7% (30/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 96.6% (28/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 89.3% (750/840)<pre>
Atomics.waitAsync: 68.3% (69/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 96.4% (27/28)
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 88.9% (8/9)
regexp-v-flag: 72.2% (135/187)
resizable-arraybuffer: 98.9% (458/463)
</pre></li>
<li>ES2025: 86.5% (1093/1264)<pre>
Float16Array: 95.9% (47/49)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 95.2% (20/21)
import-attributes: 24% (24/100)
iterator-helpers: 96.5% (547/567)
json-modules: 84.6% (11/13)
promise-try: 100% (12/12)
regexp-modifiers: 63.9% (147/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 76% (6348/8357)<pre>
Array.fromAsync: 84.2% (80/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 20.5% (316/1543)
Intl.Locale-info: 97.7% (42/43)
Intl.NumberFormat-v3: 96.1% (98/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 98.4% (63/64)
Temporal: 76.4% (5098/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 94.7% (18/19)
decorators: 92.6% (25/27)
explicit-resource-management: 81.6% (389/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 62.9% (144/229)
import-text: 0% (0/6)
iterator-sequencing: 93.8% (30/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 94.7% (18/19)
source-phase-imports: 58.3% (133/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 98.6% (71/72)
</pre></li>
<li>N/A: 91.1% (7946/8720)</li>
</ul>
</details>
