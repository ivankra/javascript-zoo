// compat-table: ES6 > built-ins > Set (medium) > Set.prototype.values
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/values
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Set.prototype.values === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Set.prototype.values.js: OK");
  } else {
    console.log("kangax-es6/Set.prototype.values.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Set.prototype.values.js: exception: " + e);
}
