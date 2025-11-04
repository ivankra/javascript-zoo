// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// compat-table: ES6 > built-ins > WeakSet (small) > constructor invokes add
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var _add = WeakSet.prototype.add;

  WeakSet.prototype.add = function(v) {
    passed = true;
  };

  new WeakSet([ { } ]);
  WeakSet.prototype.add = _add;

  return passed;
}

try {
  if (testCode()) {
    console.log("es6.WeakSet.constructor-invokes-add.js: OK");
  } else {
    console.log("es6.WeakSet.constructor-invokes-add.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakSet.constructor-invokes-add.js: FAIL: " + e);
}