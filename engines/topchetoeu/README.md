# topchetoeu

Unfinished ES5 interpreter written in Java.

* Repository:       [git.topcheto.eu/topchetoeu/j2s](https://git.topcheto.eu/topchetoeu/j2s)
* GitHub:           [TopchetoEU/jscript](https://github.com/TopchetoEU/jscript.git) <span class="shields"><img src="https://img.shields.io/github/stars/TopchetoEU/jscript?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/TopchetoEU/jscript?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              [15692](# "cloc --not_match_d='(test)' */src")
* Language:         Java
* License:          MIT
* Standard:         ES5 (partial)
* Years:            2023-2025
* Runtime platform: Java

## Conformance

<details><summary>ES1-ES5: 52%</summary><ul>
<li>Tested version: <a href="https://github.com/ivankra/topchetoeu/commit/139b240463dc485fd0744663272c4c4066801311">2026-02-01</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/es1-5/topchetoeu.json">json</a>)</li>
<li>ES1: 53% (105/198)<pre>
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: FAIL: java.lang.ClassCastException: class me.topchetoeu.j2s.runtime.values.objects.ObjectValue cannot be cast to class me.topchetoeu.j2s.runtime.values.objects.ArrayValue (me.topchetoeu.j2s.runtime.values.o...
<a href="../../conformance/es1/Array.prototype.toString.js">Array.prototype.toString.js</a>: FAIL: numeric array toString failed; string array toString failed; empty array toString failed
<a href="../../conformance/es1/Date.diff.js">Date.diff.js</a>: FAIL
<a href="../../conformance/es1/Date.js">Date.js</a>: FAIL: Function cannot be applied
<a href="../../conformance/es1/Date.prototype.getDate.js">Date.prototype.getDate.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getDay.js">Date.prototype.getDay.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getFullYear.js">Date.prototype.getFullYear.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getHours.js">Date.prototype.getHours.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMilliseconds.js">Date.prototype.getMilliseconds.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMinutes.js">Date.prototype.getMinutes.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getMonth.js">Date.prototype.getMonth.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getSeconds.js">Date.prototype.getSeconds.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getTime.js">Date.prototype.getTime.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: FAIL: Value is not a function
<a href="../../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: FAIL: Value is not a function
...
</pre></li>
<li>ES3: 54.7% (81/148)<pre>
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: FAIL: push to object failed; push multiple to empty object failed
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: FAIL: insert on object failed
<a href="../../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: FAIL: unshift on object failed; unshift multiple on object failed; unshift on empty object failed
<a href="../../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Date.prototype.toTimeString.js">Date.prototype.toTimeString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Function.prototype.apply.js">Function.prototype.apply.js</a>: FAIL: java.lang.ClassCastException: class me.topchetoeu.j2s.runtime.values.primitives.VoidValue cannot be cast to class me.topchetoeu.j2s.runtime.values.objects.ArrayLikeValue (me.topchetoeu.j2s.runtime.val...
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: FAIL: isNaN is not defined
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: FAIL: isNaN is not defined
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: FAIL: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: FAIL: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Number.prototype.toLocaleString.js">Number.prototype.toLocaleString.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: FAIL: Value is not a function
<a href="../../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: FAIL: Value is not a function
...
</pre></li>
<li>ES5: 45.9% (34/74)</li>
</ul></details>

<details><summary>compat-table: ES6 17%, ES2016+ 6%, Next 0%, Intl 0%</summary><ul>
<li>Tested version: <a href="https://github.com/ivankra/topchetoeu/commit/139b240463dc485fd0744663272c4c4066801311">2026-02-01</a> (<a href="https://github.com/ivankra/javascript-zoo-data/blob/data/compat-table/topchetoeu.json">json</a>)</li>
<li>ES5: 69%<pre>
<a href="../../conformance/compat-table/es5/Array.prototype.reduceRight.js">Array.prototype.reduceRight.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Array.prototype.sort.compareFn-type.js">Array.prototype.sort.compareFn-type.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.no-throw-edge-cases.js">Number.prototype.toExponential.no-throw-edge-cases.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Number.prototype.toExponential.rounds-properly.js">Number.prototype.toExponential.rounds-properly.js</a>: FAIL: Value is not a function
<a href="../../conformance/compat-table/es5/Object.isExtensible.js">Object.isExtensible.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isFrozen.js">Object.isFrozen.js</a>: FAIL
<a href="../../conformance/compat-table/es5/Object.isSealed.js">Object.isSealed.js</a>: FAIL
<a href="../../conformance/compat-table/es5/String.prototype.split.js">String.prototype.split.js</a>: FAIL
<a href="../../conformance/compat-table/es5/annex-b.String.prototype.substr.js">annex-b.String.prototype.substr.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.Infinity.js">immutable-globals.Infinity.js</a>: FAIL
<a href="../../conformance/compat-table/es5/immutable-globals.NaN.js">immutable-globals.NaN.js</a>: FAIL: Value is not a function
<a href="../../conformance/compat-table/es5/immutable-globals.undefined.js">immutable-globals.undefined.js</a>: FAIL: Couldn't set variable undefined
<a href="../../conformance/compat-table/es5/misc.Arguments.toStringTag.js">misc.Arguments.toStringTag.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.Function.apply.array-likes.js">misc.Function.apply.array-likes.js</a>: FAIL: java.lang.ClassCastException: class me.topchetoeu.j2s.runtime.values.objects.ObjectValue cannot be cast to class me.topchetoeu.j2s.runtime.values.objects.ArrayLikeValue (me.topchetoeu.j2s.runtime.valu...
<a href="../../conformance/compat-table/es5/misc.Function.prototype.non-enumerable.js">misc.Function.prototype.non-enumerable.js</a>: FAIL: Value is not a function
<a href="../../conformance/compat-table/es5/misc.enumerable-shadow.js">misc.enumerable-shadow.js</a>: FAIL
<a href="../../conformance/compat-table/es5/misc.thrown-functions-this.js">misc.thrown-functions-this.js</a>: FAIL: Cannot read properties of undefined (reading 'a')
<a href="../../conformance/compat-table/es5/misc.zero-width-identifiers.js">misc.zero-width-identifiers.js</a>: FAIL: Expected a comma or end of statement
...
</pre></li>
<li>ES6: 17.3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 12%</li>
<li>ES2018: 5.3%</li>
<li>ES2019: 16.7%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 7.1%</li>
<li>ES2023: 0%</li>
<li>ES2024: 4.1%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 0%</li>
</ul></details>
