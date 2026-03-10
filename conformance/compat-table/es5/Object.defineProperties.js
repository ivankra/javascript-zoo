// compat-table: ES5 > Object static methods (large) > Object.defineProperties
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.defineProperties === 'function';
}

try {
  if (testCode()) {
    console.log("compat-table/es5/Object.defineProperties.js: OK");
  } else {
    console.log("compat-table/es5/Object.defineProperties.js: failed");
  }
} catch (e) {
  console.log("compat-table/es5/Object.defineProperties.js: exception: " + e);
}
