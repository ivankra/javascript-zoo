// ES6: http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals
// compat-table: ES6 > syntax > octal and binary literals (small) > binary literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return 0b10 === 2 && 0B10 === 2;
}

try {
  if (testCode()) {
    console.log("es6.literals.binary.js: OK");
  } else {
    console.log("es6.literals.binary.js: FAIL");
  }
} catch (e) {
  console.log("es6.literals.binary.js: FAIL: " + e);
}