// compat-table: ES6 > functions > class (large) > methods aren't enumerable
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    foo() {}
    static bar() {}
  }
  return !C.prototype.propertyIsEnumerable("foo") && !C.propertyIsEnumerable("bar");
}

try {
  if (testCode()) {
    console.log("kangax-es6/class.methods-not-enumerable.js: OK");
  } else {
    console.log("kangax-es6/class.methods-not-enumerable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/class.methods-not-enumerable.js: exception: " + e);
}
