// compat-table: ES6 > syntax > default function parameters (medium) > new Function() support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return new Function("a = 1", "b = 2",
    "return a === 3 && b === 2;"
  )(3);
}

try {
  if (testCode()) {
    console.log("kangax-es6/default-params.new-function.js: OK");
  } else {
    console.log("kangax-es6/default-params.new-function.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/default-params.new-function.js: exception: " + e);
}
