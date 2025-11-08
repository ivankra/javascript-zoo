// ES5: 15.4.4.19 Array.prototype.map ( callbackfn [ , thisArg ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// compat-table: ES5 > Array methods (large) > Array.prototype.map
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.map === 'function') {
  ok++;
} else {
  console.log("es5/Array.prototype.map.js: Array.prototype.map not a function");
}

var arr = [1, 2, 3];
var result = arr.map(function(x) { return x * 2; });
if (result.length === 3 && result[0] === 2 && result[1] === 4 && result[2] === 6) {
  ok++;
} else {
  console.log("es5/Array.prototype.map.js: map transformation failed");
}

var arr2 = [1, 2, 3];
var result2 = arr2.map(function(x, i) { return x + i; });
if (result2.length === 3 && result2[0] === 1 && result2[1] === 3 && result2[2] === 5) {
  ok++;
} else {
  console.log("es5/Array.prototype.map.js: map with index failed");
}

var arr3 = [];
var result3 = arr3.map(function() { return 1; });
if (result3.length === 0) {
  ok++;
} else {
  console.log("es5/Array.prototype.map.js: empty array failed");
}

if (ok === 4) {
  console.log("es5/Array.prototype.map.js: OK");
} else {
  console.log("es5/Array.prototype.map.js: failed");
}
