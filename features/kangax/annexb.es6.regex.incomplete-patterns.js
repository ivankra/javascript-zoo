// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > incomplete patterns and quantifiers
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return /x{1/.exec("x{1")[0] === "x{1"
    && /x]1/.exec("x]1")[0] === "x]1";
}

try {
  if (testCode()) {
    console.log("annexb.es6.regex.incomplete-patterns.js: OK");
  } else {
    console.log("annexb.es6.regex.incomplete-patterns.js: FAIL");
  }
} catch (e) {
  console.log("annexb.es6.regex.incomplete-patterns.js: FAIL: " + e);
}