// compat-table: ES6 > functions > generators (large) > string-keyed shorthand generator methods
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var o = {
    * "foo bar"() {
      yield 5; yield 6;
    }
  };
  var iterator = o["foo bar"]();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.shorthand.string-keyed.js: OK");
  } else {
    console.log("kangax-es6/generators.shorthand.string-keyed.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.shorthand.string-keyed.js: exception: " + e);
}
