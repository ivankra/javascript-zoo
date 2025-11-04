// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-get-regexp.prototype.sticky
// MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Parameters
// compat-table: ES6 > syntax > RegExp "y" and "u" flags (medium) > "u" flag, case folding
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return "ſ".match(/S/iu) && "S".match(/ſ/iu);
}

try {
  if (testCode()) {
    console.log("es6.regex.flags.u.case-folding.js: OK");
  } else {
    console.log("es6.regex.flags.u.case-folding.js: FAIL");
  }
} catch (e) {
  console.log("es6.regex.flags.u.case-folding.js: FAIL: " + e);
}