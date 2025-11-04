// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// compat-table: ES6 > bindings > const (medium) > cannot be in statements (strict mode)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  const bar = 1;
  try {
    Function("'use strict'; if(true) const baz = 1;")();
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("es6.const.strict.no-statement.js: OK");
  } else {
    console.log("es6.const.strict.no-statement.js: FAIL");
  }
} catch (e) {
  console.log("es6.const.strict.no-statement.js: FAIL: " + e);
}