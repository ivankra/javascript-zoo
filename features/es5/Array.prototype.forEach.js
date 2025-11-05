// ES5: 15.4.4.18 Array.prototype.forEach ( callbackfn [ , thisArg ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// compat-table: ES5 > Array methods (large) > Array.prototype.forEach
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.forEach === 'function') {
  ok++;
} else {
  console.log("es5/Array.prototype.forEach.js: Array.prototype.forEach not a function");
}

var sum = 0;
var arr = [1, 2, 3, 4];
arr.forEach(function(x) { sum = sum + x; });
if (sum === 10) {
  ok++;
} else {
  console.log("es5/Array.prototype.forEach.js: forEach execution failed");
}

var count = 0;
var arr2 = [1, 2, 3];
arr2.forEach(function() { count++; });
if (count === 3) {
  ok++;
} else {
  console.log("es5/Array.prototype.forEach.js: forEach count failed");
}

var sparseCount = 0;
var arr3 = [1, , 3];
arr3.forEach(function() { sparseCount++; });
if (sparseCount === 2) {
  ok++;
} else {
  console.log("es5/Array.prototype.forEach.js: sparse array skips missing elements failed");
}

if (ok === 4) {
  console.log("es5/Array.prototype.forEach.js: OK");
} else {
  console.log("es5/Array.prototype.forEach.js: failed");
}
