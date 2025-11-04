// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > implicit strict mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    static method() { return this === void undefined; }
  }
  return (0,C.method)();
}

try {
  if (testCode()) {
    console.log("es6.class.implicit-strict.js: OK");
  } else {
    console.log("es6.class.implicit-strict.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.implicit-strict.js: FAIL: " + e);
}