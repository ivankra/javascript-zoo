// compat-table: ES6 > bindings > let (medium) > cannot be in statements (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  let bar = 1;
  try {
    Function("'use strict'; if(true) let baz = 1;")();
  } catch(e) {
    return true;
  }
}

try {
  if (testCode()) {
    console.log("kangax-es6/let.strict.no-statement.js: OK");
  } else {
    console.log("kangax-es6/let.strict.no-statement.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/let.strict.no-statement.js: exception: " + e);
}
