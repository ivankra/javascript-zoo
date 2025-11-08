// compat-table: ES6 > built-in extensions > Number properties (small) > Number.isSafeInteger
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.isSafeInteger === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/Number.isSafeInteger.js: OK");
  } else {
    console.log("kangax-es6/Number.isSafeInteger.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Number.isSafeInteger.js: exception: " + e);
}
