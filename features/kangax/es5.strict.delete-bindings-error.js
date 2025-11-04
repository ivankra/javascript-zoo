// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > deleting bindings is a SyntaxError
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
    console.log("es5.strict.delete-bindings-error.js: OK");
  } else {
    console.log("es5.strict.delete-bindings-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.delete-bindings-error.js: FAIL: " + e);
}