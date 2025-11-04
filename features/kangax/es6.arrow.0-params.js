// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > 0 parameters
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (() => 5)() === 5;
}

try {
  if (testCode()) {
    console.log("es6.arrow.0-params.js: OK");
  } else {
    console.log("es6.arrow.0-params.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.0-params.js: FAIL: " + e);
}