// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > string-keyed methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    "foo bar"() { return 2; }
  }
  return typeof C.prototype["foo bar"] === "function"
    && new C()["foo bar"]() === 2;
}

try {
  if (testCode()) {
    console.log("es6.class.string-keyed-methods.js: OK");
  } else {
    console.log("es6.class.string-keyed-methods.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.string-keyed-methods.js: FAIL: " + e);
}