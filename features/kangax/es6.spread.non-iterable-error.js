// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > spreading non-iterables is a runtime error
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  try {
    Math.max(...2);
  } catch(e) {
    return Math.max(...[1, 2, 3]) === 3;
  }
}

try {
  if (testCode()) {
    console.log("es6.spread.non-iterable-error.js: OK");
  } else {
    console.log("es6.spread.non-iterable-error.js: FAIL");
  }
} catch (e) {
  console.log("es6.spread.non-iterable-error.js: FAIL: " + e);
}