// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size
// compat-table: ES6 > built-ins > Set (medium) > Set.prototype.size
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  var set = new Set();

  set.add(123);
  set.add(123);
  set.add(456);

  return set.size === 2;
}

try {
  if (testCode()) {
    console.log("es6.Set.prototype.size.js: OK");
  } else {
    console.log("es6.Set.prototype.size.js: FAIL");
  }
} catch (e) {
  console.log("es6.Set.prototype.size.js: FAIL: " + e);
}