// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, declarations (medium) > multiples in a single var statement
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var [a,b] = [5,6], {c,d} = {c:7,d:8};
  return a === 5 && b === 6 && c === 7 && d === 8;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-decl.multiple-var.js: OK");
  } else {
    console.log("es6.destructuring-decl.multiple-var.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-decl.multiple-var.js: FAIL: " + e);
}