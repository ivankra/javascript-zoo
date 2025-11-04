// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > "this" unchanged by call or apply
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var d = { x : "foo", y : function() { return () => this.x; }};
  var e = { x : "bar" };
  return d.y().call(e) === "foo" && d.y().apply(e) === "foo";
}

try {
  if (testCode()) {
    console.log("es6.arrow.this-call-apply.js: OK");
  } else {
    console.log("es6.arrow.this-call-apply.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.this-call-apply.js: FAIL: " + e);
}