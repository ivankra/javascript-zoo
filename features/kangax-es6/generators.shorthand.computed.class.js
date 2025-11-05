// compat-table: ES6 > functions > generators (large) > computed shorthand generators, classes
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var garply = "generator";
  class C {
    * [garply] () {
      yield 5; yield 6;
    }
  }
  var iterator = new C().generator();
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
    console.log("kangax-es6/generators.shorthand.computed.class.js: OK");
  } else {
    console.log("kangax-es6/generators.shorthand.computed.class.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.shorthand.computed.class.js: exception: " + e);
}
