// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
// compat-table: ES5 > Array methods (large) > Array.prototype.forEach
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.forEach === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.forEach.js: OK");
  } else {
    console.log("es5.Array.prototype.forEach.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.forEach.js: FAIL: " + e);
}