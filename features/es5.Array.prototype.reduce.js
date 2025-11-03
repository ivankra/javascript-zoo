// ES5: 15.4.4.21 Array.prototype.reduce ( callbackfn [ , initialValue ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
// compat-table: ES5 > Array methods (large) > Array.prototype.reduce
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.reduce === 'function') {
  ok++;
} else {
  console.log("es5.Array.prototype.reduce.js: Array.prototype.reduce not a function");
}

var arr = [1, 2, 3, 4];
var sum = arr.reduce(function(acc, x) { return acc + x; }, 0);
if (sum === 10) {
  ok++;
} else {
  console.log("es5.Array.prototype.reduce.js: reduce sum failed");
}

var arr2 = [1, 2, 3, 4];
var product = arr2.reduce(function(acc, x) { return acc * x; }, 1);
if (product === 24) {
  ok++;
} else {
  console.log("es5.Array.prototype.reduce.js: reduce product failed");
}

var arr3 = [5, 10];
var noInitial = arr3.reduce(function(acc, x) { return acc + x; });
if (noInitial === 15) {
  ok++;
} else {
  console.log("es5.Array.prototype.reduce.js: reduce without initialValue failed");
}

var arr4 = [1, , 3];
var sparse = arr4.reduce(function(acc, x) { return acc + x; }, 0);
if (sparse === 4) {
  ok++;
} else {
  console.log("es5.Array.prototype.reduce.js: sparse array skips missing elements failed");
}

if (ok === 5) {
  console.log("es5.Array.prototype.reduce.js: OK");
} else {
  console.log("es5.Array.prototype.reduce.js: FAIL");
}
