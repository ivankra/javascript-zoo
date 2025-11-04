// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > empty patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  [] = [1,2];
  ({} = {a:1,b:2});
  return true;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.empty-patterns.js: OK");
  } else {
    console.log("es6.destructuring-assign.empty-patterns.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.empty-patterns.js: FAIL: " + e);
}