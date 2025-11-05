// compat-table: ES6 > subclassing > RegExp is subclassable (tiny) > RegExp.prototype.test
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class R extends RegExp {}
  var r = new R("baz");
  return r.test("foobarbaz");
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.RegExp.test.js: OK");
  } else {
    console.log("kangax-es6/subclassing.RegExp.test.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.RegExp.test.js: exception: " + e);
}
