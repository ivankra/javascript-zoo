// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid hexadecimal escapes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
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
    console.log("kangax-es6/annex-b.regex.invalid-hex-escapes.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.invalid-hex-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.invalid-hex-escapes.js: exception: " + e);
}
