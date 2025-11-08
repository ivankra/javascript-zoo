// compat-table: ES5 > Strict mode (large) > arguments is unmapped
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  return (function(x){
    x = 2;
    return arguments[0] === 1;
  })(1) && (function(x){
    arguments[0] = 2;
    return x === 1;
  })(1);
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.arguments-unmapped.js: OK");
  } else {
    console.log("kangax-es5/strict.arguments-unmapped.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.arguments-unmapped.js: exception: " + e);
}
