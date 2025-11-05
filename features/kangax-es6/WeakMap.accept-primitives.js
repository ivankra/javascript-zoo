// compat-table: ES6 > built-ins > WeakMap (medium) > .has, .get and .delete methods accept primitives
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var m = new WeakMap;
  return m.has(1) === false
    && m.get(1) === void undefined
    && m.delete(1) === false;
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakMap.accept-primitives.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.accept-primitives.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.accept-primitives.js: exception: " + e);
}
