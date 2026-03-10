// compat-table: ES Intl > Array.prototype.toLocaleString > exists on Array prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toLocaleString
// spec: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.prototype.tolocalestring
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("compat-table/intl/Array.prototype.toLocaleString.js: OK");
  } else {
    console.log("compat-table/intl/Array.prototype.toLocaleString.js: failed");
  }
} catch (e) {
  console.log("compat-table/intl/Array.prototype.toLocaleString.js: exception: " + e);
}
