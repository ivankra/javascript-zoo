// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype%.constructor
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * g (){}
  var iterator = new g.constructor("a","b","c","yield a; yield b; yield c;")(5,6,7);
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.next();
  passed &= item.value === 6 && item.done === false;
  item = iterator.next();
  passed &= item.value === 7 && item.done === false;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;

  passed &= g.constructor === (function*(){}).constructor;
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.constructor.js: OK");
  } else {
    console.log("kangax-es6/generators.constructor.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.constructor.js: exception: " + e);
}
