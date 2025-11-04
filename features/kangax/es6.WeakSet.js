// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// compat-table: ES6 > built-ins > WeakSet (small) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj1 = {};
  var weakset = new WeakSet();

  weakset.add(obj1);
  weakset.add(obj1);

  return weakset.has(obj1);
}

try {
  if (testCode()) {
    console.log("es6.WeakSet.js: OK");
  } else {
    console.log("es6.WeakSet.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakSet.js: FAIL: " + e);
}