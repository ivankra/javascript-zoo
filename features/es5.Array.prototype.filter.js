// ES5: 15.4.4.20 Array.prototype.filter ( callbackfn [ , thisArg ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// compat-table: ES5 > Array methods (large) > Array.prototype.filter
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.filter === 'function') {
  ok++;
} else {
  console.log("es5.Array.prototype.filter.js: Array.prototype.filter not a function");
}

var arr = [1, 2, 3, 4, 5, 6];
var result = arr.filter(function(x) { return x % 2 === 0; });
if (result.length === 3 && result[0] === 2 && result[1] === 4 && result[2] === 6) {
  ok++;
} else {
  console.log("es5.Array.prototype.filter.js: filter even numbers failed");
}

var arr2 = [1, 2, 3];
var result2 = arr2.filter(function(x) { return x > 5; });
if (result2.length === 0) {
  ok++;
} else {
  console.log("es5.Array.prototype.filter.js: filter no matches failed");
}

var arr3 = [1, , 3, , 5];
var result3 = arr3.filter(function() { return true; });
if (result3.length === 3 && result3[0] === 1 && result3[1] === 3 && result3[2] === 5) {
  ok++;
} else {
  console.log("es5.Array.prototype.filter.js: sparse array skips missing elements failed");
}

if (ok === 4) {
  console.log("es5.Array.prototype.filter.js: OK");
} else {
  console.log("es5.Array.prototype.filter.js: FAIL");
}
