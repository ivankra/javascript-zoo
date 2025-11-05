// compat-table: ES6 > syntax > rest parameters (medium) > can't be used in setters
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function (...args) {
    try {
      eval("({set e(...args){}})");
    } catch(e) {
      return true;
    }
  }());
}

try {
  if (testCode()) {
    console.log("kangax-es6/rest-params.no-setter.js: OK");
  } else {
    console.log("kangax-es6/rest-params.no-setter.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/rest-params.no-setter.js: exception: " + e);
}
