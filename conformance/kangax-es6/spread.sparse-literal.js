// compat-table: ES6 > syntax > spread syntax for iterable objects (large) > with sparse arrays, in array literals
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-argument-lists-runtime-semantics-argumentlistevaluation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = [...[,,]];
  return "0" in a && "1" in a && '' + a[0] + a[1] === "undefinedundefined";
}

try {
  if (testCode()) {
    console.log("kangax-es6/spread.sparse-literal.js: OK");
  } else {
    console.log("kangax-es6/spread.sparse-literal.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/spread.sparse-literal.js: exception: " + e);
}
