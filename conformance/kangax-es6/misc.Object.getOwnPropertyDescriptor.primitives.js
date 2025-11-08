// compat-table: ES6 > misc > Object static methods accept primitives (tiny) > Object.getOwnPropertyDescriptor
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-properties-of-the-object-constructor
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Object.getOwnPropertyDescriptor('a', 'foo') === void undefined;
}

try {
  if (testCode()) {
    console.log("kangax-es6/misc.Object.getOwnPropertyDescriptor.primitives.js: OK");
  } else {
    console.log("kangax-es6/misc.Object.getOwnPropertyDescriptor.primitives.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/misc.Object.getOwnPropertyDescriptor.primitives.js: exception: " + e);
}
