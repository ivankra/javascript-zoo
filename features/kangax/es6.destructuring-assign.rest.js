// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > rest
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c,d;
  [a, ...b] = [3, 4, 5];
  [c, ...d] = [6];
  return a === 3 && b instanceof Array && (b + "") === "4,5" &&
     c === 6 && d instanceof Array && d.length === 0;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.rest.js: OK");
  } else {
    console.log("es6.destructuring-assign.rest.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.rest.js: FAIL: " + e);
}