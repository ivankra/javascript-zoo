// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/copyWithin
// compat-table: ES6 > built-in extensions > Array.prototype methods (medium) > Array.prototype.copyWithin
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.copyWithin === 'function';
}

try {
  if (testCode()) {
    console.log("es6.Array.prototype.copyWithin.js: OK");
  } else {
    console.log("es6.Array.prototype.copyWithin.js: FAIL");
  }
} catch (e) {
  console.log("es6.Array.prototype.copyWithin.js: FAIL: " + e);
}