// compat-table: ES6 > built-ins > Symbol (large) > can convert with String()
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-symbol-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return String(Symbol("foo")) === "Symbol(foo)";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Symbol.String.js: OK");
  } else {
    console.log("kangax-es6/Symbol.String.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Symbol.String.js: exception: " + e);
}
