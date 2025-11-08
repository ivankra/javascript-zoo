// compat-table: ES6 > built-ins > WeakMap (medium) > frozen objects as keys
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
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
    console.log("kangax-es6/WeakMap.frozen-keys.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.frozen-keys.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.frozen-keys.js: exception: " + e);
}
