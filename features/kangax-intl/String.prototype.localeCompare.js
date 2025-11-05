// compat-table: ES Intl > String.prototype.localeCompare > exists on String prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
// spec: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.localecompare
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.localeCompare === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-intl/String.prototype.localeCompare.js: OK");
  } else {
    console.log("kangax-intl/String.prototype.localeCompare.js: failed");
  }
} catch (e) {
  console.log("kangax-intl/String.prototype.localeCompare.js: exception: " + e);
}
