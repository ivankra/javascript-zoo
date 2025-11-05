// compat-table: ES6 > subclassing > miscellaneous subclassables (tiny) > Error is subclassable
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-boolean-constructor
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
    console.log("kangax-es6/subclassing.misc.Error.js: OK");
  } else {
    console.log("kangax-es6/subclassing.misc.Error.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.misc.Error.js: exception: " + e);
}
