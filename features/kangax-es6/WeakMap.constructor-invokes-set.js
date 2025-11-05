// compat-table: ES6 > built-ins > WeakMap (medium) > constructor invokes set
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var _set = WeakMap.prototype.set;

  WeakMap.prototype.set = function(k, v) {
    passed = true;
  };

  new WeakMap([ [{ }, 42] ]);
  WeakMap.prototype.set = _set;

  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/WeakMap.constructor-invokes-set.js: OK");
  } else {
    console.log("kangax-es6/WeakMap.constructor-invokes-set.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakMap.constructor-invokes-set.js: exception: " + e);
}
