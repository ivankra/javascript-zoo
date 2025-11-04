// ES6: https://github.com/tc39/proposal-trailing-function-commas
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#Function_calls
// compat-table: ES2016+ > 2017 features > trailing commas in function syntax (small) > in argument lists
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Math.min(1,2,3,) === 1;
}

try {
  if (testCode()) {
    console.log("es2017.trailing-comma.arguments.js: OK");
  } else {
    console.log("es2017.trailing-comma.arguments.js: FAIL");
  }
} catch (e) {
  console.log("es2017.trailing-comma.arguments.js: FAIL: " + e);
}