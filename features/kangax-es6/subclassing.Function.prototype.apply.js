// compat-table: ES6 > subclassing > Function is subclassable (tiny) > Function.prototype.apply
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Function {}
  var c = new C("x", "return this.bar + x;");
  return c.apply({bar:1}, [2]) === 3;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Function.prototype.apply.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Function.prototype.apply.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Function.prototype.apply.js: exception: " + e);
}
