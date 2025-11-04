// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid hexadecimal escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\x1/.exec("x1")[0] === "x1"
    && /[\x1]/.exec("x")[0] === "x";
}

try {
  if (testCode()) {
    console.log("annexb.es6.regex.invalid-hex-escapes.js: OK");
  } else {
    console.log("annexb.es6.regex.invalid-hex-escapes.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.regex.invalid-hex-escapes.js: FAIL: " + e);
}