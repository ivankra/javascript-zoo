// ES6: https://github.com/tc39/proposal-logical-assignment/
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
// compat-table: ES2016+ > 2021 features > Logical Assignment (small) > &&= basic support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  let a;
  let b = 0;
  let c = 1;
  a &&= 2;
  b &&= 2;
  c &&= 2;
  return typeof a === 'undefined' && b === 0 && c === 2;
}

try {
  if (testCode()) {
    console.log("es2021.logical-assignment.and.js: OK");
  } else {
    console.log("es2021.logical-assignment.and.js: FAIL");
  }
} catch (e) {
  console.log("es2021.logical-assignment.and.js: FAIL: " + e);
}