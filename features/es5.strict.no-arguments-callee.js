// ES5: 10.6 Arguments Object
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > arguments.callee is a TypeError
//
// "Arguments objects for strict mode functions define non-configurable
// accessor properties named "caller" and "callee" which throw a TypeError
// exception on access (10.6)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  try {
    arguments.callee;
    return false;
  } catch (e) {
    if (!(e instanceof TypeError)) return false;
  }

  return true;
})();

if (result === true) {
  console.log("es5.strict.no-arguments-callee.js: OK");
} else {
  console.log("es5.strict.no-arguments-callee.js: FAIL");
}
