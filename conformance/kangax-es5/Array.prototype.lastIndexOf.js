// compat-table: ES5 > Array methods (large) > Array.prototype.lastIndexOf
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.lastIndexOf === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.lastIndexOf.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.lastIndexOf.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.lastIndexOf.js: exception: " + e);
}
