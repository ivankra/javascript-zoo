// compat-table: ES5 > Object/array literal extensions (large) > Reserved words as property names
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return ({ if: 1 }).if === 1;
}

try {
  if (testCode()) {
    console.log("es5.literals.reserved-words-properties.js: OK");
  } else {
    console.log("es5.literals.reserved-words-properties.js: FAIL");
  }
} catch (e) {
  console.log("es5.literals.reserved-words-properties.js: FAIL: " + e);
}