// compat-table: ES5 > String properties and methods (small) > String.prototype.trim
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.trim === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/String.prototype.trim.js: OK");
  } else {
    console.log("kangax-es5/String.prototype.trim.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/String.prototype.trim.js: exception: " + e);
}
