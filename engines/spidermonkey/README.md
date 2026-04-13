# SpiderMonkey

JavaScript engine of Firefox.

* Homepage:     [spidermonkey.dev](https://spidermonkey.dev/)
* Repository:   [mozilla-firefox/firefox](https://github.com/mozilla-firefox/firefox.git) <span class="shields"><img src="https://img.shields.io/github/stars/mozilla-firefox/firefox?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla-firefox/firefox?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [js/src/](https://github.com/mozilla-firefox/firefox/tree/main/js/src))
* LOC:          [1028123](# "cloc --not_match_d='(?i)(test|octane)' js/src")
* Language:     C++
* License:      MPL-2.0
* Org:          Mozilla
* Standard:     ESnext
* Years:        1996-
* Ancestor:     [Mocha](../mocha/README.md)
* Interpreter:  stack-based VM
* JIT:          2-tier JIT ([doc](https://firefox-source-docs.mozilla.org/js/index.html))
* GC:           generational GC, partially concurrent ([doc](https://firefox-source-docs.mozilla.org/js/gc.html))
* Regex engine: Irregexp, JIT-enabled (YARR in 1.8.1+ / Firefox 3.5+, Irregexp in Firefox 78+)

## History

* 1995: Netscape Navigator 2.0 launched with [Mocha](../mocha/README.md)
* 1996: Mocha rewritten in C for Netscape 4.0. The new engine dubbed SpiderMonkey or JavaScript-C.
* 2008: TraceMonkey - tracing JIT compiler for hot loops
* 2010: [JägerMonkey](https://hacks.mozilla.org/2010/03/improving-javascript-performance-with-jagermonkey/) - method JIT
* 2012: IonMonkey - SSA-based optimizing compiler
* 2013: [Baseline JIT](https://blog.mozilla.org/javascript/2013/04/05/the-baseline-compiler-has-landed/) - method JIT, inline caching, collects type information
* 2014: [Irregexp engine from V8](https://hacks.mozilla.org/2020/06/a-new-regexp-engine-in-spidermonkey/)
* 2019: [Baseline Interpreter](https://hacks.mozilla.org/2019/08/the-baseline-interpreter-a-faster-js-interpreter-in-firefox-70/) ([Interpreter.cpp](https://github.com/mozilla-firefox/firefox/blob/main/js/src/vm/Interpreter.cpp))
* 2020: [WarpBuilder](https://hacks.mozilla.org/2020/11/warp-improved-js-performance-in-firefox-83/)

## Users

* Browsers:
  * Firefox
  * [Elinks](https://github.com/rkd77/elinks) - configurable to use SpiderMonkey, QuickJS or MuJS
* Runtimes:
  * [WinterJS](https://github.com/wasmerio/winterjs) <span class="shields"><img src="https://img.shields.io/github/stars/wasmerio/winterjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/wasmerio/winterjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - SpiderMonkey/hyper.rs-based runtime
  * [spiderfire](https://github.com/Redfire75369/spiderfire) <span class="shields"><img src="https://img.shields.io/github/stars/Redfire75369/spiderfire?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Redfire75369/spiderfire?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [Fastly Compute](https://github.com/fastly/js-compute-runtime) <span class="shields"><img src="https://img.shields.io/github/stars/fastly/js-compute-runtime?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/fastly/js-compute-runtime?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
  * [gjs](https://gitlab.gnome.org/GNOME/gjs) / [cjs](https://github.com/linuxmint/cjs) <span class="shields"><img src="https://img.shields.io/github/stars/linuxmint/cjs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/linuxmint/cjs?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - GNOME 3 / Cinnamon desktop environment's JavaScript runtime
  * [StarlingMonkey](../starlingmonkey/README.md) - SpiderMonkey-based JavaScript runtime compiled to WebAssembly
* Thunderbird and other Mozilla apps
* [MongoDB](https://github.com/mongodb/mongo/tree/master/src/mongo/scripting), CouchDB, Riak
* [Acrobat Reader](https://opensource.adobe.com/dc-acrobat-sdk-docs/library/jsapiref/index.html) and other Adobe products ("AcroJS") - for evaluation of JavaScript code in .pdf. Stuck on old SpiderMonkey versions due to E4X.
* [Mozilla's list of FOSS users](https://web.archive.org/web/20210506104010/https://developer.mozilla.org/en-US/docs/Mozilla/Projects/SpiderMonkey/FOSS)

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 98%, ES2016+ 100%, Next 55%, Intl 100%</summary><ul>
<li>ES5: 100%</li>
<li>ES6: 98.1%<pre>
<a href="../../conformance/compat-table/es6/tail-calls.direct.js">tail-calls.direct.js</a>: InternalError: too much recursion
<a href="../../conformance/compat-table/es6/tail-calls.mutual.js">tail-calls.mutual.js</a>: InternalError: too much recursion
</pre></li>
<li>ES2016: 100%</li>
<li>ES2017: 100%</li>
<li>ES2018: 100%</li>
<li>ES2019: 100%</li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 100%</li>
<li>ES2023: 100%</li>
<li>ES2024: 100%</li>
<li>ES2025: 100%</li>
<li>Next: 54.9%<pre>
<a href="../../conformance/compat-table/next/Array.isTemplateObject.js">Array.isTemplateObject.js</a>: TypeError: Array.isTemplateObject is not a function
<a href="../../conformance/compat-table/next/AsyncIterator.from.async-iterable.js">AsyncIterator.from.async-iterable.js</a>: TypeError: AsyncIterator.from is not a function
<a href="../../conformance/compat-table/next/AsyncIterator.from.iterable.js">AsyncIterator.from.iterable.js</a>: TypeError: AsyncIterator.from is not a function
<a href="../../conformance/compat-table/next/AsyncIterator.from.iterator.js">AsyncIterator.from.iterator.js</a>: TypeError: AsyncIterator.from is not a function
<a href="../../conformance/compat-table/next/AsyncIterator.prototype.Symbol.toStringTag.js">AsyncIterator.prototype.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/next/Map.prototype.upsert.js">Map.prototype.upsert.js</a>: TypeError: map.upsert is not a function
<a href="../../conformance/compat-table/next/ShadowRealm.js">ShadowRealm.js</a>: FAIL
<a href="../../conformance/compat-table/next/WeakMap.prototype.upsert.js">WeakMap.prototype.upsert.js</a>: TypeError: map.upsert is not a function
<a href="../../conformance/compat-table/next/class-decorators.js">class-decorators.js</a>: SyntaxError: illegal character U+0040:
<a href="../../conformance/compat-table/next/function.sent.js">function.sent.js</a>: SyntaxError: missing ( before formal parameters:
<a href="../../conformance/compat-table/next/throw-expr.arrow.js">throw-expr.arrow.js</a>: SyntaxError: expected expression, got keyword 'throw':
<a href="../../conformance/compat-table/next/throw-expr.conditional.js">throw-expr.conditional.js</a>: SyntaxError: expected expression, got keyword 'throw':
<a href="../../conformance/compat-table/next/throw-expr.logical.js">throw-expr.logical.js</a>: SyntaxError: expected expression, got keyword 'throw':
<a href="../../conformance/compat-table/next/throw-expr.param-init.js">throw-expr.param-init.js</a>: SyntaxError: expected expression, got keyword 'throw':
</pre></li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 99%, main 99.6%, staging 99.7%, annexB 99.8%, Next 95.2%, Intl 98.6%</summary>
<ul>
<li>Experimental flags were enabled.</li>
<li>Overall: 99% (52606/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 99.6% (41082/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 99.9% (8195/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.2% (10967/11054)<pre>
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
Proxy: 99.4% (465/468)
Reflect: 97.9% (458/468)
Reflect.construct: 99.6% (693/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 99.9% (1493/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 100% (1865/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 99.2% (130/131)
Symbol.unscopables: 95.5% (42/44)
TypedArray: 99.9% (2510/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 99.7% (946/949)
class: 99.4% (4741/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 97.5% (196/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 100% (6637/6637)
for-of: 100% (5/5)
generators: 99.9% (4083/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 2.9% (1/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 94.2% (65/69)
exponentiation: 100% (103/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 99.9% (760/761)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 99.5% (374/376)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 99.6% (461/463)
async-functions: 100% (705/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 100% (4855/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.8% (4956/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 100% (17/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 100% (100/100)
regexp-unicode-property-escapes: 100% (681/681)
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
<li>ES2020: 99.9% (2153/2156)<pre>
BigInt: 99.9% (1500/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 92.3% (24/26)
dynamic-import: 84.4% (798/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 100% (148/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 99.7% (917/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 100% (16/16)
Intl.DateTimeFormat-formatRange: 100% (37/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 73.1% (114/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 97.2% (105/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 100% (5465/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.7% (1131/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 95.9% (260/271)
</pre></li>
<li>ES2023: 100% (308/308)<pre>
Intl-enumeration: 100% (35/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 100% (132/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 100% (29/29)
</pre></li>
<li>ES2024: 100% (840/840)<pre>
Atomics.waitAsync: 100% (101/101)
String.prototype.isWellFormed: 100% (8/8)
String.prototype.toWellFormed: 100% (8/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 100% (59/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 100% (463/463)
</pre></li>
<li>ES2025: 100% (1264/1264)<pre>
Float16Array: 100% (49/49)
Intl.DurationFormat: 100% (112/112)
RegExp.escape: 100% (21/21)
import-attributes: 99% (99/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 100% (230/230)
set-methods: 100% (192/192)
</pre></li>
<li>Next: 95.2% (7956/8357)<pre>
Array.fromAsync: 100% (95/95)
Atomics.pause: 100% (6/6)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 99.9% (1542/1543)
Intl.Locale-info: 2.3% (1/43)
Intl.NumberFormat-v3: 100% (102/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 99.9% (6662/6670)
await-dictionary: 100% (37/37)
canonical-tz: 78.9% (15/19)
decorators: 11.1% (3/27)
explicit-resource-management: 100% (477/477)
immutable-arraybuffer: 95% (19/20)
import-bytes: 80% (4/5)
import-defer: 32.3% (74/229)
import-text: 100% (6/6)
iterator-sequencing: 100% (32/32)
joint-iteration: 100% (78/78)
json-parse-with-source: 100% (22/22)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
uint8array-base64: 100% (69/69)
upsert: 100% (72/72)
</pre></li>
<li>N/A: 99.3% (8660/8720)</li>
</ul>
</details>
