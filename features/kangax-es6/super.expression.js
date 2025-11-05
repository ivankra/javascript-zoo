// compat-table: ES6 > functions > super (medium) > expression in constructors
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-super-keyword
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {
    constructor(a) { return ["foo" + a]; }
  }
  class C extends B {
    constructor(a) { return super("bar" + a); }
  }
  return new C("baz")[0] === "foobarbaz";
}

try {
  if (testCode()) {
    console.log("kangax-es6/super.expression.js: OK");
  } else {
    console.log("kangax-es6/super.expression.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/super.expression.js: exception: " + e);
}
