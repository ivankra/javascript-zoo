// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > 1 parameter, no brackets
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var b = x => x + "foo";
  return (b("fee fie foe ") === "fee fie foe foo");
}

try {
  if (testCode()) {
    console.log("es6.arrow.1-param.js: OK");
  } else {
    console.log("es6.arrow.1-param.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.1-param.js: FAIL: " + e);
}