// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// compat-table: ES6 > functions > super (medium) > statement in constructors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  class B {
    constructor(a) { passed = (a === "barbaz"); }
  }
  class C extends B {
    constructor(a) { super("bar" + a); }
  }
  new C("baz");
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.super.statement.js: OK");
  } else {
    console.log("es6.super.statement.js: FAIL");
  }
} catch (e) {
  console.log("es6.super.statement.js: FAIL: " + e);
}