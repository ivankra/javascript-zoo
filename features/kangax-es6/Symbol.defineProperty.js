// compat-table: ES6 > built-ins > Symbol (large) > Object.defineProperty support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var object = {};
  var symbol = Symbol();
  var value = {};

  if (Object.defineProperty) {
    Object.defineProperty(object, symbol, { value: value });
    return object[symbol] === value;
  }

  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.defineProperty.js: OK");
  } else {
    console.log("kangax-es6/Symbol.defineProperty.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.defineProperty.js: exception: " + e);
}
