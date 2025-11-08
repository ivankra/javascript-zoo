// compat-table: ES6 > subclassing > Function is subclassable (tiny) > Function.prototype.bind
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Function {}
  var c = new C("x", "y", "return this.bar + x + y;").bind({bar:1}, 2);
  return c(6) === 9 && c instanceof C;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Function.prototype.bind.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Function.prototype.bind.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Function.prototype.bind.js: exception: " + e);
}
