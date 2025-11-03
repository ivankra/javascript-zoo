// ES5: 15.4.4.11 Array.prototype.sort (comparefn)
// compat-table: ES5 > Array methods (large) > Array.prototype.sort: compareFn must be function or undefined
//
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

var ok = 0;
var arr = [1, 2];

try {
  arr.sort(null);
} catch (e) {
  if (e.name == 'TypeError') ok++;
}

try {
  arr.sort(true);
} catch (e) {
  if (e.name == 'TypeError') ok++;
}

try {
  arr.sort({});
} catch (e) {
  if (e.name == 'TypeError') ok++;
}

try {
  arr.sort([]);
} catch (e) {
  if (e.name == 'TypeError') ok++;
}

try {
  arr.sort(/a/g);
} catch (e) {
  if (e.name == 'TypeError') ok++;
}

if (ok === 5) {
  console.log("es5.Array.prototype.sort.TypeError.js: OK");
} else {
  console.log("es5.Array.prototype.sort.TypeError.js: FAIL");
}
