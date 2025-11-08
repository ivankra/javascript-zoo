// compat-table: ES6 > syntax > destructuring, parameters (medium) > with sparse arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function([a, , b]) {
    return a === void undefined && b === void undefined;
  }([,,,]);
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.sparse-array.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.sparse-array.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.sparse-array.js: exception: " + e);
}
