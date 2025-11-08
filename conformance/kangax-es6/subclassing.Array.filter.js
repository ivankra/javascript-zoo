// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.prototype.filter
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
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
    console.log("kangax-es6/subclassing.Array.filter.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.filter.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.filter.js: exception: " + e);
}
