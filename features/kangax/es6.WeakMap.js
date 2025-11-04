// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// compat-table: ES6 > built-ins > WeakMap (medium) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key = {};
  var weakmap = new WeakMap();

  weakmap.set(key, 123);

  return weakmap.has(key) && weakmap.get(key) === 123;
}

try {
  if (testCode()) {
    console.log("es6.WeakMap.js: OK");
  } else {
    console.log("es6.WeakMap.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakMap.js: FAIL: " + e);
}