// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// compat-table: ES6 > syntax > default function parameters (medium) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (a = 1, b = 2) { return a === 3 && b === 2; }(3));
}

try {
  if (testCode()) {
    console.log("es6.default-params.basic.js: OK");
  } else {
    console.log("es6.default-params.basic.js: FAIL");
  }
} catch (e) {
  console.log("es6.default-params.basic.js: FAIL: " + e);
}