// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > lexical "arguments" binding
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var f = (function() { return z => arguments[0]; }(5));
  return f(6) === 5;
}

try {
  if (testCode()) {
    console.log("es6.arrow.lexical-arguments.js: OK");
  } else {
    console.log("es6.arrow.lexical-arguments.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.lexical-arguments.js: FAIL: " + e);
}