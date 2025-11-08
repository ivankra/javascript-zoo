// compat-table: ES6 > syntax > destructuring, declarations (medium) > in for-in loop heads
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
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
    console.log("kangax-es6/destructuring-decl.for-in.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.for-in.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.for-in.js: exception: " + e);
}
