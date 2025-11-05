// compat-table: ES5 > String properties and methods (small) > String.prototype.substr
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return '0b'.substr(-1) === 'b';
}

try {
  if (testCode()) {
    console.log("kangax-es5/annex-b.String.prototype.substr.js: OK");
  } else {
    console.log("kangax-es5/annex-b.String.prototype.substr.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/annex-b.String.prototype.substr.js: exception: " + e);
}
