# njs

Lightweight embeddable JavaScript engine for use in nginx.

* Homepage:     [nginx.org/en/docs/njs/](https://nginx.org/en/docs/njs/index.html)
* Repository:   [nginx/njs](https://github.com/nginx/njs.git) <span class="shields"><img src="https://img.shields.io/github/stars/nginx/njs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/nginx/njs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:          [58962](# "cloc --not_match_d='(?i)(test)' src")
* Language:     C
* License:      BSD-2-Clause
* Org:          Nginx
* Standard:     ES6 (partial)
* Years:        2015-
* Interpreter:  register-based VM
* Regex engine: PCRE2

## Quirks

Always runs in strict mode, seemingly no option to disable.

## Conformance

<details><summary>ES1-ES5: 88%</summary><ul>
<li>Tested version: 0.9.7 (<a href="https://github.com/nginx/njs/commit/463ee0d52d687bb6b3bb3a81dc53a42bbc6065fc">2026-04-21</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/njs.json">json</a>)</li>
<li>ES1: 93.4% (185/198)<pre>
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: ReferenceError: "escape" is not defined
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: ReferenceError: "unescape" is not defined
<a href="../../conformance/es1/annex-b.literals.octal.js">annex-b.literals.octal.js</a>: SyntaxError: Unexpected token "0755"
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: SyntaxError: Octal escape sequences can't be used in untagged template literals or in strict mode code
<a href="../../conformance/es1/arguments.callee.js">arguments.callee.js</a>: TypeError: "caller", "callee", "arguments" properties may not be accessed
<a href="../../conformance/es1/asi.eval.js">asi.eval.js</a>: InternalError: Not implemented
<a href="../../conformance/es1/asi.js">asi.js</a>: TypeError: property set on primitive number type
<a href="../../conformance/es1/eval.js">eval.js</a>: InternalError: Not implemented
<a href="../../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: SyntaxError: Delete of an unqualified identifier
<a href="../../conformance/es1/with.js">with.js</a>: SyntaxError: Token "(" not supported in this version
</pre></li>
<li>ES3: 90.5% (134/148)<pre>
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/RegExp.js">RegExp.js</a>: FAIL: RegExp passthrough failed
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/String.prototype.toLocaleLowerCase.js">String.prototype.toLocaleLowerCase.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/String.prototype.toLocaleUpperCase.js">String.prototype.toLocaleUpperCase.js</a>: TypeError: undefined is not a function
<a href="../../conformance/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: FAIL: wrong exception type; wrong exception for unclosed string; wrong exception for invalid token
<a href="../../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: FAIL: no exception for Function.prototype.toString on non-function
<a href="../../conformance/es3/global.URIError.thrown.js">global.URIError.thrown.js</a>: FAIL: no exception for encodeURI lone low surrogate; no exception for encodeURI lone high surrogate; no exception for encodeURIComponent lone low surrogate; no exception for encodeURIComponent lone high sur...
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Unexpected token "�"
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Unexpected token "�"
<a href="../../conformance/es3/nested-functions.eval.js">nested-functions.eval.js</a>: InternalError: Not implemented
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: FAIL
</pre></li>
<li>ES5: 68.9% (51/74)<pre>
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: RangeError: Invalid time value
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot assign to read-only property "a" of object
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot assign to read-only property "y" of object
<a href="../../conformance/es5/Object.freeze.js">Object.freeze.js</a>: TypeError: Cannot assign to read-only property "x" of object
<a href="../../conformance/es5/Object.preventExtensions.js">Object.preventExtensions.js</a>: TypeError: Cannot add property "y", object is not extensible
<a href="../../conformance/es5/Object.seal.js">Object.seal.js</a>: TypeError: Cannot add property "y", object is not extensible
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: TypeError: Cannot assign to read-only property "Infinity" of object
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: TypeError: Cannot assign to read-only property "NaN" of object
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: TypeError: Cannot assign to read-only property "undefined" of object
<a href="../../conformance/es5/source.zero-width-chars.js">source.zero-width-chars.js</a>: SyntaxError: Unexpected token "\"
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.function-expr-with-matching-name.js">strict.function-expr-with-matching-name.js</a>: FAIL
<a href="../../conformance/es5/strict.js">strict.js</a>: FAIL
<a href="../../conformance/es5/strict.no-assignment-to-unresolvable.js">strict.no-assignment-to-unresolvable.js</a>: FAIL
<a href="../../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: FAIL
<a href="../../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: FAIL
<a href="../../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: FAIL
<a href="../../conformance/es5/strict.no-with.js">strict.no-with.js</a>: FAIL
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 39%, ES2016+ 32%, Next 0%, Intl 11%</summary><ul>
<li>Tested version: 0.9.7 (<a href="https://github.com/nginx/njs/commit/463ee0d52d687bb6b3bb3a81dc53a42bbc6065fc">2026-04-21</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/njs.json">json</a>)</li>
<li>ES5: 82.9%<pre>
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: TypeError: Cannot assign to read-only property "Infinity" of object
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: TypeError: Cannot assign to read-only property "NaN" of object
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: TypeError: Cannot assign to read-only property "undefined" of object
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: TypeError: property "in" on primitive undefined type
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: SyntaxError: Unexpected token "\"
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-unresolvable-error.js">strict.assignment-unresolvable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-no-bindings.js">strict.eval-no-bindings.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: property set on primitive string type
<a href="../../conformance/compat-table/es5/strict.with-error.js">strict.with-error.js</a>: FAIL
</pre></li>
<li>ES6: 38.9%</li>
<li>ES2016: 36.4%</li>
<li>ES2017: 60%<pre>
<a href="../../conformance/compat-table/es2017/Atomics.add.js">Atomics.add.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.and.js">Atomics.and.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.compareExchange.js">Atomics.compareExchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.exchange.js">Atomics.exchange.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.isLockFree.js">Atomics.isLockFree.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.load.js">Atomics.load.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.notify.js">Atomics.notify.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.or.js">Atomics.or.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.store.js">Atomics.store.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.sub.js">Atomics.sub.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.wait.js">Atomics.wait.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Atomics.xor.js">Atomics.xor.js</a>: ReferenceError: "Atomics" is not defined
<a href="../../conformance/compat-table/es2017/Object.getOwnPropertyDescriptors.no-undefined.js">Object.getOwnPropertyDescriptors.no-undefined.js</a>: ReferenceError: "Proxy" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.Symbol.species.js">SharedArrayBuffer.Symbol.species.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.js">SharedArrayBuffer.js</a>: FAIL
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.Symbol.toStringTag.js">SharedArrayBuffer.prototype.Symbol.toStringTag.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.byteLength.js">SharedArrayBuffer.prototype.byteLength.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/SharedArrayBuffer.prototype.slice.js">SharedArrayBuffer.prototype.slice.js</a>: ReferenceError: "SharedArrayBuffer" is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.ToObject.js">annex-b.Object.prototype.__defineGetter__.ToObject.js</a>: ReferenceError: "__defineGetter__" is not defined
<a href="../../conformance/compat-table/es2017/annex-b.Object.prototype.__defineGetter__.js">annex-b.Object.prototype.__defineGetter__.js</a>: TypeError: cannot get property "call" of undefined
...
</pre></li>
<li>ES2018: 31.6%</li>
<li>ES2019: 18.8%</li>
<li>ES2020: 51.4%<pre>
<a href="../../conformance/compat-table/es2020/BigInt64Array.js">BigInt64Array.js</a>: SyntaxError: Unexpected token "0x8000000000000000n"
<a href="../../conformance/compat-table/es2020/BigInt.asIntN.js">BigInt.asIntN.js</a>: ReferenceError: "BigInt" is not defined
<a href="../../conformance/compat-table/es2020/BigInt.asUintN.js">BigInt.asUintN.js</a>: ReferenceError: "BigInt" is not defined
<a href="../../conformance/compat-table/es2020/BigInt.constructor.js">BigInt.constructor.js</a>: SyntaxError: Unexpected token "3n"
<a href="../../conformance/compat-table/es2020/BigInt.js">BigInt.js</a>: SyntaxError: Unexpected token "1n"
<a href="../../conformance/compat-table/es2020/BigUint64Array.js">BigUint64Array.js</a>: SyntaxError: Unexpected token "0x10000000000000000n"
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigInt64.js">DataView.prototype.getBigInt64.js</a>: SyntaxError: Unexpected token "1n"
<a href="../../conformance/compat-table/es2020/DataView.prototype.getBigUint64.js">DataView.prototype.getBigUint64.js</a>: SyntaxError: Unexpected token "1n"
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.js">String.prototype.matchAll.js</a>: TypeError: undefined is not a function
<a href="../../conformance/compat-table/es2020/String.prototype.matchAll.throws-non-global.js">String.prototype.matchAll.throws-non-global.js</a>: FAIL
<a href="../../conformance/compat-table/es2020/optional-chaining.spread-params.js">optional-chaining.spread-params.js</a>: SyntaxError: Unexpected token "..."
</pre></li>
<li>ES2021: 42.9%</li>
<li>ES2022: 14.3%</li>
<li>ES2023: 28.6%</li>
<li>ES2024: 0%</li>
<li>ES2025: 14%</li>
<li>Next: 0%</li>
<li>Intl: 10.7%</li>
</ul></details>

<details><summary>test262: 35.7%, main 44.1%, staging 22.6%, annexB 4.9%, Next 3.4%, Intl 0.3%</summary>
<ul>
<li>Tested version: 0.9.7 (<a href="https://github.com/nginx/njs/commit/463ee0d52d687bb6b3bb3a81dc53a42bbc6065fc">2026-04-21</a>, <a href="https://github.com/ivankra/javascript-zoo-data/blob/data/test262/njs.json">json</a>)</li>
<li>Overall: 35.7% (18998/53167)</li>
<li>Excluding staging, annexB, Next and Intl: 44.1% (18334/41549)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 87.9% (7206/8197)<pre>
caller: 0% (0/23)
</pre></li>
<li>ES6: 32.6% (3605/11054)<pre>
__proto__: 11.1% (2/18)
Array.prototype.values: 75% (3/4)
ArrayBuffer: 13.1% (35/268)
DataView: 20.5% (39/190)
DataView.prototype.getFloat32: 100% (7/7)
DataView.prototype.getFloat64: 100% (5/5)
DataView.prototype.getInt16: 100% (7/7)
DataView.prototype.getInt32: 100% (7/7)
DataView.prototype.getInt8: 100% (5/5)
DataView.prototype.getUint16: 100% (7/7)
DataView.prototype.getUint32: 100% (7/7)
DataView.prototype.setUint8: 64.3% (36/56)
Float32Array: 0% (0/7)
Float64Array: 0% (0/7)
Int16Array: 0% (0/2)
Int32Array: 0% (0/4)
Int8Array: 62.9% (22/35)
Map: 0% (0/40)
Object.is: 100% (2/2)
Promise: 50% (2/4)
Proxy: 0% (0/468)
Reflect: 0.4% (2/468)
Reflect.construct: 40.4% (281/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 45.5% (10/22)
String.prototype.endsWith: 92.6% (25/27)
String.prototype.includes: 92.3% (24/26)
Symbol: 27.6% (412/1494)
Symbol.hasInstance: 17.6% (3/17)
Symbol.isConcatSpreadable: 76.5% (26/34)
Symbol.iterator: 3.4% (63/1865)
Symbol.match: 19.3% (17/88)
Symbol.replace: 71.4% (70/98)
Symbol.search: 18.9% (7/37)
Symbol.species: 34.4% (95/276)
Symbol.split: 77.6% (45/58)
Symbol.toPrimitive: 38.2% (89/233)
Symbol.toStringTag: 25.2% (33/131)
Symbol.unscopables: 6.8% (3/44)
TypedArray: 30.5% (766/2513)
Uint16Array: 0% (0/6)
Uint32Array: 0% (0/2)
Uint8Array: 45.5% (5/11)
Uint8ClampedArray: 0% (0/6)
WeakMap: 0% (0/79)
WeakSet: 0% (0/34)
arrow-function: 42.5% (403/949)
class: 15.7% (750/4768)
computed-property-names: 9.2% (44/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 66.7% (94/141)
destructuring-binding: 7.3% (482/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 20.8% (16/77)
new.target: 21.3% (13/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 91.7% (88/96)
super: 26.3% (5/19)
tail-call-optimization: 0% (0/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 71.5% (93/130)<pre>
Array.prototype.includes: 37.7% (26/69)
exponentiation: 56.3% (58/103)
u180e: 56% (14/25)
</pre></li>
<li>ES2017: 23.2% (177/763)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/378)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/464)
async-functions: 34.6% (244/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 14.1% (683/4855)<pre>
IsHTMLDDA: 23.8% (10/42)
Promise.prototype.finally: 69% (20/29)
Symbol.asyncIterator: 0.2% (1/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 21.1% (4/19)
regexp-named-groups: 67% (67/100)
regexp-unicode-property-escapes: 23.9% (163/681)
</pre></li>
<li>ES2019: 43.1% (59/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 95.8% (23/24)
String.prototype.trimStart: 95.7% (22/23)
Symbol.prototype.description: 75% (6/8)
json-superset: 50% (2/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 100% (4/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 85.2% (46/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 13.7% (295/2156)<pre>
BigInt: 4% (60/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 57.8% (59/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 7.9% (5/63)
coalesce-expression: 88.5% (23/26)
dynamic-import: 33.1% (313/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 100% (9/9)
globalThis: 6.8% (10/148)
import.meta: 60.9% (14/23)
optional-chaining: 39.3% (22/56)
</pre></li>
<li>ES2021: 31.8% (293/920)<pre>
AggregateError: 58.1% (18/31)
FinalizationRegistry: 0% (0/49)
Intl.DateTimeFormat-datetimestyle: 0% (0/16)
Intl.DateTimeFormat-formatRange: 0% (0/37)
Intl.DateTimeFormat-fractionalSecondDigits: 0% (0/10)
Intl.DisplayNames: 0% (0/47)
Intl.ListFormat: 0% (0/81)
Intl.Locale: 0% (0/156)
Promise.any: 40.2% (37/92)
String.prototype.replaceAll: 65.9% (27/41)
WeakRef: 0% (0/37)
align-detached-buffer-semantics-with-web-reality: 19% (30/158)
logical-assignment-operators: 40.7% (44/108)
numeric-separator-literal: 86.8% (138/159)
</pre></li>
<li>ES2022: 17.5% (954/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 100% (62/62)
String.prototype.at: 0% (0/11)
TypedArray.prototype.at: 0% (0/13)
arbitrary-module-namespace-names: 43.8% (7/16)
class-fields-private: 33.8% (383/1134)
class-fields-private-in: 42.1% (8/19)
class-fields-public: 14.1% (290/2058)
class-methods-private: 20.1% (344/1709)
class-static-block: 43.1% (28/65)
class-static-fields-private: 4.9% (17/345)
class-static-fields-public: 13.1% (28/213)
class-static-methods-private: 10.7% (162/1513)
error-cause: 0% (0/5)
regexp-match-indices: 3.2% (1/31)
top-level-await: 2.6% (7/271)
</pre></li>
<li>ES2023: 29.3% (120/410)<pre>
Intl-enumeration: 0% (0/35)
Intl.NumberFormat-v3: 0% (0/102)
array-find-from-last: 12.8% (14/109)
change-array-by-copy: 64.4% (85/132)
hashbang: 72.4% (21/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 7.1% (60/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 7.1% (2/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 22.2% (2/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 1.1% (5/463)
</pre></li>
<li>ES2025: 15.6% (197/1266)<pre>
Float16Array: 21.6% (11/51)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0.9% (5/567)
json-modules: 15.4% (2/13)
promise-try: 16.7% (2/12)
regexp-modifiers: 71.3% (164/230)
set-methods: 0% (0/192)
</pre></li>
<li>ES2026: 2.2% (8/361)<pre>
Array.fromAsync: 0% (0/95)
Error.isError: 0% (0/13)
Intl.Era-monthcode: 0% (0/1543)
Intl.Locale-info: 0% (0/43)
Math.sumPrecise: 0% (0/10)
iterator-sequencing: 0% (0/32)
json-parse-with-source: 0% (0/22)
uint8array-base64: 11.6% (8/69)
upsert: 0% (0/72)
</pre></li>
<li>Next: 3.4% (271/7895)<pre>
Atomics.pause: 0% (0/6)
ShadowRealm: 0% (0/64)
Temporal: 0% (0/6671)
await-dictionary: 5.4% (2/37)
canonical-tz: 0% (0/19)
decorators: 0% (0/27)
explicit-resource-management: 14.3% (68/477)
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
<li>N/A: 57.1% (4977/8718)</li>
</ul>
</details>
