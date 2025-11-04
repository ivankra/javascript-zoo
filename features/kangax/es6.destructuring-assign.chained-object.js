// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > chained object destructuring
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c,d;
  ({a,b} = {c,d} = {a:1,b:2,c:3,d:4});
  return a === 1 && b === 2 && c === 3 && d === 4;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.chained-object.js: OK");
  } else {
    console.log("es6.destructuring-assign.chained-object.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.chained-object.js: FAIL: " + e);
}