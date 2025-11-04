// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object
// compat-table: ES6 > built-in extensions > Array.prototype methods (medium) > Array iterator prototype chain
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Iterator instance
  var iterator = [][Symbol.iterator]();
  // %ArrayIteratorPrototype%
  var proto1 = Object.getPrototypeOf(iterator);
  // %IteratorPrototype%
  var proto2 = Object.getPrototypeOf(proto1);

  return proto2.hasOwnProperty(Symbol.iterator) &&
    !proto1    .hasOwnProperty(Symbol.iterator) &&
    !iterator  .hasOwnProperty(Symbol.iterator) &&
    iterator[Symbol.iterator]() === iterator;
}

try {
  if (testCode()) {
    console.log("es6.Array.iterator-prototype-chain.js: OK");
  } else {
    console.log("es6.Array.iterator-prototype-chain.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.iterator-prototype-chain.js: FAIL: " + e);
}