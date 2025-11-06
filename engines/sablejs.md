# sablejs

Closed-source bytecode-based sandboxed ES5 interpreter in JavaScript.

* Repository:       https://github.com/sablejs/sablejs.git <span class="shields"><img src="https://img.shields.io/github/stars/sablejs/sablejs?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/sablejs/sablejs?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* Language:         JavaScript
* License:          Custom
* Standard:         ES5
* Years:            2020-2022
* Parser:           [Acorn](../parsers/acorn.md)
* Runtime platform: JavaScript
* Interpreter:      stack-based VM

## Features

Fairly complete ES5 implementation, but **closed-source**:
* [sablejs-\<os\>-\<arch\>](https://github.com/sablejs/sablejs/releases/tag/v1.1.0):
  AOT bytecode compiler, ~40MiB Node-based binary
* [runtime.js](https://raw.githubusercontent.com/sablejs/sablejs/refs/heads/master/runtime.js):
  minified JavaScript blob with runtime VM, ~216K

Primary use case is JavaScript obfuscation. Developed for a captcha product.

Optimizations: constant-folding in compiler, function inlining/macro-expansions,
inline caching.

## Links

* https://www.infoq.cn/article/rdm3z4k0q8hkofsxshcm

## Conformance

<details><summary>ES1-ES5: 90%</summary><ul>
<li>ES1: 92%<pre>
<a href="../features/es1/Array.js">Array.js</a>: Array.length failed
<a href="../features/es1/Date.prototype.getUTCDate.js">Date.prototype.getUTCDate.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCDay.js">Date.prototype.getUTCDay.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCFullYear.js">Date.prototype.getUTCFullYear.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCHours.js">Date.prototype.getUTCHours.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMilliseconds.js">Date.prototype.getUTCMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMinutes.js">Date.prototype.getUTCMinutes.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCMonth.js">Date.prototype.getUTCMonth.js</a>: failed
<a href="../features/es1/Date.prototype.getUTCSeconds.js">Date.prototype.getUTCSeconds.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCDate.js">Date.prototype.setUTCDate.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCHours.js">Date.prototype.setUTCHours.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMilliseconds.js">Date.prototype.setUTCMilliseconds.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMinutes.js">Date.prototype.setUTCMinutes.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCMonth.js">Date.prototype.setUTCMonth.js</a>: failed
<a href="../features/es1/Date.prototype.setUTCSeconds.js">Date.prototype.setUTCSeconds.js</a>: failed
<a href="../features/es1/eval.js">eval.js</a>: SyntaxError: dynamic expression isn't supported at eval and Function
</pre></li>
<li>ES3: 95%<pre>
<a href="../features/es3/Array.prototype.slice.generic.js">Array.prototype.slice.generic.js</a>: slice object with start and end failed; slice object with start only failed; slice object with negative start failed
<a href="../features/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: RangeError: toExponential() argument must be between 0 and 100
<a href="../features/es3/Number.prototype.toPrecision.js">Number.prototype.toPrecision.js</a>: RangeError: toPrecision() argument must be between 1 and 100
<a href="../features/es3/Object.prototype.isPrototypeOf.js">Object.prototype.isPrototypeOf.js</a>: TypeError: cannot convert null to object
<a href="../features/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../features/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0
<a href="../features/es3/global.SyntaxError.thrown.js">global.SyntaxError.thrown.js</a>: [ERROR] compile failed: SyntaxError: Unexpected token (1:8)
<a href="../features/es3/labelled.break.js">labelled.break.js</a>: timeout
</pre></li>
<li>ES5: 78%<pre>
<a href="../features/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../features/es5/Date.prototype.toISOString.js">Date.prototype.toISOString.js</a>: RangeError: Invalid time value
<a href="../features/es5/Date.prototype.toJSON.js">Date.prototype.toJSON.js</a>: invalid date does not return null; toJSON does not return ISO format string
<a href="../features/es5/JSON.parse.js">JSON.parse.js</a>: parse null failed
<a href="../features/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../features/es5/JSON.stringify.js">JSON.stringify.js</a>: TypeError: Converting circular structure to JSON
<a href="../features/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: replacer array failed
<a href="../features/es5/strict.eval-cannot-create-bindings.js">strict.eval-cannot-create-bindings.js</a>: failed
<a href="../features/es5/strict.no-assignment-to-non-writable.js">strict.no-assignment-to-non-writable.js</a>: failed
<a href="../features/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: [ERROR] compile failed: SyntaxError: Deleting local variable in strict mode (1:20)
<a href="../features/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: [ERROR] compile failed: SyntaxError: Argument name clash (1:27)
<a href="../features/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: [ERROR] compile failed: SyntaxError: Assigning to eval in strict mode (1:13)
<a href="../features/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: [ERROR] compile failed: SyntaxError: Binding eval in strict mode (1:17)
<a href="../features/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../features/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: [ERROR] compile failed: SyntaxError: Invalid number (1:13)
<a href="../features/es5/strict.no-with.js">strict.no-with.js</a>: [ERROR] compile failed: SyntaxError: 'with' in strict mode (1:13)
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 3%, ES2016+ 3%, Intl 25%</summary><ul>
<li>ES6: 3%<br>
<li>ES2016: 0%<br>
<li>ES2017: 4%<br>
<li>ES2018: 0%<br>
<li>ES2019: 6%<br>
<li>ES2020: 0%<br>
<li>ES2021: 0%<br>
<li>ES2022: 9%<br>
<li>ES2023: 0%<br>
<li>ES2024: 4%<br>
<li>ES2025: 0%<br>
<li>Intl: 25%<br>
</ul></details>
