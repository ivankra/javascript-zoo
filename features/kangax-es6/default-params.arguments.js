// compat-table: ES6 > syntax > default function parameters (medium) > arguments object interaction
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
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
    console.log("kangax-es6/default-params.arguments.js: OK");
  } else {
    console.log("kangax-es6/default-params.arguments.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/default-params.arguments.js: exception: " + e);
}
