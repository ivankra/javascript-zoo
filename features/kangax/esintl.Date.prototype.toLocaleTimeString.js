// ES6: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocaletimestring
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleTimeString
// compat-table: ES Intl > Date.prototype.toLocaleTimeString > exists on Date prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Date.prototype.toLocaleTimeString === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Date.prototype.toLocaleTimeString.js: OK");
  } else {
    console.log("esintl.Date.prototype.toLocaleTimeString.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Date.prototype.toLocaleTimeString.js: FAIL: " + e);
}