// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
// compat-table: ES6 > built-ins > Set (medium) > constructor invokes add
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var _add = Set.prototype.add;

  Set.prototype.add = function(v) {
    passed = true;
  };

  new Set([1]);
  Set.prototype.add = _add;

  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Set.constructor-invokes-add.js: OK");
  } else {
    console.log("es6.Set.constructor-invokes-add.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.constructor-invokes-add.js: FAIL: " + e);
}