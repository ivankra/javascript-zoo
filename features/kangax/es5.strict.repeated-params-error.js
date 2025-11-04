// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > repeated parameter names is a SyntaxError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('function f(x, x) { }'); } catch (err) { return err instanceof SyntaxError; }
}

try {
  if (testCode()) {
    console.log("es5.strict.repeated-params-error.js: OK");
  } else {
    console.log("es5.strict.repeated-params-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.repeated-params-error.js: FAIL: " + e);
}