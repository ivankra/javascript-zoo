// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.prototype.map
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  return c.map(Boolean) instanceof C;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Array.map.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.map.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.map.js: exception: " + e);
}
