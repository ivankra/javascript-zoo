// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > parenthesised left-hand-side is a syntax error
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a, b;
  ({a,b} = {a:1,b:2});
  try {
    eval("({a,b}) = {a:3,b:4};");
  }
  catch(e) {
    return a === 1 && b === 2;
  }
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.parenthesised-error.js: OK");
  } else {
    console.log("es6.destructuring-assign.parenthesised-error.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.parenthesised-error.js: FAIL: " + e);
}