// compat-table: ES6 > syntax > destructuring, parameters (medium) > 'arguments' interaction
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function({a, x:b, y:e}, [c, d]) {
    return arguments[0].a === 1 && arguments[0].x === 2
      && !("y" in arguments[0]) && arguments[1] + '' === "3,4";
  }({a:1, x:2}, [3, 4]));
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-params.arguments.js: OK");
  } else {
    console.log("kangax-es6/destructuring-params.arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-params.arguments.js: exception: " + e);
}
