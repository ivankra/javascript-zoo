// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid Unicode escapes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\u1/.exec("u1")[0] === "u1"
    && /[\u1]/.exec("u")[0] === "u";
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.regex.invalid-unicode-escapes.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.invalid-unicode-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.invalid-unicode-escapes.js: exception: " + e);
}
