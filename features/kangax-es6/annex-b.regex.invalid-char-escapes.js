// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid character escapes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
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
    console.log("kangax-es6/annex-b.regex.invalid-char-escapes.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.invalid-char-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.invalid-char-escapes.js: exception: " + e);
}
