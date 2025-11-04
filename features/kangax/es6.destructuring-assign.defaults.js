// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, assignment (medium) > defaults
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a,b,c,d,e,f;
  ({a = 1, b = 0, z:c = 3} = {b:2, z:undefined});
  [d = 0, e = 5, f = 6] = [4,,undefined];
  return a === 1 && b === 2 && c === 3
    && d === 4 && e === 5 && f === 6;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-assign.defaults.js: OK");
  } else {
    console.log("es6.destructuring-assign.defaults.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-assign.defaults.js: FAIL: " + e);
}