// compat-table: ES5 > Strict mode (large) > "this" is not coerced to object in primitive methods
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  return (function(){ return typeof this === 'string' }).call('')
    && (function(){ return typeof this === 'number' }).call(1)
    && (function(){ return typeof this === 'boolean' }).call(true);
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.this-not-coerced-methods.js: OK");
  } else {
    console.log("kangax-es5/strict.this-not-coerced-methods.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.this-not-coerced-methods.js: exception: " + e);
}
