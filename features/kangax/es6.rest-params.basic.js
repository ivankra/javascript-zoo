// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// compat-table: ES6 > syntax > rest parameters (medium) > basic functionality
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (foo, ...args) {
    return args instanceof Array && args + "" === "bar,baz";
  }("foo", "bar", "baz"));
}

try {
  if (testCode()) {
    console.log("es6.rest-params.basic.js: OK");
  } else {
    console.log("es6.rest-params.basic.js: FAIL");
  }
} catch (e) {
  console.log("es6.rest-params.basic.js: FAIL: " + e);
}