// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-labelled-function-declarations
// compat-table: ES6 > annex b > non-strict function semantics (tiny) > function statements in if-statement clauses
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Note: only available outside of strict mode.
  if (!this) return false;

  if(true) function foo() { return 2; }
  if(false) {} else function bar() { return 3; }
  if(true) function baz() { return 4; } else {}
  if(false) function qux() { return 5; } else function qux() { return 6; }
  return foo() === 2 && bar() === 3 && baz() === 4 && qux() === 6;
}

try {
  if (testCode()) {
    console.log("annexb.es6.function.if-statement.js: OK");
  } else {
    console.log("annexb.es6.function.if-statement.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.function.if-statement.js: FAIL: " + e);
}