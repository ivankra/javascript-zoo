// compat-table: ES6 > bindings > const (medium) > basic support
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-let-and-const-declarations
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const foo = 123;
  return (foo === 123);
}

try {
  if (testCode()) {
    console.log("kangax-es6/const.basic.js: OK");
  } else {
    console.log("kangax-es6/const.basic.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/const.basic.js: exception: " + e);
}
