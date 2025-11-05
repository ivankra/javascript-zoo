// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.prototype.slice
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  c.push(2,4,6);
  return c.slice(1,2) instanceof C;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Array.slice.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.slice.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.slice.js: exception: " + e);
}
