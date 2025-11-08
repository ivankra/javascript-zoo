// compat-table: ES5 > Object static methods (large) > Object.isExtensible
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/isExtensible
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Object.isExtensible === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Object.isExtensible.js: OK");
  } else {
    console.log("kangax-es5/Object.isExtensible.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Object.isExtensible.js: exception: " + e);
}
