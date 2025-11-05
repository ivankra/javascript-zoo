// compat-table: ES6 > built-in extensions > Array static methods (medium) > Array.from, generator instances
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-array-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var iterable = (function*(){ yield 1; yield 2; yield 3; }());
  return Array.from(iterable) + '' === "1,2,3";
}

try {
  if (testCode()) {
    console.log("kangax-es6/Array.from.generator.js: OK");
  } else {
    console.log("kangax-es6/Array.from.generator.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Array.from.generator.js: exception: " + e);
}
