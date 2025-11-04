// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// compat-table: ES6 > built-in extensions > function "name" property (small) > function expressions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (function foo(){}).name === 'foo' &&
    (function(){}).name === '';
}

try {
  if (testCode()) {
    console.log("es6.Function.name.expression.js: OK");
  } else {
    console.log("es6.Function.name.expression.js: FAIL");
  }
} catch (e) {
  console.log("es6.Function.name.expression.js: FAIL: " + e);
}