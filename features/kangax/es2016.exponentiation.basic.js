// ES6: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-exp-operator
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation_(**)
// compat-table: ES2016+ > 2016 features > exponentiation (**) operator (small) > basic support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 2 ** 3 === 8 && -(5 ** 2) === -25 && (-5) ** 2 === 25;
}

try {
  if (testCode()) {
    console.log("es2016.exponentiation.basic.js: OK");
  } else {
    console.log("es2016.exponentiation.basic.js: FAIL");
  }
} catch (e) {
  console.log("es2016.exponentiation.basic.js: FAIL: " + e);
}