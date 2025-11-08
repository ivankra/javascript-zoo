// compat-table: ES2016+ > 2023 features > Array find from last (small) > Array.prototype.findLast
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast
// spec: https://github.com/tc39/proposal-array-find-from-last
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
    console.log("kangax-es2023/Array.prototype.findLast.js: OK");
  } else {
    console.log("kangax-es2023/Array.prototype.findLast.js: failed");
  }
} catch (e) {
  console.log("kangax-es2023/Array.prototype.findLast.js: exception: " + e);
}
