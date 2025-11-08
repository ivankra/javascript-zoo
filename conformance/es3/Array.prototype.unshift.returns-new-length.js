// ES3: 15.4.4.13 Array.prototype.unshift ( [ item1 [ , item2 [ , … ] ] ] )
// compat-table: ES5 > Array methods (large) > Array.prototype.unshift: [].unshift(0) returns the unshifted count
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var result1 = [].unshift(0);
if (result1 === 1) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.returns-new-length.js: empty array unshift failed");
}

var arr = [1, 2];
var result2 = arr.unshift(3, 4);
if (result2 === 4 && arr.length === 4) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.returns-new-length.js: multiple elements unshift failed");
}

var arr2 = [5];
var result3 = arr2.unshift();
if (result3 === 1 && arr2.length === 1) {
  ok++;
} else {
  console.log("es3/Array.prototype.unshift.returns-new-length.js: no arguments unshift failed");
}

if (ok === 3) {
  console.log("es3/Array.prototype.unshift.returns-new-length.js: OK");
} else {
  console.log("es3/Array.prototype.unshift.returns-new-length.js: failed");
}
