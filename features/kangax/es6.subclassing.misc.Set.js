// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Set is subclassable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var obj = {};
  class S extends Set {}
  var set = new S();

  set.add(123);
  set.add(123);

  return set instanceof S && set.has(123);
}

try {
  if (testCode()) {
    console.log("es6.subclassing.misc.Set.js: OK");
  } else {
    console.log("es6.subclassing.misc.Set.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.misc.Set.js: FAIL: " + e);
}