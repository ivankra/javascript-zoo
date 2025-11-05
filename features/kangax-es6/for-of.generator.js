// compat-table: ES6 > syntax > for..of loops (large) > with generator instances
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-for-in-and-for-of-statements
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
    console.log("kangax-es6/for-of.generator.js: OK");
  } else {
    console.log("kangax-es6/for-of.generator.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/for-of.generator.js: exception: " + e);
}
