// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid character escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\z/.exec("\\z")[0] === "z"
    && /[\z]/.exec("[\\z]")[0] === "z";
}

try {
  if (testCode()) {
    console.log("annexb.es6.regex.invalid-char-escapes.js: OK");
  } else {
    console.log("annexb.es6.regex.invalid-char-escapes.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.regex.invalid-char-escapes.js: FAIL: " + e);
}