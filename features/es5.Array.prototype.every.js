// ES5: 15.4.4.16 Array.prototype.every ( callbackfn [ , thisArg ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// compat-table: ES5 > Array methods (large) > Array.prototype.every
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.every === 'function') {
  ok++;
} else {
  console.log("es5.Array.prototype.every.js: Array.prototype.every not a function");
}

var arr = [2, 4, 6, 8];
if (arr.every(function(x) { return x % 2 === 0; }) === true) {
  ok++;
} else {
  console.log("es5.Array.prototype.every.js: all match failed");
}

var arr2 = [2, 4, 5, 8];
if (arr2.every(function(x) { return x % 2 === 0; }) === false) {
  ok++;
} else {
  console.log("es5.Array.prototype.every.js: not all match failed");
}

var arr3 = [];
if (arr3.every(function() { return false; }) === true) {
  ok++;
} else {
  console.log("es5.Array.prototype.every.js: empty array returns true failed");
}

var arr4 = [1, , 3];
if (arr4.every(function(x) { return x < 5; }) === true) {
  ok++;
} else {
  console.log("es5.Array.prototype.every.js: sparse array skips missing elements failed");
}

if (ok === 5) {
  console.log("es5.Array.prototype.every.js: OK");
} else {
  console.log("es5.Array.prototype.every.js: FAIL");
}
