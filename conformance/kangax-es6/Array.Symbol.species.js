// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array[Symbol.species]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/@@species
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var prop = Object.getOwnPropertyDescriptor(Array, Symbol.species);
  return 'get' in prop && Array[Symbol.species] === Array;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Array.Symbol.species.js: OK");
  } else {
    console.log("kangax-es6/Array.Symbol.species.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Array.Symbol.species.js: exception: " + e);
}
