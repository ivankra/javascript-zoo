// compat-table: ES6 > syntax > destructuring, assignment (medium) > trailing commas in object patterns
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a;
  ({a,} = {a:1});
  return a === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-assign.trailing-comma-object.js: OK");
  } else {
    console.log("kangax-es6/destructuring-assign.trailing-comma-object.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-assign.trailing-comma-object.js: exception: " + e);
}
