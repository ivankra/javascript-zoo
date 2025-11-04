// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
// compat-table: ES6 > built-in extensions > Number properties (small) > Number.isSafeInteger
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.isSafeInteger === 'function';
}

try {
  if (testCode()) {
    console.log("es6.Number.isSafeInteger.js: OK");
  } else {
    console.log("es6.Number.isSafeInteger.js: FAIL");
  }
} catch (e) {
  console.log("es6.Number.isSafeInteger.js: FAIL: " + e);
}