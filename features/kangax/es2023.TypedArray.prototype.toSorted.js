// ES6: https://github.com/tc39/proposal-change-array-by-copy
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/toSorted
// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > TypedArray.prototype.toSorted()
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = new Uint8Array([3, 1, 2]);
  return arr.toSorted()[0] == 1 && arr[0] == 3;
}

try {
  if (testCode()) {
    console.log("es2023.TypedArray.prototype.toSorted.js: OK");
  } else {
    console.log("es2023.TypedArray.prototype.toSorted.js: FAIL");
  }
} catch (e) {
  console.log("es2023.TypedArray.prototype.toSorted.js: FAIL: " + e);
}