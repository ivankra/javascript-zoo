// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > function expressions with matching name and argument are valid
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var foo = function bar(bar) {'use strict'};
  return typeof foo === 'function';
}

try {
  if (testCode()) {
    console.log("es5.strict.function-expr-matching-name-arg.js: OK");
  } else {
    console.log("es5.strict.function-expr-matching-name-arg.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.function-expr-matching-name-arg.js: FAIL: " + e);
}