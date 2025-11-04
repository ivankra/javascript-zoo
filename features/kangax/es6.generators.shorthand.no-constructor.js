// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > shorthand generators can't be constructors
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class C {
    * generator() {
      yield 5; yield 6;
    }
  };
  try {
    Function("class D { * constructor() { return {}; } }");
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.generators.shorthand.no-constructor.js: OK");
  } else {
    console.log("es6.generators.shorthand.no-constructor.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.shorthand.no-constructor.js: FAIL: " + e);
}