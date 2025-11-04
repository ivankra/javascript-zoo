// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, declarations (medium) > in for-of loop heads
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  for(var [i, j, k] of [[1,2,3]]) {
    return i === 1 && j === 2 && k === 3;
  }
}

try {
  if (testCode()) {
    console.log("es6.destructuring-decl.for-of.js: OK");
  } else {
    console.log("es6.destructuring-decl.for-of.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-decl.for-of.js: FAIL: " + e);
}