// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
// compat-table: ES5 > Object static methods (large) > Object.freeze
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.freeze === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Object.freeze.js: OK");
  } else {
    console.log("es5.Object.freeze.js: FAIL");
  }
} catch (e) {
  console.log("es5.Object.freeze.js: FAIL: " + e);
}