// ES6: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocalestring
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
// compat-table: ES Intl > Date.prototype.toLocaleString > exists on Date prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Date.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Date.prototype.toLocaleString.js: OK");
  } else {
    console.log("esintl.Date.prototype.toLocaleString.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Date.prototype.toLocaleString.js: FAIL: " + e);
}