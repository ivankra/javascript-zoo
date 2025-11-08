// compat-table: ES6 > syntax > destructuring, declarations (medium) > with arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
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
    console.log("kangax-es6/destructuring-decl.array.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.array.js: exception: " + e);
}
