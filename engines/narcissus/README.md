# Narcissus

Metacircular JavaScript interpreter, was used for prototyping new language features in ES6.

* Repository:       [mozilla/narcissus](https://github.com/mozilla/narcissus.git) <span class="shields"><img src="https://img.shields.io/github/stars/mozilla/narcissus?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/mozilla/narcissus?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [6308](# "cloc lib")
* Language:         JavaScript
* License:          MPL-1.1-or-later OR GPL-2.0-or-later OR LGPL-2.1-or-later
* Org:              Mozilla
* Standard:         ES5
* Years:            2007-2012
* Runtime platform: JavaScript (SpiderMonkey)
  * Parser is portable, but interpreter relies on SpiderMonkey's old non-standard extensions (pre-ES6 Proxy, `catch (e if ...)`).

## Description

> Narcissus is a meta-circular JavaScript interpreter with a very
> direct representation of values: primitives are self-representing,
> objects are represented as objects (with their properties accessible via
> usual property access), and functions are represented as functions. The
> interpreter is designed this way to allow existing JavaScript functions
> and objects (such as the standard libraries) to interface directly
> with Narcissus code without following any special protocol or requiring
> wrapping and unwrapping.

## Conformance

<details><summary>ES1-ES5: 90%</summary><ul>
<li>ES1: 97% (192/198)<pre>
<a href="../../conformance/es1/Array.prototype.constructor.js">Array.prototype.constructor.js</a>: FAIL: array instance constructor failed
<a href="../../conformance/es1/Function.prototype.js">Function.prototype.js</a>: FAIL: prototype property failed
<a href="../../conformance/es1/String.length.js">String.length.js</a>: FAIL: string length failed; String object length failed; single char length failed
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: FAIL: 0755 failed; max safe integer failed
<a href="../../conformance/es1/literals.string.escapes.js">literals.string.escapes.js</a>: FAIL
<a href="../../conformance/es1/with.js">with.js</a>: TypeError: narcissus:1840:39 TypeError: this.x.pushTarget(...).next is not a function
</pre></li>
<li>ES3: 91.9% (136/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: basic toLocaleString failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: FAIL
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL
<a href="../../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: FAIL: direct prototype failed; prototype chain failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/do-while.js">do-while.js</a>: TypeError: narcissus:1757:39 TypeError: this.x.pushTarget(...).next is not a function
<a href="../../conformance/es3/instanceof.js">instanceof.js</a>: FAIL: array instanceof Array failed; custom constructor instanceof failed
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: SyntaxError: 13: Illegal token
</pre></li>
<li>ES5: 70.3% (52/74)<pre>
<a href="../../conformance/es5/Array.isArray.js">Array.isArray.js</a>: TypeError: Array.isArray is not callable
<a href="../../conformance/es5/Function.prototype-not-enumerable.js">Function.prototype-not-enumerable.js</a>: TypeError: narcissus:455:11 TypeError: can't access property "configurable", desc is undefined
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: TypeError: narcissus:455:11 TypeError: can't access property "configurable", desc is undefined
<a href="../../conformance/es5/Object.getPrototypeOf.js">Object.getPrototypeOf.js</a>: FAIL: Array.prototype failed
<a href="../../conformance/es5/String.indexing.js">String.indexing.js</a>: FAIL: 'foobar'[3] !== 'b'; test with variable failed
<a href="../../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/es5/debugger.js">debugger.js</a>: FAIL: narcissus:6062:27 uncaught exception: NYI: debugger; Stack:; execute@narcissus:6062:27; execute@narcissus:5892:20; execute@narcissus:5697:18; evaluate@narcissus:6575:9; @narcissus:6743:25
<a href="../../conformance/es5/strict.js">strict.js</a>: FAIL
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
<a href="../../conformance/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL: 'var implements' did not throw in strict mode
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: FAIL: string 'this' was coerced in accessor
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 33%, ES2016+ 44%, Next 8%, Intl 25%</summary><ul>
<li>ES5: 82.6%<pre>
<a href="../../conformance/compat-table/es5/Array.isArray.js">Array.isArray.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.property-access.js">String.property-access.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: TypeError: can't access property "configurable", desc is undefined
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-methods.js">strict.this-not-coerced-methods.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-undefined.js">strict.this-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 33%</li>
<li>ES2016: 31.8%</li>
<li>ES2017: 42.1%</li>
<li>ES2018: 36.8%</li>
<li>ES2019: 54.2%<pre>
<a href="../../conformance/compat-table/es2019/Array.prototype.flat-flatMap.unscopables.js">Array.prototype.flat-flatMap.unscopables.js</a>: TypeError: Array.prototype[Symbol.unscopables] (type undefined) has no properties
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.empty.js">Symbol.prototype.description.empty.js</a>: TypeError: can't convert symbol to string
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.js">Symbol.prototype.description.js</a>: TypeError: can't convert symbol to string
<a href="../../conformance/compat-table/es2019/Symbol.prototype.description.undefined.js">Symbol.prototype.description.undefined.js</a>: TypeError: can't convert symbol to string
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: SyntaxError: 1: missing operand; found &gt;
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: SyntaxError: 1: Missing )
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: SyntaxError: 1: Invalid property name
<a href="../../conformance/compat-table/es2019/misc.Function-toString.native-code.js">misc.Function-toString.native-code.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: SyntaxError: 1: missing formal parameter
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: SyntaxError: 44: Missing )
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: SyntaxError: 12: Missing (
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: SyntaxError: 13: Missing (
</pre></li>
<li>ES2020: 14.3%</li>
<li>ES2021: 64.3%<pre>
<a href="../../conformance/compat-table/es2021/Promise.any.AggregateError.js">Promise.any.AggregateError.js</a>: SyntaxError: 49: missing operand; found &gt;
<a href="../../conformance/compat-table/es2021/Promise.any.fulfillment.js">Promise.any.fulfillment.js</a>: SyntaxError: 49: missing operand; found &gt;
<a href="../../conformance/compat-table/es2021/logical-assignment.and.js">logical-assignment.and.js</a>: SyntaxError: 10: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.and.setter-not-invoked.js">logical-assignment.and.setter-not-invoked.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.and.short-circuit.js">logical-assignment.and.short-circuit.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.js">logical-assignment.nullish.js</a>: SyntaxError: 10: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.setter-not-invoked.js">logical-assignment.nullish.setter-not-invoked.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.nullish.short-circuit.js">logical-assignment.nullish.short-circuit.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.or.js">logical-assignment.or.js</a>: SyntaxError: 10: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.or.setter-not-invoked.js">logical-assignment.or.setter-not-invoked.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/logical-assignment.or.short-circuit.js">logical-assignment.or.short-circuit.js</a>: SyntaxError: 9: missing ; before statement
<a href="../../conformance/compat-table/es2021/numeric-separators.js">numeric-separators.js</a>: SyntaxError: 9: missing ; before statement
</pre></li>
<li>ES2022: 33.3%</li>
<li>ES2023: 80%<pre>
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: 1: Illegal token
</pre></li>
<li>ES2024: 51%<pre>
<a href="../../conformance/compat-table/es2024/Map.groupBy.js">Map.groupBy.js</a>: SyntaxError: 13: Bad left-hand side of assignment
<a href="../../conformance/compat-table/es2024/Object.groupBy.js">Object.groupBy.js</a>: SyntaxError: 11: Bad left-hand side of assignment
<a href="../../conformance/compat-table/es2024/regex.flags.v.properties-of-strings.js">regex.flags.v.properties-of-strings.js</a>: SyntaxError: narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.set-notations.js">regex.flags.v.set-notations.js</a>: SyntaxError: narcissus:1:4 SyntaxError: invalid class property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-15.1.js">regex.flags.v.unicode-15.1.js</a>: SyntaxError: narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-16.0.js">regex.flags.v.unicode-16.0.js</a>: SyntaxError: narcissus:1:4 SyntaxError: invalid property name in regular expression:
<a href="../../conformance/compat-table/es2024/regex.flags.v.unicode-17.0.js">regex.flags.v.unicode-17.0.js</a>: SyntaxError: narcissus:1:4 SyntaxError: invalid property name in regular expression:
</pre></li>
<li>ES2025: 55.3%<pre>
<a href="../../conformance/compat-table/es2025/Iterator.extends.js">Iterator.extends.js</a>: SyntaxError: 10: missing ; before statement
<a href="../../conformance/compat-table/es2025/Iterator.from.iterable.js">Iterator.from.iterable.js</a>: TypeError: Array.from is not callable
<a href="../../conformance/compat-table/es2025/Iterator.from.iterator.js">Iterator.from.iterator.js</a>: SyntaxError: 12: missing : after property
<a href="../../conformance/compat-table/es2025/Iterator.prototype.Symbol.toStringTag.js">Iterator.prototype.Symbol.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es2025/Iterator.prototype.drop.js">Iterator.prototype.drop.js</a>: TypeError: Array.from is not callable
<a href="../../conformance/compat-table/es2025/Iterator.prototype.every.js">Iterator.prototype.every.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.filter.js">Iterator.prototype.filter.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.find.js">Iterator.prototype.find.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.flatMap.js">Iterator.prototype.flatMap.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.forEach.js">Iterator.prototype.forEach.js</a>: SyntaxError: 10: missing ; before statement
<a href="../../conformance/compat-table/es2025/Iterator.prototype.map.js">Iterator.prototype.map.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.reduce.js">Iterator.prototype.reduce.js</a>: SyntaxError: 10: Bad left-hand side of assignment
<a href="../../conformance/compat-table/es2025/Iterator.prototype.some.js">Iterator.prototype.some.js</a>: SyntaxError: 10: missing operand; found &gt;
<a href="../../conformance/compat-table/es2025/Iterator.prototype.take.js">Iterator.prototype.take.js</a>: TypeError: Array.from is not callable
<a href="../../conformance/compat-table/es2025/Iterator.prototype.toArray.js">Iterator.prototype.toArray.js</a>: TypeError: Array.isArray is not callable
<a href="../../conformance/compat-table/es2025/Promise.try.js">Promise.try.js</a>: FAIL
</pre></li>
<li>Next: 8.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 31.3%, main 37.4%, staging 24.5%, annexB 39.6%, Next 5%, Intl 0.2%</summary>
<ul>
<li>Overall: 31.3% (16618/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 37.4% (15411/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 73.6% (6036/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 21.8% (2412/11054)<pre>
__proto__: 55.6% (10/18)
Array.prototype.values: 0% (0/4)
ArrayBuffer: 19.4% (52/268)
DataView: 28.4% (54/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 75% (42/56)
Float32Array: 33.3% (2/6)
Float64Array: 33.3% (2/6)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 82.9% (29/35)
Map: 27.5% (11/40)
Object.is: 50% (1/2)
Promise: 25% (1/4)
Proxy: 48.5% (227/468)
Reflect: 22% (103/468)
Reflect.construct: 10.9% (76/696)
Reflect.set: 41.3% (19/46)
Reflect.setPrototypeOf: 73.9% (17/23)
Set: 52.6% (20/38)
String.fromCodePoint: 4.5% (1/22)
String.prototype.endsWith: 66.7% (18/27)
String.prototype.includes: 69.2% (18/26)
Symbol: 28.7% (429/1494)
Symbol.hasInstance: 11.8% (2/17)
Symbol.isConcatSpreadable: 8.8% (3/34)
Symbol.iterator: 1.2% (22/1865)
Symbol.match: 13.6% (12/88)
Symbol.replace: 16.3% (16/98)
Symbol.search: 16.2% (6/37)
Symbol.species: 5.8% (16/276)
Symbol.split: 8.6% (5/58)
Symbol.toPrimitive: 3% (7/233)
Symbol.toStringTag: 7.6% (10/131)
Symbol.unscopables: 4.5% (2/44)
TypedArray: 10.4% (262/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 0% (0/2)
Uint8Array: 63.6% (7/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 58.2% (46/79)
WeakSet: 67.6% (23/34)
arrow-function: 6.8% (65/949)
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 13.3% (2/15)
cross-realm: 1% (2/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 41.8% (59/141)
destructuring-binding: 8.5% (564/6637)
for-of: 0% (0/5)
generators: 9.3% (381/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 91.7% (88/96)
super: 15.8% (3/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 36.2% (47/130)<pre>
Array.prototype.includes: 27.5% (19/69)
exponentiation: 13.6% (14/103)
u180e: 60% (15/25)
</pre></li>
<li>ES2017: 35.2% (268/761)<pre>
__getter__: 51.9% (14/27)
__setter__: 51.9% (14/27)
Atomics: 10.1% (38/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 30% (139/463)
async-functions: 28.5% (201/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 13.8% (669/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 17.2% (5/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (589/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 41.2% (7/17)
regexp-lookbehind: 100% (19/19)
regexp-named-groups: 63% (63/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 33.6% (46/137)<pre>
Array.prototype.flat: 73.3% (11/15)
Array.prototype.flatMap: 19% (4/21)
Object.fromEntries: 28% (7/25)
String.prototype.trimEnd: 25% (6/24)
String.prototype.trimStart: 26.1% (6/23)
Symbol.prototype.description: 50% (4/8)
json-superset: 100% (4/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 25.9% (14/54)
well-formed-json-stringify: 100% (1/1)
</pre></li>
<li>ES2020: 10.9% (234/2156)<pre>
BigInt: 4.7% (70/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 10.8% (11/102)
String.prototype.matchAll: 12.5% (2/16)
Symbol.matchAll: 9.5% (6/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 30.1% (285/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 5.4% (8/148)
import.meta: 65.2% (15/23)
optional-chaining: 48.2% (27/56)
</pre></li>
<li>ES2021: 20.1% (185/920)<pre>
AggregateError: 25.8% (8/31)
FinalizationRegistry: 44.9% (22/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 5.4% (5/92)
String.prototype.replaceAll: 43.9% (18/41)
WeakRef: 40.5% (15/37)
align-detached-buffer-semantics-with-web-reality: 0.6% (1/158)
logical-assignment-operators: 11.1% (12/108)
numeric-separator-literal: 68.6% (109/159)
</pre></li>
<li>ES2022: 17.1% (936/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 61.3% (38/62)
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
regexp-match-indices: 32.3% (10/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 32.1% (99/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 27.5% (30/109)
change-array-by-copy: 22.7% (30/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 82.8% (24/29)
</pre></li>
<li>ES2024: 24.9% (209/840)<pre>
Atomics.waitAsync: 2% (2/101)
String.prototype.isWellFormed: 37.5% (3/8)
String.prototype.toWellFormed: 37.5% (3/8)
array-grouping: 39.3% (11/28)
arraybuffer-transfer: 72.9% (43/59)
promise-with-resolvers: 44.4% (4/9)
regexp-v-flag: 29.4% (55/187)
resizable-arraybuffer: 22.9% (106/463)
</pre></li>
<li>ES2025: 29% (367/1264)<pre>
Float16Array: 59.2% (29/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 66.7% (14/21)
import-attributes: 15% (15/100)
iterator-helpers: 9.7% (55/567)
json-modules: 15.4% (2/13)
promise-try: 33.3% (4/12)
regexp-modifiers: 96.5% (222/230)
set-methods: 14.6% (28/192)
</pre></li>
<li>Next: 5% (419/8357)<pre>
Array.fromAsync: 0% (0/95)
Atomics.pause: 0% (0/6)
Error.isError: 61.5% (8/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Intl.NumberFormat-v3: 0% (0/102)
Math.sumPrecise: 50% (5/10)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6670)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 26.4% (126/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 28.8% (66/229)
import-text: 0% (0/6)
iterator-sequencing: 3.1% (1/32)
joint-iteration: 6.4% (5/78)
json-parse-with-source: 9.1% (2/22)
legacy-regexp: 38.5% (10/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 57.9% (11/19)
source-phase-imports: 50.9% (116/228)
source-phase-imports-module-source: 45.2% (38/84)
uint8array-base64: 55.1% (38/69)
upsert: 40.3% (29/72)
</pre></li>
<li>N/A: 53.8% (4691/8720)</li>
</ul>
</details>
