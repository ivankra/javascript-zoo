// compat-table: ES6 > annex b > RegExp syntax extensions (tiny) > incomplete patterns and quantifiers
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-regular-expressions-patterns
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
    console.log("kangax-es6/annex-b.regex.incomplete-patterns.js: OK");
  } else {
    console.log("kangax-es6/annex-b.regex.incomplete-patterns.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/annex-b.regex.incomplete-patterns.js: exception: " + e);
}
