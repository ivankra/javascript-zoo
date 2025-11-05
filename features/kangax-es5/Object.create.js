// compat-table: ES5 > Object static methods (large) > Object.create
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.create === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Object.create.js: OK");
  } else {
    console.log("kangax-es5/Object.create.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Object.create.js: exception: " + e);
}
