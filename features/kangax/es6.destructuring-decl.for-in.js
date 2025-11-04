// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, declarations (medium) > in for-in loop heads
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  for(var [i, j, k] in { qux: 1 }) {
    return i === "q" && j === "u" && k === "x";
  }
}

try {
  if (testCode()) {
    console.log("es6.destructuring-decl.for-in.js: OK");
  } else {
    console.log("es6.destructuring-decl.for-in.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-decl.for-in.js: FAIL: " + e);
}