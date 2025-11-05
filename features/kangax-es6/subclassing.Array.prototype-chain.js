// compat-table: ES6 > subclassing > Array is subclassable (small) > correct prototype chain
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  return c instanceof C && c instanceof Array && Object.getPrototypeOf(C) === Array;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Array.prototype-chain.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.prototype-chain.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.prototype-chain.js: exception: " + e);
}
