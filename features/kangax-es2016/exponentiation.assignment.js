// compat-table: ES2016+ > 2016 features > exponentiation (**) operator (small) > assignment
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Exponentiation_(**)
// spec: http://www.ecma-international.org/ecma-262/7.0/index.html#sec-exp-operator
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = 2; a **= 3; return a === 8;
}

try {
  if (testCode()) {
    console.log("kangax-es2016/exponentiation.assignment.js: OK");
  } else {
    console.log("kangax-es2016/exponentiation.assignment.js: failed");
  }
} catch (e) {
  console.log("kangax-es2016/exponentiation.assignment.js: exception: " + e);
}
