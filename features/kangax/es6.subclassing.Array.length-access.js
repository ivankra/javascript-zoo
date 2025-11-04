// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-array-constructor
// compat-table: ES6 > subclassing > Array is subclassable (small) > length property (accessing)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Array {}
  var c = new C();
  var len1 = c.length;
  c[2] = 'foo';
  var len2 = c.length;
  return len1 === 0 && len2 === 3;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.Array.length-access.js: OK");
  } else {
    console.log("es6.subclassing.Array.length-access.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Array.length-access.js: FAIL: " + e);
}