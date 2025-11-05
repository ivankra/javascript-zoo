// ES5: 11.4.1 The delete Operator
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > deleting non-configurable properties is a TypeError
//
// "When a delete operator occurs within strict mode code, a
// TypeError is thrown if the property to be deleted has the attribute {
// [[Configurable]]:false } (11.4.1)."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  try {
    delete Object.prototype;
    return false;
  } catch (e) {
    return e instanceof TypeError;
  }
})();

if (result === true) {
  console.log("es5/strict.no-delete-non-configurable.js: OK");
} else {
  console.log("es5/strict.no-delete-non-configurable.js: failed");
}
