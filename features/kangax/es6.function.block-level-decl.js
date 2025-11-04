// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-functiondeclarationinstantiation
// compat-table: ES6 > bindings > block-level function declaration (small)
//
// Note that prior to ES6, it was recommended that ES5 implementations forbid block-level declarations in strict mode.
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  if (f() !== 1) return false;
  function f() { return 1; }
  {
    if (f() !== 2) return false;
    function f() { return 2; }
    if (f() !== 2) return false;
  }
  if (f() !== 1) return false;
  return true;
}

try {
  if (testCode()) {
    console.log("es6.function.block-level-decl.js: OK");
  } else {
    console.log("es6.function.block-level-decl.js: FAIL");
  }
} catch (e) {
  console.log("es6.function.block-level-decl.js: FAIL: " + e);
}