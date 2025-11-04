// ES6: https://github.com/tc39/proposal-array-find-from-last
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLastIndex
// compat-table: ES2016+ > 2023 features > Array find from last (small) > Array.prototype.findLastIndex
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [{ x: 1 }, { x: 2 }, { x: 1 }, { x: 2 }];
  return arr.findLastIndex(function (o) { return o.x === 1; }) === 2;
}

try {
  if (testCode()) {
    console.log("es2023.Array.prototype.findLastIndex.js: OK");
  } else {
    console.log("es2023.Array.prototype.findLastIndex.js: FAIL");
  }
} catch (e) {
  console.log("es2023.Array.prototype.findLastIndex.js: FAIL: " + e);
}