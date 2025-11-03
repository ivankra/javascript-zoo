// ES5: 10.4.3 Entering Function Code
// compat-table: ES5 > Strict mode (large) > "this" is undefined in functions
//
// "If this is evaluated within strict mode code, [...]
// this value of null or undefined is not converted to the global object"
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  'use strict';

  if (this !== undefined) {
    console.log("es5.strict.this-undefined-in-function.js: FAIL - outer 'this' is not undefined");
    return false;
  }

  var inner = (function() { return this === undefined; }).call();
  if (!inner) {
    console.log("es5.strict.this-undefined-in-function.js: FAIL - inner 'this' is not undefined");
    return false;
  }

  return true;
})();

if (result) {
  console.log("es5.strict.this-undefined-in-function.js: OK");
}
