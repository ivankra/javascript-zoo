# dowdiness/js_engine

Vibe-coded JavaScript engine written in MoonBit.

* Repository:  [dowdiness/js_engine](https://github.com/dowdiness/js_engine) <span class="shields"><img src="https://img.shields.io/github/stars/dowdiness/js_engine?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/dowdiness/js_engine?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [62588](# "cloc --exclude-ext=md .")
* Language:    MoonBit
* License:     Apache-2.0
* Years:       2026-
* Interpreter: tree walker

## Conformance

<details><summary>ES1-ES5: 93%</summary><ul>
<li>Tested version: 0.2.0-5-g4cb84a6 (<a href="https://github.com/dowdiness/js_engine/commit/4cb84a6fd4f27ee03cd5236804d7abd13ec54a9b">2026-04-23</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/dowdiness.json">json</a>)</li>
<li>ES1: 98.5% (195/198)<pre>
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: FAIL
<a href="../../conformance/es1/numbers.inf.js">numbers.inf.js</a>: FAIL: value out of range
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: FAIL
</pre></li>
<li>ES3: 89.9% (133/148)<pre>
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: large number precision failed
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: FAIL: custom toString failed
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Unexpected character 'ж' at line 8, col 5
<a href="../../conformance/es3/in.js">in.js</a>: FAIL: missing array index failed
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Unexpected character 'ж' at line 9, col 11
<a href="../../conformance/es3/regex.bracket.esc-b.js">regex.bracket.esc-b.js</a>: FAIL
<a href="../../conformance/es3/regex.class.esc-d.js">regex.class.esc-d.js</a>: FAIL: \D in bracket failed
<a href="../../conformance/es3/regex.class.esc-s.js">regex.class.esc-s.js</a>: FAIL: \S in bracket failed
<a href="../../conformance/es3/regex.class.esc-w.js">regex.class.esc-w.js</a>: FAIL: \W in bracket failed
<a href="../../conformance/es3/regex.escape.hex.js">regex.escape.hex.js</a>: TypeError: Cannot read properties of null (reading '0')
<a href="../../conformance/es3/regex.escape.unicode.js">regex.escape.unicode.js</a>: TypeError: Cannot read properties of null (reading '0')
<a href="../../conformance/es3/regex.negative-lookahead.js">regex.negative-lookahead.js</a>: FAIL: spec example failed
</pre></li>
<li>ES5: 83.8% (62/74)<pre>
<a href="../../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: FAIL: sparse array skips missing elements failed
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: FAIL: escape sequences failed
<a href="../../conformance/es5/debugger.js">debugger.js</a>: ReferenceError: debugger is not defined
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.this-primitive-not-coerced-in-accessors.js">strict.this-primitive-not-coerced-in-accessors.js</a>: TypeError: Cannot set property 'test' of string
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 77%, ES2016+ 52%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: 0.2.0-5-g4cb84a6 (<a href="https://github.com/dowdiness/js_engine/commit/4cb84a6fd4f27ee03cd5236804d7abd13ec54a9b">2026-04-23</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/dowdiness.json">json</a>)</li>
<li>ES5: 96.3%<pre>
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Cannot set property 'test' of string
</pre></li>
<li>ES6: 76.9%<pre>
<a href="../../conformance/compat-table/es6/Array.from.iterator-closing.js">Array.from.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Array.iterator-prototype-chain.js">Array.iterator-prototype-chain.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es6/Array.prototype.splice.js">Array.prototype.splice.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-expression.js">Function.name.class-expression.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.class-statement.js">Function.name.class-statement.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.new-Function.js">Function.name.new-Function.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Function.name.shorthand.no-lexical.js">Function.name.shorthand.no-lexical.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.constructor-invokes-set.js">Map.constructor-invokes-set.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-closing.js">Map.iterator-closing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Map.iterator-prototype-chain.js">Map.iterator-prototype-chain.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es6/Map.zero-key.js">Map.zero-key.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Promise.all.iterable.js">Promise.all.iterable.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.all.js">Promise.all.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.race.iterable.js">Promise.race.iterable.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Promise.race.js">Promise.race.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/compat-table/es6/Proxy.handler.get.instances.js">Proxy.handler.get.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Proxy.handler.has.instances.js">Proxy.handler.has.instances.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Array-subclassing.js">Reflect.construct.Array-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Function-subclassing.js">Reflect.construct.Function-subclassing.js</a>: FAIL
<a href="../../conformance/compat-table/es6/Reflect.construct.Promise-subclassing.js">Reflect.construct.Promise-subclassing.js</a>: FAIL
...
</pre></li>
<li>ES2016: 86.4%<pre>
<a href="../../conformance/compat-table/es2016/Array.prototype.includes.generic.js">Array.prototype.includes.generic.js</a>: FAIL
<a href="../../conformance/compat-table/es2016/misc.strict-fn-non-simple-params-error.js">misc.strict-fn-non-simple-params-error.js</a>: FAIL
</pre></li>
<li>ES2017: 57.5%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: Atomics is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: SharedArrayBuffer is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: __defineGetter__ is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.symbols.js">annex-b.Object.prototype.__defineGetter__.symbols.js</a>: TypeError: Cannot convert a Symbol value to a string
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineSetter__.ToObject.js">annex-b.Object.prototype.__defineSetter__.ToObject.js</a>: ReferenceError: __defineSetter__ is not defined
...
</pre></li>
<li>ES2018: 68.4%<pre>
<a href="../../conformance/compat-table/es2018/async-iterators.for-await-of.js">async-iterators.for-await-of.js</a>: SyntaxError: Expected LParen, got Ident("await") at line 60, col 9
<a href="../../conformance/compat-table/es2018/misc.template-literal-revision.js">misc.template-literal-revision.js</a>: SyntaxError: Invalid escape sequence at line 16, col 15
<a href="../../conformance/compat-table/es2018/regex.lookbehind.js">regex.lookbehind.js</a>: SyntaxError: Invalid regular expression: /(?&lt;=a)b/: Invalid regex: lookbehind assertions are not supported
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
<li>ES2019: 51.8%<pre>
<a href="../../conformance/compat-table/es2019/Object.fromEntries.js">Object.fromEntries.js</a>: TypeError: Object.fromEntries requires an iterable argument
<a href="../../conformance/compat-table/es2019/misc.Function-toString.Function-constructor.js">misc.Function-toString.Function-constructor.js</a>: SyntaxError: Expected RParen, got Semicolon at line 2, col 9
<a href="../../conformance/compat-table/es2019/misc.Function-toString.arrows.js">misc.Function-toString.arrows.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-explicit-constructor.js">misc.Function-toString.class-explicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.class-implicit-constructor.js">misc.Function-toString.class-implicit-constructor.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.computed-names.js">misc.Function-toString.computed-names.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.Function-toString.unicode-escapes.js">misc.Function-toString.unicode-escapes.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-stringify-well-formed.js">misc.JSON-stringify-well-formed.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.line-separator.js">misc.JSON-superset.line-separator.js</a>: SyntaxError: Unterminated string at line 1, col 2
<a href="../../conformance/compat-table/es2019/misc.JSON-superset.paragraph-separator.js">misc.JSON-superset.paragraph-separator.js</a>: SyntaxError: Unterminated string at line 1, col 2
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.await.js">misc.optional-catch-binding.await.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.js">misc.optional-catch-binding.js</a>: FAIL
<a href="../../conformance/compat-table/es2019/misc.optional-catch-binding.yield.js">misc.optional-catch-binding.yield.js</a>: FAIL
</pre></li>
<li>ES2020: 67.9%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: ReferenceError: BigInt64Array is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: ReferenceError: BigInt is not defined
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: ReferenceError: BigUint64Array is not defined
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: TypeError: is not a function
<a href="../../conformance/compat-table/es2020/globalThis.descriptor.js">globalThis.descriptor.js</a>: FAIL
</pre></li>
<li>ES2021: 42.9%</li>
<li>ES2022: 46.3%</li>
<li>ES2023: 80%<pre>
<a href="../../conformance/compat-table/es2023/hashbang.js">hashbang.js</a>: SyntaxError: Unexpected character '#' at line 1, col 1
</pre></li>
<li>ES2024: 42.9%</li>
<li>ES2025: 5.3%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 52.6%, main 63.3%, staging 38.7%, annexB 72.7%, Next 3.6%, Intl 0.5%</summary>
<ul>
<li>Tested version: 0.2.0-5-g4cb84a6 (<a href="https://github.com/dowdiness/js_engine/commit/4cb84a6fd4f27ee03cd5236804d7abd13ec54a9b">2026-04-23</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/dowdiness.json">json</a>)</li>
<li>Overall: 52.6% (27948/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 63.3% (26290/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 88.3% (7238/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 78.5% (8676/11054)<pre>
__proto__: 16.7% (3/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 14.9% (40/268)
DataView: 26.3% (50/190)
DataView.prototype.getFloat32: 71.4% (5/7)
DataView.prototype.getFloat64: 60% (3/5)
DataView.prototype.getInt16: 85.7% (6/7)
DataView.prototype.getInt32: 85.7% (6/7)
DataView.prototype.getInt8: 80% (4/5)
DataView.prototype.getUint16: 85.7% (6/7)
DataView.prototype.getUint32: 85.7% (6/7)
DataView.prototype.setUint8: 50% (28/56)
Float32Array: 28.6% (2/7)
Float64Array: 28.6% (2/7)
Int16Array: 100% (2/2)
Int32Array: 75% (3/4)
Int8Array: 77.1% (27/35)
Map: 85% (34/40)
Object.is: 100% (2/2)
Promise: 25% (1/4)
Proxy: 58.8% (275/468)
Reflect: 43.8% (205/468)
Reflect.construct: 60.2% (419/696)
Reflect.set: 52.2% (24/46)
Reflect.setPrototypeOf: 69.6% (16/23)
Set: 92.1% (35/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 96.3% (26/27)
String.prototype.includes: 96.2% (25/26)
Symbol: 40.8% (610/1494)
Symbol.hasInstance: 76.5% (13/17)
Symbol.isConcatSpreadable: 70.6% (24/34)
Symbol.iterator: 41.1% (767/1865)
Symbol.match: 36.4% (32/88)
Symbol.replace: 38.8% (38/98)
Symbol.search: 48.6% (18/37)
Symbol.species: 33% (91/276)
Symbol.split: 39.7% (23/58)
Symbol.toPrimitive: 46.8% (109/233)
Symbol.toStringTag: 34.4% (45/131)
Symbol.unscopables: 25% (11/44)
TypedArray: 29% (729/2513)
Uint16Array: 33.3% (2/6)
Uint32Array: 100% (2/2)
Uint8Array: 54.5% (6/11)
Uint8ClampedArray: 33.3% (2/6)
WeakMap: 89.9% (71/79)
WeakSet: 82.4% (28/34)
arrow-function: 58% (550/949)
class: 26.5% (1265/4768)
computed-property-names: 81.8% (391/478)
const: 86.7% (13/15)
cross-realm: 33.3% (67/201)
default-parameters: 71.8% (1630/2269)
destructuring-assignment: 38.3% (54/141)
destructuring-binding: 63.8% (4237/6637)
for-of: 20% (1/5)
generators: 62.5% (2552/4085)
let: 53.2% (41/77)
new.target: 41% (25/61)
proxy-missing-checks: 100% (3/3)
rest-parameters: 0% (0/96)
super: 21.1% (4/19)
tail-call-optimization: 0% (0/35)
template: 100% (1/1)
</pre></li>
<li>ES2016: 70% (91/130)<pre>
Array.prototype.includes: 30.4% (21/69)
exponentiation: 66% (68/103)
u180e: 84% (21/25)
</pre></li>
<li>ES2017: 27.5% (210/763)<pre>
__getter__: 63% (17/27)
__setter__: 63% (17/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 43.5% (307/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 45.6% (2213/4855)<pre>
IsHTMLDDA: 26.2% (11/42)
Promise.prototype.finally: 89.7% (26/29)
Symbol.asyncIterator: 4.8% (26/538)
async-iteration: 42.3% (2100/4968)
object-rest: 61.4% (218/355)
object-spread: 59.3% (80/135)
regexp-dotall: 41.2% (7/17)
regexp-lookbehind: 0% (0/19)
regexp-named-groups: 18% (18/100)
regexp-unicode-property-escapes: 0% (0/681)
</pre></li>
<li>ES2019: 69.3% (95/137)<pre>
Array.prototype.flat: 80% (12/15)
Array.prototype.flatMap: 71.4% (15/21)
Object.fromEntries: 56% (14/25)
String.prototype.trimEnd: 75% (18/24)
String.prototype.trimStart: 78.3% (18/23)
Symbol.prototype.description: 87.5% (7/8)
json-superset: 0% (0/4)
optional-catch-binding: 60% (3/5)
stable-array-sort: 50% (2/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 77.8% (42/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 23.5% (506/2156)<pre>
BigInt: 9.9% (149/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 96.1% (98/102)
String.prototype.matchAll: 93.8% (15/16)
Symbol.matchAll: 55.6% (35/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 33% (312/946)
export-star-as-namespace-from-module: 15.8% (3/19)
for-in-order: 66.7% (6/9)
globalThis: 37.8% (56/148)
import.meta: 69.6% (16/23)
optional-chaining: 69.6% (39/56)
</pre></li>
<li>ES2021: 40.3% (371/920)<pre>
AggregateError: 67.7% (21/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 95.7% (88/92)
String.prototype.replaceAll: 58.5% (24/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 29.7% (47/158)
logical-assignment-operators: 60.2% (65/108)
numeric-separator-literal: 89.3% (142/159)
</pre></li>
<li>ES2022: 25% (1367/5465)<pre>
Array.prototype.at: 100% (11/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 95.2% (59/62)
String.prototype.at: 100% (11/11)
TypedArray.prototype.at: 38.5% (5/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 34.4% (390/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 31.2% (643/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 68.5% (146/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 60% (3/5)
regexp-match-indices: 19.4% (6/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 44.1% (181/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 55% (60/109)
change-array-by-copy: 66.7% (88/132)
hashbang: 69% (20/29)
symbols-as-weakmap-keys: 75.9% (22/29)
</pre></li>
<li>ES2024: 6.5% (55/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 75% (6/8)
String.prototype.toWellFormed: 75% (6/8)
array-grouping: 78.6% (22/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 44.4% (4/9)
regexp-v-flag: 3.2% (6/187)
resizable-arraybuffer: 2.4% (11/463)
</pre></li>
<li>ES2025: 12.8% (162/1266)<pre>
Float16Array: 21.6% (11/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 2.3% (13/567)
json-modules: 15.4% (2/13)
promise-try: 91.7% (11/12)
regexp-modifiers: 33.5% (77/230)
set-methods: 18.2% (35/192)
</pre></li>
<li>ES2026: 26% (94/361)<pre>
Array.fromAsync: 1.1% (1/95)
Error.isError: 84.6% (11/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 60% (6/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 11.6% (8/69)
upsert: 94.4% (68/72)
</pre></li>
<li>Next: 3.6% (285/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0.1% (6/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 7.4% (2/27)
explicit-resource-management: 15.5% (74/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 31.9% (73/229)
import-text: 0% (0/6)
joint-iteration: 0% (0/78)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 0% (0/19)
source-phase-imports: 56.1% (128/228)
source-phase-imports-module-source: 50% (42/84)
</pre></li>
<li>N/A: 73.5% (6404/8718)</li>
</ul>
</details>
