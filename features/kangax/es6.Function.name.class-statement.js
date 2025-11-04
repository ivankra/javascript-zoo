// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// compat-table: ES6 > built-in extensions > function "name" property (small) > class statements
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  class foo {};
  class bar { static name() {} };
  return foo.name === "foo" &&
    typeof bar.name === "function";
}

try {
  if (testCode()) {
    console.log("es6.Function.name.class-statement.js: OK");
  } else {
    console.log("es6.Function.name.class-statement.js: FAIL");
  }
} catch (e) {
  console.log("es6.Function.name.class-statement.js: FAIL: " + e);
}