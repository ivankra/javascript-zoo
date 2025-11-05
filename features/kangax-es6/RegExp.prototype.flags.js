// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp.prototype.flags
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /./igm.flags === "gim" && /./.flags === "";
}

try {
  if (testCode()) {
    console.log("kangax-es6/RegExp.prototype.flags.js: OK");
  } else {
    console.log("kangax-es6/RegExp.prototype.flags.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/RegExp.prototype.flags.js: exception: " + e);
}
