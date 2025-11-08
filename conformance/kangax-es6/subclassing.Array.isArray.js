// compat-table: ES6 > subclassing > Array is subclassable (small) > Array.isArray support
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
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
    console.log("kangax-es6/subclassing.Array.isArray.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Array.isArray.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Array.isArray.js: exception: " + e);
}
