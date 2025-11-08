// compat-table: ES6 > functions > class (large) > extends null
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C extends null {
    constructor() { return Object.create(null); }
  }
  return Function.prototype.isPrototypeOf(C)
    && Object.getPrototypeOf(C.prototype) === null;
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.extends-null.js: OK");
  } else {
    console.log("kangax-es6/class.extends-null.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.extends-null.js: exception: " + e);
}
