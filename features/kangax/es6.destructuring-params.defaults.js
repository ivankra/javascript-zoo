// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, parameters (medium) > defaults
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function({a = 1, b = 0, c = 3, x:d = 0, y:e = 5},
      [f = 6, g = 0, h = 8]) {
    return a === 1 && b === 2 && c === 3 && d === 4 &&
      e === 5 && f === 6 && g === 7 && h === 8;
  }({b:2, c:undefined, x:4},[, 7, undefined]));
}

try {
  if (testCode()) {
    console.log("es6.destructuring-params.defaults.js: OK");
  } else {
    console.log("es6.destructuring-params.defaults.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-params.defaults.js: FAIL: " + e);
}