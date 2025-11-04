// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// compat-table: ES6 > syntax > rest parameters (medium) > function 'length' property
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function(a, ...b){}.length === 1 && function(...c){}.length === 0;
}

try {
  if (testCode()) {
    console.log("es6.rest-params.length.js: OK");
  } else {
    console.log("es6.rest-params.length.js: FAIL");
  }
} catch (e) {
  console.log("es6.rest-params.length.js: FAIL: " + e);
}