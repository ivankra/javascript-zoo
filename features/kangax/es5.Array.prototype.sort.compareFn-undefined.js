// compat-table: ES5 > Array methods (large) > Array.prototype.sort: compareFn may be explicit undefined
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    var arr = [2, 1];
    return arr.sort(undefined) === arr && arr[0] === 1 && arr[1] === 2;
  } catch (e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.sort.compareFn-undefined.js: OK");
  } else {
    console.log("es5.Array.prototype.sort.compareFn-undefined.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.sort.compareFn-undefined.js: FAIL: " + e);
}