// compat-table: ES6 > built-ins > Symbol (large) > symbols inherit from Symbol.prototype
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
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
    console.log("kangax-es6/Symbol.prototype.js: OK");
  } else {
    console.log("kangax-es6/Symbol.prototype.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.prototype.js: exception: " + e);
}
