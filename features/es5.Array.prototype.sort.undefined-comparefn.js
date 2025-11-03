// ES5: 15.4.4.11 Array.prototype.sort (comparefn)
// compat-table: ES5 > Array methods (large) > Array.prototype.sort: compareFn may be explicit undefined
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;

var arr = [2, 1];
var result = arr.sort(undefined);
if (result === arr && arr[0] === 1 && arr[1] === 2) {
  ok++;
} else {
  console.log("es5.Array.prototype.sort.undefined-comparefn.js: arr.sort(undefined) failed");
}

var arr2 = [3, 1, 2];
arr2.sort(undefined);
if (arr2[0] === 1 && arr2[1] === 2 && arr2[2] === 3) {
  ok++;
} else {
  console.log("es5.Array.prototype.sort.undefined-comparefn.js: arr2.sort(undefined) failed");
}

if (ok === 2) {
  console.log("es5.Array.prototype.sort.undefined-comparefn.js: OK");
} else {
  console.log("es5.Array.prototype.sort.undefined-comparefn.js: FAIL");
}
