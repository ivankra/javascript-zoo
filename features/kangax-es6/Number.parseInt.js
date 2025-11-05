// compat-table: ES6 > built-in extensions > Number properties (small) > Number.parseInt
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-isfinite-number
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var actualGlobal = Function('return this')();
  return typeof Number.parseInt === 'function'
    && Number.parseInt === actualGlobal.parseInt;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Number.parseInt.js: OK");
  } else {
    console.log("kangax-es6/Number.parseInt.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Number.parseInt.js: exception: " + e);
}
