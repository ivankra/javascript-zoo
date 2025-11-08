// compat-table: ES6 > syntax > destructuring, assignment (medium) > nested rest
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = [1, 2, 3], first, last;
  [first, ...[a[2], last]] = a;
  return first === 1 && last === 3 && (a + "") === "1,2,2";
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-assign.nested-rest.js: OK");
  } else {
    console.log("kangax-es6/destructuring-assign.nested-rest.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-assign.nested-rest.js: exception: " + e);
}
