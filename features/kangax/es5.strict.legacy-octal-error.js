// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > legacy octal is a SyntaxError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('010');     return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  try { eval('"\\010"'); return false; } catch (err) { if (!(err instanceof SyntaxError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("es5.strict.legacy-octal-error.js: OK");
  } else {
    console.log("es5.strict.legacy-octal-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.legacy-octal-error.js: FAIL: " + e);
}