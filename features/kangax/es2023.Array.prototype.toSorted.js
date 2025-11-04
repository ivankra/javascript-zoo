// ES6: https://github.com/tc39/proposal-change-array-by-copy
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSorted
// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > Array.prototype.toSorted()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = ['C', 'A', 'B'];
  return arr.toSorted()[0] === 'A' && arr[0] === 'C';
}

try {
  if (testCode()) {
    console.log("es2023.Array.prototype.toSorted.js: OK");
  } else {
    console.log("es2023.Array.prototype.toSorted.js: FAIL");
  }
} catch (e) {
  console.log("es2023.Array.prototype.toSorted.js: FAIL: " + e);
}