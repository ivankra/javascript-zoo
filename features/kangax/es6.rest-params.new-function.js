// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// compat-table: ES6 > syntax > rest parameters (medium) > new Function() support
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Function("a", "...b",
    "return b instanceof Array && a+b === 'foobar,baz';"
  )('foo','bar','baz');
}

try {
  if (testCode()) {
    console.log("es6.rest-params.new-function.js: OK");
  } else {
    console.log("es6.rest-params.new-function.js: FAIL");
  }
} catch (e) {
  console.log("es6.rest-params.new-function.js: FAIL: " + e);
}