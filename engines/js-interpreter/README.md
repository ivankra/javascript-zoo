# JS-Interpreter

Sandboxed ES5 interpreter in JavaScript.

* Homepage:         https://neil.fraser.name/software/JS-Interpreter/docs.html
* Repository:       https://github.com/NeilFraser/JS-Interpreter.git <span class="shields"><img src="https://img.shields.io/github/stars/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              4995 (`cloc interpreter.js acorn.js`)
* Language:         JavaScript (ES5)
* License:          Apache-2.0
* Standard:         ES5
* Years:            2013-
* Parser:           [Acorn](../../parsers/acorn/README.md) (vendored and stripped-down to ES5, [acorn.js](https://github.com/NeilFraser/JS-Interpreter/blob/master/acorn.js), LOC: 1365)
* Runtime platform: JavaScript
* Interpreter:      tree walker ([interpreter.js](https://github.com/NeilFraser/JS-Interpreter/blob/master/interpreter.js), LOC: 3689)

## Features

* Feature-complete ES5 implementation along with standard library.
* Iteratively implemented AST tree walker with an explicit stack,
  enabling step-by-step execution, state serialization,
  resuming from saved state.
* Sandboxing features to prevent infinite loops, memory blowouts,
  pathological regular expressions in the interpreted code.
  Doesn't expose browser's DOM.
* Requires ES5 support in the host engine - depends on `Object.create(null)`.

## Conformance

<details><summary>ES1-ES5: 92%</summary><ul>
<li>ES1: 98%<pre>
<a href="../conformance/es1/String.generics.js">String.generics.js</a>: charAt failed; charCodeAt failed; indexOf failed; lastIndexOf failed; split failed; substring failed; toLowerCase failed; toUpperCase failed
<a href="../conformance/es1/arguments.callee.js">arguments.callee.js</a>: [TypeError: arguments.callee is not a function
<a href="../conformance/es1/unary.delete.var.js">unary.delete.var.js</a>: failed
</pre></li>
<li>ES3: 96%<pre>
<a href="../conformance/es3/Number.prototype.toExponential.throws-infinity.js">Number.prototype.toExponential.throws-infinity.js</a>: toExponential(Infinity) does not throw RangeError; toExponential(-Infinity) does not throw RangeError
<a href="../conformance/es3/Object.prototype.toLocaleString.js">Object.prototype.toLocaleString.js</a>: custom toString failed
<a href="../conformance/es3/String.prototype.replace.generic.js">String.prototype.replace.generic.js</a>: object with toString failed; regex with capture failed
<a href="../conformance/es3/String.prototype.split.bugs.js">String.prototype.split.bugs.js</a>: '0'.split(undefined, 0).length !== 0
<a href="../conformance/es3/String.prototype.split.limit.js">String.prototype.split.limit.js</a>: split with limit 0 failed
<a href="../conformance/es3/global.TypeError.thrown.js">global.TypeError.thrown.js</a>: no exception for Function.prototype.toString on non-function
</pre></li>
<li>ES5: 69%<pre>
<a href="../conformance/es5/Array.isArray.js">Array.isArray.js</a>: null not array failed; undefined not array failed
<a href="../conformance/es5/Array.prototype.sort.TypeError.js">Array.prototype.sort.TypeError.js</a>: failed
<a href="../conformance/es5/Function.prototype.bind.js">Function.prototype.bind.js</a>: length property incorrect
<a href="../conformance/es5/JSON.parse.reviver.js">JSON.parse.reviver.js</a>: failed to apply reviver function; failed to delete property for which reviver returned undefined
<a href="../conformance/es5/JSON.stringify.js">JSON.stringify.js</a>: failed to drop undefined/function values; undefined/function values in array not converted to null; didn't call user-provided toJSON() method
<a href="../conformance/es5/JSON.stringify.replacer.js">JSON.stringify.replacer.js</a>: [TypeError: Function replacer on JSON.stringify not supported
<a href="../conformance/es5/Object.freeze.js">Object.freeze.js</a>: Object.freeze not a function; [TypeError: Object.freeze is not a function
<a href="../conformance/es5/Object.isExtensible.js">Object.isExtensible.js</a>: [TypeError: Object.freeze is not a function
<a href="../conformance/es5/Object.isFrozen.js">Object.isFrozen.js</a>: Object.isFrozen not a function; [TypeError: Object.isFrozen is not a function
<a href="../conformance/es5/Object.isSealed.js">Object.isSealed.js</a>: Object.isSealed not a function; [TypeError: Object.isSealed is not a function
<a href="../conformance/es5/Object.seal.js">Object.seal.js</a>: Object.seal not a function; [TypeError: Object.seal is not a function
<a href="../conformance/es5/arguments.toStringTag.js">arguments.toStringTag.js</a>: failed
<a href="../conformance/es5/strict.no-arguments-callee.js">strict.no-arguments-callee.js</a>: failed
<a href="../conformance/es5/strict.no-delete-bindings.js">strict.no-delete-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-delete-non-configurable.js">strict.no-delete-non-configurable.js</a>: failed
<a href="../conformance/es5/strict.no-duplicate-parameters.js">strict.no-duplicate-parameters.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-assignment.js">strict.no-eval-or-arguments-assignment.js</a>: failed
<a href="../conformance/es5/strict.no-eval-or-arguments-bindings.js">strict.no-eval-or-arguments-bindings.js</a>: failed
<a href="../conformance/es5/strict.no-function-caller-or-arguments.js">strict.no-function-caller-or-arguments.js</a>: failed
<a href="../conformance/es5/strict.no-octal-literals.js">strict.no-octal-literals.js</a>: failed
<a href="../conformance/es5/strict.no-with.js">strict.no-with.js</a>: failed
...
</pre></li>
</ul></details>

<details><summary>compat-table: ES6 3%, ES2016+ 4%, Next 0%, Intl 25%</summary><ul>
<li>ES6: 3%</li>
<li>ES2016: 0%</li>
<li>ES2017: 8%</li>
<li>ES2018: 5%</li>
<li>ES2019: 6%</li>
<li>ES2020: 0%</li>
<li>ES2021: 0%</li>
<li>ES2022: 4%</li>
<li>ES2023: 0%</li>
<li>ES2024: 0%</li>
<li>ES2025: 5%</li>
<li>Next: 0%</li>
<li>Intl: 25%</li>
</ul></details>
