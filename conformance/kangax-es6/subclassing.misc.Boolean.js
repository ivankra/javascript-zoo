// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Boolean is subclassable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Boolean {}
  var c = new C(true);
  return c instanceof Boolean
    && c instanceof C
    && c == true; // eslint-disable-line eqeqeq
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.misc.Boolean.js: OK");
  } else {
    console.log("kangax-es6/subclassing.misc.Boolean.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.misc.Boolean.js: exception: " + e);
}
