# Starlight

JavaScript engine written in Rust.

* Repository:  https://github.com/Starlight-JS/starlight.git <span class="shields"><img src="https://img.shields.io/github/stars/Starlight-JS/starlight?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/Starlight-JS/starlight?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:         27826 (`cloc crates/starlight*`)
* Language:    Rust
* License:     MPL-2.0
* Standard:    no (can't run ES1)
* Years:       2021
* Features:    PIC
* Interpreter: stack-based VM

Unmaintained old Rust codebase, only builds on x64.

## Conformance

<details><summary>ES1-ES5: 69%</summary><ul>
<li>Based on this repository's basic test suite. <a href="../conformance/results/starlight.txt">Full log</a>.</li>
<li>ES1: 80%<pre>
<a href="../conformance/es1/Array.prototype.reverse.generic.js">Array.prototype.reverse.generic.js</a>: TypeError: not a callable object
<a href="../conformance/es1/Array.prototype.reverse.js">Array.prototype.reverse.js</a>: TypeError: not a callable object
<a href="../conformance/es1/Date.prototype.getTimezoneOffset.js">Date.prototype.getTimezoneOffset.js</a>: TypeError: not a callable object
<a href="../conformance/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../conformance/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: failed
<a href="../conformance/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: TypeError: not a callable object
<a href="../conformance/es1/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../conformance/es1/Function.length.js">Function.length.js</a>: function with 0 params length failed; function with 3 params length failed
<a href="../conformance/es1/Math.atan2.js">Math.atan2.js</a>: failed
<a href="../conformance/es1/Number.MIN_VALUE.js">Number.MIN_VALUE.js</a>: failed
<a href="../conformance/es1/Object.prototype.valueOf.js">Object.prototype.valueOf.js</a>: TypeError: not a callable object
<a href="../conformance/es1/String.fromCharCode.js">String.fromCharCode.js</a>: TypeError: not a callable object
<a href="../conformance/es1/String.length.js">String.length.js</a>: String object length failed
<a href="../conformance/es1/String.prototype.charAt.js">String.prototype.charAt.js</a>: charAt out of bounds failed; charAt negative failed
<a href="../conformance/es1/String.prototype.constructor.js">String.prototype.constructor.js</a>: string instance constructor failed
...
</pre></li>
<li>ES3: 64%<pre>
<a href="../conformance/es3/Array.prototype.concat.js">Array.prototype.concat.js</a>: TypeError: Array.prototype.concat requires array-like arguments
<a href="../conformance/es3/Array.prototype.slice.js">Array.prototype.slice.js</a>: RangeError: Out of memory for array values
<a href="../conformance/es3/Array.prototype.splice.generic.js">Array.prototype.splice.generic.js</a>: TypeError: undefined does not have properties ('call')
<a href="../conformance/es3/Array.prototype.splice.js">Array.prototype.splice.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Array.prototype.toLocaleString.js">Array.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Array.prototype.unshift.generic.js">Array.prototype.unshift.generic.js</a>: TypeError: undefined does not have properties ('call')
<a href="../conformance/es3/Array.prototype.unshift.js">Array.prototype.unshift.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Array.prototype.unshift.returns-new-length.js">Array.prototype.unshift.returns-new-length.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Date.prototype.toDateString.js">Date.prototype.toDateString.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Date.prototype.toLocaleDateString.js">Date.prototype.toLocaleDateString.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Date.prototype.toLocaleString.js">Date.prototype.toLocaleString.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Date.prototype.toLocaleTimeString.js">Date.prototype.toLocaleTimeString.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Error.prototype.toString.js">Error.prototype.toString.js</a>: TypeError: not a callable object at 'Error.prototype.toString.js':'&lt;script&gt;'
<a href="../conformance/es3/Number.prototype.toExponential.edge-cases.js">Number.prototype.toExponential.edge-cases.js</a>: NaN.toExponential(Infinity) throws; Infinity.toExponential(Infinity) throws
<a href="../conformance/es3/Number.prototype.toExponential.js">Number.prototype.toExponential.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Number.prototype.toExponential.rounding.js">Number.prototype.toExponential.rounding.js</a>: TypeError: not a callable object
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: TypeError: 'instanceof' requires constructor
<a href="../conformance/es3/Number.prototype.toFixed.js">Number.prototype.toFixed.js</a>: toFixed(0) failed; toFixed() undefined arg failed; NaN failed; large number precision failed
<a href="../conformance/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: Infinity failed; small number exponential notation failed; large number exponential notation failed
<a href="../conformance/es3/Object.prototype.hasOwnProperty.js">Object.prototype.hasOwnProperty.js</a>: ToString conversion failed
<a href="../conformance/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: TypeError: not a callable object
...
</pre></li>
<li>ES5: 50%<pre>
<a href="../conformance/es5/Array.prototype.every.js">Array.prototype.every.js</a>: Array.prototype.every not a function; TypeError: not a callable object
<a href="../conformance/es5/Array.prototype.filter.js">Array.prototype.filter.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.forEach.js">Array.prototype.forEach.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Array.prototype.indexOf.js">Array.prototype.indexOf.js</a>: negative fromIndex failed
<a href="../conformance/es5/Array.prototype.lastIndexOf.js">Array.prototype.lastIndexOf.js</a>: Array.prototype.lastIndexOf not a function; TypeError: not a callable object
<a href="../conformance/es5/Array.prototype.reduceRight.js">Array.prototype.reduceRight.js</a>: Array.prototype.reduceRight not a function; TypeError: not a callable object
<a href="../conformance/es5/Array.prototype.reduce.js">Array.prototype.reduce.js</a>: sparse array skips missing elements failed
<a href="../conformance/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: date with milliseconds format incorrect; invalid date does not throw RangeError
<a href="../conformance/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: invalid date does not return null
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: argument binding failed; TypeError: null does not have properties
<a href="../conformance/es5/JSON.js">JSON.js</a>: failed: typeof JSON !== 'object'
<a href="../conformance/es5/JSON.parse.js">JSON.parse.js</a>: TypeError: undefined does not have properties ('parse')
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: TypeError: undefined does not have properties ('parse')
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../conformance/es5/JSON.stringify.space.js">JSON.stringify.space.js</a>: TypeError: undefined does not have properties ('stringify')
<a href="../conformance/es5/Object.getOwnPropertyNames.js">Object.getOwnPropertyNames.js</a>: Object.getOwnPropertyNames not a function; TypeError: not a callable object
<a href="../conformance/es5/Object.property-shadowing.js">Object.property-shadowing.js</a>: failed: non-enumerable did not shadow enumerable
<a href="../conformance/es5/debugger.js">debugger.js</a>: Compilation failed: SyntaxError: Compile Error NotYetImpl("NYI: Debugger(DebuggerStmt { span: Span { lo: BytePos(216), hi: BytePos(225), ctxt: #0 } })")
<a href="../conformance/es5/global.Infinity.immutable.js">global.Infinity.immutable.js</a>: Infinity is not a number after assignment; Infinity not positive infinity after assignment
<a href="../conformance/es5/global.NaN.immutable.js">global.NaN.immutable.js</a>: NaN is not a number after assignment; NaN === NaN after assignment
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 28%, ES2016+ 15%, Next 0%, Intl 4%</summary><ul>
<li>ES6: 28%<br>
<li>ES2016: 9%<br>
<li>ES2017: 16%<br>
<li>ES2018: 11%<br>
<li>ES2019: 30%<br>
<li>ES2020: 14%<br>
<li>ES2021: 36%<br>
<li>ES2022: 9%<br>
<li>ES2023: 0%<br>
<li>ES2024: 4%<br>
<li>ES2025: 5%<br>
<li>Next: 0%<br>
<li>Intl: 4%<br>
</ul></details>
