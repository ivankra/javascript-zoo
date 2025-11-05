// compat-table: ES2016+ > 2017 features > trailing commas in function syntax (small) > in argument lists
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Trailing_commas#Function_calls
// spec: https://github.com/tc39/proposal-trailing-function-commas
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Math.min(1,2,3,) === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es2017/trailing-comma.arguments.js: OK");
  } else {
    console.log("kangax-es2017/trailing-comma.arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es2017/trailing-comma.arguments.js: exception: " + e);
}
