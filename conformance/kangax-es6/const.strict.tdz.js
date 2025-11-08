// compat-table: ES6 > bindings > const (medium) > temporal dead zone (strict mode)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  'use strict';
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  const qux = 456;
  fn();
  return passed;
}

try {
  if (testCode()) {
    console.log("kangax-es6/const.strict.tdz.js: OK");
  } else {
    console.log("kangax-es6/const.strict.tdz.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/const.strict.tdz.js: exception: " + e);
}
