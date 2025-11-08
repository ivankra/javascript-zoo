// compat-table: ES6 > built-in extensions > Object static methods (medium) > Object.is
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.is === 'function' &&
    Object.is(NaN, NaN) &&
   !Object.is(-0, 0);
}

try {
  if (testCode()) {
    console.log("kangax-es6/Object.is.js: OK");
  } else {
    console.log("kangax-es6/Object.is.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Object.is.js: exception: " + e);
}
