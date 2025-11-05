// compat-table: ES6 > syntax > octal and binary literals (small) > octal supported by Number()
// spec: http://www.ecma-international.org/ecma-262/6.0/#sec-literals-numeric-literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return Number('0o1') === 1;
}

try {
  if (testCode()) {
    console.log("kangax-es6/literals.octal.Number.js: OK");
  } else {
    console.log("kangax-es6/literals.octal.Number.js: failed");
  }
} catch (e) {
  console.log("kangax-es6/literals.octal.Number.js: exception: " + e);
}
