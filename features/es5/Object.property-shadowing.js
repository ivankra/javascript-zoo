// ES5: 12.6.4 The for-in Statement
// compat-table: ES5 > Miscellaneous (medium) > Enumerable properties can be shadowed by non-enumerables
//
// ES5 clarifies that prototype properties are not enumerated if shadowed.
// Unspecified in ES3.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var result = true;
Object.prototype.length = 42;
for (var i in Function) {
  if (i === 'length') {
    result = false;
  }
}
delete Object.prototype.length;

if (result) {
  console.log("es5/Object.property-shadowing.js: OK");
} else {
  console.log("es5/Object.property-shadowing.js: failed: non-enumerable did not shadow enumerable");
}
