// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > yield operator precedence
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed;
  function * generator(){
    passed = yield 0 ? true : false;
  };
  var iterator = generator();
  iterator.next();
  iterator.next(true);
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.generators.yield-precedence.js: OK");
  } else {
    console.log("es6.generators.yield-precedence.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.yield-precedence.js: FAIL: " + e);
}