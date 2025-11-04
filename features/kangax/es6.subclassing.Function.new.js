// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-constructor
// compat-table: ES6 > subclassing > Function is subclassable (tiny) > can be used with "new"
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
    console.log("es6.subclassing.Function.new.js: OK");
  } else {
    console.log("es6.subclassing.Function.new.js: FAIL");
  }
} catch (e) {
  console.log("es6.subclassing.Function.new.js: FAIL: " + e);
}