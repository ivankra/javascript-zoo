// compat-table: ES5 > Array methods (large) > Array.prototype.some
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.some === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.some.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.some.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.some.js: exception: " + e);
}
