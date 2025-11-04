// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > new.target
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  new function f() {
    passed = new.target === f;
  }();

  class A {
    constructor() {
      passed &= new.target === B;
    }
  }
  class B extends A {}
  new B();
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.class.new-target.js: OK");
  } else {
    console.log("es6.class.new-target.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.new-target.js: FAIL: " + e);
}