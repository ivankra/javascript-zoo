// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp.prototype[Symbol.match]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@match
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof RegExp.prototype[Symbol.match] === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/RegExp.prototype.Symbol.match.js: OK");
  } else {
    console.log("kangax-es6/RegExp.prototype.Symbol.match.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/RegExp.prototype.Symbol.match.js: exception: " + e);
}
