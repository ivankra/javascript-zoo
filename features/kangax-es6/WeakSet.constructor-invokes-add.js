// compat-table: ES6 > built-ins > WeakSet (small) > constructor invokes add
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
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
    console.log("kangax-es6/WeakSet.constructor-invokes-add.js: OK");
  } else {
    console.log("kangax-es6/WeakSet.constructor-invokes-add.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakSet.constructor-invokes-add.js: exception: " + e);
}
