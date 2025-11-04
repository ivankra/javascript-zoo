// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor
// compat-table: ES6 > subclassing > RegExp is subclassable (tiny) > correct prototype chain
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class R extends RegExp {}
  var r = new R("baz","g");
  return r instanceof R && r instanceof RegExp && Object.getPrototypeOf(R) === RegExp;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.RegExp.prototype-chain.js: OK");
  } else {
    console.log("es6.subclassing.RegExp.prototype-chain.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.RegExp.prototype-chain.js: FAIL: " + e);
}