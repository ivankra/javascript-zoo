# DMDScript

ECMAScript implementation by Digital Mars written in D.

* Homepage:    [digitalmars.com/dscript](https://www.digitalmars.com/dscript/)
* Repository:  [DigitalMars/DMDScript](https://github.com/DigitalMars/DMDScript.git) <span class="shields"><img src="https://img.shields.io/github/stars/DigitalMars/DMDScript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/DigitalMars/DMDScript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [18013](# "cloc engine")
* Language:    D
* License:     BSL-1.0 (Boost Software License 1.0)
* Org:         Digital Mars
* Standard:    ES3
* Years:       2002-
* Ancestor:    [DscriptCPP](../dscriptcpp/README.md) (original C++ version)
* Interpreter: register-based VM ([opcodes.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/opcodes.d))

## Shell

No console object.

Shell built-ins ([dglobal.d](https://github.com/DigitalMars/DMDScript/blob/master/engine/source/dmdscript/dglobal.d#L757), [dglobal.c](https://github.com/DigitalMars/DscriptCPP/blob/main/src/dscript/dglobal.c#L1147)):
  * `print(s)`: print value without newline
  * `println(s)`
  * `readln()`: "" on EOF
  * `getenv(s)`
  * `println([ScriptEngine(), ScriptEngineBuildVersion(), ScriptEngineMajorVersion(), ScriptEngineMinorVersion()])` -> `DMDScript,1,5,5`

## Conformance

<details><summary>ES1-ES5: 74%</summary><ul>
<li>Tested version: 2.1.3 (<a href="https://github.com/DigitalMars/DMDScript/commit/45a0ba2b11162e90de7e96876289c3020ab208f5">2026-03-03</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/dmdscript.json">json</a>)</li>
<li>ES1: 92.9% (184/198)<pre>
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.toString.js">Date.prototype.toString.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.toUTCString.js">Date.prototype.toUTCString.js</a>: FAIL
<a href="../../conformance/es1/Function.prototype.toString.js">Function.prototype.toString.js</a>: FAIL: toString type failed; Function toString failed
<a href="../../conformance/es1/String.js">String.js</a>: FAIL: 15.5.1.1 String(value) failed; 15.5.1.2 String() failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: FAIL: non-compliant, expected to return 100 instead of 2000
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: FAIL
<a href="../../conformance/es1/asi.js">asi.js</a>: FAIL: can't Put(0, 10) to a primitive Number
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/new.typeof.js">new.typeof.js</a>: FAIL: typeof String('x') != 'string'
<a href="../../conformance/es1/return.typeof.js">return.typeof.js</a>: FAIL: return string failed
<a href="../../conformance/es1/types.js">types.js</a>: FAIL: typeof '' != 'string'
<a href="../../conformance/es1/var.typeof.js">var.typeof.js</a>: FAIL: string var typeof failed
</pre></li>
<li>ES3: 79.7% (118/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: basic toLocaleString failed; null/missing elements failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.toString.js">Error.prototype.toString.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: small number failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.900�e-10')
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: FAIL: type failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: FAIL: $$ failed; combined replacements failed
<a href="../../conformance/es3/String.prototype.replace.regex.js">String.prototype.replace.regex.js</a>: FAIL: global regex replace failed; replace all occurrences failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: *+? not allowed in atom
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: FAIL: *+? not allowed in atom
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: no exception for undeclared variable
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: no exception for in number
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: encoding a surrogate code point in UTF-8 (at index 56320)
...
</pre></li>
<li>ES5: 9.5% (7/74)</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 2%, Next 6%, Intl 25%</summary><ul>
<li>Tested version: 2.1.3 (<a href="https://github.com/DigitalMars/DMDScript/commit/45a0ba2b11162e90de7e96876289c3020ab208f5">2026-03-03</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/dmdscript.json">json</a>)</li>
<li>ES5: 18.7%</li>
<li>ES6: 1.5%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 0%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 18.1%, main 21.8%, staging 7.8%, annexB 13.7%, Next 3.3%, Intl 0.2%</summary>
<ul>
<li>Tested version: 2.1.3 (<a href="https://github.com/DigitalMars/DMDScript/commit/45a0ba2b11162e90de7e96876289c3020ab208f5">2026-03-03</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/dmdscript.json">json</a>)</li>
<li>Overall: 18.1% (9598/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 21.8% (9065/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 49.4% (4050/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 10.9% (1201/11054)<pre>
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
Reflect.construct: 0.3% (2/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.1% (2/1494)
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
destructuring-binding: 7.8% (520/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 6.5% (5/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 52.6% (10/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 22.3% (29/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 60% (15/25)
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
<li>ES2019: 5.1% (7/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 100% (4/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 8.6% (185/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 60.9% (14/23)
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
<li>ES2022: 16.3% (893/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.9% (384/1134)
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
<li>ES2023: 5.1% (21/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 1.8% (2/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.1% (51/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
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
<li>Next: 3.3% (263/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 13.2% (63/477)
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
<li>N/A: 21.9% (1905/8718)</li>
</ul>
</details>
