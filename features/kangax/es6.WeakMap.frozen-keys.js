// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// compat-table: ES6 > built-ins > WeakMap (medium) > frozen objects as keys
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var f = Object.freeze({});
  var m = new WeakMap;
  m.set(f, 42);
  return m.get(f) === 42;
}

try {
  if (testCode()) {
    console.log("es6.WeakMap.frozen-keys.js: OK");
  } else {
    console.log("es6.WeakMap.frozen-keys.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakMap.frozen-keys.js: FAIL: " + e);
}