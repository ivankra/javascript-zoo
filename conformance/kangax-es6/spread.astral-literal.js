// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > with astral plane strings, in array literals
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return [..."𠮷𠮶"][0] === "𠮷";
}

try {
  if (testCode()) {
    console.log("kangax-es6/spread.astral-literal.js: OK");
  } else {
    console.log("kangax-es6/spread.astral-literal.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/spread.astral-literal.js: exception: " + e);
}
