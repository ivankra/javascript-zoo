// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > with astral plane strings, in function calls
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Array(..."𠮷𠮶")[0] === "𠮷";
}

try {
  if (testCode()) {
    console.log("es6.spread.astral-call.js: OK");
  } else {
    console.log("es6.spread.astral-call.js: FAIL");
  }
} catch (e) {
  console.log("es6.spread.astral-call.js: FAIL: " + e);
}