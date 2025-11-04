// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > "with" is a SyntaxError
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
    console.log("es5.strict.with-error.js: OK");
  } else {
    console.log("es5.strict.with-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.with-error.js: FAIL: " + e);
}