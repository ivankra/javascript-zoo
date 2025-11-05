// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid control-character escapes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\c2/.exec("\\c2")[0] === "\\c2";
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.regex.invalid-control-escapes.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.invalid-control-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.invalid-control-escapes.js: exception: " + e);
}
