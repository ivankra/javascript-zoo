// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-generator-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
// compat-table: ES6 > functions > generators (large) > %GeneratorPrototype%.return
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function * generator(){
    yield 5; yield 6;
  };
  var iterator = generator();
  var item = iterator.next();
  var passed = item.value === 5 && item.done === false;
  item = iterator.return("quxquux");
  passed &= item.value === "quxquux" && item.done === true;
  item = iterator.next();
  passed &= item.value === void undefined && item.done === true;
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.generators.return.js: OK");
  } else {
    console.log("es6.generators.return.js: FAIL");
  }
} catch (e) {
  console.log("es6.generators.return.js: FAIL: " + e);
}