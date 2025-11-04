// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
// compat-table: ES6 > subclassing > Promise is subclassable (small) > correct prototype chain
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Promise {}
  var c = new C(function(resolve, reject) { resolve("foo"); });
  return c instanceof C && c instanceof Promise && Object.getPrototypeOf(C) === Promise;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Promise.prototype-chain.js: OK");
  } else {
    console.log("es6.subclassing.Promise.prototype-chain.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Promise.prototype-chain.js: FAIL: " + e);
}