// compat-table: ES6 > built-in extensions > Number properties (small) > Number.isNaN
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Number.isNaN === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es6/Number.isNaN.js: OK");
  } else {
    console.log("kangax-es6/Number.isNaN.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Number.isNaN.js: exception: " + e);
}
