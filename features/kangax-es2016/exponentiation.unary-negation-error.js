// compat-table: ES2016+ > 2016 features > exponentiation (**) operator (small) > early syntax error for unary negation without parens
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation_(**)
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-exp-operator
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  if (2 ** 3 !== 8) {
    return false;
  }
  try {
    Function("-5 ** 2")();
  } catch (e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es2016/exponentiation.unary-negation-error.js: OK");
  } else {
    console.log("kangax-es2016/exponentiation.unary-negation-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/exponentiation.unary-negation-error.js: exception: " + e);
}
