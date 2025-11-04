// compat-table: ES5 > Object/array literal extensions (large) > Trailing commas in object literals
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  return { a: true, }.a === true;
}

try {
  if (testCode()) {
    console.log("es5.literals.trailing-comma-object.js: OK");
  } else {
    console.log("es5.literals.trailing-comma-object.js: FAIL");
  }
} catch (e) {
  console.log("es5.literals.trailing-comma-object.js: FAIL: " + e);
}