// compat-table: ES5 > Function.prototype.bind (medium)
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return typeof Function.prototype.bind === 'function';
}

try {
  if (testCode()) {
    console.log("kangax-es5/Function.prototype.bind.js: OK");
  } else {
    console.log("kangax-es5/Function.prototype.bind.js: failed");
  }
} catch (e) {
  console.log("kangax-es5/Function.prototype.bind.js: exception: " + e);
}
