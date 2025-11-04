// ES6: https://github.com/tc39/proposal-regexp-modifiers
// compat-table: ES2016+ > 2025 features > RegExp Pattern Modifiers (medium) > i flag
//
// SPDX-FileCopyrightText: 2010-2013 Juriy Zaytsev
// SPDX-FileCopyrightText: 2025 Ivan Krasilnikov
// SPDX-License-Identifier: MIT

function testCode() {
  const regex = /^[a-z](?-i:[a-z])$/i;
  return regex.test("ab") && regex.test("Ab") && !regex.test("aB");
}

try {
  if (testCode()) {
    console.log("es2025.regex.pattern-modifiers.i.js: OK");
  } else {
    console.log("es2025.regex.pattern-modifiers.i.js: FAIL");
  }
} catch (e) {
  console.log("es2025.regex.pattern-modifiers.i.js: FAIL: " + e);
}