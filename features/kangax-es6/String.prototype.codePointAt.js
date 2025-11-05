// compat-table: ES6 > built-in extensions > String.prototype methods (medium) > String.prototype.codePointAt
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/codePointAt
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.prototype.codePointAt === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/String.prototype.codePointAt.js: OK");
  } else {
    console.log("kangax-es6/String.prototype.codePointAt.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/String.prototype.codePointAt.js: exception: " + e);
}
