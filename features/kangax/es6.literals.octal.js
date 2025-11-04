// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals
// compat-table: ES6 > syntax > octal and binary literals (small) > octal literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 0o10 === 8 && 0O10 === 8;
}

try {
  if (testCode()) {
    console.log("es6.literals.octal.js: OK");
  } else {
    console.log("es6.literals.octal.js: FAIL");
  }
} catch (e) {
  console.log("es6.literals.octal.js: FAIL: " + e);
}