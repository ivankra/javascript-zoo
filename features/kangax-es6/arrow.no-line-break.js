// compat-table: ES6 > functions > arrow functions (large) > no line break between params and <code>=></code>
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-arrow-function-definitions
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return (() => {
    try { Function("x\n => 2")(); } catch(e) { return true; }
  })();
}

try {
  if (testCode()) {
    console.log("kangax-es6/arrow.no-line-break.js: OK");
  } else {
    console.log("kangax-es6/arrow.no-line-break.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/arrow.no-line-break.js: exception: " + e);
}
