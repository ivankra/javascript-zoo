// compat-table: ES6 > syntax > rest parameters (medium) > function 'length' property
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return function(a, ...b){}.length === 1 && function(...c){}.length === 0;
}

try {
  if (testCode()) {
    console.log("kangax-es6/rest-params.length.js: OK");
  } else {
    console.log("kangax-es6/rest-params.length.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/rest-params.length.js: exception: " + e);
}
