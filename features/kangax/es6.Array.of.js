// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.of
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.of === 'function' &&
    Array.of(2)[0] === 2;
}

try {
  if (testCode()) {
    console.log("es6.Array.of.js: OK");
  } else {
    console.log("es6.Array.of.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.of.js: FAIL: " + e);
}