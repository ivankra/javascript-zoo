// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype%.throw
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = false;
  function * generator(){
    try {
      yield 5; yield 6;
    } catch(e) {
      passed = (e === "foo");
    }
  };
  var iterator = generator();
  iterator.next();
  iterator.throw("foo");
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.generators.throw.js: OK");
  } else {
    console.log("es6.generators.throw.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.throw.js: FAIL: " + e);
}