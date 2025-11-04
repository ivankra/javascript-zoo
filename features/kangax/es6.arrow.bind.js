// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// compat-table: ES6 > functions > arrow functions (large) > can't be bound, can be curried
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var d = { x : "bar", y : function() { return z => this.x + z; }};
  var e = { x : "baz" };
  return d.y().bind(e, "ley")() === "barley";
}

try {
  if (testCode()) {
    console.log("es6.arrow.bind.js: OK");
  } else {
    console.log("es6.arrow.bind.js: FAIL");
  }
} catch (e) {
  console.log("es6.arrow.bind.js: FAIL: " + e);
}