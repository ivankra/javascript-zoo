// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > hyphens in character sets
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /[\w-_]/.exec("-")[0] === "-";
}

try {
  if (testCode()) {
    console.log("annexb.es6.regex.hyphens.js: OK");
  } else {
    console.log("annexb.es6.regex.hyphens.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.regex.hyphens.js: FAIL: " + e);
}