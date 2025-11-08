// compat-table: ES6 > functions > class (large) > prototype methods
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    method() { return 2; }
  }
  return typeof C.prototype.method === "function"
    && new C().method() === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.prototype-methods.js: OK");
  } else {
    console.log("kangax-es6/class.prototype-methods.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.prototype-methods.js: exception: " + e);
}
