// compat-table: ES6 > subclassing > Function is subclassable (tiny) > can be used with "new"
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends Function {}
  var c = new C("this.bar = 2;");
  c.prototype.baz = 3;
  return new c().bar === 2 && new c().baz === 3;
}

try {
  if (testCode()) {
    console.log("kangax-es6/subclassing.Function.new.js: OK");
  } else {
    console.log("kangax-es6/subclassing.Function.new.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/subclassing.Function.new.js: exception: " + e);
}
