// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype%
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
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
    console.log("kangax-es6/generators.prototype.js: OK");
  } else {
    console.log("kangax-es6/generators.prototype.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.prototype.js: exception: " + e);
}
