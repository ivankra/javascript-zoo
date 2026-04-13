# Quanta

Experimental JavaScript engine written in C++.

* Repository:   [solarbrowser/quanta](https://github.com/solarbrowser/quanta.git) <span class="shields"><img src="https://img.shields.io/github/stars/solarbrowser/quanta?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/solarbrowser/quanta?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [42405](# "cloc --not_match_d='(?i)(test|third_party)' .")
* Language:     C++
* License:      MPL-2.0
* Standard:     ES6+ (partial)
* Years:        2025-
* Interpreter:  tree walker
* Regex engine: std::regex

## Conformance

<details><summary>ES1-ES5: 99%</summary><ul>
<li>ES1: 100% (198/198)</li>
<li>ES3: 98.6% (146/148)<pre>
<a href="../../conformance/es3/regex.backref.js">regex.backref.js</a>: FAIL: backref for a group that hasn't captured failed
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: TypeError: Cannot read property of null or undefined
</pre></li>
<li>ES5: 100% (74/74)</li>
</ul></details>

<details><summary>compat-table: ES6 90%, ES2016+ 57%, Next 0%, Intl 61%</summary><ul>
<li>ES5: 97.1%<pre>
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL
</pre></li>
<li>ES6: 90.5%<pre>
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.invariants.js">Proxy.handler.construct.invariants.js</a>: SyntaxError: Unexpected token: 'new' (type: 30) at line 16
<a href="../../conformance/compat-table/es6/Proxy.handler.construct.js">Proxy.handler.construct.js</a>: SyntaxError: Unexpected token: 'new' (type: 30) at line 12
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.RegExp-subclassing.js">Reflect.construct.RegExp-subclassing.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es6/String.prototype.normalize.js">String.prototype.normalize.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Symbol.JSON.stringify.object.js">Symbol.JSON.stringify.object.js</a>: FAIL
<a href="../../conformance/compat-table/es6/default-params.separate-scope.js">default-params.separate-scope.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-decl.multiple-var.js">destructuring-decl.multiple-var.js</a>: SyntaxError: Unexpected token: '' (type: 95) at line 10
<a href="../../conformance/compat-table/es6/destructuring-params.defaults-separate-scope.js">destructuring-params.defaults-separate-scope.js</a>: FAIL
<a href="../../conformance/compat-table/es6/destructuring-params.duplicate-identifier.js">destructuring-params.duplicate-identifier.js</a>: FAIL
<a href="../../conformance/compat-table/es6/generators.no-new-this.js">generators.no-new-this.js</a>: CRASH: SIGSEGV
<a href="../../conformance/compat-table/es6/generators.yield-star.astral-string.js">generators.yield-star.astral-string.js</a>: FAIL
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing-throw.js">generators.yield-star.iterator-closing-throw.js</a>: FAIL
<a href="../../conformance/compat-table/es6/generators.yield-star.iterator-closing.js">generators.yield-star.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.getOwnPropertyDescriptor.Function.bind.js">misc.Proxy.getOwnPropertyDescriptor.Function.bind.js</a>: FAIL
<a href="../../conformance/compat-table/es6/misc.Proxy.get.CreateDynamicFunction.js">misc.Proxy.get.CreateDynamicFunction.js</a>: TypeError: 'get' proxy invariant violated: non-writable non-configurable property
...
</pre></li>
<li>ES2016: 93.9%<pre>
<a href="../../conformance/compat-table/es2016/exponentiation.assignment.js">exponentiation.assignment.js</a>: SyntaxError: Unexpected token: '' (type: 61) at line 10
</pre></li>
<li>ES2017: 93.5%<pre>
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.ToObject.js">annex-b.Object.prototype.__lookupGetter__.ToObject.js</a>: ReferenceError: '__lookupGetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.js">annex-b.Object.prototype.__lookupGetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.prototype-chain.js">annex-b.Object.prototype.__lookupGetter__.prototype-chain.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupGetter__.shadow-accessors.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupGetter__.symbols.js">annex-b.Object.prototype.__lookupGetter__.symbols.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.ToObject.js">annex-b.Object.prototype.__lookupSetter__.ToObject.js</a>: ReferenceError: '__lookupSetter__' is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.js">annex-b.Object.prototype.__lookupSetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.prototype-chain.js">annex-b.Object.prototype.__lookupSetter__.prototype-chain.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js">annex-b.Object.prototype.__lookupSetter__.shadow-accessors.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__lookupSetter__.symbols.js">annex-b.Object.prototype.__lookupSetter__.symbols.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupGetter__.js">annex-b.Proxy.__lookupGetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/annex-b.Proxy.__lookupSetter__.js">annex-b.Proxy.__lookupSetter__.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2017/async.await-rejection.js">async.await-rejection.js</a>: FAIL
</pre></li>
<li>ES2018: 89.5%<pre>
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.js">regex.unicode-property-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-11.js">regex.unicode-property-escapes.unicode-11.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.1.js">regex.unicode-property-escapes.unicode-12.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-12.js">regex.unicode-property-escapes.unicode-12.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-13.js">regex.unicode-property-escapes.unicode-13.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-14.js">regex.unicode-property-escapes.unicode-14.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.1.js">regex.unicode-property-escapes.unicode-15.1.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-15.js">regex.unicode-property-escapes.unicode-15.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-16.0.js">regex.unicode-property-escapes.unicode-16.0.js</a>: FAIL
<a href="../../conformance/compat-table/es2018/regex.unicode-property-escapes.unicode-17.0.js">regex.unicode-property-escapes.unicode-17.0.js</a>: FAIL
</pre></li>
<li>ES2019: 35.4%</li>
<li>ES2020: 47.1%</li>
<li>ES2021: 42.9%</li>
<li>ES2022: 51.7%<pre>
<a href="../../conformance/compat-table/es2022/class-fields.computed-static.js">class-fields.computed-static.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-access.js">class-fields.private-instance.optional-access.js</a>: SyntaxError: Expected property name after '?.'
<a href="../../conformance/compat-table/es2022/class-fields.private-instance.optional-deep-access.js">class-fields.private-instance.optional-deep-access.js</a>: TypeError: Cannot read property of null or undefined
<a href="../../conformance/compat-table/es2022/class-fields.private-static.js">class-fields.private-static.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.public-static.js">class-fields.public-static.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-fields.static.define.js">class-fields.static.define.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-methods.private-accessor.js">class-methods.private-accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-methods.private-static-accessor.js">class-methods.private-static-accessor.js</a>: FAIL
<a href="../../conformance/compat-table/es2022/class-static-init-blocks.js">class-static-init-blocks.js</a>: SyntaxError: Expected method name or computed property
<a href="../../conformance/compat-table/es2022/ergonomic-brand-checks.js">ergonomic-brand-checks.js</a>: ReferenceError: '#x' is not defined
<a href="../../conformance/compat-table/es2022/regex.flags.d.shows-in-flags.js">regex.flags.d.shows-in-flags.js</a>: FAIL
</pre></li>
<li>ES2023: 57.1%<pre>
<a href="../../conformance/compat-table/es2023/Array.prototype.toSorted.js">Array.prototype.toSorted.js</a>: FAIL
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Expected identifier after '#'
</pre></li>
<li>ES2024: 38.8%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 60.7%<pre>
<a href="../../conformance/compat-table/intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.rejects-invalid-tags.js">Intl.Collator.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.without-new.js">Intl.Collator.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.rejects-invalid-tags.js">Intl.DateTimeFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: FAIL: Property is not a function
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.without-new.js">Intl.DateTimeFormat.without-new.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.rejects-invalid-tags.js">Intl.NumberFormat.rejects-invalid-tags.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.without-new.js">Intl.NumberFormat.without-new.js</a>: FAIL
</pre></li>
</ul></details>

<details><summary>test262: 33.4%, main 39.7%, staging 25.8%, annexB 35.6%, Next 6.4%, Intl 2.6%</summary>
<ul>
<li>Overall: 33.4% (17762/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 39.7% (16389/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 72.3% (5927/8197)<pre>
caller: 100% (23/23)
</pre></li>
<li>ES6: 36.5% (4040/11054)<pre>
__proto__: 44.4% (8/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 32.1% (86/268)
DataView: 33.2% (63/190)
DataView.prototype.getFloat32: 42.9% (3/7)
DataView.prototype.getFloat64: 20% (1/5)
DataView.prototype.getInt16: 14.3% (1/7)
DataView.prototype.getInt32: 14.3% (1/7)
DataView.prototype.getInt8: 0% (0/5)
DataView.prototype.getUint16: 42.9% (3/7)
DataView.prototype.getUint32: 42.9% (3/7)
DataView.prototype.setUint8: 7.1% (4/56)
Float32Array: 66.7% (4/6)
Float64Array: 66.7% (4/6)
Int16Array: 100% (2/2)
Int32Array: 50% (2/4)
Int8Array: 77.1% (27/35)
Map: 52.5% (21/40)
Object.is: 100% (2/2)
Promise: 75% (3/4)
Proxy: 33.1% (155/468)
Reflect: 20.7% (97/468)
Reflect.construct: 69.5% (484/696)
Reflect.set: 34.8% (16/46)
Reflect.setPrototypeOf: 30.4% (7/23)
Set: 57.9% (22/38)
String.fromCodePoint: 27.3% (6/22)
String.prototype.endsWith: 70.4% (19/27)
String.prototype.includes: 73.1% (19/26)
Symbol: 20.7% (309/1494)
Symbol.hasInstance: 17.6% (3/17)
Symbol.isConcatSpreadable: 17.6% (6/34)
Symbol.iterator: 7.9% (148/1865)
Symbol.match: 36.4% (32/88)
Symbol.replace: 22.4% (22/98)
Symbol.search: 48.6% (18/37)
Symbol.species: 17% (47/276)
Symbol.split: 25.9% (15/58)
Symbol.toPrimitive: 9% (21/233)
Symbol.toStringTag: 16% (21/131)
Symbol.unscopables: 18.2% (8/44)
TypedArray: 19% (478/2513)
Uint16Array: 66.7% (4/6)
Uint32Array: 100% (2/2)
Uint8Array: 36.4% (4/11)
Uint8ClampedArray: 66.7% (4/6)
WeakMap: 39.2% (31/79)
WeakSet: 47.1% (16/34)
arrow-function: 48.3% (458/949)
class: 31.6% (1508/4768)
computed-property-names: 20.7% (99/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 30.5% (692/2269)
destructuring-assignment: 47.5% (67/141)
destructuring-binding: 25.4% (1684/6637)
for-of: 0% (0/5)
generators: 20.4% (834/4085)
let: 14.3% (11/77)
new.target: 37.7% (23/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 25% (24/96)
super: 31.6% (6/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 51.5% (67/130)<pre>
Array.prototype.includes: 27.5% (19/69)
exponentiation: 34% (35/103)
u180e: 64% (16/25)
</pre></li>
<li>ES2017: 35.7% (272/761)<pre>
__getter__: 22.2% (6/27)
__setter__: 22.2% (6/27)
Atomics: 25% (94/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 15.6% (72/463)
async-functions: 21.7% (153/705)
intl-normative-optional: 100% (4/4)
</pre></li>
<li>ES2018: 8.2% (397/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 27.6% (8/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 7.7% (384/4968)
object-rest: 17.7% (63/355)
object-spread: 52.6% (71/135)
regexp-dotall: 5.9% (1/17)
regexp-lookbehind: 15.8% (3/19)
regexp-named-groups: 2% (2/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 28.5% (39/137)<pre>
Array.prototype.flat: 20% (3/15)
Array.prototype.flatMap: 28.6% (6/21)
Object.fromEntries: 44% (11/25)
String.prototype.trimEnd: 25% (6/24)
String.prototype.trimStart: 26.1% (6/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 50% (2/4)
optional-catch-binding: 80% (4/5)
stable-array-sort: 25% (1/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 22.2% (12/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 14.4% (311/2156)<pre>
BigInt: 5.9% (89/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 9.8% (10/102)
String.prototype.matchAll: 31.2% (5/16)
Symbol.matchAll: 1.6% (1/63)
coalesce-expression: 69.2% (18/26)
dynamic-import: 11.7% (111/946)
export-star-as-namespace-from-module: 10.5% (2/19)
for-in-order: 33.3% (3/9)
globalThis: 33.1% (49/148)
import.meta: 69.6% (16/23)
optional-chaining: 64.3% (36/56)
</pre></li>
<li>ES2021: 16.5% (152/920)<pre>
AggregateError: 45.2% (14/31)
FinalizationRegistry: 34.7% (17/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 10.8% (4/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 6.4% (3/47)
Intl.ListFormat: 1.2% (1/81)
Intl.Locale: 0% (0/156)
Promise.any: 8.7% (8/92)
String.prototype.replaceAll: 14.6% (6/41)
WeakRef: 35.1% (13/37)
align-detached-buffer-semantics-with-web-reality: 0.6% (1/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 47.8% (76/159)
</pre></li>
<li>ES2022: 31.8% (1736/5465)<pre>
Array.prototype.at: 72.7% (8/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 1.3% (1/79)
Object.hasOwn: 91.9% (57/62)
String.prototype.at: 54.5% (6/11)
TypedArray.prototype.at: 61.5% (8/13)
arbitrary-module-namespace-names: 0% (0/16)
class-fields-private: 34.5% (391/1134)
class-fields-private-in: 21.1% (4/19)
class-fields-public: 36.8% (757/2058)
class-methods-private: 29.7% (507/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 20.9% (72/345)
class-static-fields-public: 1.9% (4/213)
class-static-methods-private: 32.8% (497/1513)
error-cause: 60% (3/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 73.4% (199/271)
</pre></li>
<li>ES2023: 30.8% (95/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 24.8% (27/109)
change-array-by-copy: 40.2% (53/132)
hashbang: 48.3% (14/29)
symbols-as-weakmap-keys: 3.4% (1/29)
</pre></li>
<li>ES2024: 6% (50/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 50% (4/8)
String.prototype.toWellFormed: 50% (4/8)
array-grouping: 39.3% (11/28)
arraybuffer-transfer: 28.8% (17/59)
promise-with-resolvers: 11.1% (1/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 2.6% (12/463)
</pre></li>
<li>ES2025: 5.5% (69/1264)<pre>
Float16Array: 8.2% (4/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 0% (0/100)
iterator-helpers: 7.9% (45/567)
json-modules: 0% (0/13)
promise-try: 33.3% (4/12)
regexp-modifiers: 3.9% (9/230)
set-methods: 3.6% (7/192)
</pre></li>
<li>Next: 6.4% (531/8357)<pre>
Array.fromAsync: 32.6% (31/95)
Atomics.pause: 0% (0/6)
Error.isError: 76.9% (10/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 0% (0/10)
ShadowRealm: 0% (0/64)
Temporal: 4.9% (325/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 25.8% (123/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 2.6% (6/229)
import-text: 0% (0/6)
iterator-sequencing: 3.1% (1/32)
joint-iteration: 2.6% (2/78)
json-parse-with-source: 18.2% (4/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 21.1% (4/19)
source-phase-imports: 0.9% (2/228)
source-phase-imports-module-source: 0% (0/84)
uint8array-base64: 0% (0/69)
upsert: 29.2% (21/72)
</pre></li>
<li>N/A: 46.7% (4076/8720)</li>
</ul>
</details>
