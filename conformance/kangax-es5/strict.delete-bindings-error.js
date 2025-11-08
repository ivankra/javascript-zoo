// compat-table: ES5 > Strict mode (large) > deleting bindings is a SyntaxError
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('var x; delete x;'); } catch (err) { return err instanceof SyntaxError; }
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.delete-bindings-error.js: OK");
  } else {
    console.log("kangax-es5/strict.delete-bindings-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.delete-bindings-error.js: exception: " + e);
}
