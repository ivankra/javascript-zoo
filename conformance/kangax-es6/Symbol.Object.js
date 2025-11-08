// compat-table: ES6 > built-ins > Symbol (large) > Object(symbol)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var symbol = Symbol();
  var symbolObject = Object(symbol);

  return typeof symbolObject === "object" &&
    symbolObject instanceof Symbol &&
    symbolObject == symbol && // eslint-disable-line eqeqeq
    symbolObject !== symbol &&
    symbolObject.valueOf() === symbol;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.Object.js: OK");
  } else {
    console.log("kangax-es6/Symbol.Object.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.Object.js: exception: " + e);
}
