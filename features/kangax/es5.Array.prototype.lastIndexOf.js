// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
// compat-table: ES5 > Array methods (large) > Array.prototype.lastIndexOf
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.lastIndexOf === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.lastIndexOf.js: OK");
  } else {
    console.log("es5.Array.prototype.lastIndexOf.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.lastIndexOf.js: FAIL: " + e);
}