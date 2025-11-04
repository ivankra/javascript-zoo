// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakmap-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap/clear
// compat-table: ES6 > built-ins > WeakMap (medium) > no WeakMap.prototype.clear method
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (!("clear" in WeakMap.prototype)) {
    return true;
  }
  var m = new WeakMap();
  var key = {};
  m.set(key, 2);
  m.clear();
  return m.has(key);
}

try {
  if (testCode()) {
    console.log("es6.WeakMap.no-clear.js: OK");
  } else {
    console.log("es6.WeakMap.no-clear.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakMap.no-clear.js: FAIL: " + e);
}