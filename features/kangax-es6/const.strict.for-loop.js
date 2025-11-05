// compat-table: ES6 > bindings > const (medium) > for loop statement scope (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  const baz = 1;
  for(const baz = 0; false;) {}
  return baz === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/const.strict.for-loop.js: OK");
  } else {
    console.log("kangax-es6/const.strict.for-loop.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/const.strict.for-loop.js: exception: " + e);
}
