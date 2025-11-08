// compat-table: ES6 > syntax > destructuring, assignment (medium) > chained iterable destructuring
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c,d;
  [a,b] = [c,d] = [1,2];
  return a === 1 && b === 2 && c === 1 && d === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-assign.chained-iterable.js: OK");
  } else {
    console.log("kangax-es6/destructuring-assign.chained-iterable.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-assign.chained-iterable.js: exception: " + e);
}
