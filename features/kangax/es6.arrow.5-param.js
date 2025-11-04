// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > multiple parameters
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var c = (v, w, x, y, z) => "" + v + w + x + y + z;
  return (c(6, 5, 4, 3, 2) === "65432");
}

try {
  if (testCode()) {
    console.log("es6.arrow.5-param.js: OK");
  } else {
    console.log("es6.arrow.5-param.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.5-param.js: FAIL: " + e);
}