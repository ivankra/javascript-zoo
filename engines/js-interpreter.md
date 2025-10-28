# JS-Interpreter

Sandboxed ES5 interpreter in JavaScript.

* Homepage:         https://neil.fraser.name/software/JS-Interpreter/docs.html
* Repository:       https://github.com/NeilFraser/JS-Interpreter.git <span class="shields"><img src="https://img.shields.io/github/stars/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Stars" title="Stars"><img src="https://img.shields.io/github/last-commit/NeilFraser/JS-Interpreter?label=&style=flat-square" alt="Last commit" title="Last commit"></span>
* LOC:              4995 (`cloc interpreter.js acorn.js`)
* Language:         JavaScript (ES5)
* License:          Apache-2.0
* Standard:         ES5
* Years:            2013-
* Parser:           [Acorn](../parsers/acorn.md) (vendored and stripped-down to ES5, [acorn.js](https://github.com/NeilFraser/JS-Interpreter/blob/master/acorn.js), LOC: 1365)
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
