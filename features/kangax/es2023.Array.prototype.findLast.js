// ES6: https://github.com/tc39/proposal-array-find-from-last
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast
// compat-table: ES2016+ > 2023 features > Array find from last (small) > Array.prototype.findLast
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [{ x: 1 }, { x: 2 }, { x: 1 }, { x: 2 }];
  return arr.findLast(function (o) { return o.x === 1; }) === arr[2];
}

try {
  if (testCode()) {
    console.log("es2023.Array.prototype.findLast.js: OK");
  } else {
    console.log("es2023.Array.prototype.findLast.js: FAIL");
  }
} catch (e) {
  console.log("es2023.Array.prototype.findLast.js: FAIL: " + e);
}