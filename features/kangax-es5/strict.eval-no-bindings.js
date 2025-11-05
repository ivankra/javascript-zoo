// compat-table: ES5 > Strict mode (large) > eval() can't create bindings
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('var __some_unique_variable;'); __some_unique_variable; } catch (err) { return err instanceof ReferenceError; }
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.eval-no-bindings.js: OK");
  } else {
    console.log("kangax-es5/strict.eval-no-bindings.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.eval-no-bindings.js: exception: " + e);
}
