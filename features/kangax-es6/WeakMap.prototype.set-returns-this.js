// compat-table: ES6 > built-ins > WeakMap (medium) > WeakMap.prototype.set returns this
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/set#Return_value
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var weakmap = new WeakMap();
  var key = {};
  return weakmap.set(key, 0) === weakmap;
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakMap.prototype.set-returns-this.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.prototype.set-returns-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.prototype.set-returns-this.js: exception: " + e);
}
