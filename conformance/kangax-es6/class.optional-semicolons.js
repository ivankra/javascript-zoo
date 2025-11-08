// compat-table: ES6 > functions > class (large) > optional semicolons
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    ;
    method() { return 2; };
    method2() { return 2; }
    method3() { return 2; };
  }
  return typeof C.prototype.method === "function"
    && typeof C.prototype.method2 === "function"
    && typeof C.prototype.method3 === "function";
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.optional-semicolons.js: OK");
  } else {
    console.log("kangax-es6/class.optional-semicolons.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.optional-semicolons.js: exception: " + e);
}
