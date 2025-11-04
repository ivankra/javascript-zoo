// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > yield *, astral plane strings
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var iterator = (function * generator() {
    yield * "𠮷𠮶";
  }());
  var item = iterator.next();
  var passed = item.value === "𠮷" && item.done === false;
  item = iterator.next();
  passed &= item.value === "𠮶" && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.generators.yield-star.astral-string.js: OK");
  } else {
    console.log("es6.generators.yield-star.astral-string.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.yield-star.astral-string.js: FAIL: " + e);
}