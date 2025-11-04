// ES6: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tolocalestring
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString
// compat-table: ES Intl > Object.prototype.toLocaleString > exists on Object prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("esintl.Object.prototype.toLocaleString.js: OK");
  } else {
    console.log("esintl.Object.prototype.toLocaleString.js: FAIL");
  }
} catch (e) {
  console.log("esintl.Object.prototype.toLocaleString.js: FAIL: " + e);
}