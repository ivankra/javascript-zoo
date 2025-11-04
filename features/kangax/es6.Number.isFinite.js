// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite
// compat-table: ES6 > built-in extensions > Number properties (small) > Number.isFinite
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.isFinite === 'function';
}

try {
  if (testCode()) {
    console.log("es6.Number.isFinite.js: OK");
  } else {
    console.log("es6.Number.isFinite.js: FAIL");
  }
} catch (e) {
  console.log("es6.Number.isFinite.js: FAIL: " + e);
}