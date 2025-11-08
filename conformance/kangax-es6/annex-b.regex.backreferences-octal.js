// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > invalid backreferences become octal escapes
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /\41/.exec("!")[0] === "!"
    && /[\41]/.exec("!")[0] === "!";
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.regex.backreferences-octal.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.backreferences-octal.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.backreferences-octal.js: exception: " + e);
}
