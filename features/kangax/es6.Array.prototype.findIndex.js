// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
// compat-table: ES6 > built-in extensions > Array.prototype methods (medium) > Array.prototype.findIndex
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.findIndex === 'function';
}

try {
  if (testCode()) {
    console.log("es6.Array.prototype.findIndex.js: OK");
  } else {
    console.log("es6.Array.prototype.findIndex.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.prototype.findIndex.js: FAIL: " + e);
}