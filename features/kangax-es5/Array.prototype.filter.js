// compat-table: ES5 > Array methods (large) > Array.prototype.filter
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.filter === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.filter.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.filter.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.filter.js: exception: " + e);
}
