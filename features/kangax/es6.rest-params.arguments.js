// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// compat-table: ES6 > syntax > rest parameters (medium) > arguments object interaction
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (foo, ...args) {
    foo = "qux";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 3
      && arguments[0] === "foo"
      && arguments[1] === "bar"
      && arguments[2] === "baz";
  }("foo", "bar", "baz"));
}

try {
  if (testCode()) {
    console.log("es6.rest-params.arguments.js: OK");
  } else {
    console.log("es6.rest-params.arguments.js: FAIL");
  }
} catch (e) {
  console.log("es6.rest-params.arguments.js: FAIL: " + e);
}