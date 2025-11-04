// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
// compat-table: ES5 > Array methods (large) > Array.prototype.map
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.map === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.prototype.map.js: OK");
  } else {
    console.log("es5.Array.prototype.map.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.prototype.map.js: FAIL: " + e);
}