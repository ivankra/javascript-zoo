// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-map-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
// compat-table: ES6 > built-ins > Map (medium) > constructor invokes set
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  var _set = Map.prototype.set;

  Map.prototype.set = function(k, v) {
    passed = true;
  };

  new Map([ [1, 2] ]);
  Map.prototype.set = _set;

  return passed;
}

try {
  if (testCode()) {
    console.log("es6.Map.constructor-invokes-set.js: OK");
  } else {
    console.log("es6.Map.constructor-invokes-set.js: FAIL");
  }
} catch (e) {
  console.log("es6.Map.constructor-invokes-set.js: FAIL: " + e);
}