// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.of
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  return C.of(0) instanceof C;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Array.of.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.of.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.of.js: exception: " + e);
}
