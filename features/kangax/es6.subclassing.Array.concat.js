// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.prototype.concat
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  return c.concat(1) instanceof C;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Array.concat.js: OK");
  } else {
    console.log("es6.subclassing.Array.concat.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Array.concat.js: FAIL: " + e);
}