// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// compat-table: ES6 > functions > super (medium) > in methods, property access
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {}
  B.prototype.qux = "foo";
  B.prototype.corge = "baz";
  class C extends B {
    quux(a) { return super.qux + a + super["corge"]; }
  }
  C.prototype.qux = "garply";
  return new C().quux("bar") === "foobarbaz";
}

try {
  if (testCode()) {
    console.log("es6.super.property-access.js: OK");
  } else {
    console.log("es6.super.property-access.js: FAIL");
  }
} catch (e) {
  console.log("es6.super.property-access.js: FAIL: " + e);
}