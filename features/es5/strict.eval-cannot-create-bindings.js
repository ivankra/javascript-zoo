// ES5: 10.4.2.1 Strict Mode Restrictions
// ES5: Annex C The Strict Mode of ECMAScript
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > eval() can't create bindings
//
// "Strict mode eval code cannot instantiate variables or functions in
// the variable environment of the caller to eval. Instead, a new variable
// environment is created and that environment is used for declaration
// binding instantiation for the eval code (10.4.2)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  try {
    eval('var myTestVar;');
    myTestVar;
    return false;
  } catch (e) {
    return e instanceof ReferenceError;
  }
})();

if (result === true) {
  console.log("es5/strict.eval-cannot-create-bindings.js: OK");
} else {
  console.log("es5/strict.eval-cannot-create-bindings.js: failed");
}
