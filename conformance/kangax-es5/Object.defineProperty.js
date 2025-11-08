// compat-table: ES5 > Object static methods (large) > Object.defineProperty
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.defineProperty === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Object.defineProperty.js: OK");
  } else {
    console.log("kangax-es5/Object.defineProperty.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Object.defineProperty.js: exception: " + e);
}
