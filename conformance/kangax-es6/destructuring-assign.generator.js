// compat-table: ES6 > syntax > destructuring, assignment (medium) > with generator instances
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c;
  [a, b, c] = (function*(){ yield 1; yield 2; }());
  return a === 1 && b === 2 && c === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-assign.generator.js: OK");
  } else {
    console.log("kangax-es6/destructuring-assign.generator.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-assign.generator.js: exception: " + e);
}
