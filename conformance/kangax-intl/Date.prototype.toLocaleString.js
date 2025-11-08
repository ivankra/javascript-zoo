// compat-table: ES Intl > Date.prototype.toLocaleString > exists on Date prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleString
// spec: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-date.prototype.tolocalestring
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Date.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Date.prototype.toLocaleString.js: OK");
  } else {
    console.log("kangax-intl/Date.prototype.toLocaleString.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Date.prototype.toLocaleString.js: exception: " + e);
}
