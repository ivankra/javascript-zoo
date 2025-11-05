// compat-table: ES6 > syntax > destructuring, parameters (medium) > aliased defaults, arrow function
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ((a, {b: x = 0, c: y = 3}) => {
    return a === 1 && x === 2 && y === 3;
  })(1, {b: 2});
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.aliased-defaults-arrow.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.aliased-defaults-arrow.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.aliased-defaults-arrow.js: exception: " + e);
}
