// compat-table: ES6 > functions > arrow functions (large) > lexical "this" binding
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var d = { x : "bar", y : function() { return z => this.x + z; }}.y();
  var e = { x : "baz", y : d };
  return d("ley") === "barley" && e.y("ley") === "barley";
}

try {
  if (testCode()) {
    console.log("kangax-es6/arrow.lexical-this.js: OK");
  } else {
    console.log("kangax-es6/arrow.lexical-this.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.lexical-this.js: exception: " + e);
}
