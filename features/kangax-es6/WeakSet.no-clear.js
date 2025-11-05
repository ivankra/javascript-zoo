// compat-table: ES6 > built-ins > WeakSet (small) > no WeakSet.prototype.clear method
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-weakset-objects
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
    console.log("kangax-es6/WeakSet.no-clear.js: OK");
  } else {
    console.log("kangax-es6/WeakSet.no-clear.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/WeakSet.no-clear.js: exception: " + e);
}
