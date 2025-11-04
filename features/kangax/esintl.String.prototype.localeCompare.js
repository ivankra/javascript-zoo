// ES6: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.localecompare
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
// compat-table: ES Intl > String.prototype.localeCompare > exists on String prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.localeCompare === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.String.prototype.localeCompare.js: OK");
  } else {
    console.log("esintl.String.prototype.localeCompare.js: FAIL");
  }
} catch (e) {
  console.log("esintl.String.prototype.localeCompare.js: FAIL: " + e);
}