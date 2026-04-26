# Jurassic

JavaScript engine for .NET; compiles to .NET IL.

* Repository:       [paulbartrum/jurassic](https://github.com/paulbartrum/jurassic.git) <span class="shields"><img src="https://img.shields.io/github/stars/paulbartrum/jurassic?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/paulbartrum/jurassic?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [34639](# "cloc Jurassic")
* Language:         C#
* License:          MIT
* Standard:         ES5, ES6 (partial)
* Years:            2010-
* Runtime platform: .NET
* JIT:              via CLR

## Conformance

<details><summary>ES1-ES5: 98%</summary><ul>
<li>Tested version: <a href="https://github.com/paulbartrum/jurassic/commit/17f72827150166c79dd7789bfe01a4a2f7bfe4aa">2025-02-04</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/jurassic.json">json</a>)</li>
<li>ES1: 99.5% (197/198)<pre>
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: FAIL: max safe integer failed
</pre></li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '0'.split(undefined, 0).length !== 0; ''.split(/.?/).length !== 0
</pre></li>
<li>ES5: 94.6% (70/74)<pre>
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: bound constructor failed
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 65%, ES2016+ 15%, Next 6%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/paulbartrum/jurassic/commit/17f72827150166c79dd7789bfe01a4a2f7bfe4aa">2025-02-04</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/jurassic.json">json</a>)</li>
<li>ES5: 94.7%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 65.2%<pre>
<a href="../../conformance/compat-table/es6/Array.from.generator.js">Array.from.generator.js</a>: SyntaxError: Expected '(' but found '*'
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.from.map.generator.js">Array.from.map.generator.js</a>: SyntaxError: Expected '(' but found '*'
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.bound.js">Function.name.bound.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-object-method.js">Function.name.class-object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-variable.js">Function.name.class-variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.object-method.js">Function.name.object-method.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.no-lexical.js">Function.name.shorthand.no-lexical.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.symbol-keyed.js">Function.name.symbol-keyed.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.variable.js">Function.name.variable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.set.instances.js">Proxy.handler.set.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Set.iterator-closing.js">Set.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/WeakMap.iterator-closing.js">WeakMap.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/WeakSet.iterator-closing.js">WeakSet.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.html-comments.js">annex-b.html-comments.js</a>: SyntaxError: Unexpected token '&gt;' in expression.
...
</pre></li>
<li>ES2016: 43.9%</li>
<li>ES2017: 0%</li>
<li>ES2018: 24.6%</li>
<li>ES2019: 49.7%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 19.3%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 37.1%, main 44.6%, staging 27.3%, annexB 44.4%, Next 3.4%, Intl 0.4%</summary>
<ul>
<li>Tested version: <a href="https://github.com/paulbartrum/jurassic/commit/17f72827150166c79dd7789bfe01a4a2f7bfe4aa">2025-02-04</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/jurassic.json">json</a>)</li>
<li>Overall: 37.1% (19705/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 44.6% (18535/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 91.3% (7480/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 37.9% (4184/11054)<pre>
__proto__: 5.6% (1/18)
Array.prototype.values: 50% (2/4)
ArrayBuffer: 2.6% (7/268)
DataView: 5.8% (11/190)
DataView.prototype.getFloat32: 71.4% (5/7)
DataView.prototype.getFloat64: 60% (3/5)
DataView.prototype.getInt16: 71.4% (5/7)
DataView.prototype.getInt32: 71.4% (5/7)
DataView.prototype.getInt8: 60% (3/5)
DataView.prototype.getUint16: 71.4% (5/7)
DataView.prototype.getUint32: 71.4% (5/7)
DataView.prototype.setUint8: 50% (28/56)
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 50% (2/4)
Int8Array: 65.7% (23/35)
Map: 32.5% (13/40)
Object.is: 50% (1/2)
Promise: 50% (2/4)
Proxy: 63% (295/468)
Reflect: 40% (187/468)
Reflect.construct: 7.5% (52/696)
Reflect.set: 60.9% (28/46)
Reflect.setPrototypeOf: 91.3% (21/23)
Set: 65.8% (25/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 96.3% (26/27)
String.prototype.includes: 100% (26/26)
Symbol: 30.5% (455/1494)
Symbol.hasInstance: 35.3% (6/17)
Symbol.isConcatSpreadable: 55.9% (19/34)
Symbol.iterator: 6% (112/1865)
Symbol.match: 34.1% (30/88)
Symbol.replace: 28.6% (28/98)
Symbol.search: 32.4% (12/37)
Symbol.species: 21.7% (60/276)
Symbol.split: 31% (18/58)
Symbol.toPrimitive: 33.5% (78/233)
Symbol.toStringTag: 18.3% (24/131)
Symbol.unscopables: 22.7% (10/44)
TypedArray: 20.9% (526/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 27.3% (3/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 39.2% (31/79)
WeakSet: 55.9% (19/34)
arrow-function: 6.8% (65/949)
class: 20.4% (974/4768)
computed-property-names: 25.5% (122/478)
const: 33.3% (5/15)
cross-realm: 0% (0/201)
default-parameters: 11.2% (255/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 20% (1/5)
generators: 10.6% (433/4085)
let: 28.6% (22/77)
new.target: 44.3% (27/61)
proxy-missing-checks: 66.7% (2/3)
rest-parameters: 100% (96/96)
super: 73.7% (14/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 60% (78/130)<pre>
Array.prototype.includes: 43.5% (30/69)
exponentiation: 41.7% (43/103)
u180e: 44% (11/25)
</pre></li>
<li>ES2017: 18% (137/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 9.6% (466/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 24.1% (7/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 78.9% (15/19)
regexp-named-groups: 3% (3/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 63.5% (87/137)<pre>
Array.prototype.flat: 93.3% (14/15)
Array.prototype.flatMap: 57.1% (12/21)
Object.fromEntries: 64% (16/25)
String.prototype.trimEnd: 75% (18/24)
String.prototype.trimStart: 73.9% (17/23)
Symbol.prototype.description: 12.5% (1/8)
json-superset: 0% (0/4)
optional-catch-binding: 100% (5/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 74.1% (40/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 9.2% (198/2156)<pre>
BigInt: 2.8% (42/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 33.3% (3/9)
globalThis: 5.4% (8/148)
import.meta: 60.9% (14/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 14.1% (130/920)<pre>
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
align-detached-buffer-semantics-with-web-reality: 5.7% (9/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 67.9% (108/159)
</pre></li>
<li>ES2022: 16.5% (901/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 4.8% (3/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34.3% (389/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 6.6% (27/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 7.3% (8/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 2.3% (19/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 14.3% (4/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 2.6% (12/463)
</pre></li>
<li>ES2025: 9.3% (118/1266)<pre>
Float16Array: 13.7% (7/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 37.8% (87/230)
set-methods: 3.6% (7/192)
</pre></li>
<li>ES2026: 5.3% (19/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 8.7% (6/69)
upsert: 18.1% (13/72)
</pre></li>
<li>Next: 3.4% (270/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.6% (65/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 15.8% (3/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 64.1% (5591/8718)</li>
</ul>
</details>
