// compat-table: ES6 > functions > class (large) > extends expressions
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var B;
  class C extends (B = class {}) {}
  return new C() instanceof B
    && B.isPrototypeOf(C);
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.extends-expressions.js: OK");
  } else {
    console.log("kangax-es6/class.extends-expressions.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.extends-expressions.js: exception: " + e);
}
