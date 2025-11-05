// compat-table: ES6 > built-ins > WeakMap (medium) > constructor arguments
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key1 = {};
  var key2 = {};
  var weakmap = new WeakMap([[key1, 123], [key2, 456]]);

  return weakmap.has(key1) && weakmap.get(key1) === 123 &&
         weakmap.has(key2) && weakmap.get(key2) === 456;
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakMap.constructor-arguments.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.constructor-arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.constructor-arguments.js: exception: " + e);
}
