// ES5: 15.3.4.3 Function.prototype.apply (thisArg, argArray)
// compat-table: ES5 > Miscellaneous (medium) > Function.prototype.apply permits array-likes
//
// In ES3, argArray must be either an array or an arguments object.
// ES5 allows argArray to be any generic array-like object with valid length property.
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var threw = false;
var result;
try {
  result = (function(a, b) { return a === 1 && b === 2; }).apply({}, {0: 1, 1: 2, length: 2});
} catch (e) {
  threw = true;
}

if (!threw && result === true) {
  ok++;
} else {
  console.log("es5/Function.prototype.apply.array-like.js: array-like object not accepted");
}

if (ok === 1) {
  console.log("es5/Function.prototype.apply.array-like.js: OK");
} else {
  console.log("es5/Function.prototype.apply.array-like.js: failed");
}
