// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-labelled-function-declarations
// compat-table: ES6 > annex b > non-strict function semantics (tiny) > hoisted block-level function declaration
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Note: only available outside of strict mode.
  if (!this) return false;
  var passed = f() === 1;
  function f() { return 1; }

  passed &= typeof g === 'undefined';
  { function g() { return 1; } }
  passed &= g() === 1;

  passed &= h() === 2;
  { function h() { return 1; } }
  function h() { return 2; }
  passed &= h() === 1;

  return passed;
}

try {
  if (testCode()) {
    console.log("annexb.es6.function.hoisted-block-level.js: OK");
  } else {
    console.log("annexb.es6.function.hoisted-block-level.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.function.hoisted-block-level.js: FAIL: " + e);
}