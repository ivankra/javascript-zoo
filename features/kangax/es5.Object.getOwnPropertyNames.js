// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
// compat-table: ES5 > Object static methods (large) > Object.getOwnPropertyNames
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.getOwnPropertyNames === 'function';
}

try {
  if (testCode()) {
    console.log("es5.Object.getOwnPropertyNames.js: OK");
  } else {
    console.log("es5.Object.getOwnPropertyNames.js: FAIL");
  }
} catch (e) {
  console.log("es5.Object.getOwnPropertyNames.js: FAIL: " + e);
}