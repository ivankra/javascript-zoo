// compat-table: ES6 > syntax > rest parameters (medium) > arguments object interaction
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
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
    console.log("kangax-es6/rest-params.arguments.js: OK");
  } else {
    console.log("kangax-es6/rest-params.arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/rest-params.arguments.js: exception: " + e);
}
