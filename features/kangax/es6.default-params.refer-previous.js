// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// compat-table: ES6 > syntax > default function parameters (medium) > defaults can refer to previous params
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (a, b = a) { return b === 5; }(5));
}

try {
  if (testCode()) {
    console.log("es6.default-params.refer-previous.js: OK");
  } else {
    console.log("es6.default-params.refer-previous.js: FAIL");
  }
} catch (e) {
  console.log("es6.default-params.refer-previous.js: FAIL: " + e);
}