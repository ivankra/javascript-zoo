// compat-table: ES6 > built-in extensions > Object static methods (medium) > Object.setPrototypeOf
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.setPrototypeOf({}, Array.prototype) instanceof Array;
}

try {
  if (testCode()) {
    console.log("kangax-es6/Object.setPrototypeOf.js: OK");
  } else {
    console.log("kangax-es6/Object.setPrototypeOf.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/Object.setPrototypeOf.js: exception: " + e);
}
