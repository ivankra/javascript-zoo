// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > computed static methods
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = "method";
  class C {
    static [foo]() { return 3; }
  }
  return typeof C.method === "function"
    && C.method() === 3;
}

try {
  if (testCode()) {
    console.log("es6.class.computed-static-methods.js: OK");
  } else {
    console.log("es6.class.computed-static-methods.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.computed-static-methods.js: FAIL: " + e);
}