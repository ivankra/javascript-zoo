// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > with generator instances, in arrays
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var iterable = (function*(){ yield "b"; yield "c"; yield "d"; }());
  return ["a", ...iterable, "e"][3] === "d";
}

try {
  if (testCode()) {
    console.log("kangax-es6/spread.generator-literal.js: OK");
  } else {
    console.log("kangax-es6/spread.generator-literal.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/spread.generator-literal.js: exception: " + e);
}
