// compat-table: ES6 > built-in extensions > Array.prototype methods (medium) > Array.prototype.keys
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/keys
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-prototype-object
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Array.prototype.keys === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/Array.prototype.keys.js: OK");
  } else {
    console.log("kangax-es6/Array.prototype.keys.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Array.prototype.keys.js: exception: " + e);
}
