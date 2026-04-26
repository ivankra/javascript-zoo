# JavaScriptCore

JavaScript engine of Safari/WebKit.

* Homepage:     [trac.webkit.org/wiki/JavaScriptCore](https://trac.webkit.org/wiki/JavaScriptCore)
* Repository:   [WebKit/WebKit](https://github.com/WebKit/WebKit.git) <span class="shields"><img src="https://img.shields.io/github/stars/WebKit/WebKit?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/WebKit/WebKit?label=&style=flat-square" alt="Last commit" title="Last commit"></span> (engine in [Source/JavaScriptCore/](https://github.com/WebKit/WebKit/tree/main/Source/JavaScriptCore))
* LOC:          [770374](# "cloc --not_match_d='(?i)(test)' Source/JavaScriptCore")
* Language:     C++
* License:      LGPL-2.0-only (LGPL 2.0+ for most of original KJS files, BSD-2/3 for most of Apple's contributions)
* Org:          Apple
* Standard:     ESnext
* Years:        2001-
* Ancestor:     [KJS](../kjs/README.md)
* Features:     WebAssembly engine
* Interpreter:  register-based VM
* JIT:          3-tier JIT, x86/x64, arm/arm64, mips64, riscv64
* Regex engine: YARR, JIT-enabled

## History

* 2001: KHTML/[KJS](../kjs/README.md) forked by Apple (~37k LOC). Tree-walking interpreter, PCRE-based regex engine ("JSCRE").
* 2008/06: [SquirrelFish](https://webkit.org/blog/189/announcing-squirrelfish/) (predecessor to LLint) - direct-threaded register-based VM interpreter.
* 2008/09: [SquirrelFish Extreme](https://webkit.org/blog/214/introducing-squirrelfish-extreme/) ([commit](https://github.com/WebKit/WebKit/commit/9b948e40c37ad6b4402d737f1a7639889e23c597)) aka Nitro (now Baseline JIT) - context-threaded JIT (later template JIT) + PIC, achieved ~2x speedup; now known as "Baseline JIT". WREC: new bytecode-based regex engine.
* 2009: YARR regex engine (interpreter, later template JIT)
* 2011: [DFG JIT](https://webkit.org/blog/10308/speculation-in-javascriptcore/) (Data Flow Graph) - a fast, optimizing JIT engine, SSA-based IR, compiles from bytecode. Speculative optimizations with runtime type checks and deopts to interpreter/baseline. ~2x speedup over LLint+Baseline ([commit](https://trac.webkit.org/changeset/94559/webkit))
* 2014: [FTL JIT](https://blog.llvm.org/2014/07/ftl-webkits-llvm-based-jit.html), Fourth Tier LLVM (later renamed Faster Than Light) - advanced optimizing JIT engine.
* 2016: FTL switched to a new in-house [B3 backend](https://webkit.org/blog/5852/introducing-the-b3-jit-compiler/) from LLVM. B3 is also used for WebAssembly JIT.
* 2017: [WebAssembly](https://webkit.org/blog/7691/webassembly/), BBQ (baseline) and OMG (optimizing) JIT tiers.

## VM

* LLint: register-based indirect-threaded VM, 3-arg binary ops ([blog post](https://webkit.org/blog/9329/a-new-bytecode-format-for-javascriptcore/))
* [Opcodes](https://github.com/WebKit/WebKit/blob/main/Source/JavaScriptCore/bytecode/BytecodeList.rb) are [implemented](https://github.com/WebKit/WebKit/blob/main/Source/JavaScriptCore/llint/LowLevelInterpreter.asm) in "[offlineasm](https://github.com/WebKit/WebKit/tree/main/Source/JavaScriptCore/offlineasm)" macroassembler, a Ruby-based DSL.
* cloop: offlineasm backend emitting portable C++

## Users

* Browsers:
  * Safari and WebKit-based browsers in general
  * Most iOS browsers due to JSC being the only JIT-enabled engine allowed by Apple on iOS
  * [GNOME Web](https://en.wikipedia.org/wiki/GNOME_Web) (Epiphany)
  * [Konqueror](https://en.wikipedia.org/wiki/Konqueror) (normally Blink/V8, but can use QtWebKit/JSC)
* Runtimes:
  * [bun](https://github.com/oven-sh/bun) <span class="shields"><img src="https://img.shields.io/github/stars/oven-sh/bun?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/oven-sh/bun?label=&style=flat-square" alt="Last commit" title="Last commit"></span> - JavaScript/TypeScript runtime written in Zig

## Conformance

<details><summary>ES1-ES5: 100%</summary><ul>
<li>Tested version: 311817 with experimental flags (<a href="https://github.com/WebKit/WebKit/commit/89dd2f9ec73985c4f68a7a8bb299e1121b2a78b5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/jsc_exp.json">json</a>)</li>
<li>ES1: 100% (198/198)</li>
<li>ES3: 100% (148/148)</li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 100%, ES2016+ 100%, Next 39%, Intl 100%</summary><ul>
<li>Tested version: 311817 with experimental flags (<a href="https://github.com/WebKit/WebKit/commit/89dd2f9ec73985c4f68a7a8bb299e1121b2a78b5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/jsc_exp.json">json</a>)</li>
<li>ES5: 100%</li>
<li>ES6: 100%</li>
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
<li>Next: 39.4%</li>
<li>Intl: 100%</li>
</ul></details>

<details><summary>test262: 92.1%, main 99.8%, staging 97.4%, annexB 99.9%, Next 48.6%, Intl 38.9%</summary>
<ul>
<li>Tested version: 311817 with experimental flags (<a href="https://github.com/WebKit/WebKit/commit/89dd2f9ec73985c4f68a7a8bb299e1121b2a78b5">2026-04-22</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/jsc_exp.json">json</a>)</li>
<li>Overall: 92.1% (48987/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 99.8% (41479/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 100% (8197/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 99.7% (11020/11054)<pre>
__proto__: 100% (18/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 100% (268/268)
DataView: 94.2% (179/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 100% (56/56)
Float32Array: 100% (7/7)
Float64Array: 100% (7/7)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 100% (40/40)
Object.is: 100% (2/2)
Promise: 100% (4/4)
Proxy: 97% (454/468)
Reflect: 98.9% (463/468)
Reflect.construct: 95.3% (663/696)
Reflect.set: 100% (46/46)
Reflect.setPrototypeOf: 100% (23/23)
Set: 100% (38/38)
String.fromCodePoint: 100% (22/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 90.9% (1358/1494)
Symbol.hasInstance: 100% (17/17)
Symbol.isConcatSpreadable: 100% (34/34)
Symbol.iterator: 99.7% (1860/1865)
Symbol.match: 100% (88/88)
Symbol.replace: 100% (98/98)
Symbol.search: 100% (37/37)
Symbol.species: 100% (276/276)
Symbol.split: 100% (58/58)
Symbol.toPrimitive: 100% (233/233)
Symbol.toStringTag: 100% (131/131)
Symbol.unscopables: 97.7% (43/44)
TypedArray: 99.8% (2508/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 100% (79/79)
WeakSet: 100% (34/34)
arrow-function: 93.8% (890/949)
class: 99.3% (4737/4768)
computed-property-names: 100% (478/478)
const: 100% (15/15)
cross-realm: 92.5% (186/201)
default-parameters: 100% (2269/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 100% (6637/6637)
for-of: 100% (5/5)
generators: 99.9% (4081/4085)
let: 100% (77/77)
new.target: 100% (61/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 100% (19/19)
tail-call-optimization: 88.6% (31/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 99.2% (129/130)<pre>
Array.prototype.includes: 97.1% (67/69)
exponentiation: 98.1% (101/103)
u180e: 100% (25/25)
</pre></li>
<li>ES2017: 100% (763/763)<pre>
__getter__: 100% (27/27)
__setter__: 100% (27/27)
Atomics: 100% (378/378)
Intl.DateTimeFormat-dayPeriod: 100% (12/12)
SharedArrayBuffer: 100% (464/464)
async-functions: 100% (705/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 99.9% (4852/4855)<pre>
IsHTMLDDA: 100% (42/42)
Promise.prototype.finally: 100% (29/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.7% (4953/4968)
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
<li>ES2020: 100% (2156/2156)<pre>
BigInt: 93.5% (1404/1501)
Intl.NumberFormat-unified: 100% (67/67)
Intl.RelativeTimeFormat: 100% (79/79)
Promise.allSettled: 100% (102/102)
String.prototype.matchAll: 100% (16/16)
Symbol.matchAll: 100% (63/63)
coalesce-expression: 100% (26/26)
dynamic-import: 84.2% (797/946)
export-star-as-namespace-from-module: 100% (19/19)
for-in-order: 100% (9/9)
globalThis: 100% (148/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 99.5% (915/920)<pre>
AggregateError: 100% (31/31)
FinalizationRegistry: 100% (49/49)
Intl.DateTimeFormat-datetimestyle: 68.8% (11/16)
Intl.DateTimeFormat-formatRange: 94.6% (35/37)
Intl.DateTimeFormat-fractionalSecondDigits: 100% (10/10)
Intl.DisplayNames: 100% (47/47)
Intl.ListFormat: 100% (81/81)
Intl.Locale: 96.8% (151/156)
Promise.any: 100% (92/92)
String.prototype.replaceAll: 100% (41/41)
WeakRef: 100% (37/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 100% (108/108)
numeric-separator-literal: 100% (159/159)
</pre></li>
<li>ES2022: 99.9% (5461/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 100% (2/2)
Intl.DisplayNames-v2: 100% (12/12)
Intl.Segmenter: 100% (79/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 100% (16/16)
class-fields-private: 99.4% (1127/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 99.9% (2055/2058)
class-methods-private: 100% (1709/1709)
class-static-block: 100% (65/65)
class-static-fields-private: 100% (345/345)
class-static-fields-public: 100% (213/213)
class-static-methods-private: 100% (1513/1513)
error-cause: 100% (5/5)
regexp-match-indices: 100% (31/31)
top-level-await: 96.3% (261/271)
</pre></li>
<li>ES2023: 99.8% (409/410)<pre>
Intl-enumeration: 65.7% (23/35)
Intl.NumberFormat-v3: 100% (102/102)
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
arraybuffer-transfer: 96.6% (57/59)
promise-with-resolvers: 100% (9/9)
regexp-v-flag: 100% (187/187)
resizable-arraybuffer: 99.8% (462/463)
</pre></li>
<li>ES2025: 99.8% (1264/1266)<pre>
Float16Array: 100% (51/51)
Intl.DurationFormat: 99.1% (111/112)
RegExp.escape: 100% (21/21)
import-attributes: 89% (89/100)
iterator-helpers: 100% (567/567)
json-modules: 100% (13/13)
promise-try: 100% (12/12)
regexp-modifiers: 99.1% (228/230)
set-methods: 100% (192/192)
</pre></li>
<li>ES2026: 98.6% (356/361)<pre>
Array.fromAsync: 100% (95/95)
Error.isError: 100% (13/13)
Intl.Era-monthcode: 2.7% (41/1543)
Intl.Locale-info: 100% (43/43)
Math.sumPrecise: 100% (10/10)
iterator-sequencing: 100% (32/32)
json-parse-with-source: 100% (22/22)
uint8array-base64: 97.1% (67/69)
upsert: 100% (72/72)
</pre></li>
<li>Next: 48.6% (3839/7895)<pre>
Atomics.pause: 100% (6/6)
ShadowRealm: 100% (64/64)
Temporal: 45.3% (3025/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 21.1% (4/19)
decorators: 11.1% (3/27)
explicit-resource-management: 100% (477/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 34.1% (78/229)
import-text: 0% (0/6)
joint-iteration: 6.4% (5/78)
legacy-regexp: 100% (26/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 100% (19/19)
source-phase-imports: 56.6% (129/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 99.2% (8649/8718)</li>
</ul>
</details>
