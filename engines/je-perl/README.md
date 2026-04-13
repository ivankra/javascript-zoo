# je-perl

JavaScript engine in pure Perl.

* Homepage:         [metacpan.org/dist/JE](https://metacpan.org/dist/JE)
* Sources:          [JE-0.066.tar.gz](https://cpan.metacpan.org/authors/id/S/SP/SPROUT/JE-0.066.tar.gz)
* LOC:              [11007](# "cloc lib")
* Language:         Perl
* License:          Artistic-1.0-Perl OR GPL-1.0-or-later
* Standard:         ES3
* Years:            2007-2014
* Runtime platform: Perl
* Interpreter:      tree walker

Packaged as [libje-perl](https://packages.debian.org/search?keywords=libje-perl) in Debian/Ubuntu.

## Conformance

<details><summary>ES1-ES5: 79%</summary><ul>
<li>ES1: 97% (192/198)<pre>
<a href="../../conformance/es1/Number.MAX_VALUE.js">Number.MAX_VALUE.js</a>: FAIL: Can't locate object method "to_primitive" via package "1.79769313486232e+308" (perhaps you forgot to load "1.79769313486232e+308"?) at je-perl-dist/lib/perl5/JE/Code.pm line 917.
<a href="../../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: FAIL: Can't locate object method "to_primitive" via package "4.94065645841247e-324" (perhaps you forgot to load "4.94065645841247e-324"?) at je-perl-dist/lib/perl5/JE/Code.pm line 917.
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: FAIL: Old package separator "'" deprecated at je-perl-dist/lib/perl5/JE/escape.pl line 33.; Old package separator "'" deprecated at je-perl-dist/lib/perl5/JE/escape.pl line 77.
<a href="../../conformance/es1/assignment.ltr.js">assignment.ltr.js</a>: FAIL: C++ like evaluation order in 'x += f()'
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: FAIL: 1e-7 failed
<a href="../../conformance/es1/numbers.double.js">numbers.double.js</a>: FAIL
</pre></li>
<li>ES3: 89.9% (133/148)<pre>
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: FAIL: Can't locate object method "typeof" via package "2" (perhaps you forgot to load "2"?) at je-perl-dist/lib/perl5/JE/Code.pm line 973.
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: Can't locate object method "typeof" via package "3" (perhaps you forgot to load "3"?) at je-perl-dist/lib/perl5/JE/Code.pm line 973.
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential(2) failed; zero failed
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: (-6.9e-11).toExponential(4) != '-6.9000e-11' (got: '-6.9e-11')
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: Invalid conversion in sprintf: "%.I" at je-perl-dist/lib/perl5/JE/Object/Number.pm line 374.; Invalid conversion in sprintf: "%.I" at je-perl-dist/lib/perl5/JE/Object/Number.pm line 385.; toExponentia...
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: FAIL: Argument "b" isn't numeric in addition (+) at je-perl-dist/lib/perl5/JE/Number.pm line 93.; Argument "a" isn't numeric in addition (+) at je-perl-dist/lib/perl5/JE/Number.pm line 93.; Argument "test" ...
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $nn 10 captures failed; $nn reverse order failed
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: TIMEOUT: &gt;60s
<a href="../../conformance/es3/global.EvalError.js">global.EvalError.js</a>: ReferenceError: The variable EvalError has not been declared at global.EvalError.js, line 14.
<a href="../../conformance/es3/identifiers.unicode.js">identifiers.unicode.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '� = 1;
<a href="../../conformance/es3/literals.object.decimal.js">literals.object.decimal.js</a>: FAIL: property name 1e2 failed; property name 2.5e1 failed
<a href="../../conformance/es3/literals.object.unicode.js">literals.object.unicode.js</a>: SyntaxError: Expected colon but found '�: 42};
<a href="../../conformance/es3/source.line-terminators.js">source.line-terminators.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '��1;  // r' at source.line-terminators.js, line 13.
<a href="../../conformance/es3/source.whitespace.js">source.whitespace.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '�w = 4;   ' at source.whitespace.js, line 12.
<a href="../../conformance/es3/source.whitespace.unicode.js">source.whitespace.unicode.js</a>: SyntaxError: Expected semicolon, '}' or end of line but found '��x = 1;  ' at source.whitespace.unicode.js, line 8.
</pre></li>
<li>ES5: 9.5% (7/74)</li>
</ul></details>

<details><summary>compat-table: ES6 1%, ES2016+ 5%, Next 6%, Intl 25%</summary><ul>
<li>ES5: 22.2%</li>
<li>ES6: 0.9%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 6.3%</li>
<li>ES2019: 12.5%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 8.3%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 5.3%</li>
<li>Next: 6.1%</li>
<li>Intl: 25%</li>
</ul></details>

<details><summary>test262: 17.5%, main 21.1%, staging 9.7%, annexB 25%, Next 2.2%, Intl 0.1%</summary>
<ul>
<li>Overall: 17.5% (9311/53164)</li>
<li>Excluding staging, annexB, Next and Intl: 21.1% (8708/41237)</li>
<li>Results per edition/feature (note: figure for each feature is across tests for all editions, not just the introducing one):</li>
<li>ES5: 48.4% (3965/8197)<pre>
caller: 78.3% (18/23)
</pre></li>
<li>ES6: 9.9% (1092/11054)<pre>
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
Reflect.construct: 0.3% (2/696)
Reflect.set: 0% (0/46)
Reflect.setPrototypeOf: 0% (0/23)
Set: 0% (0/38)
String.fromCodePoint: 0% (0/22)
String.prototype.endsWith: 11.1% (3/27)
String.prototype.includes: 11.5% (3/26)
Symbol: 0.1% (2/1494)
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
class: 15.7% (750/4768)
computed-property-names: 2.5% (12/478)
const: 6.7% (1/15)
cross-realm: 0% (0/201)
default-parameters: 9.7% (219/2269)
destructuring-assignment: 65.2% (92/141)
destructuring-binding: 7.6% (504/6637)
for-of: 0% (0/5)
generators: 10.6% (433/4085)
let: 5.2% (4/77)
new.target: 24.6% (15/61)
proxy-missing-checks: 0% (0/3)
rest-parameters: 100% (96/96)
super: 15.8% (3/19)
tail-call-optimization: 71.4% (25/35)
template: 0% (0/1)
</pre></li>
<li>ES2016: 19.2% (25/130)<pre>
Array.prototype.includes: 1.4% (1/69)
exponentiation: 13.6% (14/103)
u180e: 44% (11/25)
</pre></li>
<li>ES2017: 18% (137/761)<pre>
__getter__: 0% (0/27)
__setter__: 0% (0/27)
Atomics: 0% (0/376)
Intl.DateTimeFormat-dayPeriod: 0% (0/12)
SharedArrayBuffer: 0% (0/463)
async-functions: 28.8% (203/705)
intl-normative-optional: 0% (0/4)
</pre></li>
<li>ES2018: 12% (583/4855)<pre>
IsHTMLDDA: 0% (0/42)
Promise.prototype.finally: 0% (0/29)
Symbol.asyncIterator: 0% (0/538)
async-iteration: 11.9% (591/4968)
object-rest: 1.1% (4/355)
object-spread: 17.8% (24/135)
regexp-dotall: 0% (0/17)
regexp-lookbehind: 21.1% (4/19)
regexp-named-groups: 51% (51/100)
regexp-unicode-property-escapes: 15.9% (108/681)
</pre></li>
<li>ES2019: 3.6% (5/137)<pre>
Array.prototype.flat: 0% (0/15)
Array.prototype.flatMap: 0% (0/21)
Object.fromEntries: 0% (0/25)
String.prototype.trimEnd: 0% (0/24)
String.prototype.trimStart: 0% (0/23)
Symbol.prototype.description: 0% (0/8)
json-superset: 50% (2/4)
optional-catch-binding: 20% (1/5)
stable-array-sort: 0% (0/4)
stable-typedarray-sort: 0% (0/1)
string-trimming: 3.7% (2/54)
well-formed-json-stringify: 0% (0/1)
</pre></li>
<li>ES2020: 5.4% (117/2156)<pre>
BigInt: 2.6% (39/1501)
Intl.NumberFormat-unified: 0% (0/67)
Intl.RelativeTimeFormat: 0% (0/79)
Promise.allSettled: 0% (0/102)
String.prototype.matchAll: 0% (0/16)
Symbol.matchAll: 0% (0/63)
coalesce-expression: 15.4% (4/26)
dynamic-import: 18.8% (178/946)
export-star-as-namespace-from-module: 21.1% (4/19)
for-in-order: 11.1% (1/9)
globalThis: 5.4% (8/148)
import.meta: 21.7% (5/23)
optional-chaining: 46.4% (26/56)
</pre></li>
<li>ES2021: 12.5% (115/920)<pre>
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
logical-assignment-operators: 7.4% (8/108)
numeric-separator-literal: 67.3% (107/159)
</pre></li>
<li>ES2022: 16.3% (893/5465)<pre>
Array.prototype.at: 0% (0/11)
Intl.DateTimeFormat-extend-timezonename: 0% (0/2)
Intl.DisplayNames-v2: 0% (0/12)
Intl.Segmenter: 0% (0/79)
Object.hasOwn: 3.2% (2/62)
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
regexp-match-indices: 0% (0/31)
top-level-await: 2.2% (6/271)
</pre></li>
<li>ES2023: 7.5% (23/308)<pre>
Intl-enumeration: 0% (0/35)
array-find-from-last: 3.7% (4/109)
change-array-by-copy: 0% (0/132)
hashbang: 65.5% (19/29)
symbols-as-weakmap-keys: 0% (0/29)
</pre></li>
<li>ES2024: 6.2% (52/840)<pre>
Atomics.waitAsync: 0% (0/101)
String.prototype.isWellFormed: 0% (0/8)
String.prototype.toWellFormed: 0% (0/8)
array-grouping: 3.6% (1/28)
arraybuffer-transfer: 0% (0/59)
promise-with-resolvers: 0% (0/9)
regexp-v-flag: 27.3% (51/187)
resizable-arraybuffer: 0% (0/463)
</pre></li>
<li>ES2025: 12.9% (163/1264)<pre>
Float16Array: 0% (0/49)
Intl.DurationFormat: 0% (0/112)
RegExp.escape: 0% (0/21)
import-attributes: 15% (15/100)
iterator-helpers: 0% (0/567)
json-modules: 15.4% (2/13)
promise-try: 0% (0/12)
regexp-modifiers: 64.3% (148/230)
set-methods: 0% (0/192)
</pre></li>
<li>Next: 2.2% (187/8357)<pre>
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
explicit-resource-management: 13.4% (64/477)
immutable-arraybuffer: 0% (0/20)
import-bytes: 0% (0/5)
import-defer: 21.8% (50/229)
import-text: 0% (0/6)
iterator-sequencing: 0% (0/32)
joint-iteration: 0% (0/78)
json-parse-with-source: 0% (0/22)
legacy-regexp: 0% (0/26)
nonextensible-applies-to-private: 0% (0/4)
regexp-duplicate-named-groups: 15.8% (3/19)
source-phase-imports: 30.7% (70/228)
source-phase-imports-module-source: 40.5% (34/84)
uint8array-base64: 0% (0/69)
upsert: 0% (0/72)
</pre></li>
<li>N/A: 22.4% (1954/8720)</li>
</ul>
</details>
