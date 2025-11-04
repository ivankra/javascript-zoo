// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// compat-table: ES6 > built-ins > WeakSet (small) > .has and .delete methods accept primitives
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var s = new WeakSet;
  return s.has(1) === false
    && s.delete(1) === false;
}

try {
  if (testCode()) {
    console.log("es6.WeakSet.accept-primitives.js: OK");
  } else {
    console.log("es6.WeakSet.accept-primitives.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakSet.accept-primitives.js: FAIL: " + e);
}