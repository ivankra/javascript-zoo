// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// compat-table: ES6 > syntax > default function parameters (medium) > arguments object interaction
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (a = "baz", b = "qux", c = "quux") {
    a = "corge";
    // The arguments object is not mapped to the
    // parameters, even outside of strict mode.
    return arguments.length === 2
      && arguments[0] === "foo"
      && arguments[1] === "bar";
  }("foo", "bar"));
}

try {
  if (testCode()) {
    console.log("es6.default-params.arguments.js: OK");
  } else {
    console.log("es6.default-params.arguments.js: FAIL");
  }
} catch (e) {
  console.log("es6.default-params.arguments.js: FAIL: " + e);
}