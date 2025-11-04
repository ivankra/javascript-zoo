// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
// compat-table: ES6 > built-in extensions > Number properties (small) > Number.EPSILON
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.EPSILON === 'number';
}

try {
  if (testCode()) {
    console.log("es6.Number.EPSILON.js: OK");
  } else {
    console.log("es6.Number.EPSILON.js: FAIL");
  }
} catch (e) {
  console.log("es6.Number.EPSILON.js: FAIL: " + e);
}