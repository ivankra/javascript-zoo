// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON
// compat-table: ES5 > JSON (medium)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof JSON === 'object';
}

try {
  if (testCode()) {
    console.log("es5.JSON.js: OK");
  } else {
    console.log("es5.JSON.js: FAIL");
  }
} catch (e) {
  console.log("es5.JSON.js: FAIL: " + e);
}