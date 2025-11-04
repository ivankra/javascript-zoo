// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// compat-table: ES6 > bindings > const (medium) > temporal dead zone
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var passed = (function(){ try { qux; } catch(e) { return true; }}());
  function fn() { passed &= qux === 456; }
  const qux = 456;
  fn();
  return passed;
}

try {
  if (testCode()) {
    console.log("es6.const.tdz.js: OK");
  } else {
    console.log("es6.const.tdz.js: FAIL");
  }
} catch (e) {
  console.log("es6.const.tdz.js: FAIL: " + e);
}