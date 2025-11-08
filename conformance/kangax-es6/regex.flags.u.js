// compat-table: ES6 > syntax > RegExp "y" and "u" flags (medium) > "u" flag
// mdn: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "𠮷".match(/^.$/u)[0].length === 2;
}

try {
  if (testCode()) {
    console.log("kangax-es6/regex.flags.u.js: OK");
  } else {
    console.log("kangax-es6/regex.flags.u.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/regex.flags.u.js: exception: " + e);
}
