// ES5: 8.7.2 PutValue
// ES5: Annex C The Strict Mode of ECMAScript
// compat-table: ES5 > Strict mode (large) > assignment to unresolvable identifiers is a ReferenceError
//
// "When an assignment occurs within strict mode code, its LeftHandSide
// must not evaluate to an unresolvable reference. If it does a
// ReferenceError exception is thrown upon assignment."
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  try {
    eval('myTestVar = 1');
    return false;
  } catch (e) {
    return e instanceof ReferenceError;
  }
})();

if (result === true) {
  console.log("es5.strict.no-assignment-to-unresolvable.js: OK");
} else {
  console.log("es5.strict.no-assignment-to-unresolvable.js: FAIL");
}
