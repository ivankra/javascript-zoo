// compat-table: ES5 > Strict mode (large) > "with" is a SyntaxError
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('with({}){}'); } catch (err) { return err instanceof SyntaxError; }
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.with-error.js: OK");
  } else {
    console.log("kangax-es5/strict.with-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.with-error.js: exception: " + e);
}
