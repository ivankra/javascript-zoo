// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > String is subclassable
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends String {}
  var c = new C("golly");
  return c instanceof String
    && c instanceof C
    && c + '' === "golly"
    && c[0] === "g"
    && c.length === 5;
}

try {
  if (testCode()) {
    console.log("es6.subclassing.misc.String.js: OK");
  } else {
    console.log("es6.subclassing.misc.String.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.misc.String.js: FAIL: " + e);
}