// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// compat-table: ES6 > built-ins > WeakSet (small) > constructor accepts null
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  new WeakSet(null);
  return true;
}

try {
  if (testCode()) {
    console.log("es6.WeakSet.constructor-accepts-null.js: OK");
  } else {
    console.log("es6.WeakSet.constructor-accepts-null.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakSet.constructor-accepts-null.js: FAIL: " + e);
}