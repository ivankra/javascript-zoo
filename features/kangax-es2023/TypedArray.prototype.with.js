// compat-table: ES2016+ > 2023 features > Change Array by copy (small) > TypedArray.prototype.with()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/with
// spec: https://github.com/tc39/proposal-change-array-by-copy
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = new Uint8Array([1, 0, 2]);
  return arr.with(1, 2)[1] == 2 && arr[1] == 0;
}

try {
  if (testCode()) {
    console.log("kangax-es2023/TypedArray.prototype.with.js: OK");
  } else {
    console.log("kangax-es2023/TypedArray.prototype.with.js: failed");
  }
} catch (e) {
  console.log("kangax-es2023/TypedArray.prototype.with.js: exception: " + e);
}
