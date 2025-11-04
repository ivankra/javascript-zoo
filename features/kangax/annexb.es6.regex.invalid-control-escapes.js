// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid control-character escapes
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\c2/.exec("\\c2")[0] === "\\c2";
}

try {
  if (testCode()) {
    console.log("annexb.es6.regex.invalid-control-escapes.js: OK");
  } else {
    console.log("annexb.es6.regex.invalid-control-escapes.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.regex.invalid-control-escapes.js: FAIL: " + e);
}