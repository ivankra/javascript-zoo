// ES5: 15.4.4.14 Array.prototype.indexOf ( searchElement [ , fromIndex ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
// compat-table: ES5 > Array methods (large) > Array.prototype.indexOf
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.indexOf === 'function') {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: Array.prototype.indexOf not a function");
}

var arr = [1, 2, 3, 2, 1];
if (arr.indexOf(2) === 1) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: basic indexOf failed");
}

if (arr.indexOf(4) === -1) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: not found failed");
}

if (arr.indexOf(2, 2) === 3) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: fromIndex failed");
}

if (arr.indexOf(1, -2) === 4) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: negative fromIndex failed");
}

var arr2 = [];
if (arr2.indexOf(1) === -1) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: empty array failed");
}

var arr3 = [1, 2, 3];
if (arr3.indexOf(2, 10) === -1) {
  ok++;
} else {
  console.log("es5.Array.prototype.indexOf.js: fromIndex >= length failed");
}

if (ok === 7) {
  console.log("es5.Array.prototype.indexOf.js: OK");
} else {
  console.log("es5.Array.prototype.indexOf.js: FAIL");
}
