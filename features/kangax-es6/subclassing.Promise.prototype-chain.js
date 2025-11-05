// compat-table: ES6 > subclassing > Promise is subclassable (small) > correct prototype chain
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
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
    console.log("kangax-es6/subclassing.Promise.prototype-chain.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Promise.prototype-chain.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Promise.prototype-chain.js: exception: " + e);
}
