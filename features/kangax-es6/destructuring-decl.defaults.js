// compat-table: ES6 > syntax > destructuring, declarations (medium) > defaults
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var {a = 1, b = 0, z:c = 3} = {b:2, z:undefined};
  var [d = 0, e = 5, f = 6] = [4,,undefined];
  return a === 1 && b === 2 && c === 3
    && d === 4 && e === 5 && f === 6;
}

try {
  if (testCode()) {
    console.log("kangax-es6/destructuring-decl.defaults.js: OK");
  } else {
    console.log("kangax-es6/destructuring-decl.defaults.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/destructuring-decl.defaults.js: exception: " + e);
}
