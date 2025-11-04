// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.isArray support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  return Array.isArray(new C());
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Array.isArray.js: OK");
  } else {
    console.log("es6.subclassing.Array.isArray.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Array.isArray.js: FAIL: " + e);
}