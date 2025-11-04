// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-setfunctionname
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
// compat-table: ES6 > built-in extensions > function "name" property (small) > bound functions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  function foo() {};
  return foo.bind({}).name === "bound foo" &&
    (function(){}).bind({}).name === "bound ";
}

try {
  if (testCode()) {
    console.log("es6.Function.name.bound.js: OK");
  } else {
    console.log("es6.Function.name.bound.js: FAIL");
  }
} catch (e) {
  console.log("es6.Function.name.bound.js: FAIL: " + e);
}