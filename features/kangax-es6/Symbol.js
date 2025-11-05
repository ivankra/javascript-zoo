// compat-table: ES6 > built-ins > Symbol (large) > basic functionality
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
  object[symbol] = value;
  return object[symbol] === value;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.js: OK");
  } else {
    console.log("kangax-es6/Symbol.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.js: exception: " + e);
}
