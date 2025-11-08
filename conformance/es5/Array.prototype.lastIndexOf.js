// ES5: 15.4.4.15 Array.prototype.lastIndexOf ( searchElement [ , fromIndex ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
// compat-table: ES5 > Array methods (large) > Array.prototype.lastIndexOf
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.lastIndexOf === 'function') {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: Array.prototype.lastIndexOf not a function");
}

var arr = [1, 2, 3, 2, 1];
if (arr.lastIndexOf(2) === 3) {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: basic lastIndexOf failed");
}

if (arr.lastIndexOf(4) === -1) {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: not found failed");
}

if (arr.lastIndexOf(2, 2) === 1) {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: fromIndex failed");
}

var arr2 = [];
if (arr2.lastIndexOf(1) === -1) {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: empty array failed");
}

var arr3 = [1, 2, 3];
if (arr3.lastIndexOf(2, -10) === -1) {
  ok++;
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: negative fromIndex below zero failed");
}

if (ok === 6) {
  console.log("es5/Array.prototype.lastIndexOf.js: OK");
} else {
  console.log("es5/Array.prototype.lastIndexOf.js: failed");
}
