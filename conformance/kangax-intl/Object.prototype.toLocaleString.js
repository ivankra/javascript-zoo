// compat-table: ES Intl > Object.prototype.toLocaleString > exists on Object prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toLocaleString
// spec: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tolocalestring
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.prototype.toLocaleString === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/Object.prototype.toLocaleString.js: OK");
  } else {
    console.log("kangax-intl/Object.prototype.toLocaleString.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/Object.prototype.toLocaleString.js: exception: " + e);
}
