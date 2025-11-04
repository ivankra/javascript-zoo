// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > arguments.callee is a TypeError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { arguments.callee; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("es5.strict.arguments-callee-error.js: OK");
  } else {
    console.log("es5.strict.arguments-callee-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.arguments-callee-error.js: FAIL: " + e);
}