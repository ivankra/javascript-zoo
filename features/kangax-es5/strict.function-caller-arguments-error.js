// compat-table: ES5 > Strict mode (large) > (function(){}).caller and (function(){}).arguments is a TypeError
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try { (function(){}).caller;    return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  try { (function(){}).arguments; return false; } catch (err) { if (!(err instanceof TypeError)) return false; }
  return true;
}

try {
  if (testCode()) {
    console.log("kangax-es5/strict.function-caller-arguments-error.js: OK");
  } else {
    console.log("kangax-es5/strict.function-caller-arguments-error.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/strict.function-caller-arguments-error.js: exception: " + e);
}
