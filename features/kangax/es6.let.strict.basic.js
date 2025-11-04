// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > basic support (strict mode)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  let foo = 123;
  return (foo === 123);
}

try {
  if (testCode()) {
    console.log("es6.let.strict.basic.js: OK");
  } else {
    console.log("es6.let.strict.basic.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.strict.basic.js: FAIL: " + e);
}