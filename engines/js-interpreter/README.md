# JS-Interpreter

Sandboxed ES5 interpreter in JavaScript.

* Homepage:         [neil.fraser.name](https://neil.fraser.name/software/JS-Interpreter/docs.html)
* Repository:       [NeilFraser/JS-Interpreter](https://github.com/NeilFraser/JS-Interpreter.git) <span class="shields"><img src="https://img.shields.io/github/stars/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [4995](# "cloc interpreter.js acorn.js")
* Language:         JavaScript (ES5)
* License:          Apache-2.0
* Standard:         ES5
* Years:            2013-
* Parser:           [Acorn](../../parsers/acorn/README.md) (vendored and stripped-down to ES5, [acorn.js](https://github.com/NeilFraser/JS-Interpreter/blob/master/acorn.js), LOC: 1365)
* Runtime platform: JavaScript
* Interpreter:      tree walker ([interpreter.js](https://github.com/NeilFraser/JS-Interpreter/blob/master/interpreter.js), LOC: 3689)

## Features

* Feature-complete ES5 implementation along with standard library.
* Iteratively implemented AST tree walker with an explicit stack,
  enabling step-by-step execution, state serialization,
  resuming from saved state.
* Sandboxing features to prevent infinite loops, memory blowouts,
  pathological regular expressions in the interpreted code.
  Doesn't expose browser's DOM.
* Requires ES5 support in the host engine - depends on `Object.create(null)`.

## Conformance

<details><summary>ES1-ES5: 92%</summary><ul>
<li>ES1: 98.5% (195/198)<pre>
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: FAIL: charAt failed; charCodeAt failed; indexOf failed; lastIndexOf failed; split failed; substring failed; toLowerCase failed; toUpperCase failed
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: arguments.callee is not a function
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
</pre></li>
<li>ES3: 95.9% (142/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: object with toString failed; regex with capture failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: '0'.split(undefined, 0).length !== 0
<a href="../../conformance/es3/String.prototype.split.limit.js">String.prototype.split.limit.js</a>: FAIL: split with limit 0 failed
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: no exception for Function.prototype.toString on non-function
</pre></li>
<li>ES5: 68.9% (51/74)<pre>
<a href="../../conformance/es5/Array.isArray.js">Array.isArray.js</a>: FAIL: null not array failed; undefined not array failed
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: FAIL: length property incorrect
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: FAIL: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: failed to drop undefined/function values; undefined/function values in array not converted to null; didn't call user-provided toJSON() method
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: TypeError: Function replacer on JSON.stringify not supported
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Object.freeze is not a function
<a href="../../conformance/es5/Object.isExtensible.js">Object.isExtensible.js</a>: TypeError: Object.freeze is not a function
<a href="../../conformance/es5/Object.isFrozen.js">Object.isFrozen.js</a>: TypeError: Object.isFrozen is not a function
<a href="../../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: TypeError: Object.isSealed is not a function
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Object.seal is not a function
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 5%, ES2016+ 4%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 81.1%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.freeze.js">Object.freeze.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isFrozen.js">Object.isFrozen.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.seal.js">Object.seal.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.function-caller-arguments-error.js">strict.function-caller-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Can't create property 'test' on ''
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 4.8%</li>
<li>ES2016: 0%</li>
<li>ES2017: 8%</li>
<li>ES2018: 5.3%</li>
<li>ES2019: 6.2%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 26.2%, main 32.1%, staging 12.1%, annexB 27%, Next 2.3%, Intl 0.5%</summary>
<ul>
<li>Overall: 26.2% (13933/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 32.1% (13256/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 79% (6475/8197)<pre>
caller: 87% (20/23)
</pre></li>
<li>ES6: 11.6% (1286/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0% (0/268)
DataView: 0% (0/190)
DataView.prototype.getFloat32: 0% (0/7)
DataView.prototype.getFloat64: 0% (0/5)
DataView.prototype.getInt16: 0% (0/7)
DataView.prototype.getInt32: 0% (0/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 0% (0/7)
DataView.prototype.getUint32: 0% (0/7)
DataView.prototype.setUint8: 0% (0/56)
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 1.6% (11/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 0% (0/27)
String.prototype.includes: 0% (0/26)
Symbol: 0.1% (1/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0% (0/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0% (0/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 15.8% (3/19)
tail-call-optimization: 80% (28/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 23.1% (30/130)<pre>
Array.prototype.includes: 0% (0/69)
exponentiation: 13.6% (14/103)
u180e: 68% (17/25)
</pre></li>
<li>ES2017: 18% (137/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.5% (657/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 94.7% (18/19)
regexp-named-groups: 57% (57/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 2.9% (4/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 6.4% (138/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 20.5% (194/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 44.4% (4/9)
globalThis: 5.4% (8/148)
import.meta: 30.4% (7/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 13.2% (121/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 0% (0/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 68.6% (109/159)
</pre></li>
<li>ES2022: 16.3% (889/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.7% (382/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 6.2% (19/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6% (50/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 26.7% (50/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 10.8% (136/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 52.6% (121/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 2.3% (193/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.2% (63/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 22.7% (52/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 31.6% (6/19)
source-phase-imports: 31.6% (72/228)
source-phase-imports-module-source: 40.5% (34/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 43.6% (3798/8720)</li>
</ul>
</details>
