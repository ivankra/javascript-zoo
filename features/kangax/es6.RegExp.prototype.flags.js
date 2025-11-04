// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regexp.prototype
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/flags
// compat-table: ES6 > built-in extensions > RegExp.prototype properties (small) > RegExp.prototype.flags
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /./igm.flags === "gim" && /./.flags === "";
}

try {
  if (testCode()) {
    console.log("es6.RegExp.prototype.flags.js: OK");
  } else {
    console.log("es6.RegExp.prototype.flags.js: FAIL");
  }
} catch (e) {
  console.log("es6.RegExp.prototype.flags.js: FAIL: " + e);
}