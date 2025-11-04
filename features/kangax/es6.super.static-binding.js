// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// compat-table: ES6 > functions > super (medium) > is statically bound
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {
    qux() { return "bar"; }
  }
  class C extends B {
    qux() { return super.qux() + this.corge; }
  }
  var obj = {
    qux: C.prototype.qux,
    corge: "ley"
  };
  return obj.qux() === "barley";
}

try {
  if (testCode()) {
    console.log("es6.super.static-binding.js: OK");
  } else {
    console.log("es6.super.static-binding.js: FAIL");
  }
} catch (e) {
  console.log("es6.super.static-binding.js: FAIL: " + e);
}