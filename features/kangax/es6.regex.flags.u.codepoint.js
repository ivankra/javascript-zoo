// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters
// compat-table: ES6 > syntax > RegExp "y" and "u" flags (medium) > "u" flag, Unicode code point escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "𝌆".match(/\u{1d306}/u)[0].length === 2;
}

try {
  if (testCode()) {
    console.log("es6.regex.flags.u.codepoint.js: OK");
  } else {
    console.log("es6.regex.flags.u.codepoint.js: FAIL");
  }
} catch (e) {
  console.log("es6.regex.flags.u.codepoint.js: FAIL: " + e);
}