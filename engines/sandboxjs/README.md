# SandboxJS

Interpreter for a limited subset of ES6 for sandboxing untrusted code, preventing access to non-whitelisted functions/prototypes.

* Repository:       [nyariv/SandboxJS](https://github.com/nyariv/SandboxJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/nyariv/SandboxJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nyariv/SandboxJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [4212](# "cloc src")
* Language:         TypeScript
* License:          MIT
* Standard:         ES6 (subset)
* Years:            2019-
* Runtime platform: JavaScript
* Interpreter:      tree walker

## Features

Parses code and runs it through its own tree-walking runtime, preventing it from accessing
host engine's functions/prototypes outside of a user-specified whitelist.

Can't run moderately complex code using classes/prototype-based inheritance -
those cases just trip the whitelist.

## Conformance

<details><summary>ES1-ES5: 70%</summary><ul>
<li>ES1: 84.8% (168/198)<pre>
<a href="../../conformance/es1/Array.js">Array.js</a>: FAIL: Array.prototype failed
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Boolean.js">Boolean.js</a>: FAIL: Boolean.prototype failed
<a href="../../conformance/es1/Boolean.prototype.constructor.js">Boolean.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Date.prototype.constructor.js">Date.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Function.js">Function.js</a>: ReferenceError: a is not defined
<a href="../../conformance/es1/Function.length.js">Function.length.js</a>: FAIL: Function.length failed; function with 1 param length failed; function with 3 params length failed
<a href="../../conformance/es1/Function.prototype.constructor.js">Function.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Number.js">Number.js</a>: FAIL: Number.prototype failed
<a href="../../conformance/es1/Number.prototype.constructor.js">Number.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/Object.prototype.constructor.js">Object.prototype.constructor.js</a>: FAIL: SandboxAccessError: Static method or property access not permitted: Object.prototype
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: FAIL: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es1/String.js">String.js</a>: FAIL: 15.5.3.1 String.prototype failed
<a href="../../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: FAIL: 0755 failed; max safe integer failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Octal Deprecation: 101
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: ReferenceError: arguments is not defined
...
</pre></li>
<li>ES3: 73% (108/148)<pre>
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: ReferenceError: arguments is not defined
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: FAIL: SandboxAccessError: Static method or property access not permitted: Object.prototype
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es3/RegExp.prototype.constructor.js">RegExp.prototype.constructor.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.concat.generic.js">String.prototype.concat.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.match.generic.js">String.prototype.match.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: FAIL: SandboxAccessError: Override prototype property 'toString' not allowed
<a href="../../conformance/es3/String.prototype.search.generic.js">String.prototype.search.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/String.prototype.slice.generic.js">String.prototype.slice.generic.js</a>: FAIL: SandboxAccessError: Access to prototype of global object is not permitted
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: FAIL: SandboxAccessError: Static method or property access not permitted: EvalError.prototype
<a href="../../conformance/es3/global.RangeError.js">global.RangeError.js</a>: FAIL: SandboxAccessError: Static method or property access not permitted: RangeError.prototype
...
</pre></li>
<li>ES5: 27% (20/74)</li>
</ul></details>

<details><summary>compat-table: ES6 27%, ES2016+ 38%, Next 8%, Intl 50%</summary><ul>
<li>ES5: 32.9%</li>
<li>ES6: 26.9%</li>
<li>ES2016: 16.7%</li>
<li>ES2017: 30%</li>
<li>ES2018: 45.6%</li>
<li>ES2019: 70.8%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL: Unexpected token 'class': class  A  extends  function B() {}  {  c
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL: Unexpected token 'class': class A {}
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL: Unexpected token after call: {: { [  "0"  ]  (  )  {  } }.f
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL: Unexpected token 'function': function \u0061(\u{62}, \u0063) { \u0062
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: Unexpected token 'function': function *foo() {
</pre></li>
<li>ES2020: 51.4%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: ReferenceError: ArrayBuffer is not defined
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: FAIL: Method or property access not permitted: Iterator.Symbol(Symbol.iterator)
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: FAIL: Static method or property access not permitted: Object.prototype
<a href="../../conformance/compat-table/es2020/globalThis.js">globalThis.js</a>: TypeError: Cannot read properties of null (reading 'lacksGlobalThis')
<a href="../../conformance/compat-table/es2020/optional-chaining.function-call.js">optional-chaining.function-call.js</a>: TypeError: n is not a function
</pre></li>
<li>ES2021: 23%</li>
<li>ES2022: 12.1%</li>
<li>ES2023: 62.9%<pre>
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toReversed.js">TypedArray.prototype.toReversed.js</a>: FAIL: Method or property access not permitted: TypedArray.toReversed
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.toSorted.js">TypedArray.prototype.toSorted.js</a>: FAIL: Method or property access not permitted: TypedArray.toSorted
<a href="../../conformance/compat-table/es2023/TypedArray.prototype.with.js">TypedArray.prototype.with.js</a>: FAIL: Method or property access not permitted: TypedArray.with
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected token after dot: #: #!/0/r/env node
</pre></li>
<li>ES2024: 20.4%</li>
<li>ES2025: 52.6%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.extends.js">Iterator.extends.js</a>: SyntaxError: Unexpected token 'class': class Class extends Iterator { }
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.instanceof.js">Iterator.instanceof.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: ReferenceError: Iterator is not defined
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: FAIL: Method or property access not permitted: Iterator.drop
<a href="../../conformance/compat-table/es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: FAIL: Method or property access not permitted: Iterator.every
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: FAIL: Method or property access not permitted: Iterator.filter
<a href="../../conformance/compat-table/es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: FAIL: Method or property access not permitted: Iterator.find
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: FAIL: Method or property access not permitted: Iterator.flatMap
<a href="../../conformance/compat-table/es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: FAIL: Method or property access not permitted: Iterator.forEach
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: FAIL: Method or property access not permitted: Iterator.map
<a href="../../conformance/compat-table/es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: FAIL: Method or property access not permitted: Iterator.reduce
<a href="../../conformance/compat-table/es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: FAIL: Method or property access not permitted: Iterator.some
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: FAIL: Method or property access not permitted: Iterator.take
<a href="../../conformance/compat-table/es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: FAIL: Method or property access not permitted: Iterator.toArray
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: ReferenceError: arguments is not defined
</pre></li>
<li>Next: 8.1%</li>
<li>Intl: 50%<pre>
<a href="../../conformance/compat-table/intl/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Intl.Collator.new-instances.js">Intl.Collator.new-instances.js</a>: FAIL: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.compare.js">Intl.Collator.prototype.compare.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.Collator.prototype.resolvedOptions.js">Intl.Collator.prototype.resolvedOptions.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.iana-timezones.js">Intl.DateTimeFormat.iana-timezones.js</a>: FAIL
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.new-instances.js">Intl.DateTimeFormat.new-instances.js</a>: FAIL: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Intl.DateTimeFormat.resolvedOptions.timeZone-default.js">Intl.DateTimeFormat.resolvedOptions.timeZone-default.js</a>: FAIL: Method or property access not permitted: DateTimeFormat.resolvedOptions
<a href="../../conformance/compat-table/intl/Intl.NumberFormat.new-instances.js">Intl.NumberFormat.new-instances.js</a>: FAIL: Object construction not allowed: Function
<a href="../../conformance/compat-table/intl/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL: Access to prototype of global object is not permitted
<a href="../../conformance/compat-table/intl/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: Static method or property access not permitted: Object.prototype
<a href="../../conformance/compat-table/intl/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: FAIL: Access to prototype of global object is not permitted
</pre></li>
</ul></details>

<details><summary>test262: 6.8%, main 8.2%, staging 0.2%, annexB 0.6%, Next 2.6%, Intl 0%</summary>
<ul>
<li>Overall: 6.8% (3597/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 8.2% (3366/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 2.9% (234/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 8.2% (901/11054)<pre>
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
Float32Array: 0% (0/6)
Float64Array: 0% (0/6)
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
arrow-function: 6.4% (61/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 0% (0/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.7% (510/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 0% (0/77)
new.target: 19.7% (12/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 91.7% (88/96)
super: 10.5% (2/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 9.2% (12/130)<pre>
Array.prototype.includes: 0% (0/69)
exponentiation: 11.7% (12/103)
u180e: 4% (1/25)
</pre></li>
<li>ES2017: 10.5% (80/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 20.7% (146/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 9.1% (441/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 0% (0/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 0% (0/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 0% (0/4)
optional-catch-binding: 0% (0/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 0% (0/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 6.5% (141/2156)<pre>
BigInt: 1.2% (18/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 0% (0/26)
dynamic-import: 27.2% (257/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 0% (0/9)
globalThis: 5.4% (8/148)
import.meta: 52.2% (12/23)
optional-chaining: 33.9% (19/56)
</pre></li>
<li>ES2021: 4.8% (44/920)<pre>
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
logical-assignment-operators: 5.6% (6/108)
numeric-separator-literal: 23.9% (38/159)
</pre></li>
<li>ES2022: 16.2% (883/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 0% (0/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.3% (378/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 0% (0/31)
top-level-await: 1.5% (4/271)
</pre></li>
<li>ES2023: 6.2% (19/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 0% (0/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 0.1% (1/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 0% (0/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 0.5% (1/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 1.2% (15/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 0% (0/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 2.6% (221/8357)<pre>
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
explicit-resource-management: 11.9% (57/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 26.2% (60/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 45.6% (104/228)
source-phase-imports-module-source: 40.5% (34/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 6.9% (605/8720)</li>
</ul>
</details>
