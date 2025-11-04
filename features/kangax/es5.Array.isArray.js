// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
// compat-table: ES5 > Array methods (large) > Array.isArray
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.isArray === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Array.isArray.js: OK");
  } else {
    console.log("es5.Array.isArray.js: FAIL");
  }
} catch (e) {
  console.log("es5.Array.isArray.js: FAIL: " + e);
}