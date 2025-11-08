// compat-table: ES6 > syntax > destructuring, declarations (medium) > trailing commas in iterable patterns
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var [a,] = [1];
  return a === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.trailing-comma-iterable.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.trailing-comma-iterable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.trailing-comma-iterable.js: exception: " + e);
}
