# SpiderMonkey 1.8.5

First ES5-compliant version. Shipped in Firefox 4.0 (2011).

* Homepage:     [archive.org](https://web.archive.org/web/20210420113930/https://developer.mozilla.org/en-US/docs/Archive/Web/JavaScript/New_in_JavaScript/1.8.5)
* Sources:      [js185-1.0.0.tar.gz](https://archive.mozilla.org/pub/js/js185-1.0.0.tar.gz)
* LOC:          [219941](# "cloc --fullpath --not_match_f='(test|/(v8|t|ctypes|metrics)/|configure)' js-1.8.5/js/src")
* Language:     C++
* License:      MPL-2.0
* Org:          Mozilla
* Standard:     ES5
* Years:        2011
* Features:     PIC
* Interpreter:  stack-based VM
* JIT:          TraceMonkey tracing JIT, JägerMonkey method JIT, x86/x64, arm, sparc
* Regex engine: YARR, JIT-enabled

## Conformance

<details><summary>ES1-ES5: 96%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 94.6% (140/148)<pre>
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4')
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: illegal character:
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: missing : after property id:
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: SyntaxError: illegal character:
<a href="../../conformance/es3/source.whitespace.js">source.whitespace.js</a>: SyntaxError: missing ; before statement:
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: illegal character:
</pre></li>
<li>ES5: 89.2% (66/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: FAIL
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: invalid date does not throw RangeError
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: escape sequences failed
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer function failed
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/source.whitespace.bom.js">source.whitespace.bom.js</a>: SyntaxError: illegal character:
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: illegal character:
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 9%, ES2016+ 3%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 91.6%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: illegal character:
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
</pre></li>
<li>ES6: 8.9%</li>
<li>ES2016: 0%</li>
<li>ES2017: 6.5%</li>
<li>ES2018: 0%</li>
<li>ES2019: 8%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 29.9%, main 36.4%, staging 18.9%, annexB 39.4%, Next 1.9%, Intl 0.4%</summary>
<ul>
<li>Overall: 29.9% (15898/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 36.4% (15019/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 93.2% (7636/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 14.4% (1595/11054)<pre>
__proto__: 11.1% (2/18)
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
Proxy: 2.8% (13/468)
Reflect: 3.6% (17/468)
Reflect.construct: 1.9% (13/696)
Reflect.set: 2.2% (1/46)
Reflect.setPrototypeOf: 8.7% (2/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.3% (5/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0.1% (1/1865)
Symbol.match: 0% (0/88)
Symbol.replace: 0% (0/98)
Symbol.search: 0% (0/37)
Symbol.species: 0% (0/276)
Symbol.split: 0% (0/58)
Symbol.toPrimitive: 0% (0/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 5.5% (137/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 6.7% (64/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 9.5% (216/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 10.1% (672/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 24.7% (19/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 93.8% (90/96)
super: 15.8% (3/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 20.8% (27/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 52% (13/25)
</pre></li>
<li>ES2017: 20.5% (156/761)<pre>
__getter__: 51.9% (14/27)
__setter__: 51.9% (14/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 27.5% (194/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 12.6% (611/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 28% (28/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 2.2% (3/137)<pre>
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
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 4.9% (106/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 13.2% (125/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 22.2% (2/9)
globalThis: 5.4% (8/148)
import.meta: 47.8% (11/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 13.3% (122/920)<pre>
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
align-detached-buffer-semantics-with-web-reality: 1.9% (3/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 67.3% (107/159)
</pre></li>
<li>ES2022: 16.4% (896/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34% (386/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 8.1% (25/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 5.5% (6/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.4% (54/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0.4% (2/463)
</pre></li>
<li>ES2025: 8.5% (108/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 34.8% (80/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 1.9% (159/8357)<pre>
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
import-defer: 17.5% (40/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 22.4% (51/228)
source-phase-imports-module-source: 29.8% (25/84)
uint8array-base64: 7.2% (5/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 50.5% (4400/8720)</li>
</ul>
</details>
