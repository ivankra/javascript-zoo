// compat-table: ES5 > Object static methods (large) > Object.freeze
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.freeze === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Object.freeze.js: OK");
  } else {
    console.log("kangax-es5/Object.freeze.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Object.freeze.js: exception: " + e);
}
