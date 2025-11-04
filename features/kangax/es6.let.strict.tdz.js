// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let
// compat-table: ES6 > bindings > let (medium) > temporal dead zone (strict mode)
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  var passed = (function(){ try {  qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  let qux = 456;
  fn();
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.let.strict.tdz.js: OK");
  } else {
    console.log("es6.let.strict.tdz.js: FAIL");
  }
} catch (e) {
  console.log("es6.let.strict.tdz.js: FAIL: " + e);
}