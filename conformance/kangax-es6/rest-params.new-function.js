// compat-table: ES6 > syntax > rest parameters (medium) > new Function() support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
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
    console.log("kangax-es6/rest-params.new-function.js: OK");
  } else {
    console.log("kangax-es6/rest-params.new-function.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/rest-params.new-function.js: exception: " + e);
}
