// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.prototype.filter
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  return c.filter(Boolean) instanceof C;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Array.filter.js: OK");
  } else {
    console.log("es6.subclassing.Array.filter.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Array.filter.js: FAIL: " + e);
}