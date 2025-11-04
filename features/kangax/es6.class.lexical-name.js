// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-class-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// compat-table: ES6 > functions > class (large) > class name is lexically scoped
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    method() { return typeof C === "function"; }
  }
  var M = C.prototype.method;
  C = void undefined;
  return C === void undefined && M();
}

try {
  if (testCode()) {
    console.log("es6.class.lexical-name.js: OK");
  } else {
    console.log("es6.class.lexical-name.js: FAIL");
  }
} catch (e) {
  console.log("es6.class.lexical-name.js: FAIL: " + e);
}