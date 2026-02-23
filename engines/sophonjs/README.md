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

<details><summary>ES1-ES5: 84%</summary><ul>
<li>ES1: 93%<pre>
<a href="../conformance/es1/Array.prototype.join.generic.js">Array.prototype.join.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es1/Array.prototype.sort.generic.js">Array.prototype.sort.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es1/annex-b.Date.prototype.getYear.js">annex-b.Date.prototype.getYear.js</a>: exception TypeError:Value is not an clousre
<a href="../conformance/es1/annex-b.Date.prototype.setYear.js">annex-b.Date.prototype.setYear.js</a>: exception TypeError:Value is not an clousre
<a href="../conformance/es1/annex-b.Date.prototype.toGMTString.js">annex-b.Date.prototype.toGMTString.js</a>: exception TypeError:Value is not an clousre
<a href="../conformance/es1/annex-b.global.escape.js">annex-b.global.escape.js</a>: LOG: es1/annex-b.global.escape.js: failed
<a href="../conformance/es1/annex-b.global.unescape.js">annex-b.global.unescape.js</a>: LOG: es1/annex-b.global.unescape.js: failed
<a href="../conformance/es1/annex-b.literals.string.octal.js">annex-b.literals.string.octal.js</a>: LOG: es1/annex-b.literals.string.octal.js: failed
<a href="../conformance/es1/comma.js">comma.js</a>: LOG: es1/comma.js: (m++, m++, m) failed LOG: es1/comma.js: failed
<a href="../conformance/es1/conversions.ToNumber.js">conversions.ToNumber.js</a>: timeout
<a href="../conformance/es1/conversions.ToString.js">conversions.ToString.js</a>: LOG: es1/conversions.ToString.js: 3.14 failed LOG: es1/conversions.ToString.js: 1e21 failed LOG: es1/conversions.ToString.js: 1e-7 failed LOG: es1/conversions.ToString.js: failed
<a href="../conformance/es1/conversions.js">conversions.js</a>: LOG: es1/conversions.js: 123 != '0123' LOG: es1/conversions.js: 123.0 != '0123' LOG: es1/conversions.js: failed
<a href="../conformance/es1/global.isFinite.js">global.isFinite.js</a>: LOG: es1/global.isFinite.js: isFinite(0/0) failed LOG: es1/global.isFinite.js: failed
</pre></li>
<li>ES3: 77%, <b>1 crash</b><pre>
<a href="../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: LOG: es3/Array.prototype.concat.js: concat two arrays failed LOG: es3/Array.prototype.concat.js: concat mixed array and non-array failed LOG: es3/Array.prototype.concat.js: failed
<a href="../conformance/es3/Array.prototype.pop.generic.js">Array.prototype.pop.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Array.prototype.push.generic.js">Array.prototype.push.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Array.prototype.shift.generic.js">Array.prototype.shift.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: LOG: es3/Array.prototype.splice.js: delete elements failed LOG: es3/Array.prototype.splice.js: delete and insert failed LOG: es3/Array.prototype.splice.js: insert without delete failed LOG: es3/Array.prototype.splice.js: negative start failed LOG: es3/Array.prototype.splice.js: splice on empty array
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: exception TypeError:Value is not an array
<a href="../conformance/es3/Error.prototype.constructor.js">Error.prototype.constructor.js</a>: LOG: es3/Error.prototype.constructor.js: failed
<a href="../conformance/es3/Error.prototype.message.js">Error.prototype.message.js</a>: LOG: es3/Error.prototype.message.js: failed
<a href="../conformance/es3/Error.prototype.name.js">Error.prototype.name.js</a>: LOG: es3/Error.prototype.name.js: failed
<a href="../conformance/es3/Math.max.variadic.js">Math.max.variadic.js</a>: LOG: es3/Math.max.variadic.js: max() with NaN failed LOG: es3/Math.max.variadic.js: failed
<a href="../conformance/es3/Math.min.variadic.js">Math.min.variadic.js</a>: LOG: es3/Math.min.variadic.js: min() with NaN failed LOG: es3/Math.min.variadic.js: failed
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: exception RangeError:Fraction should be in 0 ~ 20 LOG: es3/Number.prototype.toExponential.edge-cases.js: NaN.toExponential(Infinity) throws exception RangeError:Fraction should be in 0 ~ 20 LOG: es3/Number.prototype.toExponential.edge-cases.js: Infinity.toExponential(Infinity) throws LOG: es3/Number
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: LOG: es3/Number.prototype.toExponential.js: toExponential(2) failed LOG: es3/Number.prototype.toExponential.js: negative number failed
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: LOG: es3/Number.prototype.toExponential.rounding.js: (25).toExponential(0) != '3e+1' (got: '2e1') LOG: es3/Number.prototype.toExponential.rounding.js: (12345).toExponential(3) != '1.235e+4' (got: '1.234e4') LOG: es3/Number.prototype.toExponential.rounding.js: (1.25).toExponential(1) != '1.26e+0' (go
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: LOG: es3/Number.prototype.toFixed.js: toFixed(2) failed LOG: es3/Number.prototype.toFixed.js: negative number failed LOG: es3/Number.prototype.toFixed.js: large number precision failed LOG: es3/Number.prototype.toFixed.js: rounding failed LOG: es3/Number.prototype.toFixed.js: failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: LOG: es3/Number.prototype.toPrecision.js: toPrecision(5) fixed notation failed LOG: es3/Number.prototype.toPrecision.js: toPrecision() undefined arg failed
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: exception TypeError:Value is not an clousre
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: LOG: es3/String.prototype.split.bugs.js: '.'.split(/(.?)(.?)/).length !== 4 LOG: es3/String.prototype.split.bugs.js: ''.split(/.?/).length !== 0 LOG: es3/String.prototype.split.bugs.js: '.'.split(/()()/).length !== 1 LOG: es3/String.prototype.split.bugs.js: failed
<a href="../conformance/es3/String.prototype.split.regex.js">String.prototype.split.regex.js</a>: LOG: es3/String.prototype.split.regex.js: split with capturing group failed LOG: es3/String.prototype.split.regex.js: failed
...
</pre></li>
<li>ES5: 74%<pre>
<a href="../conformance/es5/Date.now.js">Date.now.js</a>: LOG: es5/Date.now.js: Date.now not a function exception TypeError:Value is not an clousre
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: LOG: es5/Date.prototype.toISOString.js: invalid date does not throw RangeError LOG: es5/Date.prototype.toISOString.js: failed
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: LOG: es5/Date.prototype.toJSON.js: invalid date does not return null LOG: es5/Date.prototype.toJSON.js: failed
<a href="../conformance/es5/Function.prototype.apply.array-like.js">Function.prototype.apply.array-like.js</a>: exception TypeError:Value is not an array LOG: es5/Function.prototype.apply.array-like.js: array-like object not accepted LOG: es5/Function.prototype.apply.array-like.js: failed
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: LOG: es5/Function.prototype.bind.js: argument binding failed LOG: es5/Function.prototype.bind.js: length property incorrect LOG: es5/Function.prototype.bind.js: bound constructor failed LOG: es5/Function.prototype.bind.js: non-callable does not throw TypeError LOG: es5/Function.prototype.bind.js: fa
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: exception SyntaxError:Parse JSON error
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: exception TypeError:Structure is cyclical LOG: es5/JSON.stringify.js: failed to drop undefined/function values LOG: es5/JSON.stringify.js: undefined/function values in array not converted to null LOG: es5/JSON.stringify.js: control char escape failed LOG: es5/JSON.stringify.js: undefined should retu
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: LOG: es5/JSON.stringify.replacer.js: replacer function failed LOG: es5/JSON.stringify.replacer.js: failed
<a href="../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: LOG: es5/JSON.stringify.space.js: space parameter failed LOG: es5/JSON.stringify.space.js: failed
<a href="../conformance/es5/Object.create.js">Object.create.js</a>: exception TypeError:Value is not an object
<a href="../conformance/es5/Object.keys.js">Object.keys.js</a>: LOG: es5/Object.keys.js: basic keys failed LOG: es5/Object.keys.js: failed
<a href="../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: LOG: es5/global.Infinity.immutable.js: Infinity is not a number after assignment LOG: es5/global.Infinity.immutable.js: Infinity not positive infinity after assignment LOG: es5/global.Infinity.immutable.js: failed
<a href="../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: LOG: es5/global.NaN.immutable.js: NaN is not a number after assignment LOG: es5/global.NaN.immutable.js: NaN === NaN after assignment LOG: es5/global.NaN.immutable.js: failed
<a href="../conformance/es5/global.parseInt.no-octal.js">global.parseInt.no-octal.js</a>: LOG: es5/global.parseInt.no-octal.js: parseInt('010') !== 10 LOG: es5/global.parseInt.no-octal.js: parseInt('0100') !== 100 LOG: es5/global.parseInt.no-octal.js: parseInt('077') !== 77 LOG: es5/global.parseInt.no-octal.js: failed
<a href="../conformance/es5/global.undefined.immutable.js">global.undefined.immutable.js</a>: LOG: es5/global.undefined.immutable.js: undefined is not undefined after assignment LOG: es5/global.undefined.immutable.js: failed
<a href="../conformance/es5/literals.object.trailing-comma.js">literals.object.trailing-comma.js</a>: Error: 9.21: parse error, unexpected '}', expect "if" Error: 16.24: parse error, unexpected '}', expect "if" Error: 23.24: parse error, unexpected '}', expect "if" exception SyntaxError:Syntax error
<a href="../conformance/es5/strict.js">strict.js</a>: exception ReferenceError:Unresolved reference LOG: es5/strict.js: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: exception SyntaxError:Cannot delete binding in strict mode LOG: es5/strict.no-delete-bindings.js: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: Error: 1.5-8: "eval" cannot be a variant name Error: 1.9: parse error, unexpected ';', expect '=' exception SyntaxError:Syntax error Error: 1.5-13: "arguments" cannot be a variant name Error: 1.14: parse error, unexpected ';', expect '=' exception SyntaxError:Syntax error Error: 1.11-14: "eval" cann
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
