// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype%
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generatorFn(){}
  var ownProto = Object.getPrototypeOf(generatorFn());
  var passed = ownProto === generatorFn.prototype;

  var sharedProto = Object.getPrototypeOf(ownProto);
  passed &= sharedProto !== Object.prototype &&
    sharedProto === Object.getPrototypeOf(function*(){}.prototype) &&
    sharedProto.hasOwnProperty('next');

  return passed;
}

try {
  if (testCode()) {
    console.log("es6.generators.prototype.js: OK");
  } else {
    console.log("es6.generators.prototype.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.prototype.js: FAIL: " + e);
}