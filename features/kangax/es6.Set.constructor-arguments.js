// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// compat-table: ES6 > built-ins > Set (medium) > constructor arguments
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj1 = {};
  var obj2 = {};
  var set = new Set([obj1, obj2]);

  return set.has(obj1) && set.has(obj2);
}

try {
  if (testCode()) {
    console.log("es6.Set.constructor-arguments.js: OK");
  } else {
    console.log("es6.Set.constructor-arguments.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.constructor-arguments.js: FAIL: " + e);
}