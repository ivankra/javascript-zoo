// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > Array.prototype.with()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/with
// spec: https://github.com/tc39/proposal-change-array-by-copy
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = ['A', 'X', 'C'];
  return arr.with(1, 'B')[1] === 'B' && arr[1] === 'X';
}

try {
  if (testCode()) {
    console.log("kangax-es2023/Array.prototype.with.js: OK");
  } else {
    console.log("kangax-es2023/Array.prototype.with.js: failed");
  }
} catch (e) {
  console.log("kangax-es2023/Array.prototype.with.js: exception: " + e);
}
