// compat-table: ES6 > functions > arrow functions (large) > lexical "super" binding in methods
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {
    qux() {
      return "quux";
    }
  }
  class C extends B {
    baz() {
      return x => super.qux();
    }
  }
  var arrow = new C().baz();
  return arrow() === "quux";
}

try {
  if (testCode()) {
    console.log("kangax-es6/arrow.lexical-super.methods.js: OK");
  } else {
    console.log("kangax-es6/arrow.lexical-super.methods.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.lexical-super.methods.js: exception: " + e);
}
