// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// compat-table: ES6 > syntax > for..of loops (large) > with arrays
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var arr = [5];
  for (var item of arr)
    return item === 5;
}

try {
  if (testCode()) {
    console.log("es6.for-of.array.js: OK");
  } else {
    console.log("es6.for-of.array.js: FAIL");
  }
} catch (e) {
  console.log("es6.for-of.array.js: FAIL: " + e);
}