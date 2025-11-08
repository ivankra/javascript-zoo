// compat-table: ES5 > Date methods (small) > Date.prototype.toISOString
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Date.prototype.toISOString === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Date.prototype.toISOString.js: OK");
  } else {
    console.log("kangax-es5/Date.prototype.toISOString.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Date.prototype.toISOString.js: exception: " + e);
}
