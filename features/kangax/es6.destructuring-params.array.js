// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, parameters (medium) > with arrays
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function([a, , [b], c]) {
    return a === 5 && b === 6 && c === void undefined;
  }([5, null, [6]]);
}

try {
  if (testCode()) {
    console.log("es6.destructuring-params.array.js: OK");
  } else {
    console.log("es6.destructuring-params.array.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-params.array.js: FAIL: " + e);
}