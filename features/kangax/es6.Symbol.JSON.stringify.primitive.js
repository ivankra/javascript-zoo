// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// compat-table: ES6 > built-ins > Symbol (large) > JSON.stringify ignores symbol primitives
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var object = { foo: Symbol() };
  object[Symbol()] = 1;
  var array = [Symbol()];
  return JSON.stringify(object) === '{}' && JSON.stringify(array) === '[null]' && JSON.stringify(Symbol()) === void undefined;
}

try {
  if (testCode()) {
    console.log("es6.Symbol.JSON.stringify.primitive.js: OK");
  } else {
    console.log("es6.Symbol.JSON.stringify.primitive.js: FAIL");
  }
} catch (e) {
  console.log("es6.Symbol.JSON.stringify.primitive.js: FAIL: " + e);
}