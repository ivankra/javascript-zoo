// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Map is subclassable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var key = {};
  class M extends Map {}
  var map = new M();

  map.set(key, 123);

  return map instanceof M && map.has(key) && map.get(key) === 123;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.misc.Map.js: OK");
  } else {
    console.log("es6.subclassing.misc.Map.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.misc.Map.js: FAIL: " + e);
}