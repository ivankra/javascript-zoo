# Mocha

The very first JavaScript engine that defined early JavaScript language (JS1.0/1.1), shipped in Netscape Navigator 2.0-3.0.

* Repository:  [doodlewind/mocha1995](https://github.com/doodlewind/mocha1995.git) <span class="shields"><img src="https://img.shields.io/github/stars/doodlewind/mocha1995?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/doodlewind/mocha1995?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * Based on [ns302](https://archive.org/details/netscape-communicator-3-0-2-source), ported to modern toolchain.
* LOC:         13728 (ns302)
* Language:    C++
* License:     Proprietary
* Standard:    JS1.1 (≈ES1)
* Years:       1995-1996
* Parser:      recursive descent, directly emits bytecode ([mo_parse.c](https://github.com/doodlewind/mocha1995/blob/main/src/mo_parse.c), 953 LOC)
* Interpreter: stack-based VM ([mocha.c](https://github.com/doodlewind/mocha1995/blob/main/src/mocha.c))
* GC:          reference counting

## History

* May 1995: prototyped during a 10-day sprint.
* Aug 1995: feature freeze for Netscape Navigator 2.0, constrained JS1.0 to feature set of what was working at that time, incomplete relative to envisioned language design.
* Sep 1995: Netscape Navigator 2.0b1 - first browser to support JavaScript (marketed as LiveScript at the time), JavaScript 1.0
* Dec 1995: Sun/Netscape press release announcing JavaScript
* Aug 1996: Netscape Navigator 3.0 came out - JavaScript 1.1 version, completed initial development of JavaScript.

## Links

* Allen Wirfs-Brock and Brendan Eich. 2020. [JavaScript: the first 20 years](https://dl.acm.org/doi/pdf/10.1145/3386327). Proc. ACM Program. Lang. 4, HOPL, Article 77.
* [Netscape Communicator 3.0.2 Source Tree](https://archive.org/details/netscape-communicator-3-0-2-source) (archive.org)
* https://oldweb.today/?browser=ns3-mac ([github](https://github.com/oldweb-today/netcapsule))
* https://mocha1995.js.org/

## Conformance

<details><summary>ES1-ES5: 36%</summary><ul>
<li>Tested version: <a href="https://github.com/doodlewind/mocha1995/commit/3d109cbf6d185c3665da2982e92ce198406cca01">2024-10-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/mocha.json">json</a>)</li>
<li>ES1: 73.2% (145/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: undefined is not a number
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: Date.getFullYear is not a function
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: FAIL: Date.getFullYear is not a function
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: FAIL: Date.getMilliseconds is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: FAIL: Date.getUTCDate is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: FAIL: Date.getUTCDay is not a function
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: FAIL: Date.getUTCFullYear is not a function
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: FAIL: Date.getUTCHours is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: FAIL: Date.getUTCMilliseconds is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: FAIL: Date.getUTCMinutes is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL: Date.getUTCMonth is not a function
<a href="../../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: FAIL: Date.getUTCSeconds is not a function
<a href="../../conformance/es1/Date.prototype.setFullYear.js">Date.prototype.setFullYear.js</a>: FAIL: Date.setFullYear is not a function
<a href="../../conformance/es1/Date.prototype.setMilliseconds.js">Date.prototype.setMilliseconds.js</a>: FAIL: Date.setMilliseconds is not a function
<a href="../../conformance/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: FAIL: Date.setUTCDate is not a function
<a href="../../conformance/es1/Date.prototype.setUTCFullYear.js">Date.prototype.setUTCFullYear.js</a>: FAIL: Date.setUTCFullYear is not a function
<a href="../../conformance/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: FAIL: Date.setUTCHours is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: FAIL: Date.setUTCMilliseconds is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: FAIL: Date.setUTCMinutes is not a function
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: FAIL: Date.setUTCMonth is not a function
...
</pre></li>
<li>ES3: 3.4% (5/148)</li>
<li>ES5: 1.4% (1/74)</li>
</ul></details>

<details><summary>compat-table: ES6 0%, ES2016+ 0%, Next 0%, Intl 0%</summary><ul>
<li>Tested version: <a href="https://github.com/doodlewind/mocha1995/commit/3d109cbf6d185c3665da2982e92ce198406cca01">2024-10-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/mocha.json">json</a>)</li>
<li>ES5: 0%</li>
<li>ES6: 0%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 0%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>

<details><summary>test262: 8.7%, main 10.4%, staging 0.5%, annexB 0.6%, Next 3.3%, Intl 0%</summary>
<ul>
<li>Tested version: <a href="https://github.com/doodlewind/mocha1995/commit/3d109cbf6d185c3665da2982e92ce198406cca01">2024-10-12</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/mocha.json">json</a>)</li>
<li>Overall: 8.7% (4615/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 10.4% (4340/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 5.3% (434/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 9.5% (1047/11054)<pre>
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
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.8% (516/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 21.1% (4/19)
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
<li>ES2018: 13.1% (637/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 54% (54/100)
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
<li>ES2020: 8.4% (182/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 8.3% (76/920)<pre>
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
numeric-separator-literal: 40.3% (64/159)
</pre></li>
<li>ES2022: 16.3% (891/5465)<pre>
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
top-level-await: 3% (8/271)
</pre></li>
<li>ES2023: 1.2% (5/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 17.2% (5/29)
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
<li>ES2025: 7.7% (98/1266)<pre>
Float16Array: 0% (0/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 36.1% (83/230)
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
<li>Next: 3.3% (261/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 12.8% (61/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.4% (72/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 9% (782/8718)</li>
</ul>
</details>
