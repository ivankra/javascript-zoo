// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Number is subclassable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Number {}
  var c = new C(6);
  return c instanceof Number
    && c instanceof C
    && +c === 6;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.misc.Number.js: OK");
  } else {
    console.log("kangax-es6/subclassing.misc.Number.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.misc.Number.js: exception: " + e);
}
