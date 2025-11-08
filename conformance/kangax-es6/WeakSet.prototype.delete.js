// compat-table: ES6 > built-ins > WeakSet (small) > WeakSet.prototype.delete
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof WeakSet.prototype.delete === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakSet.prototype.delete.js: OK");
  } else {
    console.log("kangax-es6/WeakSet.prototype.delete.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakSet.prototype.delete.js: exception: " + e);
}
