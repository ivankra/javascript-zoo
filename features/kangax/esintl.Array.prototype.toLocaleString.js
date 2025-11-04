// ES6: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.tolocalestring
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString
// compat-table: ES Intl > Array.prototype.toLocaleString > exists on Array prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Array.prototype.toLocaleString.js: OK");
  } else {
    console.log("esintl.Array.prototype.toLocaleString.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Array.prototype.toLocaleString.js: FAIL: " + e);
}