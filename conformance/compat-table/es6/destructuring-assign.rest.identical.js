// compat-table: ES6 > syntax > destructuring, assignment (medium) > rest with identical number of elements in RHS
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c;
  [a, ...b] = [3, 4];
  [...c] = [5];
  return a === 3 && b instanceof Array && (b + "") === "4" &&
     c instanceof Array && (c + "") === "5";
}

try {
  if (testCode()) {
    console.log("compat-table/es6/destructuring-assign.rest.identical.js: OK");
  } else {
    console.log("compat-table/es6/destructuring-assign.rest.identical.js: failed");
  }
} catch (e) {
  console.log("compat-table/es6/destructuring-assign.rest.identical.js: exception: " + e);
}
