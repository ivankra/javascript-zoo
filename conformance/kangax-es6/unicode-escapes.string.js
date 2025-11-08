// compat-table: ES6 > syntax > Unicode code point escapes (small) > in strings
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-literals-string-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return '\u{1d306}' === '\ud834\udf06';
}

try {
  if (testCode()) {
    console.log("kangax-es6/unicode-escapes.string.js: OK");
  } else {
    console.log("kangax-es6/unicode-escapes.string.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/unicode-escapes.string.js: exception: " + e);
}
