// compat-table: ES6 > built-ins > WeakSet (small) > WeakSet.prototype.add returns this
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var weakset = new WeakSet();
  var obj = {};
  return weakset.add(obj) === weakset;
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakSet.prototype.add-returns-this.js: OK");
  } else {
    console.log("kangax-es6/WeakSet.prototype.add-returns-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakSet.prototype.add-returns-this.js: exception: " + e);
}
