// compat-table: ES6 > subclassing > Array is subclassable (small) > length property (setting)
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  c[2] = 'foo';
  c.length = 1;
  return c.length === 1 && !(2 in c);
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Array.length-set.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.length-set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.length-set.js: exception: " + e);
}
