# Ejscript

Embeddable JavaScript engine.

* Homepage:     [embedthis.com/ejscript/doc](https://www.embedthis.com/ejscript/doc/)
* Repository:   [embedthis/ejscript](https://github.com/embedthis/ejscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/embedthis/ejscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/embedthis/ejscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [106690](# "cloc --not_match_d='(?i)(test|pcre|zlib|ejs.web)' src")
* Language:     C
* License:      GPL-2.0-only
* Standard:     ES4 (ES3 + some ES4 draft features)
* Years:        2003-2014
* Regex engine: PCRE2

## Users

* [Samba](https://www.samba.org/~jelmer/samba4-status-xp08.pdf): used until ~2008 for scripting, replaced by Python.

## References

* https://web.archive.org/web/20080224023359/http://www.mbedthis.com/products/appWeb/doc/common/ejs/overview.html
* https://web.archive.org/web/20140919061757/http://ejscript.org/index.html

## Conformance

<details><summary>ES1-ES5: 58%</summary><ul>
<li>Tested version: 2.7.7-22-gbb38d46e9 (<a href="https://github.com/embedthis/ejscript/commit/bb38d46e96ad20e923821d31d4a37e64de926d5a">2025-03-09</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/ejscript.json">json</a>)</li>
<li>ES1: 73.7% (146/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.length failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: Array.prototype.constructor failed
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.join.js">Array.prototype.join.js</a>: FAIL: join() without separator failed
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: FAIL: sort with comparefn failed; reverse comparefn failed
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: FAIL: new Boolean(true) failed; new Boolean() failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: FAIL: Boolean.prototype.constructor failed
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: typeof Date() != 'string'
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es1/Function.js">Function.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: FAIL: Function.length failed
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: FAIL: Function.prototype.constructor failed
<a href="../../conformance/es1/Number.js">Number.js</a>: FAIL: new Number(value) failed; new Number() failed
<a href="../../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: FAIL: Number.prototype.constructor failed
<a href="../../conformance/es1/Object.prototype.valueOf.js">Object.prototype.valueOf.js</a>: FAIL: valueOf property access failed
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: FAIL: charAt failed; charCodeAt failed; indexOf failed; lastIndexOf failed; split failed; substring failed; toLowerCase failed; toUpperCase failed
<a href="../../conformance/es1/String.js">String.js</a>: FAIL: 15.5.2.1 new String(value) failed; 15.5.2.2 new String() failed
<a href="../../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: FAIL: String.prototype.constructor failed
...
</pre></li>
<li>ES3: 50% (74/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.4 Array.prototype.concat ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.7 Array.prototype.push ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.push.js">Array.prototype.push.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.7 Array.prototype.push ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: CRASH: SIGSEGV
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.12 Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.12 Array.prototype.splice (start, deleteCount [ , item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: SyntaxError: Unexpected input " ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , Unterminated comment"
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: FAIL: ArgError: Insufficient actual parameters 1. Call requires 2 parameter(s).
<a href="../../conformance/es3/Function.prototype.call.js">Function.prototype.call.js</a>: SyntaxError: Unexpected input " ES3: 15.3.4.4 Function.prototype.call (thisArg [ , arg1 [ , arg2, Unterminated comment"
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: SyntaxError: Unexpected input " ES3: 15.8.2.11 max ( [ value1 [ , value2 [ , Unterminated comment"
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: SyntaxError: Unexpected input " ES3: 15.8.2.12 min ( [ value1 [ , value2 [ , Unterminated comment"
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: zero failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: SyntaxError: Unexpected input " e and n, pick the e and n for which n Unterminated comment"
...
</pre></li>
<li>ES5: 32.4% (24/74)</li>
</ul></details>

<details><summary>compat-table: ES6 8%, ES2016+ 9%, Next 0%, Intl 21%</summary><ul>
<li>Tested version: 2.7.7-22-gbb38d46e9 (<a href="https://github.com/embedthis/ejscript/commit/bb38d46e96ad20e923821d31d4a37e64de926d5a">2025-03-09</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/ejscript.json">json</a>)</li>
<li>ES5: 60.1%<pre>
<a href="../../conformance/compat-table/es5/Array.isArray.js">Array.isArray.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-undefined.js">Array.prototype.sort.compareFn-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: CRASH: Assertion tp-&gt;tm_yday &gt;= 0, failed at src/mpr/mprLib.c:29429
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: SyntaxError: Unexpected input " compat-table: ES5 &gt; Number methods (small) &gt; Number.prototype.toExponential throws on Unterminated comment"
<a href="../../conformance/compat-table/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL: ArgError:  Exception: Insufficient actual parameters 0. Call requires 1 parameter(s).
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: ReferenceError: Exception: Cannot find function "substr"
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: ReferenceError: Exception: Property "Infinity" is not writable
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: ReferenceError: Exception: Property "NaN" is not writable
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: SyntaxError: Unexpected input "undefined"
<a href="../../conformance/compat-table/es5/literals.reserved-words-properties.js">literals.reserved-words-properties.js</a>: SyntaxError: Not an identifier "if"; Unexpected input ")"
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: ReferenceError: Exception: arguments is not defined
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-caller-error.js">strict.arguments-caller-error.js</a>: ReferenceError: Exception: arguments is not defined
<a href="../../conformance/compat-table/es5/strict.arguments-unmapped.js">strict.arguments-unmapped.js</a>: ReferenceError: Exception: arguments is not defined
...
</pre></li>
<li>ES6: 7.8%</li>
<li>ES2016: 0%</li>
<li>ES2017: 0%</li>
<li>ES2018: 10.5%</li>
<li>ES2019: 22.9%</li>
<li>ES2020: 0%</li>
<li>ES2021: 3.2%</li>
<li>ES2022: 7.7%</li>
<li>ES2023: 20%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 21.1%</li>
<li>Next: 0%</li>
<li>Intl: 21.4%</li>
</ul></details>

<details><summary>test262: 6%, main 7.3%, staging 0.3%, annexB 0.4%, Next 1.7%, Intl 0%</summary>
<ul>
<li>Tested version: 2.7.7-22-gbb38d46e9 (<a href="https://github.com/embedthis/ejscript/commit/bb38d46e96ad20e923821d31d4a37e64de926d5a">2025-03-09</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/ejscript.json">json</a>)</li>
<li>Overall: 6% (3198/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 7.3% (3052/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 2.2% (183/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 7.1% (786/11054)<pre>
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
class: 13.4% (639/4768)
computed-property-names: 2.1% (10/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 8.4% (190/2269)
destructuring-assignment: 60.3% (85/141)
destructuring-binding: 6.6% (437/6637)
for-of: 0% (0/5)
generators: 9.8% (401/4085)
let: 0% (0/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 76% (73/96)
super: 10.5% (2/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 10.8% (14/130)<pre>
Array.prototype.includes: 0% (0/69)
exponentiation: 13.6% (14/103)
u180e: 4% (1/25)
</pre></li>
<li>ES2017: 16.1% (123/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 25.7% (181/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 12% (584/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.2% (556/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 47% (47/100)
regexp-unicode-property-escapes: 22% (150/681)
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
<li>ES2020: 4.3% (93/2156)<pre>
BigInt: 0.1% (1/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 13.5% (128/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 1.4% (13/920)<pre>
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
logical-assignment-operators: 3.7% (4/108)
numeric-separator-literal: 5.7% (9/159)
</pre></li>
<li>ES2022: 14% (767/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 37.5% (6/16)
class-fields-private: 25.5% (289/1134)
class-fields-private-in: 31.6% (6/19)
class-fields-public: 11.5% (237/2058)
class-methods-private: 18.5% (316/1709)
class-static-block: 41.5% (27/65)
class-static-fields-private: 4.6% (16/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 1.8% (5/271)
</pre></li>
<li>ES2023: 5.6% (23/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 79.3% (23/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 3% (25/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 13.4% (25/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 6.2% (79/1266)<pre>
Float16Array: 0% (0/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 14% (14/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 28.3% (65/230)
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
<li>Next: 1.7% (137/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 0% (0/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 10.9% (52/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 13.5% (31/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 23.7% (54/228)
source-phase-imports-module-source: 21.4% (18/84)
</pre></li>
<li>N/A: 4.2% (370/8718)</li>
</ul>
</details>
