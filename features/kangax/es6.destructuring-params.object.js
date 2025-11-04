// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, parameters (medium) > with objects
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function({c, x:d, e}) {
    return c === 7 && d === 8 && e === void undefined;
  }({c:7, x:8});
}

try {
  if (testCode()) {
    console.log("es6.destructuring-params.object.js: OK");
  } else {
    console.log("es6.destructuring-params.object.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-params.object.js: FAIL: " + e);
}