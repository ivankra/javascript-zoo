// compat-table: ES6 > syntax > destructuring, assignment (medium) > with strings
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
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
    console.log("kangax-es6/destructuring-assign.string.js: OK");
  } else {
    console.log("kangax-es6/destructuring-assign.string.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-assign.string.js: exception: " + e);
}
