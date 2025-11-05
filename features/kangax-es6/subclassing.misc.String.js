// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > String is subclassable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
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
    console.log("kangax-es6/subclassing.misc.String.js: OK");
  } else {
    console.log("kangax-es6/subclassing.misc.String.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.misc.String.js: exception: " + e);
}
