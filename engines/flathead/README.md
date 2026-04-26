# Flathead

Buggy unfinished interpreter.

* Repository:   [ndreynolds/flathead](https://github.com/ndreynolds/flathead.git) <span class="shields"><img src="https://img.shields.io/github/stars/ndreynolds/flathead?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/ndreynolds/flathead?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [7075](# "cloc src")
* Language:     C
* License:      MIT
* Standard:     no (can't run ES1)
* Years:        2012-2017
* Parser:       YACC
* Interpreter:  tree walker
* Regex engine: PCRE

## Quirks

Can't run ES1 code - incorrectly implements basic JavaScript object model:

```javascript
function Obj() { this.x = 1; }
o = new Obj();
function f() { return this.x; }
o.f = f;
o.f();  // => undefined
```

No ASI.

## Conformance

<details><summary>ES1-ES5: 53%</summary><ul>
<li>Tested version: <a href="https://github.com/ndreynolds/flathead/commit/0dcc9cbd0eafa93b4339c487e1b77f7134a2da65">2017-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/flathead.json">json</a>)</li>
<li>ES1: 77.3% (153/198)<pre>
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: Array.prototype.constructor failed; array instance constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: TIMEOUT: &gt;10s
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: FAIL: sort with comparefn failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: FAIL: Boolean.prototype.constructor failed; boolean instance constructor failed
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: FAIL: Function.prototype.constructor failed; function instance constructor failed
<a href="../../conformance/es1/Number.js">Number.js</a>: FAIL: Number() failed
<a href="../../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: FAIL: Number.prototype.constructor failed; number instance constructor failed
<a href="../../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: FAIL: Object.prototype.constructor failed; object instance constructor failed
<a href="../../conformance/es1/String.fromCharCode.js">String.fromCharCode.js</a>: FAIL: Unicode is not supported
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: FAIL: Unicode is not supported
<a href="../../conformance/es1/String.length.js">String.length.js</a>: FAIL: String object length failed
<a href="../../conformance/es1/String.prototype.charCodeAt.js">String.prototype.charCodeAt.js</a>: FAIL: Unicode is not supported
<a href="../../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: FAIL: String.prototype.constructor failed; string instance constructor failed
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: escape is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: unescape is not defined
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
...
</pre></li>
<li>ES3: 27.7% (41/148)</li>
<li>ES5: 39.2% (29/74)</li>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 1%, Next 3%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/ndreynolds/flathead/commit/0dcc9cbd0eafa93b4339c487e1b77f7134a2da65">2017-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/flathead.json">json</a>)</li>
<li>ES5: 61.3%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-undefined.js">Array.prototype.sort.compareFn-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/JSON.js">JSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL: Regular expressions are not available
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.getter-accessors.js">literals.getter-accessors.js</a>: SyntaxError: unexpected IDENT, expecting ':'
<a href="../../conformance/compat-table/es5/literals.reserved-words-properties.js">literals.reserved-words-properties.js</a>: SyntaxError: unexpected IF, expecting NUMBER or IDENT or STRING or '}'
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: SyntaxError: unexpected IDENT, expecting ':'
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: unexpected '\'
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: SyntaxError: unexpected IDENT, expecting ':'
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
...
</pre></li>
<li>ES6: 0.4%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 8.9%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 0%</li>
<li>Next: 3%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 10.1%, main 12.4%, staging 1.9%, annexB 0.6%, Next 2.4%, Intl 0%</summary>
<ul>
<li>Tested version: <a href="https://github.com/ndreynolds/flathead/commit/0dcc9cbd0eafa93b4339c487e1b77f7134a2da65">2017-04-21</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/flathead.json">json</a>)</li>
<li>Overall: 10.1% (5379/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 12.4% (5156/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 18.8% (1542/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 9.1% (1008/11054)<pre>
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
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 0% (0/35)
Map: 0% (0/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 0% (0/468)
Reflect: 0% (0/468)
Reflect.construct: 0% (0/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 0% (0/27)
String.prototype.includes: 0% (0/26)
Symbol: 0% (0/1494)
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
arrow-function: 6.7% (64/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 65.2% (92/141)
destructuring-binding: 7.5% (498/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 10.5% (2/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 10.8% (14/130)<pre>
Array.prototype.includes: 0% (0/69)
exponentiation: 13.6% (14/103)
u180e: 4% (1/25)
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
<li>ES2018: 12.5% (609/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 26% (26/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 0.7% (1/137)<pre>
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
string-trimming: 0% (0/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 5.9% (127/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 20.4% (193/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 30.4% (7/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 8.2% (75/920)<pre>
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
numeric-separator-literal: 39.6% (63/159)
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
<li>ES2023: 4.6% (19/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
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
<li>ES2025: 1.8% (23/1266)<pre>
Float16Array: 0% (0/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 14% (14/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 3.9% (9/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 0% (0/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>Next: 2.4% (189/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13% (62/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 22.7% (52/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 32.9% (75/228)
source-phase-imports-module-source: 41.7% (35/84)
</pre></li>
<li>N/A: 8% (696/8718)</li>
</ul>
</details>
