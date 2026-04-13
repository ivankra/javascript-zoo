# JScript

JavaScript engine of Internet Explorer 3.0 – 8.0.

* Homepage:    [learn.microsoft.com](https://learn.microsoft.com/en-us/previous-versions/hbxc2t98%28v=vs.85%29)
* Language:    C++
* License:     Proprietary
* Org:         Microsoft
* Standard:    ES3
* Years:       1996-2011
* Interpreter: stack-based VM
* DLL:         jscript.dll

## History

* 1996: Released with Internet Explorer 3.0 in May 1996.
* 2009: Succeeded by [JScript9](../jscript9/README.md) "Chakra" engine in IE9-11, but lingers in Windows for compatibility reasons till today.
* 2025: Windows 11 24H2 shipped a mostly compatible drop-in Chakra-based replacement (`JScript9Legacy.dll`).

## Links

* https://www.usenix.org/legacy/event/webapps10/tech/full_papers/Ratanaworabhan.pdf
* https://labs.withsecure.com/publications/internet-exploiter-understanding-vulnerabilities-in-internet-explorer
* https://techcommunity.microsoft.com/blog/windows-itpro-blog/jscript9legacy-scripting-engine-now-enabled-by-default/4431326

## Conformance

<details><summary>ES1-ES5: 80%</summary><ul>
<li>ES1: 99.5% (197/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: FAIL: non-compliant, expected to return 100 instead of 2000
</pre></li>
<li>ES3: 88.5% (131/148)<pre>
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: FAIL: unshift single element failed; unshift multiple elements failed; unshift on empty array failed; unshift with no arguments failed
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: FAIL: empty array unshift failed; multiple elements unshift failed; no arguments unshift failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (1.255).toExponential(2) != '1.25e+0', got '1.26e+0'
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed; rounding failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: FAIL: 'ab'.split(/(?:ab)*/).length !== 2; '.'.split(/(.?)(.?)/).length !== 4
<a href="../../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: FAIL: split with regex failed; split with capturing group failed
<a href="../../conformance/es3/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL: negative start failed; negative start with length failed
<a href="../../conformance/es3/global.ReferenceError.thrown.js">global.ReferenceError.thrown.js</a>: FAIL: wrong exception for undeclared variable; wrong exception for undeclared function; wrong exception for undeclared in expression; wrong exception for property access on undeclared
<a href="../../conformance/es3/literals.array.elisions.js">literals.array.elisions.js</a>: FAIL: array with only elision failed
<a href="../../conformance/es3/literals.array.trailing-comma.js">literals.array.trailing-comma.js</a>: FAIL: [1,].length failed; trailing comma failed; multiple elements with trailing comma failed
<a href="../../conformance/es3/literals.string.esc-v.js">literals.string.esc-v.js</a>: FAIL
<a href="../../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: FAIL: Object expected
<a href="../../conformance/es3/regex.disjunction.js">regex.disjunction.js</a>: FAIL: complex disjunction failed
<a href="../../conformance/es3/regex.escape.control.js">regex.escape.control.js</a>: FAIL: \v failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: FAIL: spec example failed
</pre></li>
<li>ES5: 8.1% (6/74)</li>
</ul></details>

<details><summary>compat-table: ES6 2%, ES2016+ 3%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 5.6%</li>
<li>ES6: 1.8%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
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

<details><summary>test262: 15.2%, main 18.1%, staging 9.4%, annexB 27.4%, Next 1.9%, Intl 0.2%</summary>
<ul>
<li>Overall: 15.2% (8084/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 18.1% (7483/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 45.8% (3751/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 7% (776/11054)<pre>
__proto__: 0% (0/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 0.7% (2/268)
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
Map: 12.5% (5/40)
Object.is: 0% (0/2)
Promise: 0% (0/4)
Proxy: 3% (14/468)
Reflect: 5.6% (26/468)
Reflect.construct: 0.6% (4/696)
Reflect.set: 4.3% (2/46)
Reflect.setPrototypeOf: 13% (3/23)
Set: 39.5% (15/38)
String.fromCodePoint: 4.5% (1/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 5% (74/1494)
Symbol.hasInstance: 0% (0/17)
Symbol.isConcatSpreadable: 0% (0/34)
Symbol.iterator: 0.1% (1/1865)
Symbol.match: 1.1% (1/88)
Symbol.replace: 1% (1/98)
Symbol.search: 2.7% (1/37)
Symbol.species: 0% (0/276)
Symbol.split: 1.7% (1/58)
Symbol.toPrimitive: 1.7% (4/233)
Symbol.toStringTag: 0% (0/131)
Symbol.unscopables: 0% (0/44)
TypedArray: 0.4% (11/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 0% (0/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 11.4% (9/79)
WeakSet: 17.6% (6/34)
arrow-function: 2% (19/949)
class: 15.7% (748/4768)
computed-property-names: 2.5% (12/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 6.6% (149/2269)
destructuring-assignment: 2.1% (3/141)
destructuring-binding: 4.2% (282/6637)
for-of: 0% (0/5)
generators: 6.4% (261/4085)
let: 0% (0/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 54.2% (52/96)
super: 52.6% (10/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 22.3% (29/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 60% (15/25)
</pre></li>
<li>ES2017: 7.5% (57/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0.5% (2/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 1.7% (8/463)
async-functions: 15.6% (110/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 4% (195/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 5.7% (284/4968)
object-rest: 0% (0/355)
object-spread: 11.9% (16/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 50% (50/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 4.4% (6/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 100% (4/4)
optional-catch-binding: 0% (0/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 6% (130/2156)<pre>
BigInt: 0% (0/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 2% (2/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 22.7% (215/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 35.7% (20/56)
</pre></li>
<li>ES2021: 6.6% (61/920)<pre>
AggregateError: 0% (0/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 2.1% (1/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 1.1% (1/92)
String.prototype.replaceAll: 0% (0/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 0% (0/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 29.6% (47/159)
</pre></li>
<li>ES2022: 15.8% (863/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 32.5% (369/1134)
class-fields-private-in: 36.8% (7/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 19.8% (338/1709)
class-static-block: 40% (26/65)
class-static-fields-private: 4.6% (16/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 0% (0/271)
</pre></li>
<li>ES2023: 1.3% (4/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 0% (0/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 1.1% (9/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 1.7% (1/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 0% (0/187)
resizable-arraybuffer: 0.9% (4/463)
</pre></li>
<li>ES2025: 7.8% (99/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0.2% (1/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 36.1% (83/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 1.9% (157/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 1.9% (9/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 22.3% (51/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 37.7% (86/228)
source-phase-imports-module-source: 33.3% (28/84)
uint8array-base64: 2.9% (2/69)
upsert: 9.7% (7/72)
</pre></li>
<li>N/A: 22.3% (1947/8720)</li>
</ul>
</details>
