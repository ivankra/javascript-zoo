// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
// compat-table: ES5 > Array methods (large) > Array.prototype.every
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.every === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.every.js: OK");
  } else {
    console.log("es5.Array.prototype.every.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.every.js: FAIL: " + e);
}