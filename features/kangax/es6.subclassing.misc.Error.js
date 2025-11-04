// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Error is subclassable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Error {}
  var c = new C();
  return c instanceof Error
    && c instanceof C
    && Object.prototype.toString.call(c) === "[object Error]";
}

try {
  if (testCode()) {
    console.log("es6.subclassing.misc.Error.js: OK");
  } else {
    console.log("es6.subclassing.misc.Error.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.misc.Error.js: FAIL: " + e);
}