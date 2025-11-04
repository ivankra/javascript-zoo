// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-destructuring-assignment
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
// compat-table: ES6 > syntax > destructuring, declarations (medium) > nested
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var [e, {x:f, g}] = [9, {x:10}];
  var {h, x:[i]} = {h:11, x:[12]};
  return e === 9 && f === 10 && g === void undefined
    && h === 11 && i === 12;
}

try {
  if (testCode()) {
    console.log("es6.destructuring-decl.nested.js: OK");
  } else {
    console.log("es6.destructuring-decl.nested.js: FAIL");
  }
} catch (e) {
  console.log("es6.destructuring-decl.nested.js: FAIL: " + e);
}