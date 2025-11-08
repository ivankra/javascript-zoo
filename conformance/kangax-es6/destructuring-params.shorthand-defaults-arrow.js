// compat-table: ES6 > syntax > destructuring, parameters (medium) > shorthand defaults, arrow function
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ((a, {b = 0, c = 3}) => {
    return a === 1 && b === 2 && c === 3;
  })(1, {b: 2});
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.shorthand-defaults-arrow.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.shorthand-defaults-arrow.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.shorthand-defaults-arrow.js: exception: " + e);
}
