// compat-table: ES5 > Strict mode (large) > deleting non-configurable properties is a TypeError
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { delete Object.prototype; } catch (err) { return err instanceof TypeError; }
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.delete-non-configurable-error.js: OK");
  } else {
    console.log("kangax-es5/strict.delete-non-configurable-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.delete-non-configurable-error.js: exception: " + e);
}
