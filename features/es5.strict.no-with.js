// ES5: 12.10.1 Strict Mode Restrictions
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > "with" is a SyntaxError
//
// "Strict mode code may not include a WithStatement. The occurrence of a
// WithStatement in such a context is an SyntaxError (12.10)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  try {
    eval('with({}){}');
    return false;
  } catch (e) {
    return e instanceof SyntaxError;
  }
})();

if (result === true) {
  console.log("es5.strict.no-with.js: OK");
} else {
  console.log("es5.strict.no-with.js: FAIL");
}
