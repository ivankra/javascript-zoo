// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// compat-table: ES6 > built-ins > Symbol (large) > symbols inherit from Symbol.prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var symbol = Symbol();
  var passed = symbol.foo === void undefined;
  Symbol.prototype.foo = 2;
  passed &= symbol.foo === 2;
  delete Symbol.prototype.foo;
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Symbol.prototype.js: OK");
  } else {
    console.log("es6.Symbol.prototype.js: FAIL");
  }
} catch (e) {
  console.log("es6.Symbol.prototype.js: FAIL: " + e);
}