// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, declarations (medium) > with arrays
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var [a, , [b], c] = [5, null, [6]];
  return a === 5 && b === 6 && c === void undefined;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-decl.array.js: OK");
  } else {
    console.log("es6.destructuring-decl.array.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-decl.array.js: FAIL: " + e);
}