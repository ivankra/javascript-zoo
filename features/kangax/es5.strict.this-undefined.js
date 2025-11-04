// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > "this" is undefined in functions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  return this === void undefined && (function(){ return this === void undefined; }).call();
}

try {
  if (testCode()) {
    console.log("es5.strict.this-undefined.js: OK");
  } else {
    console.log("es5.strict.this-undefined.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.this-undefined.js: FAIL: " + e);
}