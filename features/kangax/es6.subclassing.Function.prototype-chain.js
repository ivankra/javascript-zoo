// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
// compat-table: ES6 > subclassing > Function is subclassable (tiny) > correct prototype chain
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Function {}
  var c = new C("return 'foo';");
  return c instanceof C && c instanceof Function && Object.getPrototypeOf(C) === Function;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Function.prototype-chain.js: OK");
  } else {
    console.log("es6.subclassing.Function.prototype-chain.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Function.prototype-chain.js: FAIL: " + e);
}