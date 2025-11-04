// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-template-literals
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
// compat-table: ES6 > syntax > template literals (large) > toString conversion
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  var a = {
    toString: function() { return "foo"; },
    valueOf: function() { return "bar"; }
  };
  return `${a}` === "foo";
}

try {
  if (testCode()) {
    console.log("es6.template.toString.js: OK");
  } else {
    console.log("es6.template.toString.js: FAIL");
  }
} catch (e) {
  console.log("es6.template.toString.js: FAIL: " + e);
}