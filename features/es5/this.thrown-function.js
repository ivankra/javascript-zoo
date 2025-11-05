// ES3: 12.14 The try statement
// compat-table: ES5 > Miscellaneous (medium) > Thrown functions have proper "this" values
//
// Tests that thrown functions have correct 'this' binding (not affected by
// catch block scope). In buggy engines, 'var a' might leak to 'this'.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = (function() {
  try {
    throw function() { return !('a' in this); };
  }
  catch(e) {
    var a = true;
    return e();
  }
})();

if (result === true) {
  console.log("es5/this.thrown-function.js: OK");
} else {
  console.log("es5/this.thrown-function.js: failed");
}
