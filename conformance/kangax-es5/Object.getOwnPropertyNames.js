// compat-table: ES5 > Object static methods (large) > Object.getOwnPropertyNames
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.getOwnPropertyNames === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Object.getOwnPropertyNames.js: OK");
  } else {
    console.log("kangax-es5/Object.getOwnPropertyNames.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Object.getOwnPropertyNames.js: exception: " + e);
}
