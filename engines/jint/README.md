# Jint

JavaScript interpreter for .NET.

* Repository:       [sebastienros/jint](https://github.com/sebastienros/jint.git) <span class="shields"><img src="https://img.shields.io/github/stars/sebastienros/jint?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sebastienros/jint?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [53487](# "cloc Jint")
* Language:         C#
* License:          BSD-2-Clause
* Standard:         ESnext (partial)
* Years:            2013-
* Parser:           [acornima](https://github.com/adams85/acornima)
* Runtime platform: .NET
* Interpreter:      tree walker

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 99.3% (147/148)<pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: CRASH: SIGABRT
</pre></li>
<li>ES5: 98.6% (73/74)<pre>
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: FAIL: trailing comma does not throw SyntaxError
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 96%, Next 64%, Intl 100%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 97.7%<pre>
<a href="../../conformance/compat-table/es6/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
<a href="../../conformance/compat-table/es6/subclassing.Array.concat.js">subclassing.Array.concat.js</a>: CRASH: SIGABRT
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: CRASH: SIGSEGV
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 96%<pre>
<a href="../../conformance/compat-table/es2017/regex.flags.u.case-folding.js">regex.flags.u.case-folding.js</a>: FAIL
</pre></li>
<li>ES2018: 90.5%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Greek}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.js:10:29)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Extended_Pictographic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-11....
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Elymaic}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-12.js:10:1...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Chorasmian}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-13.js:1...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Vithkuqi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-14.js:10:...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Unified_Ideograph}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.1.js...
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: SyntaxError: Cannot convert regular expression to an equivalent System.Text.RegularExpressions.Regex: /\p{Script=Kawi}/u: Inconvertible Unicode property escape (regex.unicode-property-escapes.unicode-15.js:10:11)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Todhri}/u: Invalid property name (regex.unicode-property-escapes.unicode-16.0.js:10:11)
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: Invalid regular expression: /\p{Script=Sidetic}/u: Invalid property name (regex.unicode-property-escapes.unicode-17.0.js:10:11)
</pre></li>
<li>ES2019: 89.3%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 75.5%<pre>
<a href="../../conformance/compat-table/es2024/regex.flags.v.constructor.js">regex.flags.v.constructor.js</a>: SyntaxError: Invalid regular expression flags (1:1)
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.properties-of-strings.js:9:39)
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.set-notations.js:9:43)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-15.1.js:9:27)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-16.0.js:9:27)
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: Invalid regular expression flags (regex.flags.v.unicode-17.0.js:9:27)
</pre></li>
<li>ES2025: 100%</li>
<li>Next: 63.6%<pre>
<a href="../../conformance/compat-table/next/Array.isTemplateObject.js">Array.isTemplateObject.js</a>: TypeError: Property 'isTemplateObject' of object is not a function
<a href="../../conformance/compat-table/next/Map.prototype.upsert.js">Map.prototype.upsert.js</a>: TypeError: Property 'upsert' of object is not a function
<a href="../../conformance/compat-table/next/WeakMap.prototype.upsert.js">WeakMap.prototype.upsert.js</a>: TypeError: Property 'upsert' of object is not a function
<a href="../../conformance/compat-table/next/class-decorators.js">class-decorators.js</a>: TypeError: Cannot convert undefined or null to object
<a href="../../conformance/compat-table/next/function.sent.js">function.sent.js</a>: SyntaxError: Unexpected token '.' (function.sent.js:11:22)
<a href="../../conformance/compat-table/next/throw-expr.arrow.js">throw-expr.arrow.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.arrow.js:9:18)
<a href="../../conformance/compat-table/next/throw-expr.conditional.js">throw-expr.conditional.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.conditional.js:9:15)
<a href="../../conformance/compat-table/next/throw-expr.logical.js">throw-expr.logical.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.logical.js:11:15)
<a href="../../conformance/compat-table/next/throw-expr.param-init.js">throw-expr.param-init.js</a>: SyntaxError: Unexpected token 'throw' (throw-expr.param-init.js:9:22)
</pre></li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 97%, main 97.9%, staging 86.3%, annexB 99.9%, Next 93.6%, Intl 91.7%</summary>
<ul>
<li>Overall: 97% (51549/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 97.9% (40368/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.7% (8175/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99% (10946/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 100% (190/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 99.8% (467/468)
Reflect: 100% (468/468)
Reflect.construct: 99.9% (695/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 100% (1494/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 88.2% (30/34)
Symbol.iterator: 99.9% (1864/1865)
Symbol.match: 98.9% (87/88)
Symbol.replace: 99% (97/98)
Symbol.search: 94.6% (35/37)
Symbol.species: 96% (265/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 100% (44/44)
TypedArray: 99.9% (2511/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 100% (949/949)
class: 99.2% (4731/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 99% (199/201)
default-parameters: 99.7% (2262/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6632/6637)
for-of: 100% (5/5)
generators: 98.7% (4033/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 98.6% (68/69)
exponentiation: 99% (102/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 98% (746/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 99.5% (374/376)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 99.6% (461/463)
async-functions: 96.9% (683/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 90.5% (4393/4855)<pre>
IsHTMLDDA: 97.6% (41/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 98.9% (4915/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 94.1% (16/17)
regexp-lookbehind: 89.5% (17/19)
regexp-named-groups: 96% (96/100)
regexp-unicode-property-escapes: 26.4% (180/681)
</pre></li>
<li>ES2019: 100% (137/137)<pre>
Array.prototype.flat: 100% (15/15)
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
<li>ES2020: 97.7% (2106/2156)<pre>
BigInt: 99.9% (1499/1501)
Intl.NumberFormat-unified: 95.5% (64/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 98.4% (62/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 83% (785/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 78.4% (116/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 100% (920/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 62.5% (10/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 100% (156/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.2% (5419/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 98.9% (1122/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 100% (2058/2058)
class-methods-private: 99.1% (1693/1709)
class-static-block: 96.9% (63/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 98.9% (1497/1513)
error-cause: 100% (5/5)
regexp-match-indices: 90.3% (28/31)
top-level-await: 95.9% (260/271)
</pre></li>
<li>ES2023: 100% (308/308)<pre>
Intl-enumeration: 97.1% (34/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 84.6% (711/840)<pre>
Atomics.waitAsync: 100% (101/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 31% (58/187)
resizable-arraybuffer: 100% (463/463)
</pre></li>
<li>ES2025: 98.3% (1242/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 98.2% (110/112)
RegExp.escape: 100% (21/21)
import-attributes: 93% (93/100)
iterator-helpers: 97.7% (554/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 97.4% (224/230)
set-methods: 99.5% (191/192)
</pre></li>
<li>Next: 93.6% (7823/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 87% (1342/1543)
Intl.Locale-info: 100% (43/43)
Intl.NumberFormat-v3: 95.1% (97/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 100% (64/64)
Temporal: 96.1% (6412/6670)
await-dictionary: 100% (37/37)
canonical-tz: 100% (19/19)
decorators: 100% (27/27)
explicit-resource-management: 99.8% (476/477)
immutable-arraybuffer: 95% (19/20)
import-bytes: 80% (4/5)
import-defer: 32.3% (74/229)
import-text: 0% (0/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 100% (78/78)
json-parse-with-source: 95.5% (21/22)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 75% (3/4)
regexp-duplicate-named-groups: 63.2% (12/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 97.4% (8494/8720)</li>
</ul>
</details>
