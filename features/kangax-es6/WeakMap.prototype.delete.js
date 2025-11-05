// compat-table: ES6 > built-ins > WeakMap (medium) > WeakMap.prototype.delete
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/delete
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof WeakMap.prototype.delete === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakMap.prototype.delete.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.prototype.delete.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.prototype.delete.js: exception: " + e);
}
