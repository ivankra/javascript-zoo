// compat-table: ES6 > functions > super (medium) > method calls use correct "this" binding
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {
    qux(a) { return this.foo + a; }
  }
  class C extends B {
    qux(a) { return super.qux("bar" + a); }
  }
  var obj = new C();
  obj.foo = "foo";
  return obj.qux("baz") === "foobarbaz";
}

try {
  if (testCode()) {
    console.log("kangax-es6/super.this-binding.js: OK");
  } else {
    console.log("kangax-es6/super.this-binding.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/super.this-binding.js: exception: " + e);
}
