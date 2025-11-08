// ES5: 15.4.4.22 Array.prototype.reduceRight ( callbackfn [ , initialValue ] )
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight
// compat-table: ES5 > Array methods (large) > Array.prototype.reduceRight
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

if (typeof Array.prototype.reduceRight === 'function') {
  ok++;
} else {
  console.log("es5/Array.prototype.reduceRight.js: Array.prototype.reduceRight not a function");
}

var arr = [1, 2, 3, 4];
var result = arr.reduceRight(function(acc, x) { return acc + x; }, 0);
if (result === 10) {
  ok++;
} else {
  console.log("es5/Array.prototype.reduceRight.js: reduceRight sum failed");
}

var arr2 = ['a', 'b', 'c'];
var str = arr2.reduceRight(function(acc, x) { return acc + x; }, '');
if (str === 'cba') {
  ok++;
} else {
  console.log("es5/Array.prototype.reduceRight.js: reduceRight reverse concat failed");
}

var arr3 = [10, 5];
var noInitial = arr3.reduceRight(function(acc, x) { return acc - x; });
if (noInitial === -5) {
  ok++;
} else {
  console.log("es5/Array.prototype.reduceRight.js: reduceRight without initialValue failed");
}

if (ok === 4) {
  console.log("es5/Array.prototype.reduceRight.js: OK");
} else {
  console.log("es5/Array.prototype.reduceRight.js: failed");
}
