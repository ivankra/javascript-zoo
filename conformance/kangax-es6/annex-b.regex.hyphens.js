// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > hyphens in character sets
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /[\w-_]/.exec("-")[0] === "-";
}

try {
  if (testCode()) {
    console.log("kangax-es6/annex-b.regex.hyphens.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.hyphens.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.hyphens.js: exception: " + e);
}
