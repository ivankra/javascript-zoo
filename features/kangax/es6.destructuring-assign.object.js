// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > with objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var c,d,e;
  ({c, x:d, e} = {c:7, x:8});
  return c === 7 && d === 8 && e === void undefined;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.object.js: OK");
  } else {
    console.log("es6.destructuring-assign.object.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.object.js: FAIL: " + e);
}