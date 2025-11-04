// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > methods aren't enumerable
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
    console.log("es6.class.methods-not-enumerable.js: OK");
  } else {
    console.log("es6.class.methods-not-enumerable.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.methods-not-enumerable.js: FAIL: " + e);
}