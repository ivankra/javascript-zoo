// compat-table: ES6 > built-ins > WeakSet (small) > constructor arguments
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj1 = {}, obj2 = {};
  var weakset = new WeakSet([obj1, obj2]);

  return weakset.has(obj1) && weakset.has(obj2);
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakSet.constructor-arguments.js: OK");
  } else {
    console.log("kangax-es6/WeakSet.constructor-arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakSet.constructor-arguments.js: exception: " + e);
}
