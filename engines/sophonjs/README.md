# SophonJS

Small footprint embedded ES5 engine.

* Repository:  [gkmail/SophonJS](https://github.com/gkmail/SophonJS.git) <span class="shields"><img src="https://img.shields.io/github/stars/gkmail/SophonJS?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/gkmail/SophonJS?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         [22531](# "cloc src include")
* Language:    C
* License:     BSD-3-Clause
* Standard:    ES5
* Years:       2015
* Interpreter: stack-based VM ([sophon_ins.c](https://github.com/gkmail/SophonJS/blob/master/src/sophon_ins.c))

## Conformance

<details><summary>ES1-ES5: 80%</summary><ul>
<li>ES1: 93%<pre>
<a href="../../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: failed
<a href="../../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: failed
<a href="../../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: failed
<a href="../../conformance/es1/comma.js">comma.js</a>: (m++, m++, m) failed
<a href="../../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: timeout: &gt;10s
<a href="../../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: 3.14 failed; 1e21 failed; 1e-7 failed
<a href="../../conformance/es1/conversions.js">conversions.js</a>: 123 != '0123'; 123.0 != '0123'
<a href="../../conformance/es1/global.isFinite.js">global.isFinite.js</a>: isFinite(0/0) failed
</pre></li>
<li>ES3: 74%, <b>1 crash</b><pre>
<a href="../../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: concat two arrays failed; concat mixed array and non-array failed
<a href="../../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: delete elements failed; delete and insert failed; insert without delete failed; negative start failed; splice on empty array failed
<a href="../../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: Value is not an array
<a href="../../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: failed
<a href="../../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: failed
<a href="../../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: failed
<a href="../../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: max() with NaN failed
<a href="../../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: min() with NaN failed
<a href="../../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: RangeError: Fraction should be in 0 ~ 20
<a href="../../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: timeout: &gt;10s
<a href="../../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: (25).toExponential(0) != '3e+1' (got: '2e1'); (12345).toExponential(3) != '1.235e+4' (got: '1.234e4'); (1.25).toExponential(1) != '1.26e+0' (got: '1.2e0'); (1.255).toExponential(2) != '1.25e+0', got '...
<a href="../../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: RangeError: Fraction should be in 0 ~ 20
<a href="../../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: toFixed(2) failed; negative number failed; large number precision failed; rounding failed
<a href="../../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: timeout: &gt;10s
<a href="../../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '.'.split(/(.?)(.?)/).length !== 4; ''.split(/.?/).length !== 0; '.'.split(/()()/).length !== 1
...
</pre></li>
<li>ES5: 58%<pre>
<a href="../../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es5/Date.now.js">Date.now.js</a>: TypeError: Value is not an clousre
<a href="../../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: invalid date does not throw RangeError
<a href="../../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: invalid date does not return null
<a href="../../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: TypeError: Value is not an array
<a href="../../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: argument binding failed; length property incorrect; bound constructor failed; non-callable does not throw TypeError
<a href="../../conformance/es5/JSON.parse.js">JSON.parse.js</a>: SyntaxError: Parse JSON error
<a href="../../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: Structure is cyclical
<a href="../../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: space parameter failed
<a href="../../conformance/es5/Object.create.js">Object.create.js</a>: TypeError: Value is not an object
<a href="../../conformance/es5/Object.keys.js">Object.keys.js</a>: basic keys failed
<a href="../../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
<a href="../../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: parseInt('010') !== 10; parseInt('0100') !== 100; parseInt('077') !== 77
<a href="../../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: undefined is not undefined after assignment
<a href="../../conformance/es5/literals.object.trailing-comma.js">literals.object.trailing-comma.js</a>: SyntaxError
<a href="../../conformance/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: ReferenceError: Binding has not been defined
<a href="../../conformance/es5/strict.js">strict.js</a>: ReferenceError: Unresolved reference
<a href="../../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: TypeError: "callee" cannot be used in strict mode
<a href="../../conformance/es5/strict.no-arguments-caller.js">strict.no-arguments-caller.js</a>: TypeError: "caller" cannot be used in strict mode
<a href="../../conformance/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: TypeError: Property is not writable; Object is not extensible; Set function is undefined; Cannot reset the function name
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 3%, ES2016+ 3%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 3%, <b>1 crash</b></li>
<li>ES2016: 0%</li>
<li>ES2017: 8%</li>
<li>ES2018: 0%, <b>6 crashes</b></li>
<li>ES2019: 6%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 0%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>

💥 **8 crashes during testing**
