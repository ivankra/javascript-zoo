// compat-table: ES6 > annex b > non-strict function semantics (tiny) > labeled function statements
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-labelled-function-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  // Note: only available outside of strict mode.
  if (!this) return false;

  label: function foo() { return 2; }
  return foo() === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.function.labeled.js: OK");
  } else {
    console.log("kangax-es6/annex-b.function.labeled.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.function.labeled.js: exception: " + e);
}
