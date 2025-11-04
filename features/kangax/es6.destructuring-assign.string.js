// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > with strings
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c;
  [a, b, c] = "ab";
  return a === "a" && b === "b" && c === void undefined;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.string.js: OK");
  } else {
    console.log("es6.destructuring-assign.string.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.string.js: FAIL: " + e);
}