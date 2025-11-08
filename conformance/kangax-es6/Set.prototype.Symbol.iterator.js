// compat-table: ES6 > built-ins > Set (medium) > Set.prototype[Symbol.iterator]
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/@@iterator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Set.prototype[Symbol.iterator] === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Set.prototype.Symbol.iterator.js: OK");
  } else {
    console.log("kangax-es6/Set.prototype.Symbol.iterator.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Set.prototype.Symbol.iterator.js: exception: " + e);
}
