// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > octal escape sequences
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\041/.exec("!")[0] === "!"
    && /[\041]/.exec("!")[0] === "!";
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.regex.octal-escapes.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.octal-escapes.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.octal-escapes.js: exception: " + e);
}
