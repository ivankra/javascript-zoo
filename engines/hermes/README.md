# Hermes

JavaScript engine from Facebook optimized for running React Native mobile apps.

* Homepage:    [hermesengine.dev](https://hermesengine.dev/)
* Repository:  [facebook/hermes](https://github.com/facebook/hermes.git) <span class="shields"><img src="https://img.shields.io/github/stars/facebook/hermes?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/facebook/hermes?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [233579](# "cloc include lib tools/hermes")
* Language:    C++
* License:     MIT
* Org:         Facebook
* Standard:    ES2023 (partial)
* Years:       2019-
* Features:    optimizing LLVM-based AOT compiler to bytecode + native code; FFI; optional TypeScript/Flow typing annotations with modified semantics for sound typing
* Interpreter: register-based VM
* GC:          generational GC

## History

* 2019: [Initial release](https://reactnative.dev/blog/2019/07/17/hermes) for React Native 0.60.2.
* 2023: [Static Hermes announced](https://speakerdeck.com/tmikov2023/static-hermes-react-native-eu-2023-announcement) -
  next generation of Hermes engine designed to utilize optional typing annotations for more efficient native AOT codegen.
  Developed on the separate experimental `static_h` branch, in parallel with `main` branch for the stable Hermes engine.
* 2025: Hermes V1 released from the `static_h` branch, available as opt-in in
  [RN 0.82](https://reactnative.dev/blog/2025/10/08/react-native-0.82).
  Released without JS-to-native compilation yet (the original goal of Static Hermes project),
  but brings many new features and performance improvements
  ([link](https://www.callstack.com/podcasts/from-static-hermes-to-hermes-v1-the-road-to-default)).
* 2026: Hermes V1 becomes the default engine for React Native since
  [RN 0.84](https://reactnative.dev/blog/2026/02/11/react-native-0.84).

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 99.5% (197/198)<pre>
<a href="../../conformance/es1/with.js">with.js</a>: SyntaxError: with statement is not supported
</pre></li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/String.prototype.toLocaleLowerCase.js">String.prototype.toLocaleLowerCase.js</a>: FAIL: 'HELLO'.toLocaleLowerCase() != 'hello' (got: 'lowered')
<a href="../../conformance/es3/String.prototype.toLocaleUpperCase.js">String.prototype.toLocaleUpperCase.js</a>: FAIL: 'hello'.toLocaleUpperCase() != 'HELLO' (got: 'uppered')
</pre></li>
<li>ES5: 95.9% (71/74)<pre>
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: SyntaxError: invalid assignment left-hand side
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 85%, Next 12%, Intl 96%</summary><ul>
<li>ES5: 97.1%<pre>
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: SyntaxError: invalid assignment left-hand side
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
</pre></li>
<li>ES6: 90.2%<pre>
<a href="../../conformance/compat-table/es6/Array.Symbol.species.js">Array.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Array.prototype.Symbol.unscopables.js">Array.prototype.Symbol.unscopables.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.Symbol.species.js">Map.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Promise.Symbol.species.js">Promise.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Promise.prototype-not-instance.js">Promise.prototype-not-instance.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/RegExp.Symbol.species.js">RegExp.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/Set.Symbol.species.js">Set.Symbol.species.js</a>: TypeError: right operand of 'in' is not an object
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.existence.js">annex-b.String.prototype.html.existence.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.lowercase.js">annex-b.String.prototype.html.lowercase.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.String.prototype.html.quotes-escaped.js">annex-b.String.prototype.html.quotes-escaped.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es6/annex-b.function.labeled.js">annex-b.function.labeled.js</a>: SyntaxError: Function declaration not allowed as body of labeled statement
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: invalid expression
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es6/class.computed-names-tdz.js">class.computed-names-tdz.js</a>: FAIL
<a href="../../conformance/compat-table/es6/const.for-in.js">const.for-in.js</a>: FAIL
<a href="../../conformance/compat-table/es6/const.for-of.js">const.for-of.js</a>: FAIL
<a href="../../conformance/compat-table/es6/const.strict.for-in.js">const.strict.for-in.js</a>: FAIL
...
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 76%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Property 'Atomics' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: Property 'SharedArrayBuffer' doesn't exist
<a href="../../conformance/compat-table/es2017/misc.arguments-caller-removed.js">misc.arguments-caller-removed.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 89.5%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.generators.js">async-iterators.generators.js</a>: SyntaxError: async generators are unsupported
</pre></li>
<li>ES2019: 81%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Cannot read property 'flat' of undefined
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 2:1:')' expected at end of function parameter list
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 77.1%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: TypeError: undefined is not a function
</pre></li>
<li>ES2024: 42.9%</li>
<li>ES2025: 63.2%<pre>
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/RegExp.escape.js">RegExp.escape.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: Invalid regular expression: Duplicate capture group name
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.i.js">regex.pattern-modifiers.i.js</a>: SyntaxError: Invalid regular expression: Quantifier has nothing to repeat
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.m.js">regex.pattern-modifiers.m.js</a>: SyntaxError: Invalid regular expression: Quantifier has nothing to repeat
<a href="../../conformance/compat-table/es2025/regex.pattern-modifiers.s.js">regex.pattern-modifiers.s.js</a>: SyntaxError: Invalid regular expression: Quantifier has nothing to repeat
</pre></li>
<li>Next: 12.1%</li>
<li>Intl: 96.4%<pre>
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 74.6%, main 89.7%, staging 73.1%, annexB 78.1%, Next 5.6%, Intl 10.3%</summary>
<ul>
<li>Overall: 74.6% (39665/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 89.7% (36972/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 96% (7866/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 92.4% (10218/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 35.8% (96/268)
DataView: 51.1% (97/190)
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
Map: 95% (38/40)
Object.is: 100% (2/2)
Promise: 75% (3/4)
Proxy: 82.1% (384/468)
Reflect: 64.3% (301/468)
Reflect.construct: 65.7% (457/696)
Reflect.set: 93.5% (43/46)
Reflect.setPrototypeOf: 87% (20/23)
Set: 100% (38/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 58.2% (870/1494)
Symbol.hasInstance: 88.2% (15/17)
Symbol.isConcatSpreadable: 91.2% (31/34)
Symbol.iterator: 89% (1660/1865)
Symbol.match: 87.5% (77/88)
Symbol.replace: 84.7% (83/98)
Symbol.search: 75.7% (28/37)
Symbol.species: 17.8% (49/276)
Symbol.split: 44.8% (26/58)
Symbol.toPrimitive: 81.5% (190/233)
Symbol.toStringTag: 56.5% (74/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 71.9% (1806/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 72.2% (57/79)
WeakSet: 100% (34/34)
arrow-function: 63% (598/949)
class: 96.5% (4600/4768)
computed-property-names: 93.7% (448/478)
const: 86.7% (13/15)
cross-realm: 0% (0/201)
default-parameters: 99.3% (2252/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.7% (6617/6637)
for-of: 100% (5/5)
generators: 98.6% (4026/4085)
let: 68.8% (53/77)
new.target: 77% (47/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 94.7% (18/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 95.4% (124/130)<pre>
Array.prototype.includes: 58% (40/69)
exponentiation: 95.1% (98/103)
u180e: 96% (24/25)
</pre></li>
<li>ES2017: 49.8% (379/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 25% (3/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 87% (613/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 94% (4565/4855)<pre>
IsHTMLDDA: 35.7% (15/42)
Promise.prototype.finally: 62.1% (18/29)
Symbol.asyncIterator: 74.5% (401/538)
async-iteration: 92.7% (4603/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 82.4% (14/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 88.4% (602/681)
</pre></li>
<li>ES2019: 93.4% (128/137)<pre>
Array.prototype.flat: 80% (12/15)
Array.prototype.flatMap: 66.7% (14/21)
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
<li>ES2020: 59.4% (1280/2156)<pre>
BigInt: 69.4% (1041/1501)
Intl.NumberFormat-unified: 1.5% (1/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 39.2% (40/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 81% (51/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 88.9% (8/9)
globalThis: 48% (71/148)
import.meta: 73.9% (17/23)
optional-chaining: 96.4% (54/56)
</pre></li>
<li>ES2021: 61.4% (565/920)<pre>
AggregateError: 96.8% (30/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 37.5% (6/16)
Intl.DateTimeFormat-formatRange: 16.2% (6/37)
Intl.DateTimeFormat-fractionalSecondDigits: 30% (3/10)
Intl.DisplayNames: 8.5% (4/47)
Intl.ListFormat: 1.2% (1/81)
Intl.Locale: 0% (0/156)
Promise.any: 70.7% (65/92)
String.prototype.replaceAll: 97.6% (40/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 66.5% (105/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 91.3% (4988/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 2.5% (2/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 84.6% (11/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 97.4% (1105/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 97.4% (2005/2058)
class-methods-private: 97.7% (1669/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 99.4% (343/345)
class-static-fields-public: 96.7% (206/213)
class-static-methods-private: 97.8% (1479/1513)
error-cause: 100% (5/5)
regexp-match-indices: 83.9% (26/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 74% (228/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 95.4% (104/109)
change-array-by-copy: 56.8% (75/132)
hashbang: 96.6% (28/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 15.4% (129/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 15.3% (9/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 4.3% (20/463)
</pre></li>
<li>ES2025: 74% (935/1264)<pre>
Float16Array: 22.4% (11/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 97.9% (555/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 69.6% (160/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 5.6% (468/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 32.4% (33/102)
Math.sumPrecise: 90% (9/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 10.5% (2/19)
decorators: 11.1% (3/27)
explicit-resource-management: 15.3% (73/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 23.1% (6/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 89.4% (7792/8720)</li>
</ul>
</details>
