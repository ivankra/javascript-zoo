// compat-table: ES5 > Array methods (large) > Array.prototype.forEach
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.forEach === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Array.prototype.forEach.js: OK");
  } else {
    console.log("kangax-es5/Array.prototype.forEach.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Array.prototype.forEach.js: exception: " + e);
}
