// compat-table: ES6 > functions > arrow functions (large) > "this" unchanged by call or apply
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
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
    console.log("kangax-es6/arrow.this-call-apply.js: OK");
  } else {
    console.log("kangax-es6/arrow.this-call-apply.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.this-call-apply.js: exception: " + e);
}
