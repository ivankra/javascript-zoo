// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype% prototype chain
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generatorFn(){}
  var g = generatorFn();
  var ownProto = Object.getPrototypeOf(g);
  var passed = ownProto === generatorFn.prototype;

  var sharedProto = Object.getPrototypeOf(ownProto);
  var iterProto = Object.getPrototypeOf(sharedProto);

  passed &= iterProto.hasOwnProperty(Symbol.iterator) &&
    !sharedProto     .hasOwnProperty(Symbol.iterator) &&
    !ownProto        .hasOwnProperty(Symbol.iterator) &&
    g[Symbol.iterator]() === g;

  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/generators.prototype-chain.js: OK");
  } else {
    console.log("kangax-es6/generators.prototype-chain.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/generators.prototype-chain.js: exception: " + e);
}
