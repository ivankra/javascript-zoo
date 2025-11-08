// compat-table: ES6 > built-in extensions > String static methods (medium) > String.fromCodePoint
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCodePoint
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof String.fromCodePoint === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/String.fromCodePoint.js: OK");
  } else {
    console.log("kangax-es6/String.fromCodePoint.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/String.fromCodePoint.js: exception: " + e);
}
