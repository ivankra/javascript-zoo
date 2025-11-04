// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, parameters (medium) > defaults, new Function() support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Function("{a = 1, b = 0, c = 3, x:d = 0, y:e = 5}",
    "return a === 1 && b === 2 && c === 3 && d === 4 && e === 5;"
  )({b:2, c:undefined, x:4});
}

try {
  if (testCode()) {
    console.log("es6.destructuring-params.defaults-new-function.js: OK");
  } else {
    console.log("es6.destructuring-params.defaults-new-function.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-params.defaults-new-function.js: FAIL: " + e);
}