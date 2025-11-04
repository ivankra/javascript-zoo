// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
// compat-table: ES6 > built-in extensions > Number properties (small) > Number.isNaN
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.isNaN === 'function';
}

try {
  if (testCode()) {
    console.log("es6.Number.isNaN.js: OK");
  } else {
    console.log("es6.Number.isNaN.js: FAIL");
  }
} catch (e) {
  console.log("es6.Number.isNaN.js: FAIL: " + e);
}