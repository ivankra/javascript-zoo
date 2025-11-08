// compat-table: ES6 > functions > class (large) > extends
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class B {}
  class C extends B {}
  return new C() instanceof B
    && B.isPrototypeOf(C);
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.extends.js: OK");
  } else {
    console.log("kangax-es6/class.extends.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.extends.js: exception: " + e);
}
