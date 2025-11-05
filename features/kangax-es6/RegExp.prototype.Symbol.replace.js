// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp.prototype[Symbol.replace]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/@@replace
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof RegExp.prototype[Symbol.replace] === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/RegExp.prototype.Symbol.replace.js: OK");
  } else {
    console.log("kangax-es6/RegExp.prototype.Symbol.replace.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/RegExp.prototype.Symbol.replace.js: exception: " + e);
}
