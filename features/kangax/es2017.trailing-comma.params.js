// ES6: https://github.com/tc39/proposal-trailing-function-commas
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#Parameter_definitions
// compat-table: ES2016+ > 2017 features > trailing commas in function syntax (small) > in parameter lists
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof function f( a, b, ) {} === 'function';
}

try {
  if (testCode()) {
    console.log("es2017.trailing-comma.params.js: OK");
  } else {
    console.log("es2017.trailing-comma.params.js: FAIL");
  }
} catch (e) {
  console.log("es2017.trailing-comma.params.js: FAIL: " + e);
}