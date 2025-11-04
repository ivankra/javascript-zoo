// ES6: https://github.com/tc39/proposal-change-array-by-copy
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toReversed
// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > Array.prototype.toReversed()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [1, 2, 3];
  return arr.toReversed()[0] === 3 && arr[0] === 1;
}

try {
  if (testCode()) {
    console.log("es2023.Array.prototype.toReversed.js: OK");
  } else {
    console.log("es2023.Array.prototype.toReversed.js: FAIL");
  }
} catch (e) {
  console.log("es2023.Array.prototype.toReversed.js: FAIL: " + e);
}