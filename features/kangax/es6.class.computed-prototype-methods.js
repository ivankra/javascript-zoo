// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > computed prototype methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = "method";
  class C {
    [foo]() { return 2; }
  }
  return typeof C.prototype.method === "function"
    && new C().method() === 2;
}

try {
  if (testCode()) {
    console.log("es6.class.computed-prototype-methods.js: OK");
  } else {
    console.log("es6.class.computed-prototype-methods.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.computed-prototype-methods.js: FAIL: " + e);
}