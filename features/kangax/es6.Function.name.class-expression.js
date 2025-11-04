// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// compat-table: ES6 > built-in extensions > function "name" property (small) > class expressions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return class foo {}.name === "foo" &&
    typeof class bar { static name() {} }.name === "function";
}

try {
  if (testCode()) {
    console.log("es6.Function.name.class-expression.js: OK");
  } else {
    console.log("es6.Function.name.class-expression.js: FAIL");
  }
} catch (e) {
  console.log("es6.Function.name.class-expression.js: FAIL: " + e);
}