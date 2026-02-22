# Continuum

ES6 interpreter written in ES3.

* Homepage:         https://www.npmjs.com/package/continuum
* Repository:       https://github.com/ivankra/continuum.git
  * Fork of [benvie/continuum](https://web.archive.org/web/20150619174908/https://github.com/benvie/continuum) (deleted)
* LOC:              21741 (npm version, `cloc engine`)
* Language:         JavaScript (ES3)
* License:          MIT
* Standard:         ES6 (partial)
* Years:            2012-2014
* Parser:           [Esprima](../../parsers/esprima/README.md)
* Runtime platform: JavaScript
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 68%</summary><ul>
<li>ES1: 84%<pre>
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: failed
<a href="../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: numeric sort failed; string sort failed; sort with comparefn failed; reverse comparefn failed
<a href="../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.setMonth.js">Date.prototype.setMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.setSeconds.js">Date.prototype.setSeconds.js</a>: Uncaught Exception in makeSeconds at line 474 ReferenceError: sec is not initialized $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: Uncaught Exception in makeSeconds at line 474 ReferenceError: sec is not initialized $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es1/Math.ceil.js">Math.ceil.js</a>: failed
<a href="../conformance/es1/Math.cos.js">Math.cos.js</a>: failed
<a href="../conformance/es1/Math.exp.js">Math.exp.js</a>: failed
<a href="../conformance/es1/Math.floor.js">Math.floor.js</a>: failed
<a href="../conformance/es1/Object.js">Object.js</a>: Uncaught Exception in ToObject at line 273 TypeError: undefined is not a constructor $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: indexOf failed
<a href="../conformance/es1/String.prototype.indexOf.js">String.prototype.indexOf.js</a>: indexOf('world') failed; indexOf at start failed; indexOf('o') failed; indexOf with position failed
<a href="../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: lastIndexOf with position failed
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: Uncaught Exception at line 9 TypeError: getYear is not a function $Error {
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: Uncaught Exception at line 9 TypeError: setYear is not a function $Error {
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: Uncaught Exception at line 9 TypeError: toGMTString is not a function $Error {
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: failed
...
</pre></li>
<li>ES3: 52%<pre>
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: multiple elements content failed
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: Uncaught Exception in PutPropertyOrThrow at line 451 TypeError: $$Assert failed $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: Uncaught Exception in ensureArgs at line 512 ReferenceError: $$CallerName is not defined throw $$Exception('apply_wrong_args', [$$CallerName()]); $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: Uncaught Exception in Number#toExponential at line 131 RangeError: Fraction must be a number between 0 and 20 throw $$Exception('invalid_fraction'); $Error { NaN.toExponential(Infinity) throws; Uncaught Exception in Number#toExponential at line 131 RangeError: Fraction must be a number between 0 and
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: toExponential() undefined arg failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: Uncaught Exception in Number#toPrecision at line 153 RangeError: Precision must be a number between 1 and 21 throw $$Exception('invalid_precision'); $Error { &lt;ref *1&gt; $Error { error: undefined, invalid_precision error: undefined,
<a href="../conformance/es3/RegExp.lastIndex.js">RegExp.lastIndex.js</a>: Uncaught Exception at line 16 TypeError: exec is not a function $Error {
<a href="../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: Uncaught Exception at line 9 TypeError: exec is not a function $Error {
<a href="../conformance/es3/RegExp.prototype.test.js">RegExp.prototype.test.js</a>: Uncaught Exception at line 10 TypeError: test is not a function $Error {
<a href="../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: format failed
<a href="../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: a before b failed; b after a failed; equal strings failed; empty strings failed; abc before abd failed
<a href="../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: Uncaught Exception in stringMatch at line 141 ReferenceError: lastIndex is not defined $Error { &lt;ref *1&gt; $Error { error: undefined,
<a href="../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: $1 failed; $1 $2 $3 failed; undefined capture failed; spec example failed; $nn reverse order failed; 4 captures reverse failed
<a href="../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: $$ failed; $&amp; failed; $` failed; $' failed; combined replacements failed
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: regex with capture failed
...
</pre></li>
<li>ES5: 55%<pre>
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: Uncaught Exception in ensureCallback at line 529 ReferenceError: $$CallerName is not defined throw $$Exception('callback_must_be_callable', [$$CallerName()]); $Error { Uncaught Exception in ensureCallback at line 529 ReferenceError: $$CallerName is not defined throw $$Exception('callback_must_be_cal
<a href="../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: arr.sort(undefined) failed; arr2.sort(undefined) failed
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: toISOString does not return ISO format; date with milliseconds format incorrect; invalid date does not throw RangeError
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: toJSON does not return ISO format string
<a href="../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: Uncaught Exception in ensureArgs at line 512 ReferenceError: $$CallerName is not defined throw $$Exception('apply_wrong_args', [$$CallerName()]); $Error { array-like object not accepted
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: length property incorrect; Uncaught Exception in ensureFunction at line 520 ReferenceError: $$CallerName is not defined throw $$Exception('called_on_non_function', [$$CallerName()]); $Error { non-callable does not throw TypeError
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: Uncaught Exception in parse at line 193 TypeError: String 'invalid' is not valid JSON $Error { invalid JSON does not throw SyntaxError; trailing comma does not throw SyntaxError
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: TypeError: holder.get is not a function
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: Uncaught Exception in J at line 44 TypeError: Converting circular structure to JSON throw $$Exception('circular_structure', []); $Error { failed to drop undefined/function values; undefined/function values in array not converted to null; escape sequences failed
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer array failed
<a href="../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: space parameter failed
<a href="../conformance/es5/Object.create.js">Object.create.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.getOwnPropertyDescriptor.js">Object.getOwnPropertyDescriptor.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.keys.js">Object.keys.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/String.prototype.trim.js">String.prototype.trim.js</a>: ' hello '.trim() failed; failed to trim other whitespace characters; '   '.trim() failed
<a href="../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../conformance/es5/literals.object.getters.js">literals.object.getters.js</a>: RangeError: Maximum call stack size exceeded
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 33%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 33%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
