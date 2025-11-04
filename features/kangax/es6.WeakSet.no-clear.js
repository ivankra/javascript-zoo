// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// compat-table: ES6 > built-ins > WeakSet (small) > no WeakSet.prototype.clear method
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (!("clear" in WeakSet.prototype)) {
    return true;
  }
  var s = new WeakSet();
  var key = {};
  s.add(key);
  s.clear();
  return s.has(key);
}

try {
  if (testCode()) {
    console.log("es6.WeakSet.no-clear.js: OK");
  } else {
    console.log("es6.WeakSet.no-clear.js: FAIL");
  }
} catch (e) {
  console.log("es6.WeakSet.no-clear.js: FAIL: " + e);
}