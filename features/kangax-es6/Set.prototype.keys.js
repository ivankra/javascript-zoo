// compat-table: ES6 > built-ins > Set (medium) > Set.prototype.keys
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/keys
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Set.prototype.keys === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Set.prototype.keys.js: OK");
  } else {
    console.log("kangax-es6/Set.prototype.keys.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Set.prototype.keys.js: exception: " + e);
}
