// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > with sparse arrays
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a, b;
  [a, , b] = [,,,];
  return a === void undefined && b === void undefined;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.sparse-array.js: OK");
  } else {
    console.log("es6.destructuring-assign.sparse-array.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.sparse-array.js: FAIL: " + e);
}