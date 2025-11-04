// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// compat-table: ES6 > syntax > for..of loops (large) > with generator instances
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var result = "";
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  for (var item of iterable) {
    result += item;
  }
  return result === "123";
}

try {
  if (testCode()) {
    console.log("es6.for-of.generator.js: OK");
  } else {
    console.log("es6.for-of.generator.js: FAIL");
  }
} catch (e) {
  console.log("es6.for-of.generator.js: FAIL: " + e);
}