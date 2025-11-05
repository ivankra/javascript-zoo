// compat-table: ES Intl > Number.prototype.toLocaleString > exists on Number prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
// spec: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.prototype.tolocalestring
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Number.prototype.toLocaleString.js: OK");
  } else {
    console.log("kangax-intl/Number.prototype.toLocaleString.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Number.prototype.toLocaleString.js: exception: " + e);
}
