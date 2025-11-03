// ES5: 15.4.4.17 Array.prototype.some ( callbackfn [ , thisArg ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
// compat-table: ES5 > Array methods (large) > Array.prototype.some
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.some === 'function') {
  ok++;
} else {
  console.log("es5.Array.prototype.some.js: Array.prototype.some not a function");
}

var arr = [1, 2, 3, 4];
if (arr.some(function(x) { return x > 3; }) === true) {
  ok++;
} else {
  console.log("es5.Array.prototype.some.js: some match failed");
}

var arr2 = [1, 2, 3, 4];
if (arr2.some(function(x) { return x > 10; }) === false) {
  ok++;
} else {
  console.log("es5.Array.prototype.some.js: none match failed");
}

var arr3 = [];
if (arr3.some(function() { return true; }) === false) {
  ok++;
} else {
  console.log("es5.Array.prototype.some.js: empty array returns false failed");
}

var arr4 = [1, , 3];
if (arr4.some(function(x) { return x > 2; }) === true) {
  ok++;
} else {
  console.log("es5.Array.prototype.some.js: sparse array skips missing elements failed");
}

if (ok === 5) {
  console.log("es5.Array.prototype.some.js: OK");
} else {
  console.log("es5.Array.prototype.some.js: FAIL");
}
