// compat-table: ES5 > Array methods (large) > Array.prototype.indexOf
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.indexOf === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.indexOf.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.indexOf.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.indexOf.js: exception: " + e);
}
