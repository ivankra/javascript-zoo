// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
// compat-table: ES5 > Strict mode (large) > assignment to unresolvable identifiers is a ReferenceError
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { eval('__i_dont_exist = 1'); } catch (err) { return err instanceof ReferenceError; }
}

try {
  if (testCode()) {
    console.log("es5.strict.assignment-unresolvable-error.js: OK");
  } else {
    console.log("es5.strict.assignment-unresolvable-error.js: FAIL");
  }
} catch (e) {
  console.log("es5.strict.assignment-unresolvable-error.js: FAIL: " + e);
}