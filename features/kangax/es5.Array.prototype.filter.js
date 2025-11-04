// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// compat-table: ES5 > Array methods (large) > Array.prototype.filter
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.filter === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.filter.js: OK");
  } else {
    console.log("es5.Array.prototype.filter.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.filter.js: FAIL: " + e);
}