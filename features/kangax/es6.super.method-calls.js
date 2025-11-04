// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// compat-table: ES6 > functions > super (medium) > in methods, method calls
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {
    qux(a) { return "foo" + a; }
  }
  class C extends B {
    qux(a) { return super.qux("bar" + a); }
  }
  return new C().qux("baz") === "foobarbaz";
}

try {
  if (testCode()) {
    console.log("es6.super.method-calls.js: OK");
  } else {
    console.log("es6.super.method-calls.js: FAIL");
  }
} catch (e) {
  console.log("es6.super.method-calls.js: FAIL: " + e);
}