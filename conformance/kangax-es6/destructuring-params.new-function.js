// compat-table: ES6 > syntax > destructuring, parameters (medium) > new Function() support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Function("{a, x:b, y:e}","[c, d]",
    "return a === 1 && b === 2 && c === 3 && "
    + "d === 4 && e === void undefined;"
  )({a:1, x:2}, [3, 4]);
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.new-function.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.new-function.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.new-function.js: exception: " + e);
}
