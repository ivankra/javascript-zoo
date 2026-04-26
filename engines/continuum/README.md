# Continuum

ES6 interpreter written in ES3.

* Homepage:         [npmjs.com/package/continuum](https://www.npmjs.com/package/continuum)
* Repository:       [ivankra/continuum](https://github.com/ivankra/continuum.git) (fork of deleted [benvie/continuum](https://web.archive.org/web/20150619174908/https://github.com/benvie/continuum))
* LOC:              [21741](# "cloc engine")
* Language:         JavaScript (ES3)
* License:          MIT
* Standard:         ES6 (partial)
* Years:            2012-2014
* Parser:           [Esprima](../../parsers/esprima/README.md)
* Runtime platform: JavaScript
* Interpreter:      stack-based VM

## Conformance

<details><summary>ES1-ES5: 68%</summary><ul>
<li>Tested version: <a href="https://github.com/ivankra/continuum/commit/9647c7d9c4c7b1ce770ccdd1683597b4319a9e1c">2014-06-25</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/continuum.json">json</a>)</li>
<li>ES1: 83.8% (166/198)<pre>
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL
<a href="../../conformance/es1/Array.prototype.sort.js">Array.prototype.sort.js</a>: FAIL: numeric sort failed; string sort failed; sort with comparefn failed; reverse comparefn failed
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setMonth.js">Date.prototype.setMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setSeconds.js">Date.prototype.setSeconds.js</a>: ReferenceError: sec is not initialized
<a href="../../conformance/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: FAIL
<a href="../../conformance/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: ReferenceError: sec is not initialized
<a href="../../conformance/es1/Math.ceil.js">Math.ceil.js</a>: FAIL
<a href="../../conformance/es1/Math.cos.js">Math.cos.js</a>: FAIL
<a href="../../conformance/es1/Math.exp.js">Math.exp.js</a>: FAIL
<a href="../../conformance/es1/Math.floor.js">Math.floor.js</a>: FAIL
<a href="../../conformance/es1/Object.js">Object.js</a>: TypeError: undefined is not a constructor
<a href="../../conformance/es1/String.generics.js">String.generics.js</a>: FAIL: indexOf failed
<a href="../../conformance/es1/String.prototype.indexOf.js">String.prototype.indexOf.js</a>: FAIL: indexOf('world') failed; indexOf at start failed; indexOf('o') failed; indexOf with position failed
<a href="../../conformance/es1/String.prototype.lastIndexOf.js">String.prototype.lastIndexOf.js</a>: FAIL: lastIndexOf with position failed
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: getYear is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: setYear is not a function
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: toGMTString is not a function
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: FAIL
...
</pre></li>
<li>ES3: 52% (77/148)<pre>
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.shift.js">Array.prototype.shift.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: multiple elements content failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: TypeError: $$Assert failed
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: ReferenceError: $$CallerName is not defined
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: RangeError: Fraction must be a number between 0 and 20
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: toExponential() undefined arg failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RangeError: Precision must be a number between 1 and 21
<a href="../../conformance/es3/RegExp.lastIndex.js">RegExp.lastIndex.js</a>: TypeError: exec is not a function
<a href="../../conformance/es3/RegExp.prototype.exec.js">RegExp.prototype.exec.js</a>: TypeError: exec is not a function
<a href="../../conformance/es3/RegExp.prototype.test.js">RegExp.prototype.test.js</a>: TypeError: test is not a function
<a href="../../conformance/es3/RegExp.prototype.toString.js">RegExp.prototype.toString.js</a>: FAIL: format failed
<a href="../../conformance/es3/String.prototype.localeCompare.js">String.prototype.localeCompare.js</a>: FAIL: a before b failed; b after a failed; equal strings failed; empty strings failed; abc before abd failed
<a href="../../conformance/es3/String.prototype.match.js">String.prototype.match.js</a>: ReferenceError: lastIndex is not defined
<a href="../../conformance/es3/String.prototype.replace.capture.js">String.prototype.replace.capture.js</a>: FAIL: $1 failed; $1 $2 $3 failed; undefined capture failed; spec example failed; $nn reverse order failed; 4 captures reverse failed
<a href="../../conformance/es3/String.prototype.replace.extra.js">String.prototype.replace.extra.js</a>: FAIL: $$ failed; $&amp; failed; $` failed; $' failed; combined replacements failed
...
</pre></li>
<li>ES5: 55.4% (41/74)<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: ReferenceError: $$CallerName is not defined
<a href="../../conformance/es5/Array.prototype.sort.undefined-comparefn.js">Array.prototype.sort.undefined-comparefn.js</a>: FAIL: arr.sort(undefined) failed; arr2.sort(undefined) failed
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL: toISOString does not return ISO format; date with milliseconds format incorrect; invalid date does not throw RangeError
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL: toJSON does not return ISO format string
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: ReferenceError: $$CallerName is not defined
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: ReferenceError: $$CallerName is not defined
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: TypeError: String 'invalid' is not valid JSON
<a href="../../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: TypeError: holder.get is not a function
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: Converting circular structure to JSON
<a href="../../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: FAIL: replacer array failed
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: FAIL: space parameter failed
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.defineProperties.js">Object.defineProperties.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.defineProperty.js">Object.defineProperty.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.getOwnPropertyDescriptor.js">Object.getOwnPropertyDescriptor.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.keys.js">Object.keys.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: FAIL: non-enumerable did not shadow enumerable
<a href="../../conformance/es5/String.prototype.trim.js">String.prototype.trim.js</a>: FAIL: '  hello '.trim() failed; failed to trim other whitespace characters; '   '.trim() failed
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: FAIL: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 33%, ES2016+ 1%, Next 0%, Intl 25%</summary><ul>
<li>Tested version: <a href="https://github.com/ivankra/continuum/commit/9647c7d9c4c7b1ce770ccdd1683597b4319a9e1c">2014-06-25</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/continuum.json">json</a>)</li>
<li>ES5: 73.4%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-undefined.js">Array.prototype.sort.compareFn-undefined.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.unshift.return-count.js">Array.prototype.unshift.return-count.js</a>: TypeError: $$Assert failed
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: RangeError: Fraction must be a number between 0 and 20
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL
<a href="../../conformance/compat-table/es5/literals.getter-accessors.js">literals.getter-accessors.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es5/literals.setter-accessors.js">literals.setter-accessors.js</a>: RangeError: Maximum call stack size exceeded
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: ReferenceError: $$CallerName is not defined
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.parseInt.ignores-leading-zeros.js">misc.parseInt.ignores-leading-zeros.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.arguments-callee-error.js">strict.arguments-callee-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-eval-arguments-error.js">strict.assignment-eval-arguments-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.assignment-non-writable-error.js">strict.assignment-non-writable-error.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
<a href="../../conformance/compat-table/es5/strict.delete-bindings-error.js">strict.delete-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.delete-non-configurable-error.js">strict.delete-non-configurable-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.eval-arguments-bindings-error.js">strict.eval-arguments-bindings-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.legacy-octal-error.js">strict.legacy-octal-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.repeated-params-error.js">strict.repeated-params-error.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.reserved-words.js">strict.reserved-words.js</a>: FAIL
<a href="../../conformance/compat-table/es5/strict.this-not-coerced-accessors.js">strict.this-not-coerced-accessors.js</a>: TypeError: Cannot read properties of undefined (reading 'Get')
...
</pre></li>
<li>ES6: 33.2%</li>
<li>ES2016: 0%</li>
<li>ES2017: 4%</li>
<li>ES2018: 0%</li>
<li>ES2019: 0%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4.2%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
