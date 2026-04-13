# Nova

Experimental JavaScript engine written in Rust with a cache-friendly data-oriented design.

* Homepage:    [trynova.dev](https://trynova.dev/)
* Repository:  [trynova/nova](https://github.com/trynova/nova.git) <span class="shields"><img src="https://img.shields.io/github/stars/trynova/nova?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/trynova/nova?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [102297](# "cloc --not_match_d='(?i)(test)' nova_vm")
* Language:    Rust
* License:     MPL-2.0
* Standard:    ES6+ (partial)
* Years:       2022-
* Parser:      [oxc](../../parsers/oxc/README.md)
* Interpreter: stack-based VM

## Runtimes

* [andromeda](https://github.com/tryandromeda/andromeda) <span class="shields"><img src="https://img.shields.io/github/stars/tryandromeda/andromeda?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/tryandromeda/andromeda?label=&style=flat-square" alt="Last commit" title="Last commit"></span>

## Conformance

<details><summary>ES1-ES5: 95%</summary><ul>
<li>ES1: 96.5% (191/198)<pre>
<a href="../../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL: Date.prototype.toLocaleString not implemented
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Not a callable object
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: CRASH: thread 'main' panicked at /root/.cargo/registry/src/index.crates.io-1949cf8c6b5b557f/wtf8-0.1.0/src/not_quite_std.rs:167:5
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
<a href="../../conformance/es1/with.js">with.js</a>: ReferenceError: Cannot access undeclared variable 'x'.
</pre></li>
<li>ES3: 90.5% (134/148)<pre>
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL: Date.prototype.toLocaleDateString not implemented
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL: Date.prototype.toLocaleString not implemented
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL: Date.prototype.toLocaleTimeString not implemented
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (25).toExponential(0) != '3e+1' (got: '2.5e+1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e+4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e+0')
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: FAIL: format failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $1 failed; undefined capture failed; spec example failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: FAIL: $` failed; $' failed; combined replacements failed
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: regex with capture failed
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.escape.nul.js">regex.escape.nul.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.flag.multiline.js">regex.flag.multiline.js</a>: FAIL: ^ after LF failed; $ before LF failed
<a href="../../conformance/es3/regex.lookahead.js">regex.lookahead.js</a>: SyntaxError: regex parse error
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: SyntaxError: regex parse error
</pre></li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 94%, ES2016+ 85%, Next 0%, Intl 25%</summary><ul>
<li>ES5: 98.6%<pre>
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL
</pre></li>
<li>ES6: 94%<pre>
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.invariants.js">Proxy.handler.apply.invariants.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/Proxy.handler.apply.js">Proxy.handler.apply.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: TypeError: '[object Object]' is not a constructor.
<a href="../../conformance/compat-table/es6/Proxy.revocable.js">Proxy.revocable.js</a>: FAIL: Proxy.revocable not implemented
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL: Promise subclassing is not supported
<a href="../../conformance/compat-table/es6/RegExp.prototype.flags.js">RegExp.prototype.flags.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Set.constructor-invokes-add.js">Set.constructor-invokes-add.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.js">annex-b.RegExp.prototype.compile.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.RegExp.prototype.compile.returns-this.js">annex-b.RegExp.prototype.compile.returns-this.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es6/annex-b.function.hoisted-block-level.js">annex-b.function.hoisted-block-level.js</a>: ReferenceError: Cannot access undeclared variable 'g'.
<a href="../../conformance/compat-table/es6/annex-b.function.if-statement.js">annex-b.function.if-statement.js</a>: ReferenceError: Cannot access undeclared variable 'foo'.
<a href="../../conformance/compat-table/es6/annex-b.regex.backreferences-octal.js">annex-b.regex.backreferences-octal.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.hyphens.js">annex-b.regex.hyphens.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.incomplete-patterns.js">annex-b.regex.incomplete-patterns.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-char-escapes.js">annex-b.regex.invalid-char-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-control-escapes.js">annex-b.regex.invalid-control-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-hex-escapes.js">annex-b.regex.invalid-hex-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.invalid-unicode-escapes.js">annex-b.regex.invalid-unicode-escapes.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es6/annex-b.regex.octal-escapes.js">annex-b.regex.octal-escapes.js</a>: SyntaxError: regex parse error:
...
</pre></li>
<li>ES2016: 93.9%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.basic.js">exponentiation.basic.js</a>: FAIL
</pre></li>
<li>ES2017: 88%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineGetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__defineSetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.js">annex-b.Object.prototype.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.symbols.js">annex-b.Object.prototype.__defineSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupGetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: Cannot access undeclared variable '__lookupSetter__'.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineGetter__.js">annex-b.Proxy.__defineGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__defineSetter__.js">annex-b.Proxy.__defineSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot read property 'call' of undefined.
...
</pre></li>
<li>ES2018: 67.4%<pre>
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.change-rejection.js">Promise.prototype.finally.change-rejection.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.js">Promise.prototype.finally.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/Promise.prototype.finally.no-change-resolution.js">Promise.prototype.finally.no-change-resolution.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2018/regex.named-capture-groups.js">regex.named-capture-groups.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>ES2019: 94.6%<pre>
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
</pre></li>
<li>ES2020: 100%</li>
<li>ES2021: 100%</li>
<li>ES2022: 97.3%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.instance.parent-scope.js">class-fields.instance.parent-scope.js</a>: ReferenceError: Cannot access undeclared variable 'a'.
</pre></li>
<li>ES2023: 100%</li>
<li>ES2024: 55.1%<pre>
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.detached.js">ArrayBuffer.prototype.detached.js</a>: FAIL: ArrayBuffer.prototype.transfer not implemented
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transferToFixedLength.js">ArrayBuffer.prototype.transferToFixedLength.js</a>: FAIL: ArrayBuffer.prototype.transferToFixedLength not implemented
<a href="../../conformance/compat-table/es2024/ArrayBuffer.prototype.transfer.js">ArrayBuffer.prototype.transfer.js</a>: FAIL: ArrayBuffer.prototype.transfer not implemented
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: regex parse error:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>ES2025: 55.3%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.difference.js">Set.prototype.difference.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.intersection.js">Set.prototype.intersection.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isDisjointFrom.js">Set.prototype.isDisjointFrom.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isSubsetOf.js">Set.prototype.isSubsetOf.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.isSupersetOf.js">Set.prototype.isSupersetOf.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.symmetricDifference.js">Set.prototype.symmetricDifference.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/Set.prototype.union.js">Set.prototype.union.js</a>: TypeError: Not a callable object
<a href="../../conformance/compat-table/es2025/regex.duplicate-named-groups.js">regex.duplicate-named-groups.js</a>: SyntaxError: regex parse error:
</pre></li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 77.7%, main 93.8%, staging 72.4%, annexB 52.1%, Next 11.6%, Intl 0.8%</summary>
<ul>
<li>Overall: 77.7% (41298/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 93.8% (38676/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 95.1% (7794/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 95.3% (10536/11054)<pre>
__proto__: 16.7% (3/18)
Array.prototype.values: 100% (4/4)
ArrayBuffer: 98.1% (263/268)
DataView: 92.1% (175/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 89.3% (50/56)
Float32Array: 100% (6/6)
Float64Array: 100% (6/6)
Int16Array: 100% (2/2)
Int32Array: 100% (4/4)
Int8Array: 100% (35/35)
Map: 95% (38/40)
Object.is: 100% (2/2)
Promise: 50% (2/4)
Proxy: 73.3% (343/468)
Reflect: 76.1% (356/468)
Reflect.construct: 72.4% (504/696)
Reflect.set: 97.8% (45/46)
Reflect.setPrototypeOf: 91.3% (21/23)
Set: 100% (38/38)
String.fromCodePoint: 63.6% (14/22)
String.prototype.endsWith: 100% (27/27)
String.prototype.includes: 100% (26/26)
Symbol: 70.9% (1059/1494)
Symbol.hasInstance: 94.1% (16/17)
Symbol.isConcatSpreadable: 97.1% (33/34)
Symbol.iterator: 98.2% (1832/1865)
Symbol.match: 87.5% (77/88)
Symbol.replace: 72.4% (71/98)
Symbol.search: 89.2% (33/37)
Symbol.species: 96.7% (267/276)
Symbol.split: 89.7% (52/58)
Symbol.toPrimitive: 95.3% (222/233)
Symbol.toStringTag: 77.1% (101/131)
Symbol.unscopables: 75% (33/44)
TypedArray: 96.8% (2433/2513)
Uint16Array: 100% (6/6)
Uint32Array: 100% (2/2)
Uint8Array: 100% (11/11)
Uint8ClampedArray: 100% (6/6)
WeakMap: 72.2% (57/79)
WeakSet: 100% (34/34)
arrow-function: 78.2% (742/949)
class: 97% (4625/4768)
computed-property-names: 96.9% (463/478)
const: 100% (15/15)
cross-realm: 38.3% (77/201)
default-parameters: 99.9% (2268/2269)
destructuring-assignment: 100% (141/141)
destructuring-binding: 99.9% (6631/6637)
for-of: 100% (5/5)
generators: 99.6% (4069/4085)
let: 100% (77/77)
new.target: 78.7% (48/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 100% (96/96)
super: 94.7% (18/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 90.8% (118/130)<pre>
Array.prototype.includes: 59.4% (41/69)
exponentiation: 96.1% (99/103)
u180e: 84% (21/25)
</pre></li>
<li>ES2017: 89.4% (680/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 99.2% (373/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 98.1% (454/463)
async-functions: 98.9% (697/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 85% (4126/4855)<pre>
IsHTMLDDA: 33.3% (14/42)
Promise.prototype.finally: 65.5% (19/29)
Symbol.asyncIterator: 100% (538/538)
async-iteration: 99.6% (4949/4968)
object-rest: 100% (355/355)
object-spread: 100% (135/135)
regexp-dotall: 64.7% (11/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 14% (14/100)
regexp-unicode-property-escapes: 3.4% (23/681)
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
<li>ES2020: 89.7% (1935/2156)<pre>
BigInt: 87.5% (1314/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 60.8% (62/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 92.1% (58/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 95% (899/946)
export-star-as-namespace-from-module: 94.7% (18/19)
for-in-order: 100% (9/9)
globalThis: 93.9% (139/148)
import.meta: 100% (23/23)
optional-chaining: 100% (56/56)
</pre></li>
<li>ES2021: 62.4% (574/920)<pre>
AggregateError: 83.9% (26/31)
FinalizationRegistry: 98% (48/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 59.8% (55/92)
String.prototype.replaceAll: 70.7% (29/41)
WeakRef: 97.3% (36/37)
align-detached-buffer-semantics-with-web-reality: 100% (158/158)
logical-assignment-operators: 99.1% (107/108)
numeric-separator-literal: 99.4% (158/159)
</pre></li>
<li>ES2022: 96% (5247/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 100% (13/13)
arbitrary-module-namespace-names: 93.8% (15/16)
class-fields-private: 97.2% (1102/1134)
class-fields-private-in: 100% (19/19)
class-fields-public: 96.8% (1993/2058)
class-methods-private: 98.8% (1689/1709)
class-static-block: 98.5% (64/65)
class-static-fields-private: 98.8% (341/345)
class-static-fields-public: 99.1% (211/213)
class-static-methods-private: 99.3% (1503/1513)
error-cause: 100% (5/5)
regexp-match-indices: 38.7% (12/31)
top-level-await: 93.7% (254/271)
</pre></li>
<li>ES2023: 91.9% (283/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 100% (109/109)
change-array-by-copy: 99.2% (131/132)
hashbang: 100% (29/29)
symbols-as-weakmap-keys: 72.4% (21/29)
</pre></li>
<li>ES2024: 78.9% (663/840)<pre>
Atomics.waitAsync: 97% (98/101)
String.prototype.isWellFormed: 87.5% (7/8)
String.prototype.toWellFormed: 87.5% (7/8)
array-grouping: 100% (28/28)
arraybuffer-transfer: 35.6% (21/59)
promise-with-resolvers: 66.7% (6/9)
regexp-v-flag: 30.5% (57/187)
resizable-arraybuffer: 95.2% (441/463)
</pre></li>
<li>ES2025: 44.5% (563/1264)<pre>
Float16Array: 22.4% (11/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 100% (21/21)
import-attributes: 76% (76/100)
iterator-helpers: 52.2% (296/567)
json-modules: 15.4% (2/13)
promise-try: 83.3% (10/12)
regexp-modifiers: 49.6% (114/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>Next: 11.6% (969/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 16.7% (1/6)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0.1% (1/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 100% (10/10)
ShadowRealm: 0% (0/64)
Temporal: 7.2% (477/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 85.2% (23/27)
explicit-resource-management: 19.3% (92/477)
immutable-arraybuffer: 5% (1/20)
import-bytes: 0% (0/5)
import-defer: 59% (135/229)
import-text: 0% (0/6)
iterator-sequencing: 9.4% (3/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 3.8% (1/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 5.3% (1/19)
source-phase-imports: 82% (187/228)
source-phase-imports-module-source: 97.6% (82/84)
uint8array-base64: 11.6% (8/69)
upsert: 31.9% (23/72)
</pre></li>
<li>N/A: 88% (7673/8720)</li>
</ul>
</details>
