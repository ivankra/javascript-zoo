// compat-table: ES6 > bindings > const (medium) > scope shadow resolution (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  try {
      { const bar = 456; }
      const bar = 123;
      return bar === 123;
  } catch(e) {
    return false;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/const.strict.shadow.js: OK");
  } else {
    console.log("kangax-es6/const.strict.shadow.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/const.strict.shadow.js: exception: " + e);
}
