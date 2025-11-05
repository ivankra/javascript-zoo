// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > Array.prototype.toSpliced()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toSpliced
// spec: https://github.com/tc39/proposal-change-array-by-copy
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = ['A', 'C'];
  return arr.toSpliced(1, 0, 'B')[1] === 'B' && arr[1] === 'C';
}

try {
  if (testCode()) {
    console.log("kangax-es2023/Array.prototype.toSpliced.js: OK");
  } else {
    console.log("kangax-es2023/Array.prototype.toSpliced.js: failed");
  }
} catch (e) {
  console.log("kangax-es2023/Array.prototype.toSpliced.js: exception: " + e);
}
